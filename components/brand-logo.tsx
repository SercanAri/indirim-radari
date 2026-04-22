"use client";

import { useState } from "react";

interface BrandLogoProps {
  name: string;
  logoUrl: string;
  size?: number;
  className?: string;
  /** Subtle gradient ring for premium feel */
  premium?: boolean;
  /** Padding around logo image (px). Defaults to ~16% of size */
  padding?: number;
  /** Border radius. Defaults to size/3 (rounded-2xl feel) */
  radius?: number;
  /** Brand accent color — used as tile background when logo fails */
  brandColor?: string;
}

export default function BrandLogo({
  name,
  logoUrl,
  size = 40,
  className = "",
  premium = false,
  padding,
  radius,
  brandColor,
}: BrandLogoProps) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(/[\s&-]+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const ringClass = premium
    ? "ring-2 ring-[var(--color-primary)]/20 ring-offset-2 ring-offset-[var(--background)]"
    : "ring-1 ring-black/5";

  const pad = padding ?? Math.max(4, Math.round(size * 0.16));
  const rad = radius ?? Math.max(8, Math.round(size / 3));

  const tileBg = failed && brandColor ? { background: brandColor } : undefined;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_6px_16px_-8px_rgba(0,0,0,0.12)] ${ringClass} ${className}`}
      style={{ width: size, height: size, borderRadius: rad, ...tileBg }}
    >
      {!failed ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={logoUrl}
          alt={name}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
          style={{ padding: pad }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center font-black ${
            brandColor
              ? "text-white"
              : "bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-accent)]/15 text-gray-700"
          }`}
          style={{ fontSize: Math.max(10, Math.round(size * 0.38)) }}
          aria-hidden="true"
        >
          {initials}
        </span>
      )}
    </div>
  );
}
