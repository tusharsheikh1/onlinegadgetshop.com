"use client";
import Link from "next/link";
import Image from "next/image";
import { Product, taka } from "@/data/products";
import { useStore } from "@/lib/store";
import { Icon } from "./Icon";
import { Rating } from "./Stars";

export function ProductCard({ p, layout = "row" }: { p: Product; layout?: "row" | "stack" }) {
  const add = useStore((s) => s.addToCart);
  const wished = useStore((s) => s.wishlist.includes(p.id));
  const toggle = useStore((s) => s.toggleWishlist);
  const compared = useStore((s) => s.compare.includes(p.id));
  const toggleCompare = useStore((s) => s.toggleCompare);
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const stack = layout === "stack";
  return (
    <article className={`card relative flex gap-4 p-4 ${stack ? "flex-col" : "flex-col sm:flex-row"}`}>
      <button onClick={() => toggle(p.id)} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wished}
        className={`absolute right-3 top-3 z-10 rounded-full p-1.5 ${wished ? "text-red-500" : "text-ink-muted hover:text-brand"} ${stack ? "" : "sm:hidden"}`}>
        <Icon name="heart" fill={wished} />
      </button>
      <Link href={`/products/${p.slug}`} className={`flex shrink-0 items-center justify-center ${stack ? "h-44" : "h-40 sm:h-auto sm:w-36"}`}>
        <Image src={p.image} alt={p.name} width={165} height={183} className="max-h-40 w-auto object-contain" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        {p.badge && <span className="badge mb-1.5 self-start">{p.badge}</span>}
        <Link href={`/products/${p.slug}`} className="font-bold leading-snug hover:text-brand">{p.name}</Link>
        <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{p.tagline}</p>
        {stack ? <Rating rating={p.rating} reviews={p.reviews} className="mt-2" /> : (
          <p className="mt-2 flex items-center gap-1 text-xs text-ink-muted"><Icon name="shield" className="h-3.5 w-3.5" />{p.warranty}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-lg font-extrabold">{taka(p.price)}</span>
          {p.oldPrice && <><span className="text-sm text-ink-faint line-through">{taka(p.oldPrice)}</span><span className="badge">{off}% OFF</span></>}
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => add(p.id)} className="btn-primary flex-1 py-2"><Icon name="cart" className="h-4 w-4" />Add to cart</button>
          <button onClick={() => toggle(p.id)} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={wished}
            className={`btn-outline hidden px-3 py-2 ${stack ? "" : "sm:inline-flex"} ${wished ? "text-red-500" : ""}`}><Icon name="heart" fill={wished} className="h-4 w-4" /></button>
        </div>
        <button onClick={() => { if (!toggleCompare(p.id)) alert("You can compare up to 4 products."); }} aria-pressed={compared}
          className={`mt-2 self-start text-xs font-medium ${compared ? "text-brand" : "text-ink-muted hover:text-brand"}`}>{compared ? "✓ Added to compare" : "+ Compare"}</button>
      </div>
    </article>
  );
}
