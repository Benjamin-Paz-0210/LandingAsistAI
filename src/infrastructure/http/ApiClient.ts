import { DomainError } from "../../domain/errors/DomainError";

type ApiErrorBody = {
  code?: string;
  message?: string;
  field?: string;
};

export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async post<T>(path: string, body: unknown, token?: string): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }

  async patch<T>(path: string, body: unknown, token?: string): Promise<T> {
    return this.request<T>(path, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }

  async get<T>(path: string, token?: string): Promise<T> {
    return this.request<T>(path, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }

  async delete(path: string, token?: string): Promise<void> {
    await this.request<null>(path, {
      method: "DELETE",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    let response: Response;
    try {
      response = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(init.headers ?? {}),
        },
      });
    } catch {
      throw new DomainError(
        "UNAVAILABLE",
        "No hay conexión con el servidor. Confirma que la API esté en marcha.",
      );
    }

    const payload =
      response.status === 204
        ? null
        : ((await response.json().catch(() => null)) as T | ApiErrorBody | null);

    if (!response.ok) {
      const error = (payload ?? {}) as ApiErrorBody;
      const fallback =
        response.status >= 500
          ? "El servidor no está disponible. Vuelve a intentar en unos segundos."
          : `No se pudo completar la solicitud (${response.status}).`;
      throw new DomainError(
        this.mapStatus(response.status, error.code),
        error.message ?? fallback,
        error.field,
      );
    }

    return payload as T;
  }

  private mapStatus(status: number, code?: string): DomainError["code"] {
    if (code === "CONFLICT" || status === 409) return "CONFLICT";
    if (code === "INVALID_EMAIL") return "INVALID_EMAIL";
    if (code === "INVALID_NAME") return "INVALID_NAME";
    if (status === 401) return "UNAUTHORIZED";
    if (status === 403) return "FORBIDDEN";
    if (status === 404) return "NOT_FOUND";
    if (status === 400) return "VALIDATION";
    return "UNAVAILABLE";
  }
}
