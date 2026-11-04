"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AccountShell } from "@/components/AccountNav";
import { Icon } from "@/components/Icon";
import { orderItemCount, orders, orderTotal } from "@/data/content";
import { byId, taka } from "@/data/products";

function Status({ s }: { s: string }) {
  const done = s === "Delivered";
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold sm:px-3 sm:py-1.5 sm:text-sm ${done ? "bg-green-50 text-green-700" : "bg-brand-soft text-brand"}`}><Icon name={done ? "check" : "refresh"} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{s}</span>;
}

export default function Orders() {
  const [tab, setTab] = useState("All");
  const proc = orders.filter((o) => o.status === "Processing"), del = orders.filter((o) => o.status === "Delivered");
  const tabs = [["All", `All Orders (${orders.length})`, orders], ["Processing", `Processing (${proc.length})`, proc], ["Delivered", `Delivered (${del.length})`, del]] as const;
  const list = tabs.find((t) => t[0] === tab)![2];
  return (
    <AccountShell title="My Orders" sub="Track and manage your orders at GadgetHub.">
      <div role="tablist" className="mb-4 flex gap-5 overflow-x-auto border-b border-line [scrollbar-width:none] sm:mb-5 sm:gap-6">{tabs.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`-mb-px shrink-0 whitespace-nowrap border-b-2 px-1 pb-2.5 text-sm font-semibold sm:pb-3 sm:text-base ${tab === k ? "border-brand text-brand" : "border-transparent text-ink-muted"}`}>{l}</button>)}</div>
      <ul className="space-y-3 sm:space-y-4">{list.map((o) => (
        <li key={o.id} className="card flex items-center gap-3 p-3 sm:flex-wrap sm:gap-x-6 sm:gap-y-4 sm:p-4">
          {/* Phones fold status and total under the order number, as in the mobile mockup. The second thumbnail only fits from xl up. */}
          <div className="flex shrink-0 gap-3">{o.lines.map((l) => l.image ?? byId(l.id)?.image ?? "").filter(Boolean).map((t, i) => <Image key={t} src={t} alt="" width={96} height={96} className={`h-[72px] w-[72px] rounded-xl bg-surface object-contain p-1 sm:h-24 sm:w-24 ${i > 0 ? "hidden xl:block" : ""}`} />)}</div>
          <div className="min-w-0 flex-1 sm:min-w-[150px]">
            <p className="font-extrabold sm:text-lg"><span className="hidden sm:inline">Order </span>{o.id}</p>
            <p className="text-sm text-ink-muted sm:text-base"><span className="hidden sm:inline">Placed on </span>{o.date.replace(",", "")}</p>
            <p className="hidden text-sm text-ink-muted sm:block">{orderItemCount(o)} item{orderItemCount(o) > 1 ? "s" : ""}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 sm:hidden"><Status s={o.status} /><span className="text-sm">Total: <b>{taka(orderTotal(o))}</b></span></div>
          </div>
          <span className="hidden sm:inline-flex"><Status s={o.status} /></span>
          <p className="hidden text-xl font-extrabold sm:block">{taka(orderTotal(o))}</p>
          <Link href={`/orders/${o.id}`} className="btn-primary shrink-0 px-3.5 py-2 sm:px-6 sm:py-3">View order</Link></li>))}</ul>
    </AccountShell>
  );
}
