import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HexIcon from "@/components/HexIcon";

export const metadata: Metadata = {
  title: "Our Story | Smash Bacon — Family-Run Smash Burgers, National City",
  description:
    "Smash Bacon is a family business built in San Diego kitchens, now smashing burgers daily at the Market on 8th food hall in National City.",
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl sm:text-5xl">
        Our <span className="text-yellow">Story</span>
      </h1>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
        <div className="space-y-5 text-lg leading-relaxed text-smoke">
          <p>
            <span className="font-semibold text-white">
              Smash Bacon is a family business.
            </span>{" "}
            Before we ever had our own counter, we spent years working in
            kitchens across San Diego — learning what makes a burger worth
            standing in line for.
          </p>
          <p>
            In 2025 we brought everything we learned to our own stall inside{" "}
            <span className="font-semibold text-white">Market on 8th</span>,
            National City&apos;s food hall. Look for the yellow counter: that&apos;s
            where the smash happens.
          </p>
          <p>
            Every burger starts as a fresh ball of beef smashed hard on a
            ripping-hot flat-top — that&apos;s where the crispy, lacy edges come
            from. Add our house bacon jam, hand-breaded buffalo chicken, and
            shakes spun with real ice cream, and you know exactly what we&apos;re
            about: simple food, done loud.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/menu"
              className="inline-flex h-12 items-center rounded-md bg-yellow px-6 font-display text-lg text-ink transition-colors hover:bg-yellow-hover"
            >
              See the Menu
            </Link>
            <Link
              href="/#find-us"
              className="inline-flex h-12 items-center rounded-md border border-white/40 px-6 font-display text-lg text-white transition-colors hover:border-yellow hover:text-yellow"
            >
              Visit Us
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-ink-border">
          <Image
            src="/images/storefront.webp"
            alt="The Smash Bacon stall inside the Market on 8th food hall"
            width={680}
            height={510}
            className="w-full"
          />
        </div>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        {[
          {
            icon: "burger",
            title: "Smashed to order",
            text: "Nothing sits under a heat lamp. Your patty hits the flat-top when your order does.",
          },
          {
            icon: "pin",
            title: "Part of the neighborhood",
            text: "Proud to be one of the stalls at Market on 8th, alongside some of National City's best food.",
          },
          {
            icon: "shake",
            title: "The real stuff",
            text: "Real ice cream in the shakes, house-made bacon jam, hand-breaded chicken. No shortcuts.",
          },
        ].map((s) => (
          <div key={s.title} className="flex flex-col items-start gap-3">
            <HexIcon icon={s.icon} size={56} />
            <h2 className="font-display text-xl">{s.title}</h2>
            <p className="text-sm text-smoke">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
