export function Institutional() {
  return (
    <section id="campus" className="bg-ivory py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=80"
          alt="Paisaje agrícola de montaña, similar al entorno de Tingo María"
          className="h-72 w-full rounded-2xl object-cover shadow-card sm:h-96"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">Campus</p>
          <h2 className="mt-3 font-display text-3xl text-navy-950 sm:text-4xl">
            Un campus en el corazón de la selva alta.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-stoneink sm:text-base">
            La sede central se ubica en la Carretera Central km 1.21, Tingo María. Laboratorios,
            campos de cultivo, bosques de práctica y aulas conviven con el paisaje del Huallaga.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-navy-900">
            <li>Sede central — Tingo María, Huánuco.</li>
            <li>Enfoque científico, tecnológico, humanístico y social.</li>
            <li>Vinculación con comunidades, cooperativas y el Estado.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
