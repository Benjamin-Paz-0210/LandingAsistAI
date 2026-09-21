import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { DomainError } from "../../src/domain/errors/DomainError";
import {
  SignInStudent,
  SignOutStudent,
} from "../../src/application/use-cases/StudentSession";
import { registrations } from "./registrations";
import { requireStudent } from "../middleware/requireStudent";

export const studentsRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    code: "VALIDATION",
    message: "Demasiados intentos. Inténtalo más tarde.",
  },
});

const loginBody = z
  .object({
    username: z.string().max(32),
    password: z.string().max(128),
  })
  .strict();

studentsRouter.post("/login", loginLimiter, async (req, res, next) => {
  try {
    const parsed = loginBody.safeParse(req.body);
    if (!parsed.success) {
      throw new DomainError("VALIDATION", "La solicitud contiene campos no permitidos.");
    }
    const session = await new SignInStudent(registrations).execute(
      parsed.data.username,
      parsed.data.password,
    );
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

studentsRouter.get("/me", requireStudent, async (req, res, next) => {
  try {
    if (!req.student) {
      throw new DomainError("UNAUTHORIZED", "Sesión de alumno inválida.");
    }
    res.status(200).json(req.student);
  } catch (error) {
    next(error);
  }
});

studentsRouter.post("/logout", requireStudent, async (req, res, next) => {
  try {
    const header = req.header("authorization") ?? "";
    const token = header.replace(/^Bearer\s+/i, "");
    await new SignOutStudent(registrations).execute(token);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
