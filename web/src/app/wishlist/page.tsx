"use client";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { PageTitle } from "@/components/Page";
import { byId, taka, Product } from "@/data/products";
import { useHydrated } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { EmptyState } from "@/components/EmptyState";

export default function Wishlist() {
  const ids = useStore((s) => s.wishlist); const toggle = useStore((s) => s.toggleWishlist); const add = useStore((s) => s.addToCart);
  const clear = () => ids.forEach((id) => toggle(id));
  const ready = useHydrated();
  const items = (ready ? ids : []).map(byId).filter(Boolean) as Product[];
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "My Wishlist" }]} />
      <PageTitle title="My Wishlist" sub="Your saved gadgets in one place. Add them to your cart anytime." />
      <div className="flex items-center justify-between border-b border-line pb-4"><h2 className="text-xl font-extrabold">{items.length} Saved Product{items.length === 1 ? "" : "s"}</h2>
        {items.length > 0 && <button onClick={clear} className="btn-outline"><Icon name="trash" className="h-4 w-4" />Clear Wishlist</button>}</div>
      {items.length === 0 ? <EmptyState className="mt-6" icon="heart" title="Your wishlist is empty" text="Tap the heart on any product to save it here for later."><Link href="/products" className="btn-primary">Browse products</Link></EmptyState> : (
        <ul className="mt-5 space-y-4">{items.map((p) => (
          <li key={p.id} className="card flex items-center gap-4 p-3 sm:gap-6 sm:p-4">
            <Link href={`/products/${p.slug}`} className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-surface sm:h-28 sm:w-40"><Image src={p.image} alt={p.name} width={165} height={183} className="max-h-20 w-auto object-contain sm:max-h-24" /></Link>
            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
              <div className="min-w-0 flex-1"><Link href={`/products/${p.slug}`} className="font-extrabold leading-snug hover:text-brand sm:text-lg">{p.name}</Link><p className="mt-1 hidden text-sm text-ink-muted sm:block">{p.tagline}</p></div>
              <div className="flex items-center gap-2 sm:block"><p className="text-lg font-extrabold sm:text-xl">{taka(p.price)}</p><span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold sm:mt-1 ${p.inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>● {p.inStock ? "In Stock" : "Out of stock"}</span></div>
              <div className="flex gap-2"><button disabled={!p.inStock} onClick={() => add(p.id)} className="btn-primary flex-1 px-4 py-2.5 sm:flex-none sm:px-5 sm:py-3"><Icon name="cart" className="h-5 w-5" />Add to Cart</button>
                <button onClick={() => toggle(p.id)} aria-label={`Remove ${p.name} from wishlist`} className="btn-outline px-3 text-red-500"><Icon name="heart" fill /></button></div>
            </div>
          </li>))}</ul>)}
    </>
  );
}
