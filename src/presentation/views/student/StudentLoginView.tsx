import { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useStudentAuth } from "../../context/StudentAuthProvider";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Spinner } from "../../components/Spinner";
import { TextField } from "../../components/TextField";

export function StudentLoginView() {
  const { student, loading, error, signIn } = useStudentAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && student) {
    return <Navigate to="/alumno" replace />;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await signIn(username, password);
    } catch {
      /* mensaje en el hook */
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-ivory p-6 shadow-card sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">UNAS · Tingo María</p>
        <h1 className="mt-2 font-display text-3xl text-navy-950">Portal del alumno</h1>
        <p className="mt-1 text-sm text-stoneink">Ingresa con el usuario creado en admisión.</p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <TextField
            label="Usuario"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error ? <Alert tone="error">{error}</Alert> : null}
          <Button type="submit" className="w-full" disabled={submitting || loading}>
            {submitting ? (
              <>
                <Spinner /> Ingresando
              </>
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
        <Link to="/" className="mt-6 inline-block text-sm text-navy-700 hover:text-gold-dark">
          Volver a la universidad
        </Link>
      </div>
    </main>
  );
}
