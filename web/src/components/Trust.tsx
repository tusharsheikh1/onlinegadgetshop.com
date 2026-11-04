import { Icon } from "./Icon";
const items = [["truck", "Fast delivery", "Dhaka in 1–2 working days"], ["refresh", "Easy returns", "7-day hassle-free returns"], ["shield", "Secure payment", "Pay safely with card, mobile banking & more"], ["headset", "Dedicated support", "7 days a week"]];
export function Trust() {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-4 py-6 sm:gap-4 sm:py-8 lg:grid-cols-4">
      {items.map(([i, t, d]) => (
        <li key={t} className="flex items-center gap-2.5 sm:gap-3">
          <Icon name={i} className="h-7 w-7 shrink-0 text-navy sm:h-9 sm:w-9" />
          <div className="min-w-0"><p className="text-sm font-bold sm:text-base">{t}</p><p className="text-xs text-ink-muted sm:text-sm">{d}</p></div>
        </li>
      ))}
    </ul>
  );
}
