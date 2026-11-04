"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGo } from "@/lib/nav";
import { useEffect, useState } from "react";
import { categories } from "@/data/products";
import { useStore } from "@/lib/store";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

function useMounted() { const [m, setM] = useState(false); useEffect(() => setM(true), []); return m; }

export function Header() {
  const go = useGo();
  const pathname = usePathname();
  const mounted = useMounted();
  const cartCount = useStore((s) => s.cart.reduce((n, l) => n + l.qty, 0));
  const wishCount = useStore((s) => s.wishlist.length);
  const [open, setOpen] = useState(false);
  const [cats, setCats] = useState(false);
  const [q, setQ] = useState("");
  const submit = (e: React.FormEvent) => { e.preventDefault(); setOpen(false); go(`/search?q=${encodeURIComponent(q.trim())}`); };
  useEffect(() => { setQ(pathname === "/search" ? new URLSearchParams(window.location.search).get("q") ?? "" : ""); }, [pathname]);
  const count = mounted ? cartCount : 0;

  const search = (
    <form onSubmit={submit} role="search" className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-1">
      <Icon name="search" className="h-5 w-5 shrink-0 text-ink-muted" />
      <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" placeholder="Search gadgets, brands and more…" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none" />
      {q && <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="rounded-full p-1 text-ink-muted hover:text-navy"><Icon name="x" className="h-4 w-4" /></button>}
      <button className="hidden rounded-lg bg-brand px-4 py-1.5 text-sm font-semibold text-white sm:block">Search</button>
    </form>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="container-x flex items-center gap-4 py-3">
        <button className="lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? "x" : "menu"} className="h-6 w-6" /></button>
        <Logo />
        <div className="mx-6 hidden max-w-3xl flex-1 lg:block">{search}</div>
        <nav aria-label="Account" className="ml-auto flex items-center gap-1 sm:gap-5">
          <Link href="/account" className="hidden items-center gap-2 text-sm font-medium lg:flex"><Icon name="user" />Account</Link>
          <Link href="/wishlist" className="relative hidden items-center gap-2 text-sm font-medium lg:flex"><Icon name="heart" />Wishlist{mounted && wishCount > 0 && <span className="rounded-full bg-brand px-1.5 text-[11px] text-white">{wishCount}</span>}</Link>
          <Link href="/cart" className="relative mr-2 flex items-center gap-2 text-sm font-medium" aria-label={`Cart, ${count} items`}>
            <span className="relative"><Icon name="cart" className="h-6 w-6 lg:h-5 lg:w-5" />
            <span className="absolute -right-2.5 -top-2.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">{count}</span></span><span className="hidden lg:inline">Cart</span>
          </Link>
        </nav>
      </div>
      <div className="container-x pb-3 lg:hidden">{search}</div>
      <div className="hidden border-t border-line lg:block">
        <div className="container-x relative flex items-center gap-8 py-2.5 text-sm font-semibold">
          <div className="relative">
            <button onClick={() => setCats(!cats)} aria-expanded={cats} className="flex items-center gap-2"><Icon name="menu" />Shop Categories<Icon name="chevron" className="h-4 w-4" /></button>
            {cats && (
              <ul className="absolute left-0 top-9 z-50 w-56 rounded-xl border border-line bg-white p-2 shadow-pop">
                {categories.map((c) => <li key={c.slug}><Link onClick={() => setCats(false)} href={`/category/${c.slug}`} className="block rounded-lg px-3 py-2 hover:bg-surface">{c.name}</Link></li>)}
                <li><Link onClick={() => setCats(false)} href="/products" className="block rounded-lg px-3 py-2 font-bold text-brand hover:bg-surface">All products</Link></li>
              </ul>
            )}
          </div>
          <Link href="/offers" className="flex items-center gap-2 text-brand"><Icon name="tag" />Deals</Link>
          <Link href="/blog" className="flex items-center gap-2"><Icon name="book" />Buying guides</Link>
          <Link href="/contact" className="flex items-center gap-2"><Icon name="help" />Support</Link>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-line bg-white lg:hidden">
          <ul className="container-x grid grid-cols-2 gap-1 py-3 text-sm font-semibold">
            {categories.map((c) => <li key={c.slug}><Link onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-surface" href={`/category/${c.slug}`}>{c.name}</Link></li>)}
            {[["Deals", "/offers"], ["Buying guides", "/blog"], ["Support", "/contact"], ["Wishlist", "/wishlist"], ["Account", "/account"], ["FAQ", "/faq"]].map(([l, h]) => (
              <li key={h}><Link onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-brand hover:bg-surface" href={h}>{l}</Link></li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
