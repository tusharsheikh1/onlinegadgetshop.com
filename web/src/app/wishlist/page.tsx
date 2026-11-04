"use client";
import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { PageTitle } from "@/components/Page";
import { byId, taka, Product } from "@/data/products";
import { useHydrated } from "@/lib/hooks";
import { useStore } from "@/lib/store";

export default function Wishlist() {
  const ids = useStore((s) => s.wishlist); const toggle = useStore((s) => s.toggleWishlist); const add = useStore((s) => s.addToCart);
  const ready = useHydrated();
  const items = (ready ? ids : []).map(byId).filter(Boolean) as Product[];
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <PageTitle title="Wishlist" sub={`${items.length} saved product${items.length === 1 ? "" : "s"}`} />
      {items.length === 0 ? <div className="card p-10 text-center"><p className="font-bold">Your wishlist is empty.</p><Link href="/products" className="btn-primary mt-4">Browse products</Link></div> : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((p) => (
          <li key={p.id} className="card relative flex flex-col p-4">
            <button onClick={() => toggle(p.id)} aria-label={`Remove ${p.name} from wishlist`} className="absolute right-3 top-3 text-red-500"><Icon name="heart" fill /></button>
            <Link href={`/products/${p.slug}`} className="flex h-40 items-center justify-center"><Image src={p.image} alt={p.name} width={165} height={183} className="max-h-36 w-auto object-contain" /></Link>
            <Link href={`/products/${p.slug}`} className="mt-3 font-bold hover:text-brand">{p.name}</Link>
            <p className="mt-1 font-extrabold">{taka(p.price)}</p>
            <p className={`mt-1 text-sm font-medium ${p.inStock ? "text-green-600" : "text-red-600"}`}>{p.inStock ? "In stock" : "Out of stock"}</p>
            <button disabled={!p.inStock} onClick={() => add(p.id)} className="btn-primary mt-auto w-full">Add to cart</button>
          </li>))}</ul>)}
    </>
  );
}
