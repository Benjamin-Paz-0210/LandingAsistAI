import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Pencil, Plus, RefreshCw, Trash2, Users } from "lucide-react";
import { CAREERS, careerByCode } from "../../../domain/catalog/unas";
import type { Registration } from "../../../domain/entities/Registration";
import { useAuthContext } from "../../context/AuthProvider";
import { useStudentsAdmin } from "../../hooks/useStudentsAdmin";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { SelectField } from "../../components/SelectField";
import { Spinner } from "../../components/Spinner";
import { TextField } from "../../components/TextField";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  careerCode: string;
};

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  careerCode: "",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-PE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminDashboardView() {
  const { session, signOut } = useAuthContext();
  const { items, loading, error, reload, create, update, remove } = useStudentsAdmin(Boolean(session));
  const [editing, setEditing] = useState<Registration | "new" | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function openCreate() {
    setForm(emptyForm);
    setFormError(null);
    setEditing("new");
  }

  function openEdit(item: Registration) {
    setForm({
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      username: item.username ?? "",
      password: "",
      careerCode: item.careerCode ?? "",
    });
    setFormError(null);
    setEditing(item);
  }

  async function onSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setFormError(null);
    try {
      if (editing === "new") {
        await create(form);
      } else if (editing) {
        await update(editing.id, {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          username: form.username,
          careerCode: form.careerCode,
          password: form.password || undefined,
        });
      }
      setEditing(null);
    } catch (caught) {
      setFormError(caught instanceof Error ? caught.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(item: Registration) {
    if (!window.confirm(`¿Eliminar a ${item.firstName} ${item.lastName}?`)) return;
    await remove(item.id);
  }

  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-navy-900/10 bg-navy-950 text-ivory">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">UNAS · Administración</p>
            <p className="font-display text-2xl">Alumnos registrados</p>
            <p className="text-xs text-ivory/60">{session?.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="gold" onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Nuevo
            </Button>
            <Button type="button" variant="ghost" onClick={() => void reload()}>
              <RefreshCw className="h-4 w-4" />
              Actualizar
            </Button>
            <Button type="button" variant="ghost" onClick={() => void signOut()}>
              <LogOut className="h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center gap-3">
          <Users className="h-5 w-5 text-gold-dark" />
          <h1 className="text-xl font-semibold text-navy-950">{items.length} registros</h1>
        </div>

        {error ? <Alert tone="error">{error}</Alert> : null}
        {loading ? (
          <p className="flex items-center gap-2 text-sm text-stoneink">
            <Spinner /> Cargando…
          </p>
        ) : null}

        <div className="mt-4 grid gap-3 md:hidden">
          {items.map((item) => (
            <article key={item.id} className="rounded-xl border border-navy-900/10 bg-white p-4">
              <p className="font-semibold text-navy-900">
                {item.firstName} {item.lastName}
              </p>
              <p className="text-sm">{item.email}</p>
              <p className="text-sm text-navy-700">@{item.username ?? "sin usuario"}</p>
              <p className="text-xs text-slate-500">{careerByCode(item.careerCode)?.name ?? "Sin carrera"}</p>
              <div className="mt-3 flex gap-2">
                <Button type="button" variant="outline" className="px-3 py-2" onClick={() => openEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button type="button" variant="danger" className="px-3 py-2" onClick={() => void onDelete(item)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 hidden overflow-x-auto rounded-xl border border-navy-900/10 bg-white md:block">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-navy-950 text-ivory">
              <tr>
                <th className="px-4 py-3 font-medium">Alumno</th>
                <th className="px-4 py-3 font-medium">Usuario</th>
                <th className="px-4 py-3 font-medium">Carrera</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-slate-100">
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy-900">
                      {item.firstName} {item.lastName}
                    </p>
                    <p className="text-xs text-slate-500">{item.email}</p>
                  </td>
                  <td className="px-4 py-3">{item.username ?? "—"}</td>
                  <td className="px-4 py-3">{careerByCode(item.careerCode)?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(item.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" className="rounded-md p-2 hover:bg-slate-100" onClick={() => openEdit(item)}>
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-md p-2 text-red-700 hover:bg-red-50"
                        onClick={() => void onDelete(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link to="/" className="mt-8 inline-block text-sm text-navy-700 hover:text-gold-dark">
          Volver a la web institucional
        </Link>
      </main>

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 p-4 sm:items-center">
          <form onSubmit={onSave} className="w-full max-w-lg space-y-4 rounded-2xl bg-ivory p-6 shadow-card">
            <h2 className="font-display text-2xl text-navy-950">
              {editing === "new" ? "Nuevo alumno" : "Editar alumno"}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Nombre"
                name="firstName"
                value={form.firstName}
                onChange={(event) => setForm({ ...form, firstName: event.target.value })}
              />
              <TextField
                label="Apellido"
                name="lastName"
                value={form.lastName}
                onChange={(event) => setForm({ ...form, lastName: event.target.value })}
              />
            </div>
            <TextField
              label="Correo"
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
            <SelectField
              label="Carrera"
              name="careerCode"
              value={form.careerCode}
              onChange={(event) => setForm({ ...form, careerCode: event.target.value })}
              options={CAREERS.map((career) => ({ value: career.code, label: career.name }))}
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField
                label="Usuario"
                name="username"
                value={form.username}
                onChange={(event) => setForm({ ...form, username: event.target.value })}
              />
              <TextField
                label={editing === "new" ? "Contraseña" : "Nueva contraseña (opcional)"}
                name="password"
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
              />
            </div>
            {formError ? <Alert tone="error">{formError}</Alert> : null}
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? <Spinner /> : "Guardar"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
