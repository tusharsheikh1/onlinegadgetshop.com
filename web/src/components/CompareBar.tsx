"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/hooks";
import { Icon } from "./Icon";

export function CompareBar() {
  const ids = useStore((s) => s.compare); const toggle = useStore((s) => s.toggleCompare);
  const ready = useHydrated(); const path = usePathname();
  if (!ready || ids.length === 0 || path === "/compare" || path.startsWith("/products/")) return null;
  return (
    <>
    <div aria-hidden className="h-16" />
    <div role="region" aria-label="Product comparison" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 shadow-pop backdrop-blur">
      <div className="container-x flex items-center justify-between gap-3 py-3">
        <p className="flex items-center gap-2 text-sm font-semibold"><Icon name="compare" className="h-5 w-5 text-brand" />{ids.length} product{ids.length > 1 ? "s" : ""} selected to compare</p>
        <div className="flex items-center gap-2"><button onClick={() => [...ids].forEach((id) => toggle(id))} className="text-sm font-medium text-ink-muted hover:text-red-600">Clear</button>
          <Link href="/compare" className="btn-primary py-2">Compare now<Icon name="arrow" className="h-4 w-4" /></Link></div>
      </div>
    </div>
    </>
  );
}
