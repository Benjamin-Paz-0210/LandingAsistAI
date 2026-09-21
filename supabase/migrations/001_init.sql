-- AsistAI — esquema inicial (Postgres / Supabase)
-- Ejecutar en SQL Editor. No usa SERVICE_ROLE desde la aplicación.

create extension if not exists pgcrypto;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  created_at timestamptz not null default now(),
  constraint registrations_first_name_len check (char_length(first_name) between 2 and 80),
  constraint registrations_last_name_len check (char_length(last_name) between 2 and 80),
  constraint registrations_email_len check (char_length(email) between 6 and 254),
  constraint registrations_first_name_safe check (first_name !~ '[<>{}();=`|&$\\[\\]\\\\/]'),
  constraint registrations_last_name_safe check (last_name !~ '[<>{}();=`|&$\\[\\]\\\\/]'),
  constraint registrations_email_rfc check (
    email ~* '^[A-Za-z0-9.!#$%&''*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,63}$'
  )
);

create unique index if not exists registrations_email_lower_idx
  on public.registrations (lower(email));

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.registrations enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists registrations_public_insert on public.registrations;
create policy registrations_public_insert
  on public.registrations
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists registrations_admin_select on public.registrations;
create policy registrations_admin_select
  on public.registrations
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.admin_users a
      where a.user_id = auth.uid()
    )
  );

drop policy if exists admin_users_select_own on public.admin_users;
create policy admin_users_select_own
  on public.admin_users
  for select
  to authenticated
  using (user_id = auth.uid());

revoke all on table public.registrations from public;
revoke all on table public.admin_users from public;

grant insert on table public.registrations to anon, authenticated;
grant select on table public.registrations to authenticated;
grant select on table public.admin_users to authenticated;

-- Alta de administrador (reemplazar el correo por el usuario creado en Authentication):
-- insert into public.admin_users (user_id, email)
-- select id, email from auth.users where email = 'admin@asistai.com';
