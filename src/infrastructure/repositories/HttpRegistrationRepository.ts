import type {
  NewRegistration,
  Registration,
  StudentSession,
  UpdateRegistrationInput,
} from "../../domain/entities/Registration";
import type { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";
import { DomainError } from "../../domain/errors/DomainError";
import type { ApiClient } from "../http/ApiClient";
import type { IAuthRepository } from "../../domain/repositories/IAuthRepository";

type RegistrationDto = Registration;

export class HttpRegistrationRepository implements IRegistrationRepository {
  constructor(
    private readonly api: ApiClient,
    private readonly auth: IAuthRepository,
  ) {}

  async create(input: NewRegistration): Promise<Registration> {
    return this.api.post<RegistrationDto>("/registrations", input);
  }

  async list(): Promise<Registration[]> {
    return this.api.get<RegistrationDto[]>("/registrations", await this.adminToken());
  }

  async update(id: string, input: UpdateRegistrationInput): Promise<Registration> {
    return this.api.patch<RegistrationDto>(`/registrations/${id}`, input, await this.adminToken());
  }

  async remove(id: string): Promise<void> {
    await this.api.delete(`/registrations/${id}`, await this.adminToken());
  }

  async authenticate(username: string, password: string): Promise<StudentSession> {
    return this.api.post<StudentSession>("/students/login", { username, password });
  }

  async profileByToken(token: string): Promise<Registration> {
    return this.api.get<RegistrationDto>("/students/me", token);
  }

  async revokeToken(token: string): Promise<void> {
    await this.api.post("/students/logout", {}, token);
  }

  private async adminToken(): Promise<string> {
    const token = await this.auth.getAccessToken();
    if (!token) {
      throw new DomainError("UNAUTHORIZED", "Inicia sesión para continuar.");
    }
    return token;
  }
}
