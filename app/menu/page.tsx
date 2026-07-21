import type { Metadata } from "next";
import MenuBrowser from "@/components/MenuBrowser";
import ClosedBanner from "@/components/ClosedBanner";
import StickyOrderBar from "@/components/StickyOrderBar";

export const metadata: Metadata = {
  title: "Menu | Smash Bacon — Market on 8th, National City",
  description:
    "Burger specialties, buffalo chicken, wings, shareables, kids meals and hand-spun shakes. Order online for pickup at Market on 8th.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <ClosedBanner />
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8">
        <h1 className="font-display text-4xl sm:text-5xl">
          The <span className="text-yellow">Menu</span>
        </h1>
        <p className="mt-2 text-sm text-smoke">
          Prices are before tax. All burger specialties come with french fries.
        </p>
        <MenuBrowser />
      </div>
      <StickyOrderBar />
    </>
  );
}
