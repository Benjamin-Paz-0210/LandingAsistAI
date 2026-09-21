import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { CAREERS } from "../../../../domain/catalog/unas";
import { isRfcEmail } from "../../../../domain/value-objects/Email";
import { useRegister } from "../../../hooks/useRegister";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { SelectField } from "../../../components/SelectField";
import { Spinner } from "../../../components/Spinner";
import { TextField } from "../../../components/TextField";

export function RegisterSection() {
  const { status, fieldErrors, message, confirmation, register, reset } = useRegister();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [careerCode, setCareerCode] = useState("");
  const [emailHint, setEmailHint] = useState<string | undefined>();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await register({ firstName, lastName, email, username, password, careerCode });
  }

  function onEmailBlur() {
    const value = email.trim();
    if (!value) {
      setEmailHint(undefined);
      return;
    }
    setEmailHint(isRfcEmail(value.toLowerCase()) ? undefined : "Formato RFC de correo inválido.");
  }

  return (
    <section id="admision" className="bg-navy-950 py-16 text-ivory sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Admisión</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Crea tu usuario de postulante.</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/75">
            Registra tus datos, elige una carrera y define un usuario y contraseña. Con esas
            credenciales entrarás al portal del alumno. La contraseña se almacena hasheada (bcrypt).
          </p>
          <p className="mt-6 text-sm text-ivory/70">
            ¿Ya te registraste?{" "}
            <Link to="/alumno/login" className="text-gold hover:text-gold-light">
              Ingresa al portal
            </Link>
          </p>
        </div>

        <div className="rounded-2xl bg-ivory p-6 text-navy-900 shadow-card sm:p-8">
          {status === "success" && confirmation ? (
            <div className="space-y-4">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              <h3 className="font-display text-3xl">Registro confirmado</h3>
              <Alert tone="success">
                Bienvenido/a, {confirmation.firstName}. Tu usuario es{" "}
                <strong>{confirmation.username}</strong>. Ya puedes entrar al portal del alumno.
              </Alert>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link
                  to="/alumno/login"
                  className="inline-flex items-center justify-center rounded-md bg-navy-800 px-5 py-3 text-sm font-semibold text-ivory"
                >
                  Ir al portal
                </Link>
                <Button type="button" variant="outline" onClick={reset}>
                  Registrar otra persona
                </Button>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Nombre"
                  name="firstName"
                  maxLength={80}
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  error={fieldErrors.firstName}
                />
                <TextField
                  label="Apellido"
                  name="lastName"
                  maxLength={80}
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  error={fieldErrors.lastName}
                />
              </div>
              <TextField
                label="Correo"
                name="email"
                type="email"
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onBlur={onEmailBlur}
                error={fieldErrors.email ?? emailHint}
              />
              <SelectField
                label="Carrera de interés"
                name="careerCode"
                value={careerCode}
                onChange={(event) => setCareerCode(event.target.value)}
                error={fieldErrors.careerCode}
                options={CAREERS.map((career) => ({
                  value: career.code,
                  label: `${career.name} — ${career.faculty}`,
                }))}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField
                  label="Usuario"
                  name="username"
                  autoComplete="username"
                  maxLength={32}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  error={fieldErrors.username}
                />
                <TextField
                  label="Contraseña"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={fieldErrors.password}
                />
              </div>
              {status === "error" && message ? <Alert tone="error">{message}</Alert> : null}
              <Button type="submit" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? (
                  <>
                    <Spinner /> Enviando
                  </>
                ) : (
                  "Crear cuenta de alumno"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
