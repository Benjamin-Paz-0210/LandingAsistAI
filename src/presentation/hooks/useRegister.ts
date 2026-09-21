import { DomainError } from "../../domain/errors/DomainError";
import type { RegisterPersonInput } from "../../application/use-cases/RegisterPerson";
import type { Registration } from "../../domain/entities/Registration";
import { container } from "../di/container";
import { useCallback, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function useRegister() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegisterPersonInput, string>>>(
    {},
  );
  const [message, setMessage] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Registration | null>(null);

  const register = useCallback(async (input: RegisterPersonInput) => {
    setStatus("loading");
    setFieldErrors({});
    setMessage(null);

    try {
      const result = await container.registerPerson.execute(input);
      setConfirmation(result);
      setStatus("success");
    } catch (error) {
      if (error instanceof DomainError) {
        if (error.field) {
          setFieldErrors({ [error.field]: error.message });
        }
        setMessage(error.message);
        setStatus("error");
        return;
      }

      setMessage("No se pudo completar el registro. Inténtalo de nuevo.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setFieldErrors({});
    setMessage(null);
    setConfirmation(null);
  }, []);

  return { status, fieldErrors, message, confirmation, register, reset };
}
