"use client";
import Link from "next/link";
import Image from "next/image";
import { Product, taka } from "@/data/products";
import { useStore } from "@/lib/store";
import { Icon } from "./Icon";
import { Rating } from "./Stars";

const badgeTone = (label: string) =>
  label.startsWith("-") ? "bg-red-50 text-red-600" : label === "New" ? "bg-green-50 text-green-700" : "bg-brand-soft text-brand";

export function ProductCard({ p, layout = "row" }: { p: Product; layout?: "row" | "stack" }) {
  const add = useStore((s) => s.addToCart);
  const wished = useStore((s) => s.wishlist.includes(p.id));
  const toggle = useStore((s) => s.toggleWishlist);
  const compared = useStore((s) => s.compare.includes(p.id));
  const toggleCompare = useStore((s) => s.toggleCompare);
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  const stack = layout === "stack";
  // A merchandising badge wins the image corner; otherwise the corner shows the discount.
  const named = p.badge && !/% OFF$/.test(p.badge) ? p.badge : null;
  const corner = named ?? (off ? `-${off}%` : null);
  return (
    <article className={`card relative flex gap-2 p-2.5 sm:gap-4 sm:p-4 ${stack ? "flex-col" : "flex-col sm:flex-row"}`}>
      <button onClick={() => toggle(p.id)} aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`} aria-pressed={wished}
        className={`absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1.5 sm:right-3 sm:top-3 ${wished ? "text-red-500" : "text-ink-muted hover:text-brand"} ${stack ? "" : "sm:hidden"}`}>
        <Icon name="heart" fill={wished} className="h-5 w-5" />
      </button>
      <Link href={`/products/${p.slug}`} tabIndex={-1} aria-hidden="true" className={`relative flex shrink-0 items-center justify-center ${stack ? "h-28 sm:h-44" : "h-40 sm:h-auto sm:w-36"}`}>
        <Image src={p.image} alt="" width={165} height={183} className={`w-auto object-contain ${stack ? "max-h-28 sm:max-h-40" : "max-h-40"}`} />
        {corner && <span className={`absolute left-0 top-0 rounded-md px-1.5 py-0.5 text-[11px] font-bold sm:text-xs ${badgeTone(corner)}`}>{corner}</span>}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <Link href={`/products/${p.slug}`} className="line-clamp-2 text-[13px] font-bold leading-snug hover:text-brand sm:line-clamp-none sm:text-base">{p.name}</Link>
        <p className={`mt-1 text-sm text-ink-muted ${stack ? "hidden sm:line-clamp-2" : "line-clamp-2"}`}>{p.tagline}</p>
        {stack ? <Rating rating={p.rating} reviews={p.reviews} small className="mt-1 sm:mt-2" /> : (
          <p className="mt-2 flex items-center gap-1 text-xs text-ink-muted"><Icon name="shield" className="h-3.5 w-3.5" />{p.warranty}</p>
        )}
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 sm:mt-2 sm:gap-x-2">
          <span className="text-[15px] font-extrabold sm:text-lg">{taka(p.price)}</span>
          {p.oldPrice && <span className="text-xs text-ink-faint line-through sm:text-sm"><span className="sr-only">Was </span>{taka(p.oldPrice)}</span>}
          {p.oldPrice && named && <span className="badge hidden sm:inline-block">{off}% OFF</span>}
        </div>
        <div className="mt-auto flex gap-2 pt-2.5 sm:pt-3">
          <button onClick={() => add(p.id)} className="btn-primary flex-1 px-2 py-2 text-xs sm:px-5 sm:text-sm"><Icon name="cart" className="h-4 w-4" />Add to cart</button>
          <button onClick={() => toggle(p.id)} aria-label={wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`} aria-pressed={wished}
            className={`btn-outline hidden px-3 py-2 ${stack ? "" : "sm:inline-flex"} ${wished ? "text-red-500" : ""}`}><Icon name="heart" fill={wished} className="h-4 w-4" /></button>
        </div>
        <button onClick={() => { if (!toggleCompare(p.id)) alert("You can compare up to 4 products."); }} aria-pressed={compared}
          className={`mt-1.5 self-start text-[11px] font-medium sm:mt-2 sm:text-xs ${compared ? "text-brand" : "text-ink-muted hover:text-brand"}`}>{compared ? "✓ Added to compare" : "+ Compare"}</button>
      </div>
    </article>
  );
}
