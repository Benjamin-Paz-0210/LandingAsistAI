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

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          connectSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
      ],
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

  app.get("/", (_req, res) => {
    res.redirect(302, "http://localhost:5173");
  });

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));
  app.use("/api/registrations", registrationsRouter);
  app.use("/api/students", studentsRouter);
  app.use("/api/admin", adminRouter);
  app.use(errorHandler);

  return app;
}
