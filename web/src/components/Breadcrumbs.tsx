import Link from "next/link";
import { Icon } from "./Icon";
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 text-sm text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="chevronR" className="h-3.5 w-3.5" />}
            {it.href ? <Link href={it.href} className="hover:text-brand">{it.label}</Link> : <span className="text-navy" aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
