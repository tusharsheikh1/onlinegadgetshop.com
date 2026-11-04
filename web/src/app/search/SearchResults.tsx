"use client";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Catalog } from "@/components/Catalog";
import { products } from "@/data/products";

export function SearchResults() {
  const q = (useSearchParams().get("q") ?? "").trim();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const items = terms.length ? products.filter((p) => { const hay = `${p.name} ${p.tagline} ${p.brand} ${p.category}`.toLowerCase(); return terms.every((t) => hay.includes(t) || hay.includes(t.replace(/s$/, ""))); }) : products;
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <div className="pb-6"><h1 className="h1">{q ? <>Results for “{q}”</> : "All results"}</h1><p className="mt-2 text-ink-muted">{items.length} matching products</p></div>
      <Catalog key={q} items={items} defaultSort="relevance" />
    </>
  );
}
