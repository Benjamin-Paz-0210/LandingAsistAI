import path from "node:path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "./openapi";
import { registrationsRouter } from "./routes/registrations";
import { adminRouter } from "./routes/admin";
import { studentsRouter } from "./routes/students";
import { errorHandler } from "./middleware/errorHandler";
import { serverEnv } from "./env";

export function createApp() {
  const app = express();
  const distDir = path.join(serverEnv.rootDir, "dist");
  const supabaseWs = serverEnv.supabaseUrl.replace(/^https:/, "wss:");

  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'", serverEnv.supabaseUrl, supabaseWs],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https://images.unsplash.com"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );
  app.use(
    cors({
      origin: serverEnv.corsOrigins,
    }),
  );
  app.use(express.json({ limit: "10kb" }));

  app.use(
    "/api",
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 120,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
  app.use("/api/registrations", registrationsRouter);
  app.use("/api/students", studentsRouter);
  app.use("/api/admin", adminRouter);

  if (serverEnv.isProduction) {
    app.use(express.static(distDir));
    app.use((req, res, next) => {
      if (req.path.startsWith("/api")) {
        next();
        return;
      }
      if (req.method !== "GET" && req.method !== "HEAD") {
        next();
        return;
      }
      res.sendFile(path.join(distDir, "index.html"));
    });
  } else {
    app.get("/", (_req, res) => {
      res.redirect(302, "http://localhost:5173");
    });
  }

  app.use(errorHandler);

  return app;
}
