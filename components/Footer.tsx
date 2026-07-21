import Link from "next/link";
import Logo from "./Logo";
import { HOURS_DISPLAY } from "@/lib/hours";
import { DELIVERY_PARTNERS, SOCIAL } from "@/lib/links";

export default function Footer() {
  return (
    <footer className="border-t border-ink-border bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-smoke">
            Smash burgers, buffalo chicken &amp; shakes — inside the Market on
            8th food hall.
          </p>
          <p className="text-sm font-semibold text-yellow">
            Pickup only — delivery via our partners below.
          </p>
          <p className="flex gap-3 text-sm">
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke underline hover:text-yellow"
            >
              Instagram
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke underline hover:text-yellow"
            >
              Facebook
            </a>
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <h3 className="font-display text-lg text-white">Find Us</h3>
          <p className="text-smoke">
            Inside Market on 8th
            <br />
            41 E 8th St #114
            <br />
            National City, CA 91950
          </p>
          <p>
            <a href="tel:+16192105231" className="text-yellow hover:underline">
              (619) 210-5231
            </a>
          </p>
          <p>
            <a
              href="https://marketon8th.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-smoke underline hover:text-yellow"
            >
              marketon8th.com
            </a>
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <h3 className="font-display text-lg text-white">Hours</h3>
          <dl className="space-y-1 text-smoke">
            {HOURS_DISPLAY.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt>{h.days}</dt>
                <dd className="text-white">{h.hours}</dd>
              </div>
            ))}
          </dl>
          <div className="pt-3">
            <Link href="/menu" className="font-semibold text-yellow hover:underline">
              See the menu →
            </Link>
          </div>
          <div className="pt-3">
            <p className="text-xs text-smoke">Delivery via:</p>
            <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
              {DELIVERY_PARTNERS.map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-smoke underline hover:text-yellow"
                >
                  {p.name}
                </a>
              ))}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-ink-border py-4 text-center text-xs text-smoke">
        © {new Date().getFullYear()} Smash Bacon · National City, CA
      </div>
    </footer>
  );
}
