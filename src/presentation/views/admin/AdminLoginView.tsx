import { FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { Spinner } from "../../components/Spinner";
import { TextField } from "../../components/TextField";
import { env } from "../../../infrastructure/config/env";

export function AdminLoginView() {
  const { session, loading, error, signIn } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && session) {
    return <Navigate to="/admin" replace />;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await signIn(email, password);
    } catch {
      /* el hook expone el mensaje */
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-950 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-ivory p-6 shadow-card sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-dark">UNAS · Tingo María</p>
        <h1 className="mt-2 font-display text-3xl text-navy-950">Administración</h1>
        <p className="mt-1 text-sm text-stoneink">Acceso restringido al personal autorizado.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <TextField
            label="Correo"
            name="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {env.anonKeyError ? <Alert tone="error">{env.anonKeyError}</Alert> : null}
          {error ? <Alert tone="error">{error}</Alert> : null}
          <Button type="submit" className="w-full" disabled={submitting || loading}>
            {submitting ? (
              <>
                <Spinner /> Validando
              </>
            ) : (
              "Ingresar"
            )}
          </Button>
        </form>

        <Link to="/" className="mt-6 inline-block text-sm text-navy-700 hover:text-gold-dark">
          Volver a la landing
        </Link>
      </div>
    </main>
  );
}
