"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCart, saveOrder, persistOrder } from "@/lib/cart";
import { formatPrice, TAX_RATE } from "@/lib/menu";
import { getPickupSlots, getStoreStatus } from "@/lib/hours";
import HexIcon from "./HexIcon";
import SquareCard, { SQUARE_APP_ID, SQUARE_LOCATION_ID } from "./SquareCard";

const TIP_PRESETS = [0, 0.1, 0.15, 0.2];
const SQUARE_ENABLED = Boolean(SQUARE_APP_ID && SQUARE_LOCATION_ID);

export default function Checkout() {
  const router = useRouter();
  const { lines, updateQty, removeLine, clear, subtotal, count } = useCart();

  const [slots, setSlots] = useState<string[]>([]);
  const [storeOpen, setStoreOpen] = useState<boolean | null>(null);
  const [pickupTime, setPickupTime] = useState("ASAP");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tipRate, setTipRate] = useState(0.15);
  const [error, setError] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [placing, setPlacing] = useState(false);
  const tokenizeRef = useRef<(() => Promise<string>) | null>(null);

  useEffect(() => {
    setSlots(getPickupSlots());
    setStoreOpen(getStoreStatus().open);
  }, []);

  const onCardReady = useCallback((tokenize: () => Promise<string>) => {
    tokenizeRef.current = tokenize;
  }, []);

  const tax = subtotal * TAX_RATE;
  const tip = subtotal * tipRate;
  const total = subtotal + tax + tip;

  const placeOrder = async () => {
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setError("Enter your name and a 10-digit mobile number so we can text you when it's ready.");
      return;
    }
    setError("");
    setPlacing(true);
    try {
      if (SQUARE_ENABLED) {
        // Paid online through Square — the order lands on the stall's Square POS.
        if (!tokenizeRef.current) {
          throw new Error("The payment form is still loading — one moment.");
        }
        const sourceId = await tokenizeRef.current();
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lines: lines.map((l) => ({
              itemId: l.itemId,
              qty: l.qty,
              choices: l.choices,
              notes: l.notes,
            })),
            sourceId,
            name: name.trim(),
            phone: phone.trim(),
            pickupTime,
            tipRate,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Payment failed.");
        const order = persistOrder({
          id: data.id,
          createdAt: Date.now(),
          lines,
          subtotal: data.subtotal,
          tax: data.tax,
          tip: data.tip,
          total: data.total,
          pickupTime,
          name: name.trim(),
          phone: phone.trim(),
          squareOrderId: data.squareOrderId,
        });
        clear();
        router.push(`/order/${order.id}`);
      } else {
        // No payment configured yet — order recorded, paid at the counter.
        const order = saveOrder({
          lines,
          subtotal,
          tip,
          pickupTime,
          name: name.trim(),
          phone: phone.trim(),
        });
        clear();
        router.push(`/order/${order.id}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setPlacing(false);
    }
  };

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 px-4 py-24 text-center">
        <HexIcon icon="bag" size={64} />
        <h1 className="font-display text-3xl">Your order is empty</h1>
        <p className="text-smoke">Hungry? The grill is hot.</p>
        <Link
          href="/menu"
          className="inline-flex h-12 items-center rounded-md bg-yellow px-6 font-display text-lg text-ink hover:bg-yellow-hover"
        >
          Browse the Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-4xl">
        Your <span className="text-yellow">Pickup</span> Order
      </h1>

      {/* Cart lines */}
      <ul className="mt-6 divide-y divide-ink-border rounded-xl border border-ink-border bg-ink-raised">
        {lines.map((l) => (
          <li key={l.lineId} className="flex items-center gap-4 p-4">
            {l.image ? (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-ink">
                <Image src={l.image} alt="" fill className="object-cover" sizes="64px" />
              </div>
            ) : (
              <HexIcon icon="burger" size={44} />
            )}
            <div className="min-w-0 flex-1">
              <p className="font-display">{l.name}</p>
              {Object.entries(l.choices).map(([g, c]) => (
                <p key={g} className="text-xs text-smoke">
                  {g}: {c}
                </p>
              ))}
              {l.notes && <p className="text-xs italic text-smoke">“{l.notes}”</p>}
            </div>
            <div className="flex items-center rounded-md border border-ink-border">
              <button
                type="button"
                onClick={() => updateQty(l.lineId, l.qty - 1)}
                className="h-11 w-11 hover:text-yellow"
                aria-label={`Decrease ${l.name}`}
              >
                −
              </button>
              <span className="w-7 text-center text-sm font-semibold">{l.qty}</span>
              <button
                type="button"
                onClick={() => updateQty(l.lineId, l.qty + 1)}
                className="h-11 w-11 hover:text-yellow"
                aria-label={`Increase ${l.name}`}
              >
                +
              </button>
            </div>
            <span className="w-16 text-right font-bold text-yellow">
              {formatPrice(l.unitPrice * l.qty)}
            </span>
            <button
              type="button"
              onClick={() => removeLine(l.lineId)}
              className="flex h-11 w-11 items-center justify-center text-smoke hover:text-danger"
              aria-label={`Remove ${l.name}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {/* Pickup details */}
        <div className="space-y-5">
          <div>
            <h2 className="font-display text-xl">Pickup Time</h2>
            {storeOpen === false ? (
              <p className="mt-2 rounded-md border border-yellow/30 bg-ink-raised px-3 py-2 text-sm">
                We&apos;re closed right now — ordering opens with the kitchen.
              </p>
            ) : (
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="mt-2 w-full rounded-md border border-ink-border bg-ink-raised px-3 py-2.5 text-sm outline-none focus:border-yellow"
                aria-label="Pickup time"
              >
                <option value="ASAP">ASAP (~15 min)</option>
                {slots.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <h2 className="font-display text-xl">Pickup Location</h2>
            <p className="mt-2 rounded-md border border-ink-border bg-ink-raised px-3 py-2.5 text-sm text-smoke">
              <span className="font-semibold text-white">Smash Bacon</span> — inside
              Market on 8th, 41 E 8th St #114, National City.
              <br />
              <span className="text-yellow">Pickup only — we don&apos;t deliver.</span>
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-xl">Your Info</h2>
            <label className="block space-y-1">
              <span className="text-sm font-semibold">Name for the order</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Roberto"
                autoComplete="name"
                className="w-full rounded-md border border-ink-border bg-ink-raised px-3 py-2.5 text-sm outline-none placeholder:text-smoke/60 focus:border-yellow"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-sm font-semibold">Mobile number</span>
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setPhoneErr("");
                }}
                onBlur={() => {
                  if (phone && phone.replace(/\D/g, "").length < 10) {
                    setPhoneErr("That number looks short — we need 10 digits.");
                  }
                }}
                placeholder="(619) 555-1234"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={Boolean(phoneErr)}
                className={`w-full rounded-md border bg-ink-raised px-3 py-2.5 text-sm outline-none placeholder:text-smoke/60 focus:border-yellow ${
                  phoneErr ? "border-danger" : "border-ink-border"
                }`}
              />
              {phoneErr ? (
                <span className="text-xs text-danger">{phoneErr}</span>
              ) : (
                <span className="text-xs text-smoke">
                  We&apos;ll text you when it&apos;s ready.
                </span>
              )}
            </label>
          </div>
        </div>

        {/* Totals */}
        <div className="space-y-5">
          <div>
            <h2 className="font-display text-xl">Add a Tip</h2>
            <div className="mt-2 flex gap-2">
              {TIP_PRESETS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setTipRate(r)}
                  className={`flex-1 rounded-md border px-2 py-2 text-sm font-semibold transition-colors ${
                    tipRate === r
                      ? "border-yellow bg-yellow text-ink"
                      : "border-ink-border hover:border-yellow/60"
                  }`}
                >
                  {r === 0 ? "None" : `${r * 100}%`}
                </button>
              ))}
            </div>
          </div>

          <dl className="space-y-2 rounded-xl border border-ink-border bg-ink-raised p-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-smoke">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-smoke">Tax (8.75%)</dt>
              <dd>{formatPrice(tax)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-smoke">Tip</dt>
              <dd>{formatPrice(tip)}</dd>
            </div>
            <div className="flex justify-between border-t border-ink-border pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd className="text-yellow">{formatPrice(total)}</dd>
            </div>
          </dl>

          {SQUARE_ENABLED ? (
            <SquareCard onReady={onCardReady} />
          ) : (
            <p className="text-xs text-smoke">
              Pay at the counter when you pick up. Card payment online is
              coming soon.
            </p>
          )}

          {error && <p className="text-sm text-danger">{error}</p>}

          <button
            type="button"
            onClick={placeOrder}
            disabled={placing || storeOpen === false}
            className="h-14 w-full rounded-md bg-yellow font-display text-lg text-ink transition-colors hover:bg-yellow-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            {storeOpen === false
              ? "Ordering Opens at 11 AM"
              : placing
                ? SQUARE_ENABLED
                  ? "Processing Payment…"
                  : "Placing…"
                : SQUARE_ENABLED
                  ? `Pay & Place Order — ${formatPrice(total)}`
                  : `Place Pickup Order — ${formatPrice(total)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
