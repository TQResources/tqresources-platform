import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const variantClass =
    variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <a
      href={href}
      className={`${variantClass} inline-flex min-h-12 items-center justify-center rounded-sm px-6 py-3 font-medium ${className}`}
    >
      {children}
    </a>
  );
}