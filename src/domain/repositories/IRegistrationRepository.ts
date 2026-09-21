import type {
  NewRegistration,
  Registration,
  StudentSession,
  UpdateRegistrationInput,
} from "../entities/Registration";

export interface IRegistrationRepository {
  create(input: NewRegistration): Promise<Registration>;
  list(): Promise<Registration[]>;
  update(id: string, input: UpdateRegistrationInput): Promise<Registration>;
  remove(id: string): Promise<void>;
  authenticate(username: string, password: string): Promise<StudentSession>;
  profileByToken(token: string): Promise<Registration>;
  revokeToken(token: string): Promise<void>;
}
