"use client";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { PageTitle } from "@/components/Page";
import { Rating } from "@/components/Stars";
import { byId, Product, products, taka } from "@/data/products";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/hooks";

const spec = (p: Product, k: string, fallback = "—") => p.specs?.[k] ?? fallback;
const rows: [string, string, (p: Product) => string, boolean?][] = [
  ["Price", "tag", (p) => taka(p.price), true],
  ["Battery Life", "battery", (p) => spec(p, "Battery Life")],
  ["Noise Cancellation", "wave", (p) => spec(p, "Noise Cancellation")],
  ["Connectivity", "chat", (p) => spec(p, "Connectivity", p.wireless ? "Bluetooth wireless" : "Wired")],
  ["Warranty", "shield", (p) => p.warranty.replace("warranty", "Warranty")],
];

export default function Compare() {
  const ids = useStore((s) => s.compare); const toggle = useStore((s) => s.toggleCompare); const add = useStore((s) => s.addToCart);
  const ready = useHydrated();
  const items = (ready ? ids : []).map(byId).filter(Boolean) as Product[];
  const suggestions = products.filter((p) => p.category === "headphones" && !ids.includes(p.id)).slice(0, 3);
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare Products" }]} />
      <PageTitle title="Compare Products" sub="See key features side by side and choose the right product for you." />
      {items.length > 0 && <div className="mb-3 flex items-center justify-between text-sm"><p className="font-bold">Comparing {items.length} product{items.length > 1 ? "s" : ""}</p><Link href="/products" className="flex items-center gap-1 font-semibold text-brand"><Icon name="chevronL" className="h-4 w-4" />Back to shopping</Link></div>}
      {items.length === 0 ? (
        <div className="card p-10 text-center"><p className="font-bold">Nothing to compare yet.</p><p className="mt-1 text-ink-muted">Use “+ Compare” on any product card.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">{suggestions.map((p) => <button key={p.id} className="btn-outline" onClick={() => toggle(p.id)}>+ {p.name}</button>)}</div></div>
      ) : (
        <div className="card overflow-x-auto"><table className="w-full table-fixed border-collapse text-xs sm:text-sm" style={{ minWidth: 92 + items.length * 128 }}>
          <caption className="sr-only">Product comparison</caption>
          <colgroup><col className="w-[92px] sm:w-[200px]" /></colgroup>
          <thead><tr><td />{items.map((p) => (
            <th key={p.id} scope="col" className="relative border-l border-line p-2.5 text-left align-top font-normal sm:p-4">
              <button onClick={() => toggle(p.id)} aria-label={`Remove ${p.name}`} className="absolute right-3 top-3 rounded-full bg-surface p-1.5 text-ink-muted hover:text-red-600"><Icon name="x" className="h-4 w-4" /></button>
              <Image src={p.image} alt={p.name} width={160} height={160} className="mx-auto h-24 w-auto object-contain sm:h-32" />
              <Link href={`/products/${p.slug}`} className="mt-2 block text-sm font-extrabold leading-tight hover:text-brand sm:mt-3 sm:text-lg">{p.name}</Link>
              <span className="mt-0.5 line-clamp-2 block text-ink-muted">{p.tagline}</span><Rating rating={p.rating} reviews={p.reviews} className="mt-1" /></th>))}</tr></thead>
          <tbody>{rows.map(([label, icon, fn, price]) => (
            <tr key={label} className="border-t border-line"><th scope="row" className="sticky left-0 z-10 bg-surface p-2.5 text-left font-bold sm:p-3"><span className="flex items-center gap-1.5 sm:gap-2"><Icon name={icon} className="hidden h-5 w-5 shrink-0 sm:block" />{label}</span></th>
              {items.map((p) => <td key={p.id} className={`border-l border-line p-2.5 sm:p-3 ${price ? "text-base font-extrabold text-brand sm:text-lg" : ""}`}>{fn(p)}</td>)}</tr>))}
            <tr className="border-t border-line"><td />{items.map((p) => <td key={p.id} className="border-l border-line p-2 sm:p-3"><button onClick={() => add(p.id)} className="btn-primary w-full px-2 py-2.5 text-xs sm:py-3 sm:text-sm"><Icon name="cart" className="hidden h-5 w-5 sm:block" />Add to cart</button></td>)}</tr></tbody>
        </table></div>
      )}
      {items.length > 2 && <p className="mt-3 text-center text-xs text-ink-muted sm:hidden">Swipe left or right to compare all {items.length} products</p>}
    </>
  );
}
