import { useCallback, useEffect, useState } from "react";
import { DomainError } from "../../domain/errors/DomainError";
import type { Registration } from "../../domain/entities/Registration";
import { container } from "../di/container";

export function useRegistrations(enabled: boolean) {
  const [items, setItems] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      const result = await container.listRegistrations.execute();
      setItems(result);
    } catch (caught) {
      setError(
        caught instanceof DomainError
          ? caught.message
          : "No se pudieron cargar los registros.",
      );
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { items, loading, error, reload };
}
