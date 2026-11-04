"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, products, taka } from "@/data/products";
import { useStore } from "@/lib/store";

export default function Offers() {
  const deals = products.filter((p) => p.oldPrice);
  const [tab, setTab] = useState("all");
  const add = useStore((s) => s.addToCart);
  const tabs = [{ slug: "all", name: "All deals" }, ...categories.filter((c) => deals.some((d) => d.category === c.slug)), ...(deals.some((d) => d.category === "accessories") ? [{ slug: "accessories", name: "Accessories" }] : [])];
  const list = tab === "all" ? deals : deals.filter((d) => d.category === tab);
  const bundle = ["aerosound-pro", "charging-adapter"];
  return (
    <>
      <section className="mt-6 rounded-2xl bg-gradient-to-r from-brand to-blue-400 p-8 text-white sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest opacity-90">Gadget Week</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Up to 30% off</h1>
        <p className="mt-3 max-w-lg opacity-90">Limited-time deals on headphones, wearables, speakers and accessories.</p>
      </section>
      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Deal categories">{tabs.map((t) => (
        <button key={t.slug} role="tab" aria-selected={tab === t.slug} onClick={() => setTab(t.slug)} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${tab === t.slug ? "border-brand bg-brand text-white" : "border-line hover:border-brand"}`}>{t.name}</button>))}</div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} layout="stack" />)}</div>
      <section className="card mt-10 flex flex-col items-center gap-4 bg-brand-soft p-6 sm:flex-row">
        <div className="flex gap-3">{bundle.map((id) => { const p = products.find((x) => x.id === id)!; return <Image key={id} src={p.image} alt={p.name} width={100} height={100} className="h-20 w-auto object-contain" />; })}</div>
        <div className="flex-1 text-center sm:text-left"><h2 className="text-xl font-extrabold">Bundle offer: AeroSound Pro + 30W Adapter</h2><p className="text-ink-muted">Get both for <b>{taka(9990)}</b> <span className="line-through">{taka(10480)}</span></p></div>
        <button onClick={() => bundle.forEach((id) => add(id))} className="btn-primary">Add bundle to cart</button>
      </section>
      <p className="mt-4 text-center text-sm text-ink-muted"><Link href="/products" className="text-brand">Browse all products →</Link></p>
    </>
  );
}
