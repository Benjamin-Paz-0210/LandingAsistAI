export function supabaseAnonKeyMismatch(url: string, anonKey: string): string | null {
  const projectRef = new URL(url).hostname.split(".")[0];
  const payload = decodeJwtPayload(anonKey);
  if (payload.ref && payload.ref !== projectRef) {
    return `VITE_SUPABASE_ANON_KEY no corresponde al proyecto ${projectRef}. Cópiala en Dashboard → Settings → API (anon public).`;
  }
  return null;
}

function decodeJwtPayload(token: string): { ref?: string } {
  const segment = token.split(".")[1];
  if (!segment) return {};

  try {
    const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(normalized);
    return JSON.parse(json) as { ref?: string };
  } catch {
    return {};
  }
}
