import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, LogOut, Quote, UserRound } from "lucide-react";
import { careerByCode } from "../../../domain/catalog/unas";
import { contentForCareer } from "../../../domain/catalog/unasContent";
import { useStudentAuth } from "../../context/StudentAuthProvider";
import { Button } from "../../components/Button";

export function StudentPortalView() {
  const { student, signOut } = useStudentAuth();
  const career = careerByCode(student?.careerCode);
  const content = contentForCareer(student?.careerCode);

  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-navy-950 text-ivory">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold">UNAS · Campus virtual</p>
            <h1 className="font-display text-2xl">Hola, {student?.firstName}</h1>
            <p className="text-sm text-ivory/70">@{student?.username}</p>
          </div>
          <Button type="button" variant="ghost" onClick={() => void signOut()}>
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-3">
        <article className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center gap-2 text-navy-800">
            <GraduationCap className="h-5 w-5 text-gold-dark" />
            <h2 className="text-lg font-semibold">Mi carrera</h2>
          </div>
          {career && content ? (
            <div className="overflow-hidden rounded-xl">
              <img src={career.image} alt="" className="h-48 w-full object-cover" />
              <div className="pt-4">
                <p className="text-xs uppercase text-gold-dark">{career.faculty}</p>
                <p className="text-xl font-semibold text-navy-950">{career.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-stoneink">{content.review}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-stoneink">Aún no hay una carrera asignada.</p>
          )}
        </article>

        <article className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center gap-2">
            <UserRound className="h-5 w-5 text-gold-dark" />
            <h2 className="text-lg font-semibold text-navy-900">Ficha</h2>
          </div>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-slate-500">Nombre</dt>
              <dd className="font-medium text-navy-900">
                {student?.firstName} {student?.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Correo</dt>
              <dd>{student?.email}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Usuario</dt>
              <dd>{student?.username}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Duración</dt>
              <dd>{career?.duration ?? "—"}</dd>
            </div>
          </dl>
        </article>

        {content?.reviews.length ? (
          <article className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card lg:col-span-3">
            <div className="mb-4 flex items-center gap-2">
              <Quote className="h-5 w-5 text-gold-dark" />
              <h2 className="text-lg font-semibold text-navy-900">Reseñas de la carrera</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {content.reviews.map((item) => (
                <blockquote key={item.name} className="rounded-xl bg-ivory p-4">
                  <p className="text-sm leading-relaxed text-stoneink">“{item.text}”</p>
                  <footer className="mt-3 text-xs font-medium text-navy-800">
                    {item.name} · {item.year}
                  </footer>
                </blockquote>
              ))}
            </div>
          </article>
        ) : null}

        <article className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card lg:col-span-3">
          <div className="mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-gold-dark" />
            <h2 className="text-lg font-semibold text-navy-900">
              Cursos de {career?.name ?? "tu carrera"}
            </h2>
          </div>
          {content?.courses.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {content.courses.map((course) => (
                <div key={course.code} className="overflow-hidden rounded-xl border border-slate-100">
                  <img src={course.image} alt="" className="h-28 w-full object-cover" />
                  <div className="p-3">
                    <p className="text-sm font-semibold text-navy-900">{course.name}</p>
                    <p className="text-xs text-gold-dark">{course.hours}</p>
                    <p className="mt-1 text-xs text-stoneink">{course.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-stoneink">No hay cursos asociados a esta carrera todavía.</p>
          )}
        </article>

        <Link to="/" className="text-sm text-navy-700 hover:text-gold-dark lg:col-span-3">
          Volver a la web institucional
        </Link>
      </main>
    </div>
  );
}
