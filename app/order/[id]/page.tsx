import type { Metadata } from "next";
import OrderStatus from "@/components/OrderStatus";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Order Status | Smash Bacon",
  robots: { index: false, follow: false },
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderStatus orderId={id} />;
}
