import type { Request, Response, NextFunction } from "express";
import { DomainError } from "../../src/domain/errors/DomainError";
import { createAnonClient } from "../infrastructure/supabaseClient";
import { isAdminUser } from "../infrastructure/PostgresRegistrationRepository";

const BEARER = /^Bearer\s+(\S+)$/i;

export async function requireAdmin(req: Request, _res: Response, next: NextFunction): Promise<void> {
  try {
    const header = req.header("authorization") ?? "";
    const match = BEARER.exec(header);
    if (!match) {
      throw new DomainError("UNAUTHORIZED", "Token de acceso ausente o mal formado.");
    }

    const token = match[1].trim();
    const { data: userData, error: userError } = await createAnonClient().auth.getUser(token);

    if (userError || !userData.user) {
      throw new DomainError("UNAUTHORIZED", "Sesión inválida.");
    }

    const admin = await isAdminUser(userData.user.id);
    if (!admin) {
      throw new DomainError("FORBIDDEN", "No tienes permisos de administración.");
    }

    req.adminToken = token;
    next();
  } catch (error) {
    next(error);
  }
}

declare global {
  namespace Express {
    interface Request {
      adminToken?: string;
    }
  }
}
