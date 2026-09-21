import type { Request, Response, NextFunction } from "express";
import { DomainError } from "../../src/domain/errors/DomainError";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof SyntaxError) {
    res.status(400).json({
      code: "VALIDATION",
      message: "El cuerpo de la solicitud no es JSON válido.",
    });
    return;
  }

  if (error instanceof DomainError) {
    const status =
      error.code === "UNAUTHORIZED"
        ? 401
        : error.code === "FORBIDDEN"
          ? 403
          : error.code === "CONFLICT"
            ? 409
            : error.code === "NOT_FOUND"
              ? 404
              : error.code === "UNAVAILABLE"
                ? 503
                : 400;

    res.status(status).json({
      code: error.code,
      message: error.message,
      field: error.field,
    });
    return;
  }

  res.status(500).json({
    code: "UNAVAILABLE",
    message: "Error interno del servidor.",
  });
}
