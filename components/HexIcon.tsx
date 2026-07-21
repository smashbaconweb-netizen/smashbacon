// Yellow hexagon badges with white line icons — the storefront's secondary mark.
const PATHS: Record<string, React.ReactNode> = {
  burger: (
    <>
      <path d="M5 10c0-3.5 3-6 7-6s7 2.5 7 6H5Z" />
      <line x1="4" y1="13" x2="20" y2="13" />
      <path d="M5 16h14c0 2-1.5 3.5-3.5 3.5h-7C6.5 19.5 5 18 5 16Z" />
    </>
  ),
  fries: (
    <>
      <path d="M7 10 6 4m4 6V3m4 7 1-6m2 6 1.5-4" />
      <path d="M5 10h14l-1.5 10h-11L5 10Z" />
    </>
  ),
  shake: (
    <>
      <path d="M6 8h12l-1.5 13h-9L6 8Z" />
      <line x1="5" y1="8" x2="19" y2="8" />
      <line x1="13" y1="8" x2="15" y2="2" />
    </>
  ),
  hotdog: (
    <>
      <path d="M3 12c0-2 1.5-3.5 3.5-3.5h11c2 0 3.5 1.5 3.5 3.5s-1.5 3.5-3.5 3.5h-11C4.5 15.5 3 14 3 12Z" />
      <path d="M6 12h12" strokeDasharray="2.5 2.5" />
    </>
  ),
  wing: (
    <>
      <path d="M4 14c2-6 6-9 11-9 3 0 5 2 5 4.5 0 4-4 6.5-9 6.5-2 0-3 .5-4 2l-1 2-2-6Z" />
    </>
  ),
  check: <path d="m5 12.5 5 5L19 7" />,
  bag: (
    <>
      <path d="M5 8h14l-1 13H6L5 8Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export default function HexIcon({
  icon,
  size = 56,
  className = "",
}: {
  icon: keyof typeof PATHS | string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`hex inline-flex shrink-0 items-center justify-center bg-yellow ${className}`}
      style={{ width: size, height: size * 1.1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.52}
        height={size * 0.52}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {PATHS[icon] ?? PATHS.burger}
      </svg>
    </span>
  );
}
