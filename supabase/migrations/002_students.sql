-- Credenciales de alumno (hash bcrypt) y sesiones opacas.

alter table public.registrations
  add column if not exists username text,
  add column if not exists password_hash text,
  add column if not exists career_code text,
  add column if not exists updated_at timestamptz not null default now();

create unique index if not exists registrations_username_lower_idx
  on public.registrations (lower(username))
  where username is not null;

create table if not exists public.student_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.registrations (id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists student_sessions_student_idx
  on public.student_sessions (student_id);

alter table public.student_sessions enable row level security;
