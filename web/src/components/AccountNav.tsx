"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icon";

// [desktop label, phone tab label, href, icon]
const items = [
  ["Account Overview", "Overview", "/account", "home"],
  ["My Orders", "Orders", "/orders", "box"],
  ["Wishlist", "Wishlist", "/wishlist", "heart"],
  ["Addresses", "Addresses", "/account#address", "pin"],
  ["Account Details", "Details", "/account#profile", "user"],
  ["Notifications", "Notifications", "/account", "bell"],
];

export function AccountShell({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="grid gap-4 py-4 sm:gap-6 sm:py-8 lg:grid-cols-[300px_1fr]">
      {/* Phones and tablets: a compact header and a scrollable tab bar. Desktop: a sidebar card. */}
      <nav aria-label="Account" className="min-w-0 lg:card lg:h-fit lg:p-4">
        <div className="flex items-center gap-3 lg:border-b lg:border-line lg:pb-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand lg:h-14 lg:w-14"><Icon name="user" className="h-6 w-6 lg:h-7 lg:w-7" /></span>
          <div className="min-w-0 flex-1"><p className="font-extrabold">My Account</p><p className="text-sm text-ink-muted">Hi, Customer</p></div>
          <Link href="/login" className="flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-navy lg:hidden"><Icon name="logout" className="h-4 w-4" />Sign out</Link>
        </div>
        <ul className="-mx-4 mt-3 flex overflow-x-auto px-4 shadow-[inset_0_-1px_0_#E4E7EC] [scrollbar-width:none] sm:mx-0 sm:px-0 lg:block lg:space-y-1 lg:overflow-visible lg:shadow-none">
          {items.map(([long, short, h, i]) => {
            const active = (long === "Account Overview" && path === "/account") || (long === "My Orders" && path.startsWith("/orders"));
            return (
              <li key={long} className="shrink-0">
                <Link href={h} aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium lg:gap-3 lg:rounded-xl lg:border-0 ${active ? "border-brand font-bold text-brand lg:bg-brand-soft" : "border-transparent text-ink-muted lg:text-navy lg:hover:bg-surface"}`}>
                  <Icon name={i} className="h-[18px] w-[18px] lg:h-5 lg:w-5" /><span className="lg:hidden">{short}</span><span className="hidden lg:inline">{long}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="/login" className="mt-3 hidden items-center gap-3 border-t border-line px-3 pt-4 text-sm font-medium lg:flex"><Icon name="logout" className="h-5 w-5" />Sign Out</Link>
      </nav>
      <div className="min-w-0"><h1 className="h1">{title}</h1>{sub && <p className="mb-4 mt-1 text-sm text-ink-muted sm:mb-6 sm:text-base">{sub}</p>}{!sub && <div className="mb-4 sm:mb-6" />}{children}</div>
    </div>
  );
}
