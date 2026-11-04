"use client";
import Link from "next/link";
import Image from "next/image";
import { byId, taka } from "@/data/products";
import { Icon } from "@/components/Icon";
import { useHydrated } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { DELIVERY_FEE } from "@/lib/store";

const next = [["truck", "We'll prepare your order", "We'll pack your items and get them ready for delivery."], ["bell", "Get delivery updates", "Track your order in real time and know when it's arriving."], ["headset", "Need help?", "Our support team is here to help you with your order."]];

export default function Confirmation() {
  const o = useStore((s) => s.lastOrder); const ready = useHydrated();
  if (!ready) return null;
  if (!o) return <div className="py-16 text-center"><p className="font-bold">No recent order found.</p><Link href="/products" className="btn-primary mt-4">Continue shopping</Link></div>;
  const n = o.lines.reduce((a, l) => a + l.qty, 0);
  return (
    <div className="py-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white"><Icon name="check" className="h-9 w-9" /></div>
        <h1 className="h1 mt-5">Thank you for your order!</h1>
        <p className="mt-2 text-ink-muted">Your order has been placed successfully with GadgetHub.</p>
        <p className="mt-4 inline-block rounded-full bg-brand-soft px-6 py-2.5 text-lg font-bold text-brand">Order Number: {o.id}</p>
      </div>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="card p-6"><h2 className="text-xl font-extrabold">Ordered Items ({n})</h2>
          <ul className="mt-4 divide-y divide-line">{o.lines.map((l) => { const p = byId(l.id); return p ? (
            <li key={l.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"><Image src={p.image} alt={p.name} width={96} height={96} className="h-24 w-24 rounded-xl bg-surface object-contain p-2" />
              <div className="flex-1"><p className="text-lg font-extrabold">{p.name}</p><p className="text-sm text-ink-muted">{p.tagline}</p><p className="mt-2 text-sm text-ink-muted">Qty: {l.qty}</p></div><p className="text-lg font-extrabold">{taka(p.price * l.qty)}</p></li>) : null; })}</ul></section>
        <aside className="card p-6"><h2 className="text-xl font-extrabold">Order Summary</h2>
          <dl className="mt-4 space-y-3 text-sm"><div className="flex justify-between"><dt className="flex items-center gap-2 text-ink-muted"><Icon name="truck" className="h-5 w-5" />Estimated Delivery</dt><dd className="font-bold">Nov 7 – 9, 2026</dd></div>
            <div className="flex justify-between"><dt className="flex items-center gap-2 text-ink-muted"><Icon name="tag" className="h-5 w-5" />Payment Method</dt><dd className="font-bold">{o.payment}</dd></div>
            <div className="flex justify-between border-t border-line pt-3"><dt className="text-ink-muted">Subtotal ({n} items)</dt><dd>{taka(o.total - DELIVERY_FEE)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Delivery Fee</dt><dd>{taka(DELIVERY_FEE)}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-xl font-extrabold"><dt>Total</dt><dd className="text-brand">{taka(o.total)}</dd></div></dl>
          <Link href="/orders/GH-10428" className="btn-primary mt-5 w-full py-3"><Icon name="pin" className="h-5 w-5" />Track Order</Link></aside>
      </div>
      <h2 className="h2 mb-4 mt-10">What&apos;s next?</h2>
      <ul className="grid gap-4 md:grid-cols-3">{next.map(([i, t, d]) => <li key={t} className="card flex gap-4 p-5"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon name={i} className="h-7 w-7" /></span><div><p className="font-bold">{t}</p><p className="mt-1 text-sm text-ink-muted">{d}</p></div></li>)}</ul>
    </div>
  );
}
