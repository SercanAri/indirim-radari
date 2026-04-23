import { ShieldCheck } from "lucide-react";

export default function LegalTLDR({ children }: { children: React.ReactNode }) {
  return (
    <aside
      className="my-6 flex items-start gap-3 rounded-2xl border border-[var(--color-success)]/30 bg-[var(--color-success)]/8 p-4"
      aria-label="Özet"
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-success)]/15 text-[var(--color-success)]">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-success)]">
          Kısaca
        </p>
        <p className="mt-1 text-sm font-semibold leading-snug text-[var(--foreground)]">
          {children}
        </p>
      </div>
    </aside>
  );
}
