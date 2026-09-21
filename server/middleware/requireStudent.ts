import type { Request, Response, NextFunction } from "express";
import { DomainError } from "../../src/domain/errors/DomainError";
import { PostgresRegistrationRepository } from "../infrastructure/PostgresRegistrationRepository";

const BEARER = /^Bearer\s+(\S+)$/i;
const students = new PostgresRegistrationRepository();

export async function requireStudent(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const header = req.header("authorization") ?? "";
    const match = BEARER.exec(header.trim());
    const token = match?.[1];
    if (!token) {
      throw new DomainError("UNAUTHORIZED", "Token de alumno ausente.");
    }
    const student = await students.profileByToken(token);
    req.student = student;
    next();
  } catch (error) {
    next(error);
  }
}

declare global {
  namespace Express {
    interface Request {
      student?: import("../../src/domain/entities/Registration").Registration;
    }
  }
}
