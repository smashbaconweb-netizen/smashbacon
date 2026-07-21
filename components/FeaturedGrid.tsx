"use client";

import { useState } from "react";
import { MENU, type MenuItem } from "@/lib/menu";
import MenuItemCard from "./MenuItemCard";
import ItemModal from "./ItemModal";

export default function FeaturedGrid() {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const featured = MENU.filter((m) => m.featured);

  return (
    <>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {featured.map((item) => (
          <MenuItemCard key={item.id} item={item} onSelect={setSelected} />
        ))}
      </div>
      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
