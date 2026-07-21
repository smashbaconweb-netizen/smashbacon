import type { Metadata } from "next";
import Link from "next/link";
import HexIcon from "@/components/HexIcon";

export const metadata: Metadata = {
  title: "Rewards | Smash Bacon",
  description:
    "Smash Rewards: earn points on every Smash Bacon order with just your phone number — no app, no account. Launching soon at Market on 8th, National City.",
  alternates: { canonical: "/rewards" },
};

export default function RewardsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-center">
      <div className="flex justify-center">
        <HexIcon icon="check" size={72} />
      </div>
      <h1 className="mt-6 font-display text-4xl sm:text-5xl">
        Smash <span className="text-yellow">Rewards</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-smoke">
        Loyalty should be simple: eat burgers, earn burgers. Our rewards
        program is{" "}
        <span className="font-semibold text-yellow">launching soon</span> — and
        it works with just your phone number. No app to download, no account,
        no password.
      </p>

      <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
        {[
          {
            step: "1",
            title: "Give your number",
            text: "At the counter or at online checkout — that's the whole signup.",
          },
          {
            step: "2",
            title: "Earn on every order",
            text: "Every burger, wing and shake gets you closer to free food.",
          },
          {
            step: "3",
            title: "Smash your points",
            text: "Redeem right at the register whenever you're ready.",
          },
        ].map((s) => (
          <div key={s.step} className="rounded-xl border border-ink-border bg-ink-raised p-5">
            <span className="font-display text-3xl text-yellow">{s.step}</span>
            <h2 className="mt-2 font-display text-lg">{s.title}</h2>
            <p className="mt-1 text-sm text-smoke">{s.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-smoke">
        Follow{" "}
        <a
          href="https://www.instagram.com/smash.bacon/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow hover:underline"
        >
          @smash.bacon
        </a>{" "}
        to be first to know when it goes live.
      </p>

      <Link
        href="/menu"
        className="mt-8 inline-flex h-12 items-center rounded-md bg-yellow px-6 font-display text-lg text-ink transition-colors hover:bg-yellow-hover"
      >
        Order Pickup
      </Link>
    </div>
  );
}
