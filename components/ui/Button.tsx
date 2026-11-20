"use client";

import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import Magnetic from "./Magnetic";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "light" | "ghost";
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
};

const variants = {
  solid: "bg-burgundy text-ivory border-burgundy hover:bg-cherry hover:border-cherry",
  outline: "bg-transparent text-burgundy border-burgundy hover:bg-burgundy hover:text-ivory",
  light: "bg-ivory text-burgundy border-ivory hover:bg-champagne hover:border-champagne",
  ghost: "bg-transparent text-ivory border-ivory/60 hover:bg-ivory hover:text-burgundy",
};

export default function Button({ href, children, variant = "solid", external, magnetic = true, className = "", arrow = true, onClick }: Props) {
  const inner = (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 rounded-full border px-7 py-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
  return magnetic ? <Magnetic>{inner}</Magnetic> : inner;
}
