import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "gold" | "navy" | "ghost" | "danger" | "outline";
  children: ReactNode;
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  gold: "bg-gold text-navy-950 hover:bg-gold-light disabled:bg-gold/50",
  navy: "bg-navy-800 text-ivory hover:bg-navy-700 disabled:bg-navy-800/60",
  ghost:
    "border border-white/20 bg-transparent text-ivory hover:border-gold hover:text-gold disabled:opacity-50",
  danger: "bg-red-700 text-white hover:bg-red-600 disabled:bg-red-700/50",
  outline:
    "border border-navy-800/20 bg-white text-navy-900 hover:border-gold hover:text-gold-dark disabled:opacity-50",
};

export function Button({ variant = "gold", className = "", children, ...props }: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold tracking-wide transition disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
