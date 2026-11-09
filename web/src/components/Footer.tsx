import Link from "next/link";
import { categories } from "@/data/products";
import { support } from "@/data/content";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

const cols: [string, [string, string][]][] = [
  ["Shop", [...categories.slice(0, 6).map((c) => [c.name, `/category/${c.slug}`] as [string, string]), ["All products", "/products"]]],
  ["Help", [["Contact us", "/contact"], ["FAQ", "/faq"], ["Track order", "/orders"], ["Shipping", "/policy/shipping"], ["Returns", "/policy/returns"]]],
  ["Company", [["About", "/about"], ["Buying guides", "/blog"], ["Deals", "/offers"], ["Privacy Policy", "/policy/privacy"], ["Terms", "/policy/terms"]]],
];

export function Footer() {
  return (
    <footer className="mt-20 bg-navy text-white sm:mt-24">
      <div className="container-x grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo inverted />
          <p className="mt-4 text-sm leading-relaxed text-white/60">Your trusted gadget store in Bangladesh — genuine products, official warranty and delivery you can count on.</p>
          <ul className="mt-6 space-y-2.5 text-sm text-white/80">
            <li className="flex items-center gap-3"><Icon name="phone" className="h-4 w-4 text-blue-300" />{support.phone}</li>
            <li className="flex items-center gap-3"><Icon name="mail" className="h-4 w-4 text-blue-300" />{support.email}</li>
            <li className="flex items-center gap-3"><Icon name="clock" className="h-4 w-4 text-blue-300" />Support 7 days a week</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map(([title, links]) => (
            <div key={title}>
              <h2 className="text-xs font-semibold uppercase tracking-[.14em] text-white/40">{title}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">{links.map(([l, h]) => <li key={h}><Link href={h} className="text-white/75 transition hover:text-white">{l}</Link></li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 GadgetHub. All rights reserved.</span>
          <span className="flex flex-wrap items-center gap-2">We accept
            {["Visa", "Mastercard", "bKash", "Nagad", "Cash on delivery"].map((m) => <span key={m} className="rounded-md border border-white/15 px-2 py-0.5 font-medium text-white/70">{m}</span>)}
          </span>
        </div>
      </div>
    </footer>
  );
}
