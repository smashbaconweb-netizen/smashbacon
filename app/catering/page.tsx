import type { Metadata } from "next";
import Image from "next/image";
import HexIcon from "@/components/HexIcon";
import { SOCIAL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Catering | Smash Bacon — Burgers & Wings for Your Event",
  description:
    "Feed your crew with Smash Bacon catering: smash burger packages, buffalo wings trays and shakes for parties and events in the National City and San Diego area.",
  alternates: { canonical: "/catering" },
};

export default function CateringPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl sm:text-5xl">
        <span className="text-yellow">Catering</span>
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-smoke">
        Feeding a crew? We bring the smash to birthdays, office lunches, game
        days and family parties across National City and San Diego.
      </p>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          {[
            {
              icon: "burger",
              title: "Smash Burger Packs",
              text: "Our smash burgers made for a group — pick your specialties, we handle the rest. Fries included, obviously.",
            },
            {
              icon: "wing",
              title: "Wings & Shareables Trays",
              text: "Buffalo wings in any heat, jalapeño poppers, mozzarella sticks and loaded buffalo chicken fries by the tray.",
            },
            {
              icon: "shake",
              title: "Shake Bar",
              text: "Hand-spun shakes with real ice cream — Oreo, salted caramel, peanut butter banana and more.",
            },
          ].map((s) => (
            <div key={s.title} className="flex gap-4">
              <HexIcon icon={s.icon} size={56} />
              <div>
                <h2 className="font-display text-xl">{s.title}</h2>
                <p className="mt-1 text-sm text-smoke">{s.text}</p>
              </div>
            </div>
          ))}

          <div className="rounded-xl border border-yellow/30 bg-ink-raised p-5">
            <h2 className="font-display text-2xl">Get a Quote</h2>
            <p className="mt-2 text-sm text-smoke">
              Tell us your date, headcount and what you&apos;re craving — we&apos;ll
              build a package around it. Please reach out at least 72 hours
              ahead for larger orders.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="tel:+16192105231"
                className="inline-flex h-12 items-center rounded-md bg-yellow px-6 font-display text-lg text-ink transition-colors hover:bg-yellow-hover"
              >
                Call (619) 210-5231
              </a>
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center rounded-md border border-white/40 px-6 font-display text-lg text-white transition-colors hover:border-yellow hover:text-yellow"
              >
                DM us on Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-ink-border">
            <Image
              src="/images/original-smash-bacon.jpg"
              alt="A tray-worthy Smash Bacon original smash burger"
              width={800}
              height={600}
              className="w-full"
            />
          </div>
          <div className="overflow-hidden rounded-xl border border-ink-border">
            <Image
              src="/images/buffalo-wings.jpg"
              alt="Buffalo wings tossed in hot sauce"
              width={800}
              height={600}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
