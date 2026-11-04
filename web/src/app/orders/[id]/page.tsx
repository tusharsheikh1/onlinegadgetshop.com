import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { PageTitle } from "@/components/Page";
import { orders } from "@/data/content";
import { byId, taka } from "@/data/products";

export function generateStaticParams() { return orders.map((o) => ({ id: o.id })); }
export function generateMetadata({ params }: { params: { id: string } }): Metadata { return { title: `Order ${params.id}` }; }
const steps = [["Ordered", "check", "Nov 4, 10:14 AM"], ["Confirmed", "check", "Nov 4, 10:20 AM"], ["Packing", "box", "We're packing your items for shipment."], ["Shipped", "truck", ""], ["Delivered", "check", ""]];

export default function OrderDetail({ params }: { params: { id: string } }) {
  const o = orders.find((x) => x.id === params.id); if (!o) notFound();
  const done = o.status === "Delivered"; const at = done ? 4 : 2;
  const items = o.items.map(byId).filter(Boolean) as NonNullable<ReturnType<typeof byId>>[];
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Orders", href: "/orders" }, { label: `Order ${o.id}` }]} />
      <PageTitle title="Order Details & Tracking" sub="Track your order, see item details, delivery info, and the total amount." />
      <div className="grid items-start gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-6">
          <section className="card p-6">
            <div className="flex items-start justify-between gap-3"><div><h2 className="text-2xl font-extrabold">Order {o.id}</h2><p className="text-ink-muted">Placed on {o.date.replace(",", "")}</p></div>
              <span className="rounded-lg bg-brand-soft px-3 py-1.5 text-sm font-semibold text-brand">{done ? "Delivered" : "In Progress"}</span></div>
            <ol className="relative mt-8 grid grid-cols-5 gap-1" aria-label="Order progress">{steps.map(([s, icon, note], i) => (
              <li key={s} className="relative flex min-w-0 flex-col items-center text-center" aria-current={i === at && !done ? "step" : undefined}>
                {i > 0 && <span aria-hidden className={`absolute right-1/2 top-[18px] h-0.5 w-full sm:top-6 ${i <= at ? "bg-brand" : "bg-line"}`} />}
                <span className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full sm:h-12 sm:w-12 ${i < at || (done && i === at) ? "bg-brand text-white" : i === at ? "bg-brand text-white ring-4 ring-brand-soft" : "border-2 border-line bg-white text-ink-faint"}`}><Icon name={i < at || (done && i === at) ? "check" : icon} className="h-5 w-5 sm:h-6 sm:w-6" /></span>
                <span className={`mt-2 text-[11px] font-bold leading-tight sm:text-base ${i === at && !done ? "text-brand" : i > at ? "text-ink-muted" : ""}`}>{s}</span>
                <span className="hidden text-xs text-ink-muted sm:block">{i <= at && i < 2 ? note : i === at && !done ? note : ""}</span></li>))}</ol>
            {!done && <div className="mt-6 flex items-center gap-4 rounded-xl bg-brand-soft p-4"><Icon name="box" className="h-9 w-9 shrink-0 text-brand" /><div><p className="font-bold">Packing your order</p><p className="text-sm text-ink-muted">We&apos;re carefully packing your items. You&apos;ll get an update once it&apos;s shipped.</p></div></div>}
          </section>
          <section className="card p-6"><h2 className="text-xl font-extrabold">Items in this order ({items.length})</h2>
            <ul className="mt-4 divide-y divide-line">{items.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"><Image src={p.image} alt="" width={96} height={96} className="h-16 w-16 shrink-0 rounded-xl bg-surface object-contain p-2 sm:h-24 sm:w-24" />
                <div className="min-w-0 flex-1"><p className="text-lg font-extrabold">{p.name}</p><p className="text-sm text-ink-muted">{p.tagline}</p><p className="mt-1 text-sm text-ink-muted">Qty: 1</p></div><p className="text-lg font-extrabold">{taka(p.price)}</p></li>))}</ul></section>
        </div>
        <aside className="space-y-4">
          <section className="card p-5"><h2 className="flex items-center gap-2 text-lg font-extrabold"><Icon name="pin" className="h-5 w-5 text-brand" />Delivery Address</h2><p className="mt-2 font-bold">Samira Rahman</p><p className="text-sm text-ink-muted">House 12, Road 5, Dhanmondi<br />Dhaka 1205<br />+880 1712 345 678</p></section>
          <section className="card p-5"><h2 className="text-lg font-extrabold">Order Summary</h2><dl className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><dt>Items ({items.length})</dt><dd>{taka(o.total - 120)}</dd></div><div className="flex justify-between"><dt>Delivery Fee</dt><dd>{taka(120)}</dd></div><div className="flex justify-between border-t border-line pt-3 text-lg font-extrabold"><dt>Total</dt><dd className="text-brand">{taka(o.total)}</dd></div></dl></section>
          <section className="card p-5"><h2 className="flex items-center gap-2 text-lg font-extrabold"><Icon name="calendar" className="h-5 w-5 text-brand" />Estimated Delivery</h2><p className="mt-2 text-2xl font-extrabold text-brand">Nov 7 – 9, 2026</p><p className="mt-1 text-sm text-ink-muted">Your order is expected to be delivered within this date range.</p></section>
          <Link href="/orders" className="btn-primary w-full py-3"><Icon name="truck" className="h-5 w-5" />Track Order</Link>
          <Link href="/contact" className="btn-outline w-full py-3"><Icon name="headset" className="h-5 w-5" />Get Support</Link>
        </aside>
      </div>
    </>
  );
}
