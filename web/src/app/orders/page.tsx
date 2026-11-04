import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AccountShell } from "@/components/AccountNav";
import { orders } from "@/data/content";
import { taka } from "@/data/products";
export const metadata: Metadata = { title: "My Orders" };
export default function Orders() {
  return (
    <AccountShell title="My orders"><ul className="space-y-4">{orders.map((o) => (
      <li key={o.id} className="card flex flex-wrap items-center gap-4 p-4">
        <Image src={o.image} alt="" width={72} height={72} className="h-[72px] w-[72px] rounded-lg bg-surface object-contain p-1" />
        <div className="min-w-[140px] flex-1"><p className="font-bold">{o.id}</p><p className="text-sm text-ink-muted">{o.date}</p></div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${o.status === "Delivered" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>{o.status}</span>
        <p className="w-24 text-right font-extrabold">{taka(o.total)}</p>
        <Link href={`/orders/${o.id}`} className="btn-outline py-2">View order</Link></li>))}</ul></AccountShell>
  );
}
