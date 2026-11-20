"use client";

import { Heart } from "lucide-react";

/** A single floating heart. Pure CSS animation => cheap on mobile, disabled by reduced motion. */
export function FloatingHeart({ className = "", size = 22, delay = 0, rotate = 0, fill = true }: { className?: string; size?: number; delay?: number; rotate?: number; fill?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute animate-float ${className}`}
      style={{ animationDelay: `${delay}s`, ["--r" as string]: `${rotate}deg` }}
    >
      <Heart size={size} strokeWidth={1.4} fill={fill ? "currentColor" : "none"} />
    </span>
  );
}

/** Circular rotating text badge. */
export function RotatingBadge({ text, className = "" }: { text: string; className?: string }) {
  const id = "badge-path";
  return (
    <div className={`relative h-28 w-28 sm:h-32 sm:w-32 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text fontSize="17" letterSpacing="5.2" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="500">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <Heart size={26} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-cherry" fill="currentColor" strokeWidth={0} />
    </div>
  );
}
