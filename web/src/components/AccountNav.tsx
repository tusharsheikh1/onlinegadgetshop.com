"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const items = [["Overview", "/account"], ["Orders", "/orders"], ["Addresses", "/account#address"], ["Settings", "/account#profile"]];
export function AccountShell({ title, children }: { title: string; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="py-6"><h1 className="h1 mb-6">{title}</h1>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Account" className="card flex gap-1 overflow-x-auto p-2 lg:flex-col">{items.map(([l, h]) => { const active = h.split("#")[0] === path && !h.includes("#") || (l === "Orders" && path.startsWith("/orders")); return <Link key={l} href={h} aria-current={active ? "page" : undefined} className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold ${active ? "bg-brand text-white" : "hover:bg-surface"}`}>{l}</Link>; })}</nav>
        <div>{children}</div></div></div>
  );
}
