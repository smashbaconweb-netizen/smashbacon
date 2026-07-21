import type { Metadata } from "next";
import Link from "next/link";
import HexIcon from "@/components/HexIcon";

export const metadata: Metadata = {
  title: "Gift Cards | Smash Bacon",
  description:
    "Give the gift of smash burgers. Smash Bacon gift cards are available at our counter inside Market on 8th, National City — digital gift cards coming soon.",
  alternates: { canonical: "/gift-cards" },
};

export default function GiftCardsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center">
      <div className="flex justify-center">
        <HexIcon icon="bag" size={72} />
      </div>
      <h1 className="mt-6 font-display text-4xl sm:text-5xl">
        Gift <span className="text-yellow">Cards</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-smoke">
        The easiest way to make someone&apos;s week: burgers on you. Grab a
        Smash Bacon gift card in any amount at our counter inside Market on
        8th.
      </p>

      <div className="mx-auto mt-10 max-w-md space-y-4 text-left">
        <div className="rounded-xl border border-ink-border bg-ink-raised p-5">
          <h2 className="font-display text-xl">At the counter — today</h2>
          <p className="mt-1 text-sm text-smoke">
            Pick one up with your next order. Any amount, no expiration,
            reloadable at the register.
          </p>
        </div>
        <div className="rounded-xl border border-yellow/30 bg-ink-raised p-5">
          <h2 className="font-display text-xl">
            Digital gift cards — <span className="text-yellow">coming soon</span>
          </h2>
          <p className="mt-1 text-sm text-smoke">
            Send an eGift card by text or email straight from this page.
            Follow{" "}
            <a
              href="https://www.instagram.com/smash.bacon/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow hover:underline"
            >
              @smash.bacon
            </a>{" "}
            to hear when it launches.
          </p>
        </div>
      </div>

      <Link
        href="/#find-us"
        className="mt-10 inline-flex h-12 items-center rounded-md bg-yellow px-6 font-display text-lg text-ink transition-colors hover:bg-yellow-hover"
      >
        Find Our Counter
      </Link>
    </div>
  );
}
