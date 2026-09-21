import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { serverEnv } from "../env";

export function createAnonClient(): SupabaseClient {
  return createClient(serverEnv.supabaseUrl, serverEnv.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
