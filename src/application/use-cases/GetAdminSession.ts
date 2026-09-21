import { DomainError } from "../../domain/errors/DomainError";
import type { AdminSession, IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class GetAdminSession {
  constructor(private readonly auth: IAuthRepository) {}

  async execute(): Promise<AdminSession | null> {
    const session = await this.auth.getSession();
    if (!session) return null;

    try {
      const admin = await this.auth.isAdmin();
      if (!admin) return null;
      return session;
    } catch (error) {
      if (error instanceof DomainError && error.code === "UNAVAILABLE") {
        return session;
      }
      throw error;
    }
  }
}
