import { ApiClient } from "../../infrastructure/http/ApiClient";
import { HttpRegistrationRepository } from "../../infrastructure/repositories/HttpRegistrationRepository";
import { SupabaseAuthRepository } from "../../infrastructure/repositories/SupabaseAuthRepository";
import { RegisterPerson } from "../../application/use-cases/RegisterPerson";
import { ListRegistrations } from "../../application/use-cases/ListRegistrations";
import {
  DeleteRegistration,
  UpdateRegistration,
} from "../../application/use-cases/ManageRegistrations";
import { SignInAdmin } from "../../application/use-cases/SignInAdmin";
import { SignOutAdmin } from "../../application/use-cases/SignOutAdmin";
import { GetAdminSession } from "../../application/use-cases/GetAdminSession";
import {
  GetStudentProfile,
  SignInStudent,
  SignOutStudent,
} from "../../application/use-cases/StudentSession";

const api = new ApiClient("/api");
const auth = new SupabaseAuthRepository(api);
const registrations = new HttpRegistrationRepository(api, auth);

export const container = {
  registerPerson: new RegisterPerson(registrations),
  listRegistrations: new ListRegistrations(registrations, auth),
  updateRegistration: new UpdateRegistration(registrations, auth),
  deleteRegistration: new DeleteRegistration(registrations, auth),
  signInAdmin: new SignInAdmin(auth),
  signOutAdmin: new SignOutAdmin(auth),
  getAdminSession: new GetAdminSession(auth),
  signInStudent: new SignInStudent(registrations),
  getStudentProfile: new GetStudentProfile(registrations),
  signOutStudent: new SignOutStudent(registrations),
};
