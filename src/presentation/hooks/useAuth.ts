import { useCallback, useEffect, useState } from "react";
import { DomainError } from "../../domain/errors/DomainError";
import type { AdminSession } from "../../domain/repositories/IAuthRepository";
import { container } from "../di/container";

export function useAuth() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    container.getAdminSession
      .execute()
      .then((current) => {
        if (!active) return;
        setSession(current);
        setError(null);
      })
      .catch((caught) => {
        if (!active) return;
        setSession(null);
        setError(
          caught instanceof DomainError
            ? caught.message
            : "No se pudo verificar la sesión de administración.",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const next = await container.signInAdmin.execute(email, password);
      setSession(next);
    } catch (caught) {
      setSession(null);
      setError(
        caught instanceof DomainError
          ? caught.message
          : "No se pudo iniciar sesión.",
      );
      throw caught;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    await container.signOutAdmin.execute();
    setSession(null);
  }, []);

  return { session, loading, error, signIn, signOut };
}
