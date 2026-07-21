"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { BurgerGlyph } from "./Logo";

export default function AddedToast() {
  const { lastAdded } = useCart();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!lastAdded) return;
    setVisible(true);
    const id = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(id);
  }, [lastAdded]);

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-20 left-1/2 z-50 -translate-x-1/2 transition-all duration-200 sm:bottom-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <div className="flex items-center gap-2 rounded-full border border-yellow/50 bg-ink-raised px-4 py-2 text-sm font-semibold shadow-lg shadow-black/50">
        <BurgerGlyph className="h-5 w-5" />
        Added to your order
      </div>
    </div>
  );
}
