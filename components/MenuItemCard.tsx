"use client";

import Image from "next/image";
import { formatPrice, CATEGORIES, type MenuItem } from "@/lib/menu";
import HexIcon from "./HexIcon";

export default function MenuItemCard({
  item,
  onSelect,
}: {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}) {
  const icon = CATEGORIES.find((c) => c.id === item.category)?.icon ?? "burger";

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-ink-border bg-ink-raised text-left transition-colors hover:border-yellow/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow"
    >
      {item.image ? (
        <div className="relative h-44 w-full overflow-hidden bg-ink">
          {item.image.endsWith(".png") && (
            <div
              aria-hidden="true"
              className="absolute inset-0 m-auto h-2/3 w-2/3 rounded-full bg-yellow/15 blur-2xl"
            />
          )}
          <Image
            src={item.image}
            alt={item.name}
            fill
            className={`transition-transform duration-200 group-hover:scale-[1.03] ${
              item.image.endsWith(".png") ? "object-contain p-3" : "object-cover"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="flex h-28 items-center justify-center bg-ink">
          <HexIcon icon={icon} size={52} />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg leading-tight">{item.name}</h3>
          <span className="whitespace-nowrap font-bold text-yellow">
            {formatPrice(item.price)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-smoke">{item.description}</p>
        <span className="mt-auto pt-2 text-sm font-semibold text-yellow transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
          Add to order +
        </span>
      </div>
    </button>
  );
}
