"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Catalog } from "@/components/Catalog";
import { products } from "@/data/products";

export function SearchResults() {
  const q = (useSearchParams().get("q") ?? "").trim();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const items = terms.length ? products.filter((p) => { const hay = `${p.name} ${p.tagline} ${p.brand} ${p.category} ${p.wireless ? "wireless bluetooth" : ""}`.toLowerCase(); return terms.every((t) => hay.includes(t) || hay.includes(t.replace(/s$/, ""))); }) : products;
  const related = ["bluetooth headphones", "noise cancelling headphones", "over-ear headphones", "wireless earbuds", "gaming headphones"];
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <div className="pb-4 sm:pb-6"><h1 className="h1 text-xl sm:text-4xl">{q ? <>Search results for <span className="text-brand">“{q}”</span></> : "All results"}</h1><p className="mt-1 text-sm text-ink-muted sm:mt-2 sm:text-base">{items.length} product{items.length === 1 ? "" : "s"} found</p>
        {q && <div className="chip-row mt-3 items-center text-sm sm:mt-4"><span className="shrink-0 text-ink-muted">Related searches:</span>{related.filter((r) => r !== q.toLowerCase()).map((r) => <Link key={r} href={`/search?q=${encodeURIComponent(r)}`} className="shrink-0 whitespace-nowrap rounded-full bg-brand-soft px-3.5 py-1.5 font-medium hover:bg-blue-100 sm:px-4">{r}</Link>)}</div>}</div>
      <Catalog key={q} items={items} defaultSort="relevance" />
    </>
  );
}
