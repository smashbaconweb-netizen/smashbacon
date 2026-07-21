import type { Metadata } from "next";
import Checkout from "@/components/Checkout";

export const metadata: Metadata = {
  title: "Your Pickup Order | Smash Bacon",
  description: "Review your Smash Bacon pickup order and check out.",
  robots: { index: false, follow: false },
};

export default function OrderPage() {
  return <Checkout />;
}
