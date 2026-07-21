"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import HoursBadge from "./HoursBadge";
import { useCart } from "@/lib/cart";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/gift-cards", label: "Gift Cards" },
  { href: "/our-story", label: "Our Story" },
  { href: "/rewards", label: "Rewards" },
];

export default function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-border bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" aria-label="Smash Bacon home" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold lg:flex">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`uppercase transition-colors hover:text-yellow ${
                pathname === l.href ? "text-yellow" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <span className="hidden xl:inline-flex">
            <HoursBadge />
          </span>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={count > 0 ? "/order" : "/menu"}
            className="relative inline-flex h-10 items-center rounded-md bg-yellow px-4 font-display text-sm text-ink transition-colors hover:bg-yellow-hover"
          >
            {count > 0 ? "View Order" : "Order Pickup"}
            {count > 0 && (
              <span
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-ink bg-white text-xs font-bold text-ink"
                aria-label={`${count} items in order`}
              >
                {count}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-ink-border lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M5 5l14 14M19 5L5 19" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink-border bg-ink px-4 pb-5 pt-2 lg:hidden">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block border-b border-ink-border/60 py-3.5 font-display text-lg uppercase ${
                pathname === l.href ? "text-yellow" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-4">
            <HoursBadge />
          </div>
        </nav>
      )}
    </header>
  );
}
