import { DomainError } from "../errors/DomainError";

const ATOM = "[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+";
const DOT_ATOM = `${ATOM}(?:\\.${ATOM})*`;
const QUOTED_LOCAL =
  '"(?:\\\\[\\x20-\\x7e]|[\\x21\\x23-\\x5b\\x5d-\\x7e])+"';
const LOCAL_PART = `(?:${DOT_ATOM}|${QUOTED_LOCAL})`;
const DNS_LABEL = "[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?";
const TLD = "[A-Za-z]{2,63}";
const DOMAIN = `(?:${DNS_LABEL}\\.)+${TLD}`;
const RFC_5321_ADDR = new RegExp(`^${LOCAL_PART}@${DOMAIN}$`);

export function isRfcEmail(value: string): boolean {
  if (value.length > 254) return false;
  const at = value.lastIndexOf("@");
  if (at < 1) return false;
  const local = value.slice(0, at);
  if (local.length > 64) return false;
  return RFC_5321_ADDR.test(value);
}

export class Email {
  private constructor(readonly value: string) {}

  static create(raw: string): Email {
    if (typeof raw !== "string") {
      throw new DomainError("INVALID_EMAIL", "El correo no es válido.", "email");
    }

    const normalized = raw.trim().toLowerCase();

    if (!normalized) {
      throw new DomainError("INVALID_EMAIL", "El correo es obligatorio.", "email");
    }

    if (!isRfcEmail(normalized)) {
      throw new DomainError(
        "INVALID_EMAIL",
        "Ingresa un correo con formato RFC válido.",
        "email",
      );
    }

    return new Email(normalized);
  }
}
