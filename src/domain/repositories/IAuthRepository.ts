export type AdminSession = {
  userId: string;
  email: string;
};

export interface IAuthRepository {
  signIn(email: string, password: string): Promise<AdminSession>;
  signOut(): Promise<void>;
  getSession(): Promise<AdminSession | null>;
  getAccessToken(): Promise<string | null>;
  isAdmin(): Promise<boolean>;
}
