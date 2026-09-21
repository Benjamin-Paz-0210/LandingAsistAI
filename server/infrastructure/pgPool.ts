import pg from "pg";
import { serverEnv } from "../env";

const connectionString = serverEnv.databaseUrl.replace(/[?&]sslmode=[^&]+/g, "");

export const pgPool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 5,
});
