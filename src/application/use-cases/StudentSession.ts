import { Username } from "../../domain/value-objects/Username";
import { Password } from "../../domain/value-objects/Password";
import type { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";
import type { Registration, StudentSession } from "../../domain/entities/Registration";

export class SignInStudent {
  constructor(private readonly registrations: IRegistrationRepository) {}

  async execute(username: string, password: string): Promise<StudentSession> {
    const validUser = Username.create(username);
    const validPassword = Password.create(password);
    return this.registrations.authenticate(validUser.value, validPassword.value);
  }
}

export class GetStudentProfile {
  constructor(private readonly registrations: IRegistrationRepository) {}

  async execute(token: string): Promise<Registration> {
    return this.registrations.profileByToken(token);
  }
}

export class SignOutStudent {
  constructor(private readonly registrations: IRegistrationRepository) {}

  async execute(token: string): Promise<void> {
    await this.registrations.revokeToken(token);
  }
}
