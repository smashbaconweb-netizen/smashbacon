import { NextRequest, NextResponse } from "next/server";
import { SquareClient, SquareEnvironment } from "square";
import { getItem, TAX_RATE } from "@/lib/menu";

export const runtime = "edge";

// Creates a Square order (visible on the restaurant's Square POS as a pickup
// order) and charges the card token from the Web Payments SDK.
// Requires env: SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID, SQUARE_ENV.

type IncomingLine = {
  itemId: string;
  qty: number;
  choices?: Record<string, string>;
  notes?: string;
};

type Body = {
  lines: IncomingLine[];
  sourceId: string; // card token from Web Payments SDK
  name: string;
  phone: string;
  pickupTime: string;
  tipRate: number;
};

export async function POST(req: NextRequest) {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  if (!token || !locationId) {
    return NextResponse.json(
      { error: "Online payment is not configured." },
      { status: 503 }
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim().slice(0, 80);
  const phone = (body.phone ?? "").replace(/[^\d+()\-\s]/g, "").trim();
  if (!name || phone.replace(/\D/g, "").length < 10 || !body.sourceId) {
    return NextResponse.json(
      { error: "Missing name, phone, or payment details." },
      { status: 400 }
    );
  }
  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    return NextResponse.json({ error: "Your order is empty." }, { status: 400 });
  }

  // Recompute all prices server-side from the menu — the client's numbers are
  // never trusted.
  const lineItems = [];
  let subtotalCents = 0;
  for (const l of body.lines) {
    const item = getItem(l.itemId);
    const qty = Math.floor(Number(l.qty));
    if (!item || qty < 1 || qty > 20) {
      return NextResponse.json(
        { error: `Unknown item in order: ${l.itemId}` },
        { status: 400 }
      );
    }
    const cents = Math.round(item.price * 100);
    subtotalCents += cents * qty;
    const choiceText = Object.entries(l.choices ?? {})
      .map(([g, c]) => `${g}: ${c}`)
      .join(", ");
    const note = [choiceText, l.notes?.slice(0, 120)].filter(Boolean).join(" — ");
    lineItems.push({
      name: item.name,
      quantity: String(qty),
      basePriceMoney: { amount: BigInt(cents), currency: "USD" as const },
      ...(note ? { note } : {}),
    });
  }

  const tipRate = [0, 0.1, 0.15, 0.2].includes(body.tipRate) ? body.tipRate : 0;
  const tipCents = Math.round(subtotalCents * tipRate);
  const referenceId = `SB-${String(Math.floor(Math.random() * 900) + 100)}`;

  const client = new SquareClient({
    token,
    environment:
      process.env.SQUARE_ENV === "production"
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });

  try {
    const { order } = await client.orders.create({
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId,
        referenceId,
        lineItems,
        taxes: [
          {
            name: "Sales Tax",
            percentage: (TAX_RATE * 100).toFixed(2),
            scope: "ORDER",
          },
        ],
        fulfillments: [
          {
            type: "PICKUP",
            pickupDetails: {
              scheduleType: "ASAP",
              note:
                body.pickupTime && body.pickupTime !== "ASAP"
                  ? `Requested pickup: ${body.pickupTime}`
                  : undefined,
              recipient: { displayName: name, phoneNumber: phone },
            },
          },
        ],
      },
    });

    if (!order?.id || !order.totalMoney?.amount) {
      return NextResponse.json(
        { error: "Could not create the order. Please try again." },
        { status: 502 }
      );
    }

    const { payment } = await client.payments.create({
      idempotencyKey: crypto.randomUUID(),
      sourceId: body.sourceId,
      orderId: order.id,
      amountMoney: {
        amount: order.totalMoney.amount,
        currency: "USD",
      },
      ...(tipCents > 0
        ? { tipMoney: { amount: BigInt(tipCents), currency: "USD" as const } }
        : {}),
      note: `Smash Bacon online pickup ${referenceId}`,
    });

    if (payment?.status !== "COMPLETED" && payment?.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Payment was not approved. Please try another card." },
        { status: 402 }
      );
    }

    return NextResponse.json({
      id: referenceId,
      squareOrderId: order.id,
      subtotal: subtotalCents / 100,
      tax: Number(order.totalMoney.amount - BigInt(subtotalCents)) / 100,
      tip: tipCents / 100,
      total: Number(order.totalMoney.amount + BigInt(tipCents)) / 100,
    });
  } catch (e: unknown) {
    const msg =
      e && typeof e === "object" && "message" in e
        ? String((e as Error).message)
        : "Payment failed.";
    console.error("Square order error:", e);
    return NextResponse.json(
      { error: msg.slice(0, 200) || "Payment failed." },
      { status: 502 }
    );
  }
}
