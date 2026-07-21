// Owner-confirmed: Mon–Thu 11am–8pm, Sat–Sun 11am–9pm.
// Friday 11am–9pm matches the restaurant's DoorDash listing.
export type DayHours = { open: number; close: number } | null;

// Index 0 = Sunday
export const WEEK_HOURS: DayHours[] = [
  { open: 11, close: 21 }, // Sun
  { open: 11, close: 20 }, // Mon
  { open: 11, close: 20 }, // Tue
  { open: 11, close: 20 }, // Wed
  { open: 11, close: 20 }, // Thu
  { open: 11, close: 21 }, // Fri (assumed — confirm)
  { open: 11, close: 21 }, // Sat
];

export const HOURS_DISPLAY: { days: string; hours: string }[] = [
  { days: "Mon – Thu", hours: "11:00 AM – 8:00 PM" },
  { days: "Fri – Sun", hours: "11:00 AM – 9:00 PM" },
];

function fmtHour(h: number): string {
  const ampm = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr} ${ampm}`;
}

export type StoreStatus =
  | { open: true; closesAt: string; closeHour: number }
  | { open: false; opensAt: string };

export function getStoreStatus(now: Date = new Date()): StoreStatus {
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = WEEK_HOURS[day];

  if (today && hour >= today.open && hour < today.close) {
    return { open: true, closesAt: fmtHour(today.close), closeHour: today.close };
  }

  // Find next opening
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const h = WEEK_HOURS[d];
    if (!h) continue;
    if (i === 0 && hour >= h.open) continue; // already past today's open
    const label =
      i === 0
        ? `today at ${fmtHour(h.open)}`
        : i === 1
          ? `tomorrow at ${fmtHour(h.open)}`
          : `${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d]} at ${fmtHour(h.open)}`;
    return { open: false, opensAt: label };
  }
  return { open: false, opensAt: "soon" };
}

// Pickup slots: ASAP plus 15-min increments from now+30min until close.
export function getPickupSlots(now: Date = new Date()): string[] {
  const status = getStoreStatus(now);
  if (!status.open) return [];
  const slots: string[] = [];
  const start = new Date(now.getTime() + 30 * 60 * 1000);
  start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15, 0, 0);
  const close = new Date(now);
  close.setHours(status.closeHour, 0, 0, 0);
  const t = new Date(start);
  while (t <= close) {
    slots.push(
      t.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    );
    t.setMinutes(t.getMinutes() + 15);
  }
  return slots;
}
