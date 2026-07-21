"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatPrice, type MenuItem } from "@/lib/menu";
import { useCart } from "@/lib/cart";
import HexIcon from "./HexIcon";
import { CATEGORIES } from "@/lib/menu";

export default function ItemModal({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  const { addLine } = useCart();
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [choices, setChoices] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLDivElement>(null);

  const missingChoice = (item.options ?? []).some((g) => !choices[g.name]);
  const icon = CATEGORIES.find((c) => c.id === item.category)?.icon ?? "burger";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const add = () => {
    if (missingChoice) return;
    addLine({
      itemId: item.id,
      name: item.name,
      unitPrice: item.price,
      qty,
      choices,
      notes: notes.trim() || undefined,
      image: item.image,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-ink-border bg-ink-raised outline-none sm:rounded-2xl"
      >
        <div className="overflow-y-auto">
          {item.image ? (
            <div className="relative h-56 w-full bg-ink">
              {item.image.endsWith(".png") && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 m-auto h-2/3 w-2/3 rounded-full bg-yellow/15 blur-2xl"
                />
              )}
              <Image
                src={item.image}
                alt={item.name}
                fill
                className={item.image.endsWith(".png") ? "object-contain p-3" : "object-cover"}
                sizes="(max-width: 640px) 100vw, 512px"
              />
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center bg-ink">
              <HexIcon icon={icon} size={72} />
            </div>
          )}

          <div className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-2xl leading-tight">{item.name}</h2>
              <span className="font-bold text-yellow">{formatPrice(item.price)}</span>
            </div>
            {item.priceTbc && (
              <p className="text-xs text-smoke">Price shown may vary at the counter.</p>
            )}
            <p className="text-sm text-smoke">{item.description}</p>

            {(item.options ?? []).map((group) => (
              <fieldset key={group.id} className="space-y-2">
                <legend className="text-sm font-semibold">
                  {group.name} <span className="text-yellow">*</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {group.choices.map((c) => {
                    const active = choices[group.name] === c;
                    return (
                      <label
                        key={c}
                        className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                          active
                            ? "border-yellow bg-yellow text-ink"
                            : "border-ink-border text-white hover:border-yellow/60"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`${item.id}-${group.id}`}
                          value={c}
                          checked={active}
                          onChange={() =>
                            setChoices((prev) => ({ ...prev, [group.name]: c }))
                          }
                          className="sr-only"
                        />
                        {c}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <label className="block space-y-1">
              <span className="text-sm font-semibold">Special instructions</span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="No onions, sauce on the side…"
                className="w-full rounded-md border border-ink-border bg-ink px-3 py-2 text-sm outline-none placeholder:text-smoke/60 focus:border-yellow"
              />
            </label>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold">Quantity</span>
              <div className="flex items-center rounded-md border border-ink-border">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-11 w-11 text-lg hover:text-yellow"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="h-11 w-11 text-lg hover:text-yellow"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-ink-border p-4">
          <button
            type="button"
            onClick={onClose}
            className="h-12 rounded-md border border-ink-border px-4 text-sm font-semibold hover:border-smoke"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={add}
            disabled={missingChoice}
            className="h-12 flex-1 rounded-md bg-yellow font-display text-base text-ink transition-colors hover:bg-yellow-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            {missingChoice
              ? "Choose an option above"
              : `Add to Order — ${formatPrice(item.price * qty)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
