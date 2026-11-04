import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { PageTitle } from "@/components/Page";
import { orderItemCount, orders, orderSubtotal, orderTotal } from "@/data/content";
import { byId, taka } from "@/data/products";
import { DELIVERY_FEE } from "@/lib/pricing";

export function generateStaticParams() { return orders.map((o) => ({ id: o.id })); }
export function generateMetadata({ params }: { params: { id: string } }): Metadata { return { title: `Order ${params.id}` }; }
const steps = [["Ordered", "check"], ["Confirmed", "check"], ["Packing", "box"], ["Shipped", "truck"], ["Delivered", "check"]];

export default function OrderDetail({ params }: { params: { id: string } }) {
  const o = orders.find((x) => x.id === params.id); if (!o) notFound();
  const done = o.status === "Delivered"; const at = done ? 4 : 2;
  const day = o.date.replace(/, \d{4}$/, "");
  const notes = [`${day}, 10:14 AM`, `${day}, 10:20 AM`,
    done ? "Packed and handed to the courier" : "Your items are being packed for shipment.",
    done ? "On its way to you" : "Will be updated once your order is shipped.",
    done ? "Delivered to your address" : "Your order will be delivered to your address."];
  const state = (i: number) => (done || i < at ? "done" : i === at ? "current" : "todo");
  const lines = o.lines.map((l) => ({ ...l, p: byId(l.id) })).filter((l) => l.p);
  const n = orderItemCount(o);
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Orders", href: "/orders" }, { label: `Order ${o.id}` }]} />
      <PageTitle title="Order Details & Tracking" sub="Track your order, see item details, delivery info, and the total amount." />
      <div className="grid items-start gap-4 sm:gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-4 sm:space-y-6">
          <section className="card p-4 sm:p-6">
            <div className="flex items-start justify-between gap-3"><div><h2 className="text-xl font-extrabold sm:text-2xl">Order {o.id}</h2><p className="text-sm text-ink-muted sm:text-base">Placed on {o.date.replace(",", "")}</p></div>
              <span className="shrink-0 rounded-lg bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand sm:px-3 sm:py-1.5 sm:text-sm">{done ? "Delivered" : "In Progress"}</span></div>
            <ol className="relative mt-6 grid grid-cols-5 gap-1 sm:mt-8" aria-label="Order progress">{steps.map(([s, icon], i) => (
              <li key={s} className="relative flex min-w-0 flex-col items-center text-center" aria-current={state(i) === "current" ? "step" : undefined}>
                {i > 0 && <span aria-hidden className={`absolute right-1/2 top-[18px] h-0.5 w-full sm:top-6 ${i <= at ? "bg-brand" : "bg-line"}`} />}
                <span className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full sm:h-12 sm:w-12 ${state(i) === "done" ? "bg-brand text-white" : state(i) === "current" ? "bg-brand text-white ring-4 ring-brand-soft" : "border-2 border-line bg-white text-ink-faint"}`}><Icon name={state(i) === "done" ? "check" : icon} className="h-5 w-5 sm:h-6 sm:w-6" /></span>
                <span className={`mt-2 text-[11px] font-bold leading-tight sm:text-base ${state(i) === "current" ? "text-brand" : state(i) === "todo" ? "text-ink-muted" : ""}`}>{s}</span>
                <span className="hidden text-xs text-ink-muted sm:block">{i < 2 || state(i) === "current" ? notes[i] : ""}</span></li>))}</ol>
            {/* Phones and tablets get the vertical timeline from the mobile mockup; desktop keeps the status note. */}
            <div className="mt-5 border-t border-line pt-4 lg:hidden">
              <h3 className="mb-3 font-extrabold">Tracking timeline</h3>
              <ol aria-label="Tracking timeline">{steps.map(([s], i) => (
                <li key={s} className="relative flex gap-3 pb-3 last:pb-0">
                  {i < steps.length - 1 && <span aria-hidden className={`absolute bottom-0 left-[11px] top-6 w-0.5 ${state(i + 1) !== "todo" ? "bg-brand" : "bg-line"}`} />}
                  <span className={`relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${state(i) === "done" ? "bg-brand text-white" : state(i) === "current" ? "border-2 border-brand bg-white" : "border-2 border-line bg-white"}`}>{state(i) === "done" ? <Icon name="check" className="h-3.5 w-3.5" /> : state(i) === "current" ? <span className="h-2.5 w-2.5 rounded-full bg-brand" /> : null}</span>
                  <div className={`min-w-0 flex-1 ${state(i) === "current" ? "rounded-lg bg-brand-soft px-2.5 py-1.5" : "py-1"}`}>
                    <p className={`text-sm font-bold ${state(i) === "current" ? "text-brand" : state(i) === "todo" ? "text-ink-muted" : ""}`}>{s}{state(i) === "current" && <span className="sr-only"> (current step)</span>}</p>
                    <p className="text-xs text-ink-muted">{notes[i]}</p>
                  </div>
                </li>))}</ol>
            </div>
            {!done && <div className="mt-6 hidden items-center gap-4 rounded-xl bg-brand-soft p-4 lg:flex"><Icon name="box" className="h-9 w-9 shrink-0 text-brand" /><div><p className="font-bold">Packing your order</p><p className="text-sm text-ink-muted">We&apos;re carefully packing your items. You&apos;ll get an update once it&apos;s shipped.</p></div></div>}
          </section>
          <section className="card p-4 sm:p-6"><h2 className="text-lg font-extrabold sm:text-xl">Items in this order ({n})</h2>
            <ul className="mt-3 divide-y divide-line sm:mt-4">{lines.map((l) => (
              <li key={l.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 sm:gap-4 sm:py-4"><Image src={l.image ?? l.p!.image} alt="" width={96} height={96} className="h-16 w-16 shrink-0 rounded-xl bg-surface object-contain p-1.5 sm:h-24 sm:w-24 sm:p-2" />
                <div className="min-w-0 flex-1"><p className="font-extrabold leading-snug sm:text-lg">{l.p!.name}</p><p className="line-clamp-2 text-xs text-ink-muted sm:text-sm">{l.p!.tagline}</p><p className="mt-1 text-xs text-ink-muted sm:text-sm">Qty: {l.qty}</p></div><p className="shrink-0 font-extrabold sm:text-lg">{taka(l.price * l.qty)}</p></li>))}</ul></section>
        </div>
        <aside className="space-y-3 sm:space-y-4">
          <section className="card p-4 sm:p-5"><h2 className="flex items-center gap-2 text-lg font-extrabold"><Icon name="pin" className="h-5 w-5 text-brand" />Delivery Address</h2><p className="mt-2 font-bold">Samira Rahman</p><p className="text-sm text-ink-muted">House 12, Road 5, Dhanmondi<br />Dhaka 1205<br />+880 1712 345 678</p></section>
          <section className="card p-4 sm:p-5"><h2 className="text-lg font-extrabold">Order Summary</h2><dl className="mt-3 space-y-2 text-sm"><div className="flex justify-between"><dt>Items ({n})</dt><dd>{taka(orderSubtotal(o))}</dd></div><div className="flex justify-between"><dt>Delivery Fee</dt><dd>{taka(DELIVERY_FEE)}</dd></div><div className="flex justify-between border-t border-line pt-3 text-lg font-extrabold"><dt>Total</dt><dd className="text-brand">{taka(orderTotal(o))}</dd></div></dl></section>
          <section className="card p-4 sm:p-5"><h2 className="flex items-center gap-2 text-lg font-extrabold"><Icon name="calendar" className="h-5 w-5 text-brand" />{done ? "Delivered" : "Estimated Delivery"}</h2><p className="mt-2 text-xl font-extrabold text-brand sm:text-2xl">{done ? "Order complete" : "Nov 7 – 9, 2026"}</p><p className="mt-1 text-sm text-ink-muted">{done ? "This order was delivered to your address." : "Your order is expected to be delivered within this date range."}</p></section>
          <Link href="/orders" className="btn-primary w-full py-3"><Icon name="truck" className="h-5 w-5" />Track Order</Link>
          <Link href="/contact" className="btn-outline w-full py-3"><Icon name="headset" className="h-5 w-5" />Get Support</Link>
        </aside>
      </div>
    </>
  );
}
