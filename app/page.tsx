import Image from "next/image";
import Link from "next/link";
import HexIcon from "@/components/HexIcon";
import FeaturedGrid from "@/components/FeaturedGrid";
import ClosedBanner from "@/components/ClosedBanner";
import StickyOrderBar from "@/components/StickyOrderBar";
import { HOURS_DISPLAY } from "@/lib/hours";
import { CATEGORIES } from "@/lib/menu";
import { DELIVERY_PARTNERS } from "@/lib/links";

export default function Home() {
  return (
    <>
      <ClosedBanner />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-24 lg:grid-cols-2">
          <div className="space-y-6">
            <h1 className="font-display text-5xl leading-[0.95] sm:text-7xl">
              Smashed Fresh.
              <br />
              <span className="text-yellow">Stacked High.</span>
            </h1>
            <p className="max-w-md text-lg text-smoke">
              Smash burgers, buffalo chicken &amp; hand-spun shakes inside the
              Market on 8th food hall, National City.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="inline-flex h-12 items-center rounded-md bg-yellow px-6 font-display text-lg text-ink transition-colors hover:bg-yellow-hover"
              >
                Order Pickup
              </Link>
              <Link
                href="/menu"
                className="inline-flex h-12 items-center rounded-md border border-white/40 px-6 font-display text-lg text-white transition-colors hover:border-yellow hover:text-yellow"
              >
                See the Menu
              </Link>
            </div>
            <p className="text-sm font-semibold text-yellow">
              Pickup only — we don&apos;t deliver.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-0 m-auto h-3/4 w-3/4 rounded-full bg-yellow/20 blur-3xl"
            />
            <Image
              src="/images/bacon-avocado-burger.png"
              alt="The Double Guac Bacon Jalapeño burger"
              width={633}
              height={510}
              priority
              className="food-glow relative"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="diagonal-top bg-ink-raised pb-16 pt-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl sm:text-4xl">
            Fan <span className="text-yellow">Favorites</span>
          </h2>
          <FeaturedGrid />
        </div>
      </section>

      {/* How pickup works */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl sm:text-4xl">
            How <span className="text-yellow">Pickup</span> Works
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: "bag",
                title: "1. Order online",
                text: "Build your order and check out in under a minute. No account needed.",
              },
              {
                icon: "burger",
                title: "2. We fire the grill",
                text: "Your burgers hit the flat-top the moment your order lands. Ready in about 15 minutes.",
              },
              {
                icon: "pin",
                title: "3. Grab it at the counter",
                text: "Give your order number at our counter inside Market on 8th. That's it.",
              },
            ].map((s) => (
              <div key={s.title} className="flex flex-col items-start gap-3">
                <HexIcon icon={s.icon} size={56} />
                <h3 className="font-display text-xl">{s.title}</h3>
                <p className="text-sm text-smoke">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg border border-yellow/30 bg-ink-raised px-4 py-4 text-sm">
            <p>
              <span className="font-semibold text-yellow">Pickup only.</span>{" "}
              Ordering here gets you our real in-store prices — your order will
              be waiting at the stall.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-ink-border pt-3">
              <span className="text-smoke">Rather have it delivered? Our partners deliver (their prices run higher):</span>
              {DELIVERY_PARTNERS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink-border px-3 py-1 text-xs font-semibold transition-colors hover:border-yellow hover:text-yellow"
                >
                  {p.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu teaser */}
      <section className="diagonal-top bg-ink-raised pb-16 pt-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl sm:text-4xl">
            What&apos;s <span className="text-yellow">Cooking</span>
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={`/menu#${c.id}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-ink-border bg-ink p-4 text-center transition-colors hover:border-yellow/60"
              >
                <HexIcon icon={c.icon} size={44} />
                <span className="text-sm font-semibold leading-tight">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Find us */}
      <section id="find-us" className="py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-ink-border">
            <Image
              src="/images/storefront.webp"
              alt="The Smash Bacon stall inside the Market on 8th food hall"
              width={680}
              height={510}
              className="w-full"
            />
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-3xl sm:text-4xl">
              Find Us at <span className="text-yellow">Market on 8th</span>
            </h2>
            <p className="text-smoke">
              We&apos;re one of the stalls inside National City&apos;s Market on
              8th food hall — look for the yellow counter.
            </p>
            <address className="not-italic leading-relaxed">
              41 E 8th St #114
              <br />
              National City, CA 91950
              <br />
              <a href="tel:+16192105231" className="text-yellow hover:underline">
                (619) 210-5231
              </a>
            </address>
            <dl className="space-y-1 text-sm">
              {HOURS_DISPLAY.map((h) => (
                <div key={h.days} className="flex gap-4">
                  <dt className="w-24 text-smoke">{h.days}</dt>
                  <dd className="font-semibold">{h.hours}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=Market+on+8th,+41+E+8th+St,+National+City,+CA+91950"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-md bg-yellow px-5 font-display text-ink transition-colors hover:bg-yellow-hover"
              >
                Get Directions
              </a>
              <a
                href="https://marketon8th.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center rounded-md border border-white/40 px-5 font-display text-white transition-colors hover:border-yellow hover:text-yellow"
              >
                marketon8th.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <StickyOrderBar />
    </>
  );
}
