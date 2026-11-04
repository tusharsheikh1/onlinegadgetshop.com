"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { PageTitle } from "@/components/Page";
import { byId, taka, Product } from "@/data/products";
import { useHydrated } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { totals } from "@/lib/totals";

export default function Cart() {
  const cart = useStore((s) => s.cart); const setQty = useStore((s) => s.setQty); const remove = useStore((s) => s.removeFromCart);
  const ready = useHydrated();
  const [code, setCode] = useState(""); const [disc, setDisc] = useState(0); const [msg, setMsg] = useState("");
  const lines = ready ? cart : [];
  const t = totals(lines, disc);
  const apply = (e: React.FormEvent) => { e.preventDefault(); if (code.trim().toUpperCase() === "GADGET10") { setDisc(0.1); setMsg("Coupon applied: 10% off"); } else { setDisc(0); setMsg("Invalid coupon code"); } };
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <PageTitle title="Shopping cart" />
      {lines.length === 0 ? <div className="card p-10 text-center"><p className="font-bold">Your cart is empty.</p><Link href="/products" className="btn-primary mt-4">Continue shopping</Link></div> : (
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <ul className="space-y-4">{lines.map((l) => { const p = byId(l.id) as Product; return (
            <li key={l.id} className="card flex flex-wrap items-center gap-4 p-4">
              <Image src={p.image} alt={p.name} width={96} height={96} className="h-24 w-24 rounded-lg bg-surface object-contain p-2" />
              <div className="min-w-[140px] flex-1"><Link href={`/products/${p.slug}`} className="font-bold hover:text-brand">{p.name}</Link><p className="text-sm text-ink-muted">{taka(p.price)} each</p></div>
              <div className="flex items-center rounded-xl border border-line"><button aria-label={`Decrease quantity of ${p.name}`} onClick={() => setQty(l.id, l.qty - 1)} className="p-2.5"><Icon name="minus" className="h-4 w-4" /></button><span className="w-8 text-center font-semibold">{l.qty}</span><button aria-label={`Increase quantity of ${p.name}`} onClick={() => setQty(l.id, l.qty + 1)} className="p-2.5"><Icon name="plus" className="h-4 w-4" /></button></div>
              <p className="w-24 text-right font-extrabold">{taka(p.price * l.qty)}</p>
              <button aria-label={`Remove ${p.name}`} onClick={() => remove(l.id)} className="text-ink-muted hover:text-red-600"><Icon name="trash" /></button>
            </li>); })}</ul>
          <aside className="card h-fit p-6" aria-label="Order summary">
            <h2 className="text-xl font-extrabold">Order summary</h2>
            <form onSubmit={apply} className="mt-4 flex gap-2"><input className="input" placeholder="Coupon code (try GADGET10)" aria-label="Coupon code" value={code} onChange={(e) => setCode(e.target.value)} /><button className="btn-outline">Apply</button></form>
            {msg && <p role="status" className={`mt-2 text-sm ${disc ? "text-green-600" : "text-red-600"}`}>{msg}</p>}
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{taka(t.subtotal)}</dd></div>
              {t.disc > 0 && <div className="flex justify-between text-green-600"><dt>Discount</dt><dd>−{taka(t.disc)}</dd></div>}
              <div className="flex justify-between"><dt>Delivery (Dhaka)</dt><dd>{taka(t.delivery)}</dd></div>
              <div className="flex justify-between border-t border-line pt-3 text-lg font-extrabold"><dt>Total</dt><dd>{taka(t.total)}</dd></div>
            </dl>
            <Link href="/checkout" className="btn-primary mt-5 w-full py-3 text-base">Proceed to checkout</Link>
            <Link href="/products" className="mt-3 block text-center text-sm font-medium text-brand">Continue shopping</Link>
          </aside>
        </div>)}
    </>
  );
}
