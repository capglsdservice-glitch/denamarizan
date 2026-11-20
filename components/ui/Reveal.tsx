"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const ease = [0.22, 0.7, 0.2, 1] as const;

/** Scroll-triggered fade/slide reveal. */
export function Reveal({
  children, delay = 0, y = 28, className = "", as = "div",
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "p" | "li" | "section" }) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </M>
  );
}

/** Staggered, masked line-by-line headline reveal. Lines are passed explicitly for predictable wrapping. */
export function Lines({
  lines, className = "", delay = 0, inView = true, as: Tag = "h2", italicLines = [],
}: { lines: string[]; className?: string; delay?: number; inView?: boolean; as?: "h1" | "h2" | "h3" | "p"; italicLines?: number[] }) {
  const reduce = useReducedMotion();
  const T = motion[Tag] as typeof motion.h2;
  return (
    <T className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]" aria-hidden="true">
          <motion.span
            className={`block ${italicLines.includes(i) ? "italic" : ""}`}
            initial={reduce ? false : { y: "110%" }}
            {...(inView ? { whileInView: { y: 0 }, viewport: { once: true, margin: "-60px" } } : { animate: { y: 0 } })}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </T>
  );
}
