"use client";

import { useEffect, useState } from "react";
import { getStoreStatus } from "@/lib/hours";

export default function ClosedBanner() {
  const [opensAt, setOpensAt] = useState<string | null>(null);

  useEffect(() => {
    const status = getStoreStatus();
    if (!status.open) setOpensAt(status.opensAt);
  }, []);

  if (!opensAt) return null;

  return (
    <div className="border-b border-yellow/30 bg-ink-raised px-4 py-2.5 text-center text-sm">
      We&apos;re closed right now — back <span className="font-semibold text-yellow">{opensAt}</span>.
      Browse the menu; ordering opens when we do.
    </div>
  );
}
