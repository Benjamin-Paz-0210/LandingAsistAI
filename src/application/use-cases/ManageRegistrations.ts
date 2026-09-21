import { Email } from "../../domain/value-objects/Email";
import { PersonName } from "../../domain/value-objects/PersonName";
import { Username } from "../../domain/value-objects/Username";
import { Password } from "../../domain/value-objects/Password";
import { CareerCode } from "../../domain/value-objects/CareerCode";
import { DomainError } from "../../domain/errors/DomainError";
import type { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import type { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";
import type { Registration, UpdateRegistrationInput } from "../../domain/entities/Registration";

export class UpdateRegistration {
  constructor(
    private readonly registrations: IRegistrationRepository,
    private readonly auth: IAuthRepository,
  ) {}

  async execute(id: string, input: UpdateRegistrationInput): Promise<Registration> {
    await assertAdmin(this.auth);

    const firstName = PersonName.create(input.firstName, "firstName");
    const lastName = PersonName.create(input.lastName, "lastName");
    const email = Email.create(input.email);
    const username = Username.create(input.username);
    const careerCode = CareerCode.create(input.careerCode);
    const password = input.password ? Password.create(input.password) : undefined;

    return this.registrations.update(id, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      username: username.value,
      careerCode: careerCode.value,
      password: password?.value,
    });
  }
}

export class DeleteRegistration {
  constructor(
    private readonly registrations: IRegistrationRepository,
    private readonly auth: IAuthRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await assertAdmin(this.auth);
    await this.registrations.remove(id);
  }
}

async function assertAdmin(auth: IAuthRepository): Promise<void> {
  const session = await auth.getSession();
  if (!session) {
    throw new DomainError("UNAUTHORIZED", "Inicia sesión para continuar.");
  }
}
