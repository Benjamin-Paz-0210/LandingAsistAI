import { supabaseAnonKeyMismatch } from "./assertSupabasePublicConfig";

const required = ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY"] as const;

function readEnv(name: (typeof required)[number]): string {
  const value = import.meta.env[name];
  if (!value || typeof value !== "string") {
    throw new Error(`Falta la variable de entorno ${name}`);
  }
  return value;
}

function readPublicSupabaseUrl(): string {
  const value = readEnv("VITE_SUPABASE_URL");
  if (!value.startsWith("https://") || value.includes("postgres://") || value.includes("postgresql://")) {
    throw new Error(
      "VITE_SUPABASE_URL debe ser la URL https del proyecto (https://xxxx.supabase.co), no la cadena de Postgres.",
    );
  }
  return value;
}

const supabaseUrl = readPublicSupabaseUrl();
const supabaseAnonKey = readEnv("VITE_SUPABASE_ANON_KEY");
const anonKeyError = supabaseAnonKeyMismatch(supabaseUrl, supabaseAnonKey);

if (anonKeyError && import.meta.env.DEV) {
  console.error(anonKeyError);
}

export const env = {
  supabaseUrl,
  supabaseAnonKey,
  anonKeyError,
};
