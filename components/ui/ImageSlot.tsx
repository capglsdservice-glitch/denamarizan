"use client";

import Image from "next/image";
import { useId } from "react";
import { toneMap, type Tone } from "@/lib/tones";
import type { ImageAsset } from "@/lib/assets";

type Props = {
  asset: Pick<ImageAsset, "src" | "alt" | "caption" | "tone"> | { src: string | null; alt: string; caption: string; tone: Tone };
  className?: string;
  sizes?: string;
  priority?: boolean;
  variant?: "portrait" | "scene" | "quote";
  showHint?: boolean;
};

/**
 * Renders a real photo when `asset.src` is set, otherwise a tasteful, clearly-marked placeholder.
 * Swap images in lib/assets.ts only.
 */
export default function ImageSlot({ asset, className = "", sizes = "100vw", priority, variant = "portrait", showHint = true }: Props) {
  const uid = useId().replace(/:/g, "");
  const t = toneMap[asset.tone];

  if (asset.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={asset.src} alt={asset.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: t.bg }} role="img" aria-label={`${asset.alt} (placeholder)`}>
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`g${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={t.bg} />
            <stop offset="1" stopColor={t.mid} />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#g${uid})`} />
        <circle cx="300" cy="120" r="90" fill={t.deep} opacity="0.35" />
        <path d="M-20 420 C 80 340, 200 460, 420 360 L420 520 L-20 520 Z" fill={t.deep} opacity="0.35" />
        {variant === "portrait" && (
          <g fill={t.ink} opacity="0.16">
            <ellipse cx="200" cy="215" rx="62" ry="78" />
            <path d="M70 520 C 70 390, 130 340, 200 340 C 270 340, 330 390, 330 520 Z" />
            <path d="M128 200 C 120 120, 280 110, 274 210 C 262 160, 150 150, 128 200 Z" opacity="0.8" />
          </g>
        )}
        {variant === "quote" && (
          <text x="200" y="300" textAnchor="middle" fontFamily="Georgia, serif" fontSize="220" fill={t.ink} opacity="0.14">
            &ldquo;
          </text>
        )}
        {variant === "scene" && (
          <g fill={t.ink} opacity="0.14">
            <path d="M60 520 L60 260 Q 200 120 340 260 L340 520 Z" />
            <rect x="170" y="330" width="60" height="190" opacity="0.6" />
          </g>
        )}
      </svg>
      {showHint && (
        <span
          className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em]"
          style={{ background: "rgba(255,249,243,.85)", color: "#702D43" }}
        >
          Photo placeholder · {asset.caption}
        </span>
      )}
    </div>
  );
}
