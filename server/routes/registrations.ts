import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { RegisterPerson } from "../../src/application/use-cases/RegisterPerson";
import { DomainError } from "../../src/domain/errors/DomainError";
import { PersonName } from "../../src/domain/value-objects/PersonName";
import { Email } from "../../src/domain/value-objects/Email";
import { Username } from "../../src/domain/value-objects/Username";
import { Password } from "../../src/domain/value-objects/Password";
import { CareerCode } from "../../src/domain/value-objects/CareerCode";
import { PostgresRegistrationRepository } from "../infrastructure/PostgresRegistrationRepository";
import { requireAdmin } from "../middleware/requireAdmin";

export const registrationsRouter = Router();
export const registrations = new PostgresRegistrationRepository();

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    code: "VALIDATION",
    message: "Demasiados intentos. Inténtalo más tarde.",
  },
});

const registerBody = z
  .object({
    firstName: z.string().max(80),
    lastName: z.string().max(80),
    email: z.string().max(254),
    username: z.string().max(32),
    password: z.string().max(128),
    careerCode: z.string().max(80),
  })
  .strict();

const updateBody = z
  .object({
    firstName: z.string().max(80),
    lastName: z.string().max(80),
    email: z.string().max(254),
    username: z.string().max(32),
    careerCode: z.string().max(80),
    password: z.string().max(128).optional(),
  })
  .strict();

registrationsRouter.post("/", registerLimiter, async (req, res, next) => {
  try {
    const parsed = registerBody.safeParse(req.body);
    if (!parsed.success) {
      throw new DomainError("VALIDATION", "La solicitud contiene campos no permitidos.");
    }
    const registration = await new RegisterPerson(registrations).execute(parsed.data);
    res.status(201).json(registration);
  } catch (error) {
    next(error);
  }
});

registrationsRouter.get("/", requireAdmin, async (_req, res, next) => {
  try {
    res.status(200).json(await registrations.list());
  } catch (error) {
    next(error);
  }
});

registrationsRouter.patch("/:id", requireAdmin, async (req, res, next) => {
  try {
    const parsed = updateBody.safeParse(req.body);
    if (!parsed.success) {
      throw new DomainError("VALIDATION", "La solicitud contiene campos no permitidos.");
    }
    const payload = {
      firstName: PersonName.create(parsed.data.firstName, "firstName").value,
      lastName: PersonName.create(parsed.data.lastName, "lastName").value,
      email: Email.create(parsed.data.email).value,
      username: Username.create(parsed.data.username).value,
      careerCode: CareerCode.create(parsed.data.careerCode).value,
      password: parsed.data.password ? Password.create(parsed.data.password).value : undefined,
    };
    const updated = await registrations.update(req.params.id, payload);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

registrationsRouter.delete("/:id", requireAdmin, async (req, res, next) => {
  try {
    await registrations.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
