"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, taka } from "@/data/products";
import { useStore } from "@/lib/store";

export default function Offers() {
  const deals = products.filter((p) => p.id.startsWith("deal-"));
  const [tab, setTab] = useState("all");
  const add = useStore((s) => s.addToCart);
  const tabs = [{ slug: "all", name: "All deals" }, ...categories.filter((c) => deals.some((d) => d.category === c.slug)), ...(deals.some((d) => d.category === "accessories") ? [{ slug: "accessories", name: "Accessories" }] : [])];
  const list = tab === "all" ? deals : deals.filter((d) => d.category === tab);
  const bundle = ["aerosound-pro", "charging-adapter"];
  return (
    <>
      <h1 className="sr-only">Gadget Week: up to 30% off</h1>
      <a href="#deals" aria-label="Shop the deals" className="mt-3 block overflow-hidden rounded-2xl sm:mt-6"><Image src="/img/sale-banner.png" alt="Gadget Week sale: up to 30% off phones, laptops, audio and wearables" width={1417} height={261} priority className="hidden w-full sm:block" /><Image src="/img/sale-banner-m.png" alt="Gadget Week sale: up to 30% off phones, laptops, audio and wearables" width={824} height={278} priority className="w-full sm:hidden" /></a>
      <div className="mt-5 sm:mt-8"><h2 className="h2">Today&apos;s Deals</h2><p className="mt-1 text-sm text-ink-muted">Limited-time offers. Grab them before they&apos;re gone!</p></div>
      <div className="chip-row mt-3 sm:mt-4" role="tablist" aria-label="Deal categories">{tabs.map((t) => (
        <button key={t.slug} role="tab" aria-selected={tab === t.slug} onClick={() => setTab(t.slug)} className={`chip ${tab === t.slug ? "border-brand bg-brand text-white" : "border-line hover:border-brand"}`}>{t.name}</button>))}</div>
      <div id="deals" className="mt-4 grid scroll-mt-32 grid-cols-2 gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} layout="stack" />)}</div>
      <section className="card mt-8 flex flex-col items-center gap-4 bg-brand-soft p-4 sm:mt-10 sm:flex-row sm:p-6">
        <div className="flex gap-3">{bundle.map((id) => { const p = products.find((x) => x.id === id)!; return <Image key={id} src={p.image} alt={p.name} width={100} height={100} className="h-20 w-auto object-contain" />; })}</div>
        <div className="flex-1 text-center sm:text-left"><h2 className="text-lg font-extrabold sm:text-xl">Bundle offer: AeroSound Pro + 30W Adapter</h2><p className="text-ink-muted">Get both for <b>{taka(9990)}</b> <span className="line-through">{taka(10480)}</span></p></div>
        <button onClick={() => bundle.forEach((id) => add(id))} className="btn-primary">Add bundle to cart</button>
      </section>
      <p className="mt-4 text-center text-sm text-ink-muted"><Link href="/products" className="text-brand">Browse all products →</Link></p>
    </>
  );
}
