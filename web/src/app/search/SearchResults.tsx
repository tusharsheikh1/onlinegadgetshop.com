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
      <div className="pb-6"><h1 className="h1">{q ? <>Search results for <span className="text-brand">“{q}”</span></> : "All results"}</h1><p className="mt-2 text-ink-muted">{items.length} product{items.length === 1 ? "" : "s"} found</p>
        {q && <div className="mt-4 flex flex-wrap items-center gap-2 text-sm"><span className="text-ink-muted">Related searches:</span>{related.filter((r) => r !== q.toLowerCase()).map((r) => <Link key={r} href={`/search?q=${encodeURIComponent(r)}`} className="rounded-full bg-brand-soft px-4 py-1.5 font-medium hover:bg-blue-100">{r}</Link>)}</div>}</div>
      <Catalog key={q} items={items} defaultSort="relevance" />
    </>
  );
}
