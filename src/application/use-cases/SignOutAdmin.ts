import type { IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class SignOutAdmin {
  constructor(private readonly auth: IAuthRepository) {}

  async execute(): Promise<void> {
    await this.auth.signOut();
  }
}
