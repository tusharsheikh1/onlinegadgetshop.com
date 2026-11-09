import { Icon } from "./Icon";
const items = [["truck", "Fast delivery", "Dhaka in 1–2 working days"], ["refresh", "Easy returns", "7-day hassle-free returns"], ["shield", "Secure payment", "Card, mobile banking & COD"], ["headset", "Dedicated support", "Real people, 7 days a week"]];
export function Trust() {
  return (
    <ul className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-4 lg:grid-cols-4">
      {items.map(([i, t, d]) => (
        <li key={t} className="flex flex-col gap-3 rounded-2xl bg-surface p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-card ring-1 ring-line sm:h-12 sm:w-12"><Icon name={i} className="h-5 w-5 sm:h-6 sm:w-6" /></span>
          <div className="min-w-0"><p className="text-sm font-semibold sm:text-[15px]">{t}</p><p className="mt-0.5 text-xs leading-snug text-ink-muted sm:text-sm">{d}</p></div>
        </li>
      ))}
    </ul>
  );
}
