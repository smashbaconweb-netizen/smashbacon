"use client";

import { useEffect, useState } from "react";
import { getStoreStatus, type StoreStatus } from "@/lib/hours";

export default function HoursBadge() {
  // Computed client-side only to avoid a server/client clock mismatch on hydration.
  const [status, setStatus] = useState<StoreStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(getStoreStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return <span className="h-6 w-28 rounded-full bg-ink-raised" />;

  return status.open ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow/40 px-3 py-1 text-xs font-semibold text-yellow">
      <span className="h-1.5 w-1.5 rounded-full bg-success" />
      Open till {status.closesAt}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-border px-3 py-1 text-xs font-semibold text-smoke">
      <span className="h-1.5 w-1.5 rounded-full bg-smoke" />
      Closed — opens {status.opensAt}
    </span>
  );
}
