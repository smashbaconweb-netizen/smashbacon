"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TAX_RATE } from "./menu";

export type CartLine = {
  lineId: string;
  itemId: string;
  name: string;
  unitPrice: number;
  qty: number;
  choices: Record<string, string>; // option group name -> choice
  notes?: string;
  image?: string;
};

export type Order = {
  id: string;
  createdAt: number;
  lines: CartLine[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  pickupTime: string; // "ASAP" or a slot label
  name: string;
  phone: string;
  squareOrderId?: string; // set when paid online through Square
};

type CartCtx = {
  lines: CartLine[];
  addLine: (line: Omit<CartLine, "lineId">) => void;
  updateQty: (lineId: string, qty: number) => void;
  removeLine: (lineId: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  lastAdded: number; // timestamp, for toast
};

const Ctx = createContext<CartCtx | null>(null);

const CART_KEY = "sb-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [lastAdded, setLastAdded] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addLine = useCallback((line: Omit<CartLine, "lineId">) => {
    setLines((prev) => {
      // merge identical item+choices lines
      const match = prev.find(
        (l) =>
          l.itemId === line.itemId &&
          JSON.stringify(l.choices) === JSON.stringify(line.choices) &&
          (l.notes || "") === (line.notes || "")
      );
      if (match) {
        return prev.map((l) =>
          l.lineId === match.lineId ? { ...l, qty: l.qty + line.qty } : l
        );
      }
      return [...prev, { ...line, lineId: Math.random().toString(36).slice(2, 10) }];
    });
    setLastAdded(Date.now());
  }, []);

  const updateQty = useCallback((lineId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.lineId !== lineId)
        : prev.map((l) => (l.lineId === lineId ? { ...l, qty } : l))
    );
  }, []);

  const removeLine = useCallback((lineId: string) => {
    setLines((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { count, subtotal } = useMemo(() => {
    return {
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.unitPrice * l.qty, 0),
    };
  }, [lines]);

  return (
    <Ctx.Provider
      value={{ lines, addLine, updateQty, removeLine, clear, count, subtotal, lastAdded }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

// ---- Orders (localStorage-backed for v1; swap for a server route + DB later) ----

const ORDERS_KEY = "sb-orders-v1";

export function persistOrder(order: Order): Order {
  try {
    const all: Record<string, Order> = JSON.parse(
      localStorage.getItem(ORDERS_KEY) || "{}"
    );
    all[order.id] = order;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(all));
  } catch {}
  return order;
}

export function saveOrder(input: Omit<Order, "id" | "createdAt" | "tax" | "total">): Order {
  const tax = input.subtotal * TAX_RATE;
  return persistOrder({
    ...input,
    id: `SB-${String(Math.floor(Math.random() * 900) + 100)}`,
    createdAt: Date.now(),
    tax,
    total: input.subtotal + tax + input.tip,
  });
}

export function getOrder(id: string): Order | null {
  try {
    const all: Record<string, Order> = JSON.parse(
      localStorage.getItem(ORDERS_KEY) || "{}"
    );
    return all[id] ?? null;
  } catch {
    return null;
  }
}
