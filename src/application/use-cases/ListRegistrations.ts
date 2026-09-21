import { DomainError } from "../../domain/errors/DomainError";
import type { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import type { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";
import type { Registration } from "../../domain/entities/Registration";

export class ListRegistrations {
  constructor(
    private readonly registrations: IRegistrationRepository,
    private readonly auth: IAuthRepository,
  ) {}

  async execute(): Promise<Registration[]> {
    const session = await this.auth.getSession();
    if (!session) {
      throw new DomainError("UNAUTHORIZED", "Inicia sesión para continuar.");
    }

    return this.registrations.list();
  }
}
