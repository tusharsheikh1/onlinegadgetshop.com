"use client";
import Link from "next/link";
import Image from "next/image";
import { byId, taka } from "@/data/products";
import { Icon } from "@/components/Icon";
import { useHydrated } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { DELIVERY_FEE } from "@/lib/pricing";
import { EmptyState } from "@/components/EmptyState";

const next = [["truck", "We'll prepare your order", "We'll pack your items and get them ready for delivery."], ["bell", "Get delivery updates", "Track your order in real time and know when it's arriving."], ["headset", "Need help?", "Our support team is here to help you with your order."]];

export default function Confirmation() {
  const o = useStore((s) => s.lastOrder); const ready = useHydrated();
  if (!ready) return null;
  if (!o) return <EmptyState className="mt-6" icon="box" title="No recent order found" text="Once you place an order, its confirmation will appear here."><Link href="/products" className="btn-primary">Continue shopping</Link></EmptyState>;
  const n = o.lines.reduce((a, l) => a + l.qty, 0);
  return (
    <div className="py-5 sm:py-8">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white sm:h-16 sm:w-16"><Icon name="check" className="h-8 w-8 sm:h-9 sm:w-9" /></div>
        <h1 className="h1 mt-4 text-[22px] sm:mt-5 sm:text-4xl">Thank you for your order!</h1>
        <p className="mt-1.5 text-sm text-ink-muted sm:mt-2 sm:text-base">Your order has been placed successfully with GadgetHub.</p>
        <p className="mt-3 inline-block rounded-full bg-brand-soft px-4 py-2 text-base font-bold text-brand sm:mt-4 sm:px-6 sm:py-2.5 sm:text-lg">Order Number: {o.id}</p>
      </div>
      <div className="mt-6 grid items-start gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[1.6fr_1fr]">
        <section className="card p-4 sm:p-6"><h2 className="text-lg font-extrabold sm:text-xl">Ordered Items ({n})</h2>
          <ul className="mt-3 divide-y divide-line sm:mt-4">{o.lines.map((l) => { const p = byId(l.id); return p ? (
            <li key={l.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 sm:gap-4 sm:py-4"><Image src={p.image} alt="" width={96} height={96} className="h-16 w-16 shrink-0 rounded-xl bg-surface object-contain p-1.5 sm:h-24 sm:w-24 sm:p-2" />
              <div className="min-w-0 flex-1"><p className="font-extrabold leading-snug sm:text-lg">{p.name}</p><p className="line-clamp-2 text-xs text-ink-muted sm:text-sm">{p.tagline}</p><p className="mt-1 text-xs text-ink-muted sm:mt-2 sm:text-sm">Qty: {l.qty}</p></div><p className="shrink-0 font-extrabold sm:text-lg">{taka(p.price * l.qty)}</p></li>) : null; })}</ul></section>
        {/* Phones show the key facts and Track Order first; desktop keeps them in the right column. */}
        <aside className="card order-first p-4 sm:p-6 lg:order-none"><h2 className="text-lg font-extrabold sm:text-xl">Order Summary</h2>
          <dl className="mt-3 space-y-3 text-sm sm:mt-4"><div className="flex justify-between"><dt className="flex items-center gap-2 text-ink-muted"><Icon name="truck" className="h-5 w-5" />Estimated Delivery</dt><dd className="font-bold">Nov 7 – 9, 2026</dd></div>
            <div className="flex justify-between"><dt className="flex items-center gap-2 text-ink-muted"><Icon name="tag" className="h-5 w-5" />Payment Method</dt><dd className="font-bold">{o.payment}</dd></div>
            <div className="flex justify-between border-t border-line pt-3"><dt className="text-ink-muted">Subtotal ({n} items)</dt><dd>{taka(o.total - DELIVERY_FEE)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink-muted">Delivery Fee</dt><dd>{taka(DELIVERY_FEE)}</dd></div>
            <div className="flex justify-between border-t border-line pt-3 text-lg font-extrabold sm:text-xl"><dt>Total</dt><dd className="text-brand">{taka(o.total)}</dd></div></dl>
          <Link href="/orders/GH-10428" className="btn-primary mt-4 w-full py-3 sm:mt-5"><Icon name="pin" className="h-5 w-5" />Track Order</Link></aside>
      </div>
      <h2 className="h2 mb-3 mt-8 sm:mb-4 sm:mt-10">What&apos;s next?</h2>
      <ul className="grid gap-3 sm:gap-4 md:grid-cols-3">{next.map(([i, t, d]) => <li key={t} className="card flex gap-3 p-4 sm:gap-4 sm:p-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand sm:h-14 sm:w-14"><Icon name={i} className="h-6 w-6 sm:h-7 sm:w-7" /></span><div><p className="font-bold">{t}</p><p className="mt-1 text-sm text-ink-muted">{d}</p></div></li>)}</ul>
    </div>
  );
}
