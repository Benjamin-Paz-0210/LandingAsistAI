export type DomainErrorCode =
  | "INVALID_EMAIL"
  | "INVALID_NAME"
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "CONFLICT"
  | "NOT_FOUND"
  | "UNAVAILABLE";

export class DomainError extends Error {
  readonly code: DomainErrorCode;
  readonly field?: string;

  constructor(code: DomainErrorCode, message: string, field?: string) {
    super(message);
    this.name = "DomainError";
    this.code = code;
    this.field = field;
  }
}
