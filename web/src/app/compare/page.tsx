"use client";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageTitle } from "@/components/Page";
import { byId, products, taka } from "@/data/products";
import { useStore } from "@/lib/store";
import { useHydrated } from "@/lib/hooks";

const rows: [string, (p: ReturnType<typeof byId> & {}) => string][] = [
  ["Price", (p) => taka(p.price)], ["Rating", (p) => `${p.rating} (${p.reviews.toLocaleString("en-US")})`], ["Brand", (p) => p.brand],
  ["Connectivity", (p) => (p.wireless ? "Bluetooth wireless" : "Wired / n/a")], ["Warranty", (p) => p.warranty], ["Availability", (p) => (p.inStock ? "In stock" : "Out of stock")],
];

export default function Compare() {
  const ids = useStore((s) => s.compare); const toggle = useStore((s) => s.toggleCompare); const add = useStore((s) => s.addToCart);
  const ready = useHydrated();
  const items = (ready ? ids : []).map(byId).filter(Boolean) as typeof products;
  const suggestions = products.filter((p) => p.category === "headphones" && !ids.includes(p.id)).slice(0, 3);
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Compare" }]} />
      <PageTitle title="Compare products" sub="Compare up to 4 products side by side." />
      {items.length === 0 ? (
        <div className="card p-10 text-center"><p className="font-bold">Nothing to compare yet.</p><p className="mt-1 text-ink-muted">Use “+ Compare” on any product card.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">{suggestions.map((p) => <button key={p.id} className="btn-outline" onClick={() => toggle(p.id)}>+ {p.name}</button>)}</div></div>
      ) : (
        <div className="overflow-x-auto"><table className="card w-full min-w-[520px] border-collapse text-sm">
          <caption className="sr-only">Product comparison</caption>
          <thead><tr><td className="w-28 p-3" />{items.map((p) => (
            <th key={p.id} scope="col" className="border-l border-line p-3 text-left align-top"><Image src={p.image} alt={p.name} width={140} height={140} className="mx-auto h-28 w-auto object-contain" />
              <Link href={`/products/${p.slug}`} className="mt-2 block font-bold hover:text-brand">{p.name}</Link>
              <button onClick={() => toggle(p.id)} className="text-xs font-normal text-ink-muted hover:text-red-600">Remove</button></th>))}</tr></thead>
          <tbody>{rows.map(([label, fn]) => <tr key={label} className="border-t border-line"><th scope="row" className="p-3 text-left font-semibold text-ink-muted">{label}</th>{items.map((p) => <td key={p.id} className="border-l border-line p-3">{fn(p)}</td>)}</tr>)}
            <tr className="border-t border-line"><td />{items.map((p) => <td key={p.id} className="border-l border-line p-3"><button onClick={() => add(p.id)} className="btn-primary w-full">Add to cart</button></td>)}</tr></tbody>
        </table></div>
      )}
    </>
  );
}
