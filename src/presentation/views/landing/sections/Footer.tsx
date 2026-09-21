import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 py-8 text-sm text-ivory/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} Universidad Nacional Agraria de la Selva — Tingo María.</p>
        <div className="flex gap-4">
          <Link to="/alumno/login" className="hover:text-gold">
            Portal alumno
          </Link>
          <Link to="/admin" className="hover:text-gold">
            Administración
          </Link>
        </div>
      </div>
    </footer>
  );
}
