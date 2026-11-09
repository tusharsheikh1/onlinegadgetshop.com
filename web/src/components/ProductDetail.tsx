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
      <div className="grid gap-5 sm:gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          {rich && <div className="flex gap-3 sm:flex-col" role="list">{gallery.map((g) => (
            <button key={g} role="listitem" onClick={() => setImg(`/img/${g}.png`)} aria-label="View image" className={`img-well rounded-xl p-1.5 ring-2 transition ${img === `/img/${g}.png` ? "ring-brand" : "ring-transparent hover:ring-line"}`}><Image src={`/img/${g}.png`} alt="" width={90} height={90} className="h-12 w-12 object-contain sm:h-[76px] sm:w-[76px]" /></button>))}</div>}
          <div className="img-well aspect-square flex-1 rounded-3xl p-8 sm:p-14"><Image src={img} alt={p.name} width={560} height={560} priority className="h-full w-full object-contain" /></div>
        </div>
        <div>
          {(p.kicker ?? p.badge) && <span className="badge">{p.kicker ?? p.badge}</span>}
          <p className="mt-3 text-xs font-semibold uppercase tracking-[.14em] text-ink-faint">{p.brand}</p><h1 className="mt-1 text-[28px] font-extrabold leading-[1.1] tracking-[-.025em] sm:text-[42px]">{p.name}</h1>
          <p className="mt-1 text-sm text-ink-muted sm:text-base">{p.tagline}</p>
          <Rating rating={p.rating} reviews={p.reviews} className="mt-2 sm:mt-3" />
          <hr className="my-3 border-line sm:my-4" />
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-4"><span className="text-3xl font-extrabold sm:text-4xl">{taka(p.price)}</span>{p.oldPrice && <span className="text-lg text-ink-faint line-through">{taka(p.oldPrice)}</span>}
            <span className={`rounded-full px-3 py-1 text-xs font-semibold sm:text-sm ${p.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>● {p.inStock ? "In stock" : "Out of stock"}</span></div>
          {rich && <div className="mt-4 sm:mt-5"><p className="mb-2 text-sm font-semibold">Color: <span className="font-bold">{color}</span></p>
            <div className="flex gap-3" role="radiogroup" aria-label="Color">{colors.map((c) => (
              <button key={c.n} role="radio" aria-checked={color === c.n} onClick={() => setColor(c.n)} className={`flex items-center gap-2 rounded-xl border bg-white px-2.5 py-1.5 text-xs font-medium transition sm:w-20 sm:flex-col sm:gap-1 sm:p-2 ${color === c.n ? "border-brand ring-2 ring-brand/20" : "border-line hover:border-navy/20"}`}><Image src={`/img/${c.i}.png`} alt="" width={48} height={48} className="h-8 w-8 object-contain mix-blend-multiply sm:h-10 sm:w-10" />{c.n}</button>))}</div></div>}
          <div className="mt-4 flex items-center gap-3 sm:mt-5 sm:block">
          <p className="text-sm font-semibold sm:mb-2">Quantity</p>
          <div className="flex flex-1 gap-3">
            <div className="flex items-center rounded-xl border border-line"><button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="p-3"><Icon name="minus" className="h-4 w-4" /></button><span className="w-8 text-center font-semibold" aria-live="polite">{qty}</span><button aria-label="Increase quantity" onClick={() => setQty(Math.min(10, qty + 1))} className="p-3"><Icon name="plus" className="h-4 w-4" /></button></div>
            <button disabled={!p.inStock} onClick={() => { add(p.id, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); }} className="btn-primary hidden h-12 flex-1 text-base lg:inline-flex"><Icon name="cart" />{added ? "Added ✓" : "Add to cart"}</button>
            <button onClick={() => toggle(p.id)} aria-pressed={wished} aria-label="Toggle wishlist" className={`btn-outline ml-auto h-12 px-4 lg:ml-0 ${wished ? "text-red-500" : ""}`}><Icon name="heart" fill={wished} /></button>
          </div>
          </div>
          <div className="mt-4 grid gap-3 rounded-xl border border-line bg-surface p-3 sm:mt-5 sm:grid-cols-2 sm:p-4">
            <div className="flex gap-3"><Icon name="truck" className="h-7 w-7 shrink-0 text-brand" /><div><p className="font-bold">Delivery</p><p className="text-sm text-ink-muted">Dhaka: 1–2 days | Outside Dhaka: 2–4 days</p></div></div>
            <div className="flex gap-3"><Icon name="shield" className="h-7 w-7 shrink-0 text-brand" /><div><p className="font-bold">Warranty</p><p className="text-sm text-ink-muted">{p.warranty}</p></div></div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted"><Icon name="calendar" className="h-4 w-4" />Estimated delivery by <b className="text-navy">Nov 6 2026</b></p>
        </div>
      </div>
      <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:grid-cols-[1.4fr_1fr]">
        <section><h2 className="h2 mb-3 sm:mb-4">Specifications</h2>
          <dl className="card divide-y divide-line overflow-hidden">{Object.entries(specs).map(([k, v]) => <div key={k} className="grid grid-cols-[112px_1fr] gap-3 px-3 py-2 text-[13px] sm:grid-cols-[180px_1fr] sm:gap-4 sm:px-4 sm:py-2.5 sm:text-sm"><dt className="font-semibold text-ink-muted">{k}</dt><dd>{v}</dd></div>)}</dl></section>
        {rich && <section className="h-fit rounded-2xl bg-surface p-5 sm:p-7"><h2 className="mb-3 text-lg font-extrabold sm:mb-4 sm:text-xl">Key Features</h2><ul className="space-y-3">{features.map((f) => <li key={f} className="flex gap-3 text-sm"><Icon name="check" className="h-5 w-5 shrink-0 text-brand" />{f}</li>)}</ul></section>}
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-line bg-white/95 px-4 py-3 shadow-pop backdrop-blur lg:hidden">
        <div className="min-w-0"><p className="text-xl font-extrabold leading-tight">{taka(p.price)}</p><p className="truncate text-xs text-ink-muted">{p.name}</p></div>
        <button disabled={!p.inStock} onClick={() => { add(p.id, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); }} className="btn-primary shrink-0 px-6"><Icon name="cart" className="h-5 w-5" />{added ? "Added ✓" : "Add to cart"}</button>
      </div>
      <div aria-hidden className="h-16 lg:hidden" />
    </div>
  );
}
