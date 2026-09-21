export type Registration = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string | null;
  careerCode: string | null;
  createdAt: string;
};

export type NewRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  careerCode: string;
};

export type UpdateRegistrationInput = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  careerCode: string;
  password?: string;
};

export type StudentSession = {
  token: string;
  student: Registration;
};
