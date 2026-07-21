"use client";

import { useEffect, useRef, useState } from "react";

// Wrapper around Square's Web Payments SDK card element.
// Renders nothing unless NEXT_PUBLIC_SQUARE_APP_ID is configured.

declare global {
  interface Window {
    Square?: {
      payments: (
        appId: string,
        locationId: string
      ) => Promise<{
        card: () => Promise<SquareCardInstance>;
      }>;
    };
  }
}

type SquareCardInstance = {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{
    status: string;
    token?: string;
    errors?: { message: string }[];
  }>;
  destroy: () => Promise<void>;
};

export const SQUARE_APP_ID = process.env.NEXT_PUBLIC_SQUARE_APP_ID;
export const SQUARE_LOCATION_ID = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;

const SDK_URL =
  process.env.NEXT_PUBLIC_SQUARE_ENV === "production"
    ? "https://web.squarecdn.com/v1/square.js"
    : "https://sandbox.web.squarecdn.com/v1/square.js";

export default function SquareCard({
  onReady,
}: {
  onReady: (tokenize: () => Promise<string>) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!SQUARE_APP_ID || !SQUARE_LOCATION_ID) return;
    let card: SquareCardInstance | null = null;
    let cancelled = false;

    const init = async () => {
      if (!window.Square) {
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement("script");
          s.src = SDK_URL;
          s.onload = () => resolve();
          s.onerror = () => reject(new Error("Could not load payment form."));
          document.head.appendChild(s);
        });
      }
      if (cancelled || !window.Square) return;
      const payments = await window.Square.payments(
        SQUARE_APP_ID,
        SQUARE_LOCATION_ID
      );
      card = await payments.card();
      if (cancelled) return;
      await card.attach("#sq-card");
      onReady(async () => {
        const result = await card!.tokenize();
        if (result.status !== "OK" || !result.token) {
          throw new Error(
            result.errors?.[0]?.message ?? "Card details look incomplete."
          );
        }
        return result.token;
      });
    };

    init().catch((e: Error) => setError(e.message));
    return () => {
      cancelled = true;
      card?.destroy().catch(() => {});
    };
    // onReady is stable (useCallback in Checkout)
  }, [onReady]);

  if (!SQUARE_APP_ID || !SQUARE_LOCATION_ID) return null;

  return (
    <div>
      <h2 className="font-display text-xl">Card Payment</h2>
      <div
        id="sq-card"
        ref={containerRef}
        className="mt-2 rounded-md bg-white p-2"
      />
      {error && <p className="mt-2 text-sm text-danger">{error}</p>}
    </div>
  );
}
