"use client";
import Image from "next/image";
import { useState } from "react";
import { Product, taka } from "@/data/products";
import { useStore } from "@/lib/store";
import { Icon } from "./Icon";
import { Rating } from "./Stars";

const gallery = ["gallery-1", "gallery-2", "gallery-3", "gallery-4"];
const colors = [{ n: "Black", i: "color-1" }, { n: "Beige", i: "color-2" }, { n: "Navy", i: "color-3" }];
const features = ["High-fidelity, immersive audio", "Hybrid Active Noise Cancellation (up to 35 dB)", "Up to 60 hours of battery life", "Comfortable, lightweight over-ear design", "Dual connectivity: Bluetooth 5.3 and 3.5 mm", "USB-C fast charging"];

export function ProductDetail({ p }: { p: Product }) {
  const rich = p.id === "aerosound-pro";
  const [img, setImg] = useState(p.image);
  const [color, setColor] = useState("Black");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useStore((s) => s.addToCart);
  const wished = useStore((s) => s.wishlist.includes(p.id));
  const toggle = useStore((s) => s.toggleWishlist);
  const specs = p.specs ?? { Brand: p.brand, Category: p.category, Warranty: p.warranty, Availability: p.inStock ? "In stock" : "Out of stock" };
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          {rich && <div className="flex gap-3 sm:flex-col" role="list">{gallery.map((g) => (
            <button key={g} role="listitem" onClick={() => setImg(`/img/${g}.png`)} aria-label="View image" className={`overflow-hidden rounded-xl border-2 bg-surface ${img === `/img/${g}.png` ? "border-brand" : "border-line"}`}><Image src={`/img/${g}.png`} alt="" width={90} height={90} className="h-16 w-16 object-contain sm:h-[88px] sm:w-[88px]" /></button>))}</div>}
          <div className="flex flex-1 items-center justify-center rounded-2xl bg-surface p-6"><Image src={img} alt={p.name} width={500} height={500} priority className="max-h-[460px] w-auto object-contain" /></div>
        </div>
        <div>
          {p.badge && <span className="badge">{p.badge}</span>}
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{p.name}</h1>
          <p className="mt-1 text-ink-muted">{p.tagline}</p>
          <Rating rating={p.rating} reviews={p.reviews} className="mt-3" />
          <hr className="my-4 border-line" />
          <div className="flex items-center gap-4"><span className="text-4xl font-extrabold">{taka(p.price)}</span>{p.oldPrice && <span className="text-lg text-ink-faint line-through">{taka(p.oldPrice)}</span>}
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${p.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>● {p.inStock ? "In stock" : "Out of stock"}</span></div>
          {rich && <div className="mt-5"><p className="mb-2 text-sm font-semibold">Color: <span className="font-bold">{color}</span></p>
            <div className="flex gap-3" role="radiogroup" aria-label="Color">{colors.map((c) => (
              <button key={c.n} role="radio" aria-checked={color === c.n} onClick={() => setColor(c.n)} className={`flex w-20 flex-col items-center rounded-xl border-2 bg-surface p-2 text-xs ${color === c.n ? "border-brand" : "border-line"}`}><Image src={`/img/${c.i}.png`} alt="" width={48} height={40} className="h-10 w-auto object-contain" />{c.n}</button>))}</div></div>}
          <p className="mb-2 mt-5 text-sm font-semibold">Quantity</p>
          <div className="flex gap-3">
            <div className="flex items-center rounded-xl border border-line"><button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><Icon name="minus" className="h-4 w-4" /></button><span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span><button aria-label="Increase quantity" onClick={() => setQty(Math.min(10, qty + 1))} className="p-3"><Icon name="plus" className="h-4 w-4" /></button></div>
            <button disabled={!p.inStock} onClick={() => { add(p.id, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); }} className="btn-primary flex-1 text-base"><Icon name="cart" />{added ? "Added ✓" : "Add to cart"}</button>
            <button onClick={() => toggle(p.id)} aria-pressed={wished} aria-label="Toggle wishlist" className={`btn-outline px-4 ${wished ? "text-red-500" : ""}`}><Icon name="heart" fill={wished} /></button>
          </div>
          <div className="mt-5 grid gap-3 rounded-xl border border-line bg-surface p-4 sm:grid-cols-2">
            <div className="flex gap-3"><Icon name="truck" className="h-7 w-7 shrink-0 text-brand" /><div><p className="font-bold">Delivery</p><p className="text-sm text-ink-muted">Dhaka: 1–2 days | Outside Dhaka: 2–4 days</p></div></div>
            <div className="flex gap-3"><Icon name="shield" className="h-7 w-7 shrink-0 text-brand" /><div><p className="font-bold">Warranty</p><p className="text-sm text-ink-muted">{p.warranty}</p></div></div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted"><Icon name="calendar" className="h-4 w-4" />Estimated delivery by <b className="text-navy">Nov 6 2026</b></p>
        </div>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section><h2 className="h2 mb-4">Specifications</h2>
          <dl className="card divide-y divide-line">{Object.entries(specs).map(([k, v]) => <div key={k} className="grid grid-cols-[140px_1fr] gap-4 px-4 py-2.5 text-sm sm:grid-cols-[180px_1fr]"><dt className="font-semibold text-ink-muted">{k}</dt><dd className="capitalize-first">{v}</dd></div>)}</dl></section>
        {rich && <section className="card h-fit bg-surface p-6"><h2 className="mb-4 text-xl font-extrabold">Key Features</h2><ul className="space-y-3">{features.map((f) => <li key={f} className="flex gap-3 text-sm"><Icon name="check" className="h-5 w-5 shrink-0 text-brand" />{f}</li>)}</ul></section>}
      </div>
    </div>
  );
}
