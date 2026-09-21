import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");
dotenv.config({ path: envPath });

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? "admin@test.com").trim().toLowerCase();

function generatePassword(): string {
  return crypto.randomBytes(18).toString("base64url");
}

function readAdminPassword(): { password: string; generated: boolean } {
  const current = process.env.ADMIN_PASSWORD?.trim();
  if (current && current.length >= 8) {
    return { password: current, generated: false };
  }
  return { password: generatePassword(), generated: true };
}

function upsertEnvValue(key: string, value: string): void {
  const source = fs.readFileSync(envPath, "utf8");
  const line = `${key}=${value}`;
  const next = source.includes(`${key}=`)
    ? source.replace(new RegExp(`^${key}=.*$`, "m"), line)
    : `${source.trimEnd()}\n${line}\n`;
  fs.writeFileSync(envPath, next, "utf8");
}

async function tableColumns(client: pg.Client, schema: string, table: string): Promise<Set<string>> {
  const result = await client.query<{ column_name: string }>(
    `select column_name
     from information_schema.columns
     where table_schema = $1 and table_name = $2`,
    [schema, table],
  );
  return new Set(result.rows.map((row) => row.column_name));
}

async function recoverAnonKey(client: pg.Client, projectRef: string): Promise<string | null> {
  const queries = [
    `select decrypted_secret as secret
     from vault.decrypted_secrets
     where name ilike '%anon%'
     limit 1`,
    `select decrypted_secret as secret
     from vault.decrypted_secrets
     where name ilike '%jwt%'
     limit 1`,
    `select current_setting('app.settings.jwt_secret', true) as secret`,
  ];

  for (const sql of queries) {
    try {
      const result = await client.query<{ secret: string | null }>(sql);
      const secret = result.rows[0]?.secret;
      if (secret && secret.length > 16) {
        if (secret.startsWith("eyJ")) {
          return secret;
        }
        return signAnonJwt(secret, projectRef);
      }
    } catch {
      /* el rol de conexión puede no tener acceso a vault */
    }
  }

  return null;
}

