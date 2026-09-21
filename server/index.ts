import { createApp } from "./app";
import { serverEnv } from "./env";
import { pgPool } from "./infrastructure/pgPool";

const app = createApp();
let server: ReturnType<typeof app.listen> | undefined;

function start(attempt = 1): void {
  server = app.listen(serverEnv.port, serverEnv.host, () => {
    console.log(`AsistAI en http://${serverEnv.host}:${serverEnv.port}`);
    console.log(`Swagger UI en http://${serverEnv.host}:${serverEnv.port}/api/docs`);
  });

  server.on("error", (error: NodeJS.ErrnoException) => {
    if (error.code === "EADDRINUSE" && attempt < 10) {
      console.error(`El puerto ${serverEnv.port} está ocupado. Reintento ${attempt}/10…`);
      setTimeout(() => start(attempt + 1), 700);
      return;
    }
    if (error.code === "EADDRINUSE") {
      console.error(
        `El puerto ${serverEnv.port} ya está en uso. Cierra la otra instancia de npm run dev e inténtalo de nuevo.`,
      );
      process.exit(1);
    }
    throw error;
  });
}

start();

function shutdown() {
  server?.close(() => {
    void pgPool.end().finally(() => process.exit(0));
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
