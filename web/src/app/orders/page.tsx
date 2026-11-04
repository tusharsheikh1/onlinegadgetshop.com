"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AccountShell } from "@/components/AccountNav";
import { Icon } from "@/components/Icon";
import { orders } from "@/data/content";
import { taka } from "@/data/products";

export default function Orders() {
  const [tab, setTab] = useState("All");
  const proc = orders.filter((o) => o.status === "Processing"), del = orders.filter((o) => o.status === "Delivered");
  const tabs = [["All", `All Orders (${orders.length})`, orders], ["Processing", `Processing (${proc.length})`, proc], ["Delivered", `Delivered (${del.length})`, del]] as const;
  const list = tabs.find((t) => t[0] === tab)![2];
  return (
    <AccountShell title="My Orders" sub="Track and manage your orders at GadgetHub.">
      <div role="tablist" className="mb-5 flex gap-6 overflow-x-auto border-b border-line">{tabs.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`-mb-px whitespace-nowrap border-b-2 px-1 pb-3 font-semibold ${tab === k ? "border-brand text-brand" : "border-transparent text-ink-muted"}`}>{l}</button>)}</div>
      <ul className="space-y-4">{list.map((o) => (
        <li key={o.id} className="card flex flex-wrap items-center gap-x-6 gap-y-4 p-4">
          <div className="flex gap-3">{o.thumbs.map((t) => <Image key={t} src={t} alt="" width={96} height={96} className="h-20 w-20 rounded-xl bg-surface object-contain p-1 sm:h-24 sm:w-24" />)}</div>
          <div className="min-w-[150px] flex-1"><p className="text-lg font-extrabold">Order {o.id}</p><p className="text-ink-muted">Placed on {o.date.replace(",", "")}</p><p className="text-sm text-ink-muted">{o.items.length} item{o.items.length > 1 ? "s" : ""}</p></div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${o.status === "Delivered" ? "bg-green-50 text-green-700" : "bg-brand-soft text-brand"}`}><Icon name={o.status === "Delivered" ? "check" : "refresh"} className="h-4 w-4" />{o.status}</span>
          <p className="text-xl font-extrabold">{taka(o.total)}</p>
          <Link href={`/orders/${o.id}`} className="btn-primary px-6 py-3">View order</Link></li>))}</ul>
    </AccountShell>
  );
}