function signAnonJwt(secret: string, ref: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(
    JSON.stringify({
      iss: "supabase",
      ref,
      role: "anon",
      iat: now,
      exp: now + 60 * 60 * 24 * 365 * 10,
    }),
  ).toString("base64url");
  const data = `${header}.${payload}`;
  const signature = crypto.createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${signature}`;
}

function projectRefFromDatabaseUrl(databaseUrl: string): string {
  const user = new URL(databaseUrl).username;
  const [, ref] = user.split(".");
  return ref ?? "unknown";
}

async function seedAdmin(client: pg.Client, password: string): Promise<string> {
  const userColumns = await tableColumns(client, "auth", "users");
  const existing = await client.query<{ id: string }>(
    "select id from auth.users where lower(email) = $1 limit 1",
    [ADMIN_EMAIL],
  );

  const hashSql = "extensions.crypt($1, extensions.gen_salt('bf', 12))";

  if (existing.rows[0]) {
    await client.query(
      `update auth.users
       set encrypted_password = ${hashSql},
           email_confirmed_at = coalesce(email_confirmed_at, now()),
           updated_at = now()
       where id = $2`,
      [password, existing.rows[0].id],
    );
    await client.query(
      `insert into public.admin_users (user_id, email)
       values ($1, $2)
       on conflict (user_id) do update set email = excluded.email`,
      [existing.rows[0].id, ADMIN_EMAIL],
    );
    return existing.rows[0].id;
  }

  const id = crypto.randomUUID();
  const fields = ["instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "created_at", "updated_at"];
  const values: string[] = [
    "'00000000-0000-0000-0000-000000000000'",
    "$2",
    "'authenticated'",
    "'authenticated'",
    "$3",
    hashSql,
    "now()",
    "now()",
    "now()",
  ];

  if (userColumns.has("raw_app_meta_data")) {
    fields.push("raw_app_meta_data");
    values.push(`'{"provider":"email","providers":["email"]}'::jsonb`);
  }
  if (userColumns.has("raw_user_meta_data")) {
    fields.push("raw_user_meta_data");
    values.push(`'{}'::jsonb`);
  }
  if (userColumns.has("is_sso_user")) {
    fields.push("is_sso_user");
    values.push("false");
  }
  if (userColumns.has("is_anonymous")) {
    fields.push("is_anonymous");
    values.push("false");
  }
  if (userColumns.has("confirmation_token")) {
    fields.push("confirmation_token");
    values.push("''");
  }
  if (userColumns.has("email_change")) {
    fields.push("email_change");
    values.push("''");
  }
  if (userColumns.has("email_change_token_new")) {
    fields.push("email_change_token_new");
    values.push("''");
  }
  if (userColumns.has("recovery_token")) {
    fields.push("recovery_token");
    values.push("''");
  }

  await client.query(
    `insert into auth.users (${fields.join(", ")}) values (${values.join(", ")})`,
    [password, id, ADMIN_EMAIL],
  );

  const identityColumns = await tableColumns(client, "auth", "identities");
  const identityData = { sub: id, email: ADMIN_EMAIL };
  const identityFields: string[] = [];
  const identityValues: string[] = [];
  const identityParams: unknown[] = [];

  const addIdentity = (column: string, sqlExpr: string, param?: unknown) => {
    if (!identityColumns.has(column)) return;
    identityFields.push(column);
    if (param !== undefined) {
      identityParams.push(param);
      identityValues.push(`$${identityParams.length}`);
    } else {
      identityValues.push(sqlExpr);
    }
  };

  addIdentity("id", "", id);
  addIdentity("user_id", "", id);
  addIdentity("provider_id", "", id);
  addIdentity("identity_data", "", identityData);
  addIdentity("provider", "", "email");
  addIdentity("last_sign_in_at", "now()");
  addIdentity("created_at", "now()");
  addIdentity("updated_at", "now()");

  if (identityFields.length > 0) {
    await client.query(
      `insert into auth.identities (${identityFields.join(", ")}) values (${identityValues.join(", ")})`,
      identityParams,
    );
  }

  await client.query(
    `insert into public.admin_users (user_id, email)
     values ($1, $2)
     on conflict (user_id) do update set email = excluded.email`,
    [id, ADMIN_EMAIL],
  );

  return id;
}

async function main(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl || !databaseUrl.startsWith("postgres")) {
    throw new Error("Falta DATABASE_URL en .env (cadena de Postgres, sin prefijo VITE_).");
  }

  const { password, generated } = readAdminPassword();
  if (generated) {
    upsertEnvValue("ADMIN_PASSWORD", password);
  }

  const dir = path.join(root, "supabase", "migrations");
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".sql"))
    .sort();
  const connectionString = databaseUrl.replace(/[?&]sslmode=[^&]+/g, "");
  const client = new pg.Client({
    connectionString,
    ssl: { rejectUnauthorized: false },
  });

  await client.connect();
  try {
    await client.query("begin");
    for (const file of files) {
      await client.query(fs.readFileSync(path.join(dir, file), "utf8"));
    }
    const adminId = await seedAdmin(client, password);
    await client.query("commit");

    const ref = projectRefFromDatabaseUrl(databaseUrl);
    const recovered = await recoverAnonKey(client, ref);
    if (recovered) {
      upsertEnvValue("VITE_SUPABASE_ANON_KEY", recovered);
      console.log("VITE_SUPABASE_ANON_KEY actualizada desde el proyecto.");
    }

    console.log("Migraciones aplicadas.");
    console.log(`Admin creado: ${ADMIN_EMAIL}`);
    console.log(`Admin id: ${adminId}`);
    console.log("Contraseña hasheada con bcrypt (coste 12) en auth.users.encrypted_password.");
    console.log("La contraseña en claro solo está en .env como ADMIN_PASSWORD (archivo local).");
  } catch (error) {
    await client.query("rollback").catch(() => undefined);
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Error desconocido";
  console.error(`No se pudo preparar la base de datos: ${message}`);
  process.exit(1);
});
