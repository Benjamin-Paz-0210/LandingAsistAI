import { useCallback, useEffect, useState } from "react";
import { DomainError } from "../../domain/errors/DomainError";
import type { Registration } from "../../domain/entities/Registration";
import { container } from "../di/container";

const TOKEN_KEY = "unas.student.token";

export function useStudentAuth() {
  const [student, setStudent] = useState<Registration | null>(null);
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const current = sessionStorage.getItem(TOKEN_KEY);
    if (!current) {
      setLoading(false);
      return;
    }

    container.getStudentProfile
      .execute(current)
      .then((profile) => {
        if (!active) return;
        setStudent(profile);
        setToken(current);
      })
      .catch(() => {
        if (!active) return;
        sessionStorage.removeItem(TOKEN_KEY);
        setStudent(null);
        setToken(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const signIn = useCallback(async (username: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const session = await container.signInStudent.execute(username, password);
      sessionStorage.setItem(TOKEN_KEY, session.token);
      setToken(session.token);
      setStudent(session.student);
    } catch (caught) {
      setStudent(null);
      setToken(null);
      setError(caught instanceof DomainError ? caught.message : "No se pudo iniciar sesión.");
      throw caught;
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    if (token) {
      await container.signOutStudent.execute(token).catch(() => undefined);
    }
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setStudent(null);
  }, [token]);

  return { student, token, loading, error, signIn, signOut };
}
