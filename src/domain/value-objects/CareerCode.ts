import { DomainError } from "../errors/DomainError";
import { CAREER_CODES } from "../catalog/unas";

export class CareerCode {
  private constructor(readonly value: string) {}

  static create(raw: string): CareerCode {
    if (typeof raw !== "string" || !CAREER_CODES.includes(raw)) {
      throw new DomainError("VALIDATION", "Selecciona una carrera válida.", "careerCode");
    }
    return new CareerCode(raw);
  }
}
