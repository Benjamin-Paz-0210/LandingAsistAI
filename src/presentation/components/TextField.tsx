import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({ label, error, id, className = "", ...props }: Props) {
  const fieldId = id ?? props.name;

  return (
    <label className="block" htmlFor={fieldId}>
      <span className="mb-1.5 block text-sm font-medium text-navy-800">{label}</span>
      <input
        id={fieldId}
        className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-navy-900 shadow-sm transition placeholder:text-slate-400 ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-200 focus:border-gold"
        } ${className}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${fieldId}-error`} className="mt-1 block text-xs text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}
