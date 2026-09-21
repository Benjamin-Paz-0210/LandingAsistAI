import type { AdminSession, IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { DomainError } from "../../domain/errors/DomainError";
import type { ApiClient } from "../http/ApiClient";
import { supabaseClient } from "../supabase/supabaseClient";

export class SupabaseAuthRepository implements IAuthRepository {
  constructor(private readonly api: ApiClient) {}
  async signIn(email: string, password: string): Promise<AdminSession> {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user || !data.session) {
      const detail = (error?.message ?? "").toLowerCase();
      if (detail.includes("api key") || detail.includes("invalid jwt")) {
        throw new DomainError(
          "UNAVAILABLE",
          "La clave anónima de Supabase no es válida. Reemplaza VITE_SUPABASE_ANON_KEY con la anon public de Dashboard → Settings → API.",
        );
      }
      throw new DomainError("UNAUTHORIZED", "Credenciales incorrectas.");
    }

    return {
      userId: data.user.id,
      email: data.user.email ?? email,
    };
  }

  async signOut(): Promise<void> {
    await supabaseClient.auth.signOut();
  }

  async getSession(): Promise<AdminSession | null> {
    const { data } = await supabaseClient.auth.getSession();
    const user = data.session?.user;
    if (!user?.email) return null;

    return { userId: user.id, email: user.email };
  }

  async getAccessToken(): Promise<string | null> {
    const { data } = await supabaseClient.auth.getSession();
    return data.session?.access_token ?? null;
  }

  async isAdmin(): Promise<boolean> {
    const token = await this.getAccessToken();
    if (!token) return false;

    try {
      await this.api.get<{ ok: boolean }>("/admin/me", token);
      return true;
    } catch (error) {
      if (error instanceof DomainError && (error.code === "FORBIDDEN" || error.code === "UNAUTHORIZED")) {
        return false;
      }
      throw error;
    }
  }
}
