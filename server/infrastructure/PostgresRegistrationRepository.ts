import crypto from "node:crypto";
import type {
  NewRegistration,
  Registration,
  StudentSession,
  UpdateRegistrationInput,
} from "../../src/domain/entities/Registration";
import type { IRegistrationRepository } from "../../src/domain/repositories/IRegistrationRepository";
import { DomainError } from "../../src/domain/errors/DomainError";
import { pgPool } from "./pgPool";

type RegistrationRow = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string | null;
  career_code: string | null;
  created_at: string;
};

const RETURNING = `id, first_name, last_name, email, username, career_code, created_at`;

export class PostgresRegistrationRepository implements IRegistrationRepository {
  async create(input: NewRegistration): Promise<Registration> {
    try {
      const result = await pgPool.query<RegistrationRow>(
        `insert into public.registrations
           (first_name, last_name, email, username, password_hash, career_code, updated_at)
         values
           ($1, $2, $3, $4, extensions.crypt($5, extensions.gen_salt('bf', 12)), $6, now())
         returning ${RETURNING}`,
        [
          input.firstName,
          input.lastName,
          input.email,
          input.username,
          input.password,
          input.careerCode,
        ],
      );
      return this.toDomain(result.rows[0]);
    } catch (error) {
      throw mapWriteError(error);
    }
  }

  async list(): Promise<Registration[]> {
    const result = await pgPool.query<RegistrationRow>(
      `select ${RETURNING} from public.registrations order by created_at desc`,
    );
    return result.rows.map((row) => this.toDomain(row));
  }

  async update(id: string, input: UpdateRegistrationInput): Promise<Registration> {
    try {
      const result = input.password
        ? await pgPool.query<RegistrationRow>(
            `update public.registrations
             set first_name = $2,
                 last_name = $3,
                 email = $4,
                 username = $5,
                 career_code = $6,
                 password_hash = extensions.crypt($7, extensions.gen_salt('bf', 12)),
                 updated_at = now()
             where id = $1
             returning ${RETURNING}`,
            [
              id,
              input.firstName,
              input.lastName,
              input.email,
              input.username,
              input.careerCode,
              input.password,
            ],
          )
        : await pgPool.query<RegistrationRow>(
            `update public.registrations
             set first_name = $2,
                 last_name = $3,
                 email = $4,
                 username = $5,
                 career_code = $6,
                 updated_at = now()
             where id = $1
             returning ${RETURNING}`,
            [id, input.firstName, input.lastName, input.email, input.username, input.careerCode],
          );

      if (!result.rows[0]) {
        throw new DomainError("NOT_FOUND", "El registro no existe.");
      }
      return this.toDomain(result.rows[0]);
    } catch (error) {
      if (error instanceof DomainError) throw error;
      throw mapWriteError(error);
    }
  }

  async remove(id: string): Promise<void> {
    const result = await pgPool.query(`delete from public.registrations where id = $1`, [id]);
    if (result.rowCount === 0) {
      throw new DomainError("NOT_FOUND", "El registro no existe.");
    }
  }

  async authenticate(username: string, password: string): Promise<StudentSession> {
    const found = await pgPool.query<RegistrationRow>(
      `select ${RETURNING}
       from public.registrations
       where lower(username) = $1
         and password_hash is not null
         and password_hash = extensions.crypt($2, password_hash)
       limit 1`,
      [username, password],
    );

    const student = found.rows[0];
    if (!student) {
      throw new DomainError("UNAUTHORIZED", "Usuario o contraseña incorrectos.");
    }

    const token = crypto.randomBytes(32).toString("base64url");
    await pgPool.query(
      `insert into public.student_sessions (student_id, token_hash, expires_at)
       values ($1, $2, now() + interval '7 days')`,
      [student.id, hashToken(token)],
    );

    return { token, student: this.toDomain(student) };
  }

  async profileByToken(token: string): Promise<Registration> {
    const result = await pgPool.query<RegistrationRow>(
      `select ${RETURNING}
       from public.registrations r
       join public.student_sessions s on s.student_id = r.id
       where s.token_hash = $1
         and s.expires_at > now()
       limit 1`,
      [hashToken(token)],
    );
    if (!result.rows[0]) {
      throw new DomainError("UNAUTHORIZED", "Sesión de alumno inválida o vencida.");
    }
    return this.toDomain(result.rows[0]);
  }

  async revokeToken(token: string): Promise<void> {
    await pgPool.query(`delete from public.student_sessions where token_hash = $1`, [
      hashToken(token),
    ]);
  }

  private toDomain(row: RegistrationRow): Registration {
    return {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      username: row.username,
      careerCode: row.career_code,
      createdAt: row.created_at,
    };
  }
}

export async function isAdminUser(userId: string): Promise<boolean> {
  const result = await pgPool.query(
    `select 1 from public.admin_users where user_id = $1 limit 1`,
    [userId],
  );
  return result.rowCount !== null && result.rowCount > 0;
}

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function mapWriteError(error: unknown): DomainError {
  const pgError = error as { code?: string; constraint?: string };
  if (pgError.code === "23505") {
    if (pgError.constraint?.includes("username")) {
      return new DomainError("CONFLICT", "Ese usuario ya está en uso.", "username");
    }
    return new DomainError("CONFLICT", "Este correo ya está registrado.", "email");
  }
  if (pgError.code === "23514") {
    return new DomainError("VALIDATION", "Los datos no cumplen las reglas de la base.");
  }
  return new DomainError("UNAVAILABLE", "No se pudo guardar el registro.");
}
