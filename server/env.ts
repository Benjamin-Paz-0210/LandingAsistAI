import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { supabaseAnonKeyMismatch } from "../src/infrastructure/config/assertSupabasePublicConfig";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(root, ".env") });

function required(name: "VITE_SUPABASE_URL" | "VITE_SUPABASE_ANON_KEY"): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta ${name} en el archivo .env`);
  }
  return value;
}

function readPublicSupabaseUrl(): string {
  const value = required("VITE_SUPABASE_URL");
  if (!value.startsWith("https://") || value.includes("postgres://") || value.includes("postgresql://")) {
    throw new Error(
      "VITE_SUPABASE_URL debe ser la URL https del proyecto (https://xxxx.supabase.co), no la cadena de Postgres.",
    );
  }
  return value;
}

const supabaseUrl = readPublicSupabaseUrl();
const supabaseAnonKey = required("VITE_SUPABASE_ANON_KEY");
const databaseUrl = process.env.DATABASE_URL;
const anonKeyError = supabaseAnonKeyMismatch(supabaseUrl, supabaseAnonKey);

if (!databaseUrl || !databaseUrl.startsWith("postgres")) {
  throw new Error("Falta DATABASE_URL en .env (cadena de Postgres, sin prefijo VITE_).");
}

if (anonKeyError) {
  console.error(anonKeyError);
}

export const serverEnv = {
  port: Number(process.env.PORT ?? 3001),
  supabaseUrl,
  supabaseAnonKey,
  databaseUrl,
  anonKeyError,
};
