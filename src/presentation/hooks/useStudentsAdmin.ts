import { useCallback, useEffect, useState } from "react";
import { DomainError } from "../../domain/errors/DomainError";
import type { Registration, UpdateRegistrationInput } from "../../domain/entities/Registration";
import type { RegisterPersonInput } from "../../application/use-cases/RegisterPerson";
import { container } from "../di/container";

export function useStudentsAdmin(enabled: boolean) {
  const [items, setItems] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      setItems(await container.listRegistrations.execute());
    } catch (caught) {
      setError(caught instanceof DomainError ? caught.message : "No se pudieron cargar los alumnos.");
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const create = useCallback(async (input: RegisterPersonInput) => {
    await container.registerPerson.execute(input);
    await reload();
  }, [reload]);

  const update = useCallback(async (id: string, input: UpdateRegistrationInput) => {
    await container.updateRegistration.execute(id, input);
    await reload();
  }, [reload]);

  const remove = useCallback(async (id: string) => {
    await container.deleteRegistration.execute(id);
    await reload();
  }, [reload]);

  return { items, loading, error, reload, create, update, remove };
}
