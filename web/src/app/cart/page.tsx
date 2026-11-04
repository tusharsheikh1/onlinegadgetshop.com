"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { PageTitle } from "@/components/Page";
import { Trust } from "@/components/Trust";
import { byId, taka, Product } from "@/data/products";
import { useHydrated } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { totals } from "@/lib/totals";

export default function Cart() {
  const cart = useStore((s) => s.cart); const setQty = useStore((s) => s.setQty); const remove = useStore((s) => s.removeFromCart);
  const ready = useHydrated();
  const [code, setCode] = useState(""); const [disc, setDisc] = useState(0); const [msg, setMsg] = useState("");
  const lines = ready ? cart : [];
  const t = totals(lines, disc); const n = lines.reduce((a, l) => a + l.qty, 0);
  const apply = (e: React.FormEvent) => { e.preventDefault(); if (code.trim().toUpperCase() === "GADGET10") { setDisc(0.1); setMsg("Coupon applied: 10% off"); } else { setDisc(0); setMsg("Invalid coupon code"); } };
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <PageTitle title="Your Shopping Cart" sub="Review your items and proceed to checkout." />
      {lines.length === 0 ? <div className="card p-10 text-center"><p className="font-bold">Your cart is empty.</p><Link href="/products" className="btn-primary mt-4">Continue shopping</Link></div> : (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_400px]">
          <div>
            <section className="card p-4 sm:p-6"><h2 className="mb-4 text-xl font-extrabold">{lines.length} Item{lines.length > 1 ? "s" : ""} in Your Cart</h2>
              <ul className="divide-y divide-line">{lines.map((l) => { const p = byId(l.id) as Product; return (
                <li key={l.id} className="flex flex-wrap items-center gap-x-5 gap-y-3 py-4 first:pt-0 last:pb-0">
                  <Image src={p.image} alt={p.name} width={120} height={120} className="h-24 w-24 rounded-xl bg-surface object-contain p-2 sm:h-28 sm:w-28" />
                  <div className="min-w-[150px] flex-1"><Link href={`/products/${p.slug}`} className="text-lg font-extrabold hover:text-brand">{p.name}</Link><p className="text-sm text-ink-muted">{p.tagline}</p>
                    <span className="mt-2 inline-block rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700">● In Stock</span></div>
                  <p className="text-lg font-extrabold">{taka(p.price)}</p>
                  <div className="flex items-center rounded-xl border border-line"><button aria-label={`Decrease quantity of ${p.name}`} onClick={() => setQty(l.id, l.qty - 1)} className="p-2.5"><Icon name="minus" className="h-4 w-4" /></button><span className="w-8 text-center font-semibold">{l.qty}</span><button aria-label={`Increase quantity of ${p.name}`} onClick={() => setQty(l.id, l.qty + 1)} className="p-2.5"><Icon name="plus" className="h-4 w-4" /></button></div>
                  <button aria-label={`Remove ${p.name}`} onClick={() => remove(l.id)} className="text-ink-muted hover:text-red-600"><Icon name="trash" /></button>
                </li>); })}</ul></section>
            <Link href="/products" className="mt-4 inline-flex items-center gap-2 font-semibold text-brand"><Icon name="chevronL" className="h-4 w-4" />Continue Shopping</Link>
          </div>
          <aside className="card p-6" aria-label="Order summary">
            <h2 className="text-xl font-extrabold">Order Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt>Subtotal ({n} item{n > 1 ? "s" : ""})</dt><dd className="font-semibold">{taka(t.subtotal)}</dd></div>
              {t.disc > 0 && <div className="flex justify-between text-green-600"><dt>Discount</dt><dd>−{taka(t.disc)}</dd></div>}
              <div className="flex justify-between"><dt>Delivery</dt><dd className="font-semibold">{taka(t.delivery)}</dd></div>
              <div className="flex items-center justify-between border-t border-line pt-4 text-xl font-extrabold"><dt>Total</dt><dd>{taka(t.total)}</dd></div>
            </dl>
            <form onSubmit={apply} className="mt-5 flex gap-2"><input className="input" placeholder="Enter coupon code (GADGET10)" aria-label="Coupon code" value={code} onChange={(e) => setCode(e.target.value)} /><button className="btn-primary">Apply</button></form>
            {msg && <p role="status" className={`mt-2 text-sm ${disc ? "text-green-600" : "text-red-600"}`}>{msg}</p>}
            <Link href="/checkout" className="btn-primary mt-5 w-full py-3.5 text-base"><Icon name="lock" className="h-5 w-5" />Proceed to Checkout</Link>
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-ink-muted"><Icon name="shield" className="h-5 w-5" />Secure checkout. Your data is protected.</p>
          </aside>
        </div>)}
      <div className="mt-8 border-t border-line"><Trust /></div>
    </>
  );
}
