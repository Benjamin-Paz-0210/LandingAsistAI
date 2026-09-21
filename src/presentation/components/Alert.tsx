import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

type Props = {
  tone: "success" | "error";
  children: ReactNode;
};

export function Alert({ tone, children }: Props) {
  const isSuccess = tone === "success";

  return (
    <div
      role="status"
      className={`flex items-start gap-3 rounded-md border px-4 py-3 text-sm ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <div>{children}</div>
    </div>
  );
}
