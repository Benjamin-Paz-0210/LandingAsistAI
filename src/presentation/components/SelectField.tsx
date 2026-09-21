import type { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
};

export function SelectField({ label, error, id, options, className = "", ...props }: Props) {
  const fieldId = id ?? props.name;

  return (
    <label className="block" htmlFor={fieldId}>
      <span className="mb-1.5 block text-sm font-medium text-navy-800">{label}</span>
      <select
        id={fieldId}
        className={`w-full rounded-md border bg-white px-3 py-2.5 text-sm text-navy-900 shadow-sm ${
          error ? "border-red-500" : "border-slate-200 focus:border-gold"
        } ${className}`}
        aria-invalid={Boolean(error)}
        {...props}
      >
        <option value="">Selecciona una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
