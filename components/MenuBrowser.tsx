"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES, MENU, type MenuItem } from "@/lib/menu";
import MenuItemCard from "./MenuItemCard";
import ItemModal from "./ItemModal";

export default function MenuBrowser() {
  const [active, setActive] = useState<string>(CATEGORIES[0].id);
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll-spy: highlight the tab of the section nearest the top.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <nav
        aria-label="Menu categories"
        className="sticky top-16 z-30 -mx-4 mt-6 overflow-x-auto border-b border-ink-border bg-ink/95 px-4 backdrop-blur"
      >
        <div className="flex gap-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => jump(c.id)}
              className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold transition-colors ${
                active === c.id
                  ? "border-yellow text-yellow"
                  : "border-transparent text-smoke hover:text-white"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </nav>

      {CATEGORIES.map((cat) => {
        const items = MENU.filter((m) => m.category === cat.id);
        return (
          <section
            key={cat.id}
            id={cat.id}
            ref={(el) => {
              sectionRefs.current[cat.id] = el;
            }}
            className="scroll-mt-32 pt-10"
          >
            <div className="flex items-baseline gap-3">
              <h2 className="font-display text-2xl sm:text-3xl">{cat.name}</h2>
              {cat.note && <span className="text-sm text-smoke">{cat.note}</span>}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} onSelect={setSelected} />
              ))}
            </div>
          </section>
        );
      })}

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
