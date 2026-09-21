import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { DomainError } from "../../domain/errors/DomainError";
import type { Registration } from "../../domain/entities/Registration";
import { container } from "../di/container";

const TOKEN_KEY = "unas.student.token";

type StudentAuth = {
  student: Registration | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const StudentAuthContext = createContext<StudentAuth | null>(null);

export function StudentAuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Registration | null>(null);
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(Boolean(sessionStorage.getItem(TOKEN_KEY)));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    if (student) {
      setLoading(false);
      return;
    }

    let active = true;
    setLoading(true);
    container.getStudentProfile
      .execute(token)
      .then((profile) => {
        if (active) setStudent(profile);
      })
      .catch((caught) => {
        if (!active) return;
        const unauthorized = caught instanceof DomainError && caught.code === "UNAUTHORIZED";
        if (unauthorized) {
          sessionStorage.removeItem(TOKEN_KEY);
          setToken(null);
          setStudent(null);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token, student]);

  const signIn = useCallback(async (username: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      const session = await container.signInStudent.execute(username, password);
      sessionStorage.setItem(TOKEN_KEY, session.token);
      setStudent(session.student);
      setToken(session.token);
    } catch (caught) {
      setStudent(null);
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

  return (
    <StudentAuthContext.Provider value={{ student, token, loading, error, signIn, signOut }}>
      {children}
    </StudentAuthContext.Provider>
  );
}

export function useStudentAuth() {
  const value = useContext(StudentAuthContext);
  if (!value) {
    throw new Error("useStudentAuth debe usarse dentro de StudentAuthProvider");
  }
  return value;
}
