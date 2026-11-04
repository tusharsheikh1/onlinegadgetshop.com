"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";
const items = [["Account Overview", "/account", "home"], ["My Orders", "/orders", "box"], ["Wishlist", "/wishlist", "heart"], ["Addresses", "/account#address", "pin"], ["Account Details", "/account#profile", "user"], ["Notifications", "/account", "bell"]];
export function AccountShell({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="grid gap-6 py-8 lg:grid-cols-[300px_1fr]">
      <nav aria-label="Account" className="card h-fit p-4">
        <div className="flex items-center gap-3 border-b border-line pb-4"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-soft text-brand"><Icon name="user" className="h-7 w-7" /></span><div><p className="font-extrabold">My Account</p><p className="text-sm text-ink-muted">Hi, Customer</p></div></div>
        <ul className="mt-3 space-y-1">{items.map(([l, h, i]) => { const active = (l === "Account Overview" && path === "/account") || (l === "My Orders" && path.startsWith("/orders")); return <li key={l}><Link href={h} aria-current={active ? "page" : undefined} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${active ? "bg-brand-soft font-bold text-brand" : "hover:bg-surface"}`}><Icon name={i} className="h-5 w-5" />{l}</Link></li>; })}</ul>
        <Link href="/login" className="mt-3 flex items-center gap-3 border-t border-line px-3 pt-4 text-sm font-medium"><Icon name="logout" className="h-5 w-5" />Sign Out</Link>
      </nav>
      <div className="min-w-0"><h1 className="h1">{title}</h1>{sub && <p className="mb-6 mt-1 text-ink-muted">{sub}</p>}{!sub && <div className="mb-6" />}{children}</div>
    </div>
  );
}
