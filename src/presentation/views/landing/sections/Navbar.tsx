import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#carreras", label: "Carreras" },
  { href: "#cursos", label: "Cursos" },
  { href: "#campus", label: "Campus" },
  { href: "#admision", label: "Admisión" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex items-center gap-3">
          <img src="/favicon.svg" alt="" className="h-9 w-9 rounded-lg" />
          <span className="leading-tight">
            <span className="block font-display text-xl text-ivory sm:text-2xl">UNAS</span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-gold sm:block">
              Tingo María
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-ivory/80 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-gold">
              {link.label}
            </a>
          ))}
          <Link to="/alumno/login" className="text-gold hover:text-gold-light">
            Portal alumno
          </Link>
          <Link to="/admin" className="text-ivory/50 hover:text-gold">
            Admin
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-ivory lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <nav className="space-y-1 border-t border-white/10 px-4 py-3 lg:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-md px-3 py-2 text-ivory/90 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link to="/alumno/login" className="block rounded-md px-3 py-2 text-gold" onClick={() => setOpen(false)}>
            Portal alumno
          </Link>
          <Link to="/admin" className="block rounded-md px-3 py-2 text-ivory/70" onClick={() => setOpen(false)}>
            Administración
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
