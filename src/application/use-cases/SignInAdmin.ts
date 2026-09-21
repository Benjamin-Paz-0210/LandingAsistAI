import { Email } from "../../domain/value-objects/Email";
import { DomainError } from "../../domain/errors/DomainError";
import type { AdminSession, IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class SignInAdmin {
  constructor(private readonly auth: IAuthRepository) {}

  async execute(email: string, password: string): Promise<AdminSession> {
    const validEmail = Email.create(email);

    if (typeof password !== "string" || password.length < 8 || password.length > 128) {
      throw new DomainError("VALIDATION", "La contraseña no es válida.", "password");
    }

    const session = await this.auth.signIn(validEmail.value, password);
    const admin = await this.auth.isAdmin();

    if (!admin) {
      await this.auth.signOut();
      throw new DomainError("FORBIDDEN", "Esta cuenta no tiene acceso de administración.");
    }

    return session;
  }
}
