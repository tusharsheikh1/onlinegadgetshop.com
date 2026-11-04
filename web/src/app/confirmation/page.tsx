"use client";
import Link from "next/link";
import Image from "next/image";
import { byId, taka } from "@/data/products";
import { Icon } from "@/components/Icon";
import { useHydrated } from "@/lib/hooks";
import { useStore } from "@/lib/store";

export default function Confirmation() {
  const o = useStore((s) => s.lastOrder); const ready = useHydrated();
  if (!ready) return null;
  if (!o) return <div className="py-16 text-center"><p className="font-bold">No recent order found.</p><Link href="/products" className="btn-primary mt-4">Continue shopping</Link></div>;
  return (
    <div className="mx-auto max-w-2xl py-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"><Icon name="check" className="h-8 w-8" /></div>
      <h1 className="h1 mt-5">Thank you for your order</h1>
      <p className="mt-2 text-ink-muted">Your order <b className="text-navy">{o.id}</b> has been placed.</p>
      <dl className="card mt-8 grid gap-4 p-6 text-left sm:grid-cols-3">
        <div><dt className="text-sm text-ink-muted">Total</dt><dd className="font-extrabold">{taka(o.total)}</dd></div>
        <div><dt className="text-sm text-ink-muted">Payment</dt><dd className="font-semibold">{o.payment}</dd></div>
        <div><dt className="text-sm text-ink-muted">Estimated delivery</dt><dd className="font-semibold">Nov 7–9 2026</dd></div></dl>
      <ul className="mt-6 flex justify-center gap-4">{o.lines.map((l) => { const p = byId(l.id); return p ? <li key={l.id}><Image src={p.image} alt={p.name} width={80} height={80} className="h-20 w-20 rounded-lg bg-surface object-contain p-2" /></li> : null; })}</ul>
      <Link href="/orders/GH-10428" className="btn-primary mt-8">Track order</Link>
    </div>
  );
}
