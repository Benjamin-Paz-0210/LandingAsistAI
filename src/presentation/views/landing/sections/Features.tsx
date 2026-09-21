import { CAREERS } from "../../../../domain/catalog/unas";
import { contentForCareer } from "../../../../domain/catalog/unasContent";

export function Careers() {
  return (
    <section id="carreras" className="bg-ivory py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">Oferta académica</p>
        <h2 className="mt-3 font-display text-3xl text-navy-950 sm:text-4xl">Carreras profesionales</h2>
        <p className="mt-3 max-w-2xl text-sm text-stoneink sm:text-base">
          Programas de pregrado alineados a la vocación agraria, forestal, alimentaria y de gestión
          de la Universidad Nacional Agraria de la Selva.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAREERS.map((career) => {
            const content = contentForCareer(career.code);
            return (
              <article key={career.code} className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-card">
                <img src={career.image} alt="" className="h-40 w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-gold-dark">{career.faculty}</p>
                  <h3 className="mt-1 text-lg font-semibold text-navy-900">{career.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stoneink">{content?.review ?? career.summary}</p>
                  <p className="mt-3 text-xs font-medium text-navy-700">{career.duration}</p>
                  {content?.reviews[0] ? (
                    <blockquote className="mt-4 border-t border-slate-100 pt-3">
                      <p className="text-xs leading-relaxed text-stoneink">“{content.reviews[0].text}”</p>
                      <footer className="mt-2 text-[11px] font-medium text-gold-dark">
                        {content.reviews[0].name} · {content.reviews[0].year}
                      </footer>
                    </blockquote>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
