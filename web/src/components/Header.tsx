"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGo } from "@/lib/nav";
import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/products";
import { useStore } from "@/lib/store";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

function useMounted() { const [m, setM] = useState(false); useEffect(() => setM(true), []); return m; }

const navLinks: [string, string, string][] = [["Deals", "/offers", "tag"], ["Buying guides", "/blog", "book"], ["Support", "/contact", "help"]];

function CountDot({ n }: { n: number }) {
  if (n <= 0) return null;
  return <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">{n > 99 ? "99+" : n}</span>;
}

export function Header() {
  const go = useGo();
  const pathname = usePathname();
  const mounted = useMounted();
  const cartCount = useStore((s) => s.cart.reduce((n, l) => n + l.qty, 0));
  const wishCount = useStore((s) => s.wishlist.length);
  const [open, setOpen] = useState(false);
  const [cats, setCats] = useState(false);
  const [q, setQ] = useState("");
  const catsRef = useRef<HTMLDivElement>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setOpen(false); go(`/search?q=${encodeURIComponent(q.trim())}`); };
  useEffect(() => { setQ(pathname === "/search" ? new URLSearchParams(window.location.search).get("q") ?? "" : ""); setOpen(false); setCats(false); }, [pathname]);
  useEffect(() => {
    if (!cats) return;
    const close = (e: MouseEvent) => { if (!catsRef.current?.contains(e.target as Node)) setCats(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setCats(false); };
    document.addEventListener("mousedown", close); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, [cats]);
  const cart = mounted ? cartCount : 0;
  const wish = mounted ? wishCount : 0;
  const isActive = (h: string) => pathname === h || pathname.startsWith(h + "/");

  const search = (
    <form onSubmit={submit} role="search" className="group flex items-center gap-2 rounded-full border border-line bg-surface py-1 pl-4 pr-1 transition focus-within:border-brand focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/10">
      <Icon name="search" className="h-[18px] w-[18px] shrink-0 text-ink-faint group-focus-within:text-brand" />
      <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" placeholder="Search phones, laptops, audio…" className="min-w-0 flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-ink-faint" />
      {q && <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="rounded-full p-1 text-ink-muted hover:text-navy"><Icon name="x" className="h-4 w-4" /></button>}
      <button className="hidden rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white transition hover:bg-navy-700 sm:block">Search</button>
    </form>
  );

  const iconBtn = "relative flex h-10 w-10 items-center justify-center rounded-full text-navy transition hover:bg-surface";

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
      <div className="bg-navy text-white">
        <div className="container-x flex h-9 items-center justify-center gap-6 text-xs font-medium sm:justify-between">
          <p className="flex items-center gap-2"><Icon name="truck" className="h-4 w-4 text-blue-300" />Delivery across Bangladesh · Dhaka in 1–2 days</p>
          <div className="hidden items-center gap-5 text-white/70 sm:flex">
            <span className="flex items-center gap-1.5"><Icon name="shield" className="h-3.5 w-3.5" />Official warranty</span>
            <Link href="/orders" className="transition hover:text-white">Track order</Link>
            <Link href="/contact" className="transition hover:text-white">Help</Link>
          </div>
        </div>
      </div>
      <div className="border-b border-line">
        <div className="container-x flex h-16 items-center gap-3 lg:h-[72px] lg:gap-8">
          <button className={`${iconBtn} -ml-2 lg:hidden`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? "x" : "menu"} className="h-6 w-6" /></button>
          <Logo />
          <div className="hidden max-w-2xl flex-1 lg:block">{search}</div>
          <nav aria-label="Account" className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <Link href="/account" aria-label="Account" className={`${iconBtn} hidden lg:flex`}><Icon name="user" /></Link>
            <Link href="/wishlist" aria-label={`Wishlist, ${wish} items`} className={`${iconBtn} hidden sm:flex`}><Icon name="heart" /><CountDot n={wish} /></Link>
            <Link href="/cart" aria-label={`Cart, ${cart} items`} className={`${iconBtn} -mr-2 lg:mr-0`}><Icon name="cart" className="h-[22px] w-[22px]" /><CountDot n={cart} /></Link>
          </nav>
        </div>
        <div className="container-x pb-3 lg:hidden">{search}</div>
      </div>
      <div className="hidden border-b border-line lg:block">
        <div className="container-x flex h-12 items-center gap-1 text-sm font-medium">
          <div className="relative mr-3" ref={catsRef}>
            <button onClick={() => setCats(!cats)} aria-expanded={cats} aria-haspopup="true" className={`flex h-9 items-center gap-2 rounded-full px-4 font-semibold transition ${cats ? "bg-navy text-white" : "bg-surface hover:bg-line/70"}`}><Icon name="menu" className="h-4 w-4" />All categories<Icon name="chevron" className={`h-4 w-4 transition ${cats ? "rotate-180" : ""}`} /></button>
            {cats && (
              <div className="absolute left-0 top-12 z-50 w-[520px] rounded-2xl border border-line bg-white p-3 shadow-pop">
                <ul className="grid grid-cols-2 gap-1">
                  {categories.map((c) => <li key={c.slug}><Link onClick={() => setCats(false)} href={`/category/${c.slug}`} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-surface"><span className="img-well h-10 w-10 shrink-0 rounded-lg"><Image src={c.image} alt="" width={32} height={32} className="h-8 w-8 object-contain" /></span><span className="font-semibold">{c.name}</span></Link></li>)}
                </ul>
                <Link onClick={() => setCats(false)} href="/products" className="mt-2 flex items-center justify-between rounded-xl bg-brand-soft px-4 py-3 font-semibold text-brand transition hover:bg-brand hover:text-white">Browse all products<Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            )}
          </div>
          {categories.slice(0, 5).map((c) => <Link key={c.slug} href={`/category/${c.slug}`} className={`rounded-full px-3 py-1.5 transition hover:bg-surface ${isActive(`/category/${c.slug}`) ? "text-brand" : "text-ink-muted hover:text-navy"}`}>{c.name}</Link>)}
          <span className="mx-2 h-5 w-px bg-line" />
          {navLinks.map(([l, h, i]) => <Link key={h} href={h} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 transition hover:bg-surface ${h === "/offers" ? "font-semibold text-red-600" : isActive(h) ? "text-brand" : "text-ink-muted hover:text-navy"}`}><Icon name={i} className="h-4 w-4" />{l}</Link>)}
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="max-h-[calc(100vh-120px)] overflow-y-auto border-b border-line bg-white shadow-pop lg:hidden">
          <div className="container-x py-4">
            <p className="eyebrow mb-2 text-ink-faint">Shop by category</p>
            <ul className="grid grid-cols-2 gap-2">
              {categories.map((c) => <li key={c.slug}><Link onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl border border-line px-3 py-2 text-sm font-semibold" href={`/category/${c.slug}`}><span className="img-well h-9 w-9 shrink-0 rounded-lg"><Image src={c.image} alt="" width={28} height={28} className="h-7 w-7 object-contain" /></span>{c.name}</Link></li>)}
            </ul>
            <ul className="mt-4 divide-y divide-line border-t border-line text-sm font-semibold">
              {[["Deals", "/offers", "tag"], ["Buying guides", "/blog", "book"], ["Wishlist", "/wishlist", "heart"], ["My account", "/account", "user"], ["Track order", "/orders", "truck"], ["Help & support", "/contact", "help"]].map(([l, h, i]) => (
                <li key={h}><Link onClick={() => setOpen(false)} className="flex items-center gap-3 py-3" href={h}><Icon name={i} className="h-5 w-5 text-ink-muted" />{l}<Icon name="chevronR" className="ml-auto h-4 w-4 text-ink-faint" /></Link></li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
