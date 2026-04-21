import Image from "next/image";

interface BrandLogoProps {
  name: string;
  logoUrl: string;
  size?: number;
  className?: string;
}

export default function BrandLogo({ name, logoUrl, size = 40, className = "" }: BrandLogoProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={logoUrl}
        alt={name}
        width={size}
        height={size}
        className="object-contain p-1.5"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = "none";
          const fallback = target.nextSibling as HTMLElement | null;
          if (fallback) fallback.style.display = "flex";
        }}
        unoptimized
      />
      <span
        className="absolute inset-0 hidden items-center justify-center text-xs font-bold text-gray-600"
        style={{ background: "#f4f4f5" }}
      >
        {initials}
      </span>
    </div>
  );
}
