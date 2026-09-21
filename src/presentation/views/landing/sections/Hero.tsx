import { ArrowRight, MapPin } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative bg-campus bg-cover bg-center text-ivory">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Universidad Nacional Agraria de la Selva
          </p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Ciencia, selva y vocación de servicio en Tingo María.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">
            Formamos profesionales para administrar de manera sustentable la biodiversidad,
            la producción y la industrialización de los recursos naturales renovables.
          </p>
          <p className="mt-4 flex items-center gap-2 text-sm text-ivory/70">
            <MapPin className="h-4 w-4 text-gold" />
            Carretera Central km 1.21, Tingo María — Huánuco
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#admision"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-light"
            >
              Postular / registrarse
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#carreras"
              className="inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-3 text-sm font-semibold hover:border-gold hover:text-gold"
            >
              Ver carreras
            </a>
          </div>
        </div>
        <aside className="overflow-hidden rounded-2xl border border-white/15 shadow-card">
          <img
            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80"
            alt="Bosque amazónico de la selva alta, entorno de Tingo María"
            className="h-56 w-full object-cover sm:h-72 lg:h-full"
          />
        </aside>
      </div>
    </section>
  );
}
