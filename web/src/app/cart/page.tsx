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
      <PageTitle title={<><span className="sm:hidden">Your Cart{n > 0 && ` (${n} item${n > 1 ? "s" : ""})`}</span><span className="hidden sm:inline">Your Shopping Cart</span></>} sub="Review your items and proceed to checkout." />
      {lines.length === 0 ? <div className="card p-10 text-center"><p className="font-bold">Your cart is empty.</p><Link href="/products" className="btn-primary mt-4">Continue shopping</Link></div> : (
        <div className="grid items-start gap-5 sm:gap-6 lg:grid-cols-[1fr_400px]">
          <div>
            <section className="sm:card sm:p-6" aria-labelledby="cart-items"><h2 id="cart-items" className="sr-only text-xl font-extrabold sm:not-sr-only sm:mb-4">{lines.length} Item{lines.length > 1 ? "s" : ""} in Your Cart</h2>
              <ul className="space-y-3 sm:space-y-0 sm:divide-y sm:divide-line">{lines.map((l) => { const p = byId(l.id) as Product; return (
                <li key={l.id} className="card flex gap-3 p-3 sm:items-center sm:gap-5 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:py-4 sm:shadow-none sm:first:pt-0 sm:last:pb-0">
                  <Image src={p.image} alt="" width={120} height={120} className="h-[88px] w-[88px] shrink-0 rounded-xl bg-surface object-contain p-2 sm:h-28 sm:w-28" />
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-x-5 sm:gap-y-3">
                    <div className="min-w-0 sm:min-w-[150px] sm:flex-1">
                      <div className="flex items-start justify-between gap-2"><Link href={`/products/${p.slug}`} className="font-extrabold leading-snug hover:text-brand sm:text-lg">{p.name}</Link><p className="shrink-0 font-extrabold sm:hidden">{taka(p.price)}</p></div>
                      <p className="mt-0.5 line-clamp-2 text-xs text-ink-muted sm:text-sm">{p.tagline}</p>
                      <span className="mt-2 hidden rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 sm:inline-block">● In Stock</span>
                    </div>
                    <p className="hidden text-lg font-extrabold sm:block">{taka(p.price)}</p>
                    {/* On phones the stepper and trash share a row; from sm up they join the item row directly. */}
                    <div className="flex items-center justify-between sm:contents">
                      <div className="flex items-center rounded-xl border border-line"><button aria-label={`Decrease quantity of ${p.name}`} onClick={() => setQty(l.id, l.qty - 1)} className="p-2 sm:p-2.5"><Icon name="minus" className="h-4 w-4" /></button><span className="w-8 text-center font-semibold" aria-live="polite">{l.qty}</span><button aria-label={`Increase quantity of ${p.name}`} onClick={() => setQty(l.id, l.qty + 1)} className="p-2 sm:p-2.5"><Icon name="plus" className="h-4 w-4" /></button></div>
                      <button aria-label={`Remove ${p.name}`} onClick={() => remove(l.id)} className="p-1 text-ink-muted hover:text-red-600"><Icon name="trash" /></button>
                    </div>
                  </div>
                </li>); })}</ul></section>
            <Link href="/products" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand sm:mt-4 sm:text-base"><Icon name="chevronL" className="h-4 w-4" />Continue Shopping</Link>
          </div>
          <aside className="card p-4 sm:p-6" aria-label="Order summary">
            <h2 className="text-lg font-extrabold sm:text-xl">Order Summary</h2>
            <dl className="mt-3 space-y-2 text-sm sm:mt-4">
              <div className="flex justify-between"><dt>Subtotal ({n} item{n > 1 ? "s" : ""})</dt><dd className="font-semibold">{taka(t.subtotal)}</dd></div>
              {t.disc > 0 && <div className="flex justify-between text-green-600"><dt>Discount</dt><dd>−{taka(t.disc)}</dd></div>}
              <div className="flex justify-between"><dt>Delivery</dt><dd className="font-semibold">{taka(t.delivery)}</dd></div>
              <div className="flex items-center justify-between border-t border-line pt-3 text-lg font-extrabold sm:pt-4 sm:text-xl"><dt>Total</dt><dd>{taka(t.total)}</dd></div>
            </dl>
            <form onSubmit={apply} className="mt-4 flex gap-2 sm:mt-5"><input className="input" placeholder="Enter coupon code (GADGET10)" aria-label="Coupon code" value={code} onChange={(e) => setCode(e.target.value)} /><button className="btn-primary">Apply</button></form>
            {msg && <p role="status" className={`mt-2 text-sm ${disc ? "text-green-600" : "text-red-600"}`}>{msg}</p>}
            <Link href="/checkout" className="btn-primary mt-4 w-full py-3.5 text-base sm:mt-5"><Icon name="lock" className="h-5 w-5" />Proceed to Checkout</Link>
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-ink-muted"><Icon name="shield" className="h-5 w-5" />Secure checkout. Your data is protected.</p>
          </aside>
        </div>)}
      <div className="mt-6 border-t border-line sm:mt-8"><Trust /></div>
    </>
  );
}
