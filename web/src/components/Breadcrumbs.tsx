import Link from "next/link";
import { Icon } from "./Icon";
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 text-[13px] text-ink-muted sm:py-4 sm:text-sm">
      {/* Earlier crumbs keep their width; a long last crumb truncates instead of wrapping. */}
      <ol className="flex items-center gap-1.5 whitespace-nowrap">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className={`flex items-center gap-1.5 ${last ? "min-w-0" : "shrink-0"}`}>
              {i > 0 && <Icon name="chevronR" className="h-3.5 w-3.5 shrink-0" />}
              {it.href ? <Link href={it.href} className="hover:text-brand">{it.label}</Link> : <span className="truncate text-navy" aria-current="page">{it.label}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
