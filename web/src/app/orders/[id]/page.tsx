import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AccountShell } from "@/components/AccountNav";
import { Icon } from "@/components/Icon";
import { orders } from "@/data/content";
import { byId, taka } from "@/data/products";

export function generateStaticParams() { return orders.map((o) => ({ id: o.id })); }
export function generateMetadata({ params }: { params: { id: string } }): Metadata { return { title: `Order ${params.id}` }; }
const steps = ["Ordered", "Confirmed", "Packing", "Shipped", "Delivered"];

export default function OrderDetail({ params }: { params: { id: string } }) {
  const o = orders.find((x) => x.id === params.id); if (!o) notFound();
  const at = o.status === "Delivered" ? 4 : 2;
  return (
    <AccountShell title={`Order ${o.id}`}>
      <p className="-mt-4 mb-6 text-ink-muted">Placed {o.date}</p>
      <ol className="card flex justify-between gap-2 p-6" aria-label="Order progress">{steps.map((s, i) => (
        <li key={s} className="flex flex-1 flex-col items-center gap-2 text-center text-xs font-semibold sm:text-sm" aria-current={i === at ? "step" : undefined}>
          <span className={`flex h-9 w-9 items-center justify-center rounded-full ${i < at ? "bg-brand text-white" : i === at ? "border-2 border-brand bg-brand-soft text-brand" : "bg-surface text-ink-faint"}`}>{i < at || (i === at && o.status === "Delivered") ? <Icon name="check" className="h-5 w-5" /> : i + 1}</span><span className={i <= at ? "" : "text-ink-faint"}>{s}</span></li>))}</ol>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="card p-6"><h2 className="text-lg font-extrabold">Items</h2><ul className="mt-3 space-y-3">{o.items.map((id) => { const p = byId(id); return p ? <li key={id} className="flex items-center gap-3"><Image src={p.image} alt="" width={56} height={56} className="h-14 w-14 rounded-lg bg-surface object-contain p-1" /><span className="flex-1 font-medium">{p.name}</span><span className="font-bold">{taka(p.price)}</span></li> : null; })}</ul>
          <p className="mt-4 flex justify-between border-t border-line pt-3 font-extrabold"><span>Total</span><span>{taka(o.total)}</span></p></section>
        <section className="card p-6"><h2 className="text-lg font-extrabold">Delivery</h2><p className="mt-3 text-ink-muted">Samira Rahman<br />House 12, Road 5, Dhanmondi, Dhaka 1205</p>
          <p className="mt-4 flex items-center gap-2 text-sm"><Icon name="calendar" className="h-4 w-4" />Estimated delivery: <b>Nov 7–9 2026</b></p></section>
      </div>
    </AccountShell>
  );
}
