import { DomainError } from "../errors/DomainError";

const USERNAME = /^[a-zA-Z][a-zA-Z0-9._]{3,31}$/;

export class Username {
  private constructor(readonly value: string) {}

  static create(raw: string): Username {
    if (typeof raw !== "string") {
      throw new DomainError("VALIDATION", "El usuario no es válido.", "username");
    }

    const value = raw.trim().toLowerCase();
    if (!value) {
      throw new DomainError("VALIDATION", "El usuario es obligatorio.", "username");
    }
    if (!USERNAME.test(value)) {
      throw new DomainError(
        "VALIDATION",
        "El usuario debe iniciar con letra y tener entre 4 y 32 caracteres (letras, números, punto o guion bajo).",
        "username",
      );
    }

    return new Username(value);
  }
}
