import { Email } from "../../domain/value-objects/Email";
import { PersonName } from "../../domain/value-objects/PersonName";
import { Username } from "../../domain/value-objects/Username";
import { Password } from "../../domain/value-objects/Password";
import { CareerCode } from "../../domain/value-objects/CareerCode";
import type { IRegistrationRepository } from "../../domain/repositories/IRegistrationRepository";
import type { Registration } from "../../domain/entities/Registration";

export type RegisterPersonInput = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  careerCode: string;
};

export class RegisterPerson {
  constructor(private readonly registrations: IRegistrationRepository) {}

  async execute(input: RegisterPersonInput): Promise<Registration> {
    const firstName = PersonName.create(input.firstName, "firstName");
    const lastName = PersonName.create(input.lastName, "lastName");
    const email = Email.create(input.email);
    const username = Username.create(input.username);
    const password = Password.create(input.password);
    const careerCode = CareerCode.create(input.careerCode);

    return this.registrations.create({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      username: username.value,
      password: password.value,
      careerCode: careerCode.value,
    });
  }
}
