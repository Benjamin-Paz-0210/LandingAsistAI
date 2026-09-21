import { useState } from "react";
import { CAREERS } from "../../../../domain/catalog/unas";
import { contentForCareer } from "../../../../domain/catalog/unasContent";

export function Courses() {
  const [code, setCode] = useState(CAREERS[0]?.code ?? "informatica");
  const content = contentForCareer(code);
  const selected = CAREERS.find((item) => item.code === code);
  const courses = content?.courses ?? [];

  return (
    <section id="cursos" className="bg-navy-900 py-16 text-ivory sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Educación continua</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">Cursos y reseñas por carrera</h2>
        <p className="mt-3 max-w-2xl text-sm text-ivory/75">
          Elige una escuela profesional para ver su reseña, testimonios de egresados y los cursos de
          extensión asociados.
        </p>

        <label className="mt-6 block max-w-lg text-sm">
          <span className="mb-1.5 block text-ivory/80">Carrera</span>
          <select
            className="w-full rounded-md border border-white/20 bg-navy-950 px-3 py-2.5 text-ivory"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          >
            {CAREERS.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        {selected && content ? (
          <div className="mt-8 space-y-8">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-wide text-gold">{selected.faculty}</p>
              <h3 className="mt-1 font-display text-2xl">{selected.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ivory/80">{content.review}</p>
            </article>

            <div className="grid gap-4 md:grid-cols-2">
              {content.reviews.map((item) => (
                <blockquote key={item.name} className="rounded-2xl border border-white/10 p-5">
                  <p className="text-sm leading-relaxed text-ivory/90">“{item.text}”</p>
                  <footer className="mt-3 text-xs text-gold">
                    {item.name} · {item.year}
                  </footer>
                </blockquote>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {courses.map((course) => (
                <article key={course.code} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img src={course.image} alt="" className="h-36 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-xs text-gold">{course.hours}</p>
                    <h4 className="mt-1 font-semibold">{course.name}</h4>
                    <p className="mt-2 text-sm text-ivory/75">{course.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
