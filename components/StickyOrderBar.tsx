"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/menu";

export default function StickyOrderBar() {
  const { count, subtotal } = useCart();
  if (count === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-border bg-ink/95 p-3 backdrop-blur sm:hidden">
      <Link
        href="/order"
        className="flex h-12 items-center justify-center gap-2 rounded-md bg-yellow font-display text-base text-ink"
      >
        View Order ({count}) — {formatPrice(subtotal)}
      </Link>
    </div>
  );
}
