"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getOrder, type Order } from "@/lib/cart";
import { formatPrice } from "@/lib/menu";
import HexIcon from "./HexIcon";

const STEPS = ["Received", "Cooking", "Ready for pickup"] as const;

// Demo status progression driven by elapsed time.
// In production this is driven by the kitchen tablet marking orders ready.
function statusFor(order: Order): number {
  const elapsed = (Date.now() - order.createdAt) / 1000;
  if (elapsed > 300) return 2;
  if (elapsed > 30) return 1;
  return 0;
}

export default function OrderStatus({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const o = getOrder(orderId);
    setOrder(o);
    if (!o) return;
    setStep(statusFor(o));
    const id = setInterval(() => setStep(statusFor(o)), 5000);
    return () => clearInterval(id);
  }, [orderId]);

  if (order === undefined) return <div className="min-h-[50vh]" />;

  if (order === null) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-3xl">Order not found</h1>
        <p className="mt-2 text-smoke">
          We couldn&apos;t find that order on this device.
        </p>
        <Link href="/menu" className="mt-6 inline-block font-semibold text-yellow hover:underline">
          Back to the menu →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <HexIcon icon="check" size={72} />
        <p className="text-sm font-semibold uppercase tracking-wide text-smoke">
          Order placed, {order.name.split(" ")[0]}!
        </p>
        <h1 className="font-display text-6xl text-yellow">{order.id}</h1>
        <p className="text-sm text-smoke">
          Give this number at the counter. Pickup:{" "}
          <span className="font-semibold text-white">{order.pickupTime}</span>
        </p>
      </div>

      {/* Status tracker */}
      <ol className="mt-10 flex items-center justify-between">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full items-center">
              <div
                className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : i <= step ? "bg-yellow" : "bg-ink-border"}`}
              />
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold ${
                  i < step
                    ? "border-yellow bg-yellow text-ink"
                    : i === step
                      ? "border-yellow text-yellow"
                      : "border-ink-border text-smoke"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </span>
              <div
                className={`h-0.5 flex-1 ${i === STEPS.length - 1 ? "opacity-0" : i < step ? "bg-yellow" : "bg-ink-border"}`}
              />
            </div>
            <span
              className={`text-center text-xs font-semibold ${
                i === step ? (i === 2 ? "text-success" : "text-yellow") : "text-smoke"
              }`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      {/* Receipt */}
      <div className="mt-10 rounded-xl border border-ink-border bg-ink-raised p-5">
        <ul className="divide-y divide-ink-border text-sm">
          {order.lines.map((l) => (
            <li key={l.lineId} className="flex justify-between gap-3 py-2">
              <span>
                {l.qty}× {l.name}
                {Object.values(l.choices).length > 0 && (
                  <span className="text-smoke"> · {Object.values(l.choices).join(", ")}</span>
                )}
              </span>
              <span>{formatPrice(l.unitPrice * l.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-1 border-t border-ink-border pt-3 text-sm">
          <div className="flex justify-between text-smoke">
            <dt>Subtotal</dt>
            <dd>{formatPrice(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between text-smoke">
            <dt>Tax</dt>
            <dd>{formatPrice(order.tax)}</dd>
          </div>
          <div className="flex justify-between text-smoke">
            <dt>Tip</dt>
            <dd>{formatPrice(order.tip)}</dd>
          </div>
          <div className="flex justify-between pt-1 font-bold">
            <dt>{order.squareOrderId ? "Total (paid online)" : "Total (pay at counter)"}</dt>
            <dd className="text-yellow">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 space-y-3 text-center text-sm text-smoke">
        <p>
          Find us inside <span className="font-semibold text-white">Market on 8th</span> —
          41 E 8th St #114, National City.
        </p>
        <a
          href="https://maps.google.com/?q=Market+on+8th,+41+E+8th+St,+National+City,+CA+91950"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-semibold text-yellow hover:underline"
        >
          Get directions →
        </a>
      </div>
    </div>
  );
}
