import { Icon } from "./Icon";
const items = [["truck", "Free delivery", "On orders over ৳2,000"], ["refresh", "Easy returns", "7-day hassle-free returns"], ["shield", "Secure payment", "Pay safely with card, mobile banking & more"], ["headset", "Dedicated support", "Everyday, 9:00 AM – 10:00 PM"]];
export function Trust() {
  return (
    <ul className="grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(([i, t, d]) => (
        <li key={t} className="flex items-center gap-3"><Icon name={i} className="h-9 w-9 shrink-0 text-navy" /><div><p className="font-bold">{t}</p><p className="text-sm text-ink-muted">{d}</p></div></li>
      ))}
    </ul>
  );
}
