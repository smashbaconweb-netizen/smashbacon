// Recreation of the logo lockup: SMASH in yellow, BACON in white
// with the striped burger glyph standing in for the "O".
export function BurgerGlyph({ className = "h-[1em] w-[1em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="var(--color-yellow)" />
      <rect x="3" y="7" width="18" height="2.6" rx="1.3" fill="var(--color-ink)" />
      <rect x="3" y="11" width="18" height="2.6" rx="1.3" fill="var(--color-ink)" />
      <rect x="5" y="15" width="14" height="2.6" rx="1.3" fill="var(--color-ink)" />
    </svg>
  );
}

export default function Logo({ size = "text-2xl" }: { size?: string }) {
  return (
    <span className={`font-display leading-none ${size}`}>
      <span className="text-yellow">Smash</span>{" "}
      <span className="inline-flex items-center text-white">
        Bac
        <BurgerGlyph className="mx-[0.04em] h-[0.82em] w-[0.82em]" />n
      </span>
    </span>
  );
}
