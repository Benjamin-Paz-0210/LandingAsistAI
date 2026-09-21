import { DomainError } from "../errors/DomainError";

export class Password {
  private constructor(readonly value: string) {}

  static create(raw: string, field = "password"): Password {
    if (typeof raw !== "string") {
      throw new DomainError("VALIDATION", "La contraseña no es válida.", field);
    }
    if (raw.length < 8 || raw.length > 128) {
      throw new DomainError(
        "VALIDATION",
        "La contraseña debe tener entre 8 y 128 caracteres.",
        field,
      );
    }
    if (/\s/.test(raw)) {
      throw new DomainError("VALIDATION", "La contraseña no debe contener espacios.", field);
    }
    return new Password(raw);
  }
}
