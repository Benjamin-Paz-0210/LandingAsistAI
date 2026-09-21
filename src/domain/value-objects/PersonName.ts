import { DomainError } from "../errors/DomainError";

const NAME_PATTERN = /^[\p{L}]+(?:[ '\u00B7-][\p{L}]+)*$/u;
const DANGEROUS = /[<>{}[\]\\/;`|&$]/;

export class PersonName {
  private constructor(readonly value: string) {}

  static create(raw: string, field: "firstName" | "lastName"): PersonName {
    if (typeof raw !== "string") {
      throw new DomainError("INVALID_NAME", "El nombre no es válido.", field);
    }

    const normalized = raw.normalize("NFC").trim().replace(/\s+/g, " ");
    const label = field === "firstName" ? "nombre" : "apellido";

    if (!normalized) {
      throw new DomainError("INVALID_NAME", `El ${label} es obligatorio.`, field);
    }

    if (normalized.length < 2 || normalized.length > 80) {
      throw new DomainError(
        "INVALID_NAME",
        `El ${label} debe tener entre 2 y 80 caracteres.`,
        field,
      );
    }

    if (DANGEROUS.test(normalized) || !NAME_PATTERN.test(normalized)) {
      throw new DomainError(
        "INVALID_NAME",
        `El ${label} solo admite letras, espacios, apóstrofos y guiones.`,
        field,
      );
    }

    return new PersonName(normalized);
  }
}
