"use client";
import Link from "next/link";
import Image from "next/image";
import { Product, taka } from "@/data/products";
import { useStore } from "@/lib/store";
import { Icon } from "./Icon";
import { Rating } from "./Stars";

const badgeTone = (label: string) =>
  label.startsWith("-") ? "bg-red-600 text-white" : label === "New" ? "bg-emerald-600 text-white" : "bg-navy text-white";

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
  const wishLabel = wished ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`;

  return (
    <article className={`group relative flex rounded-2xl border border-line bg-white p-2 transition duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lift sm:p-3 ${stack ? "flex-col" : "flex-col sm:flex-row sm:gap-5"}`}>
      <div className={`img-well shrink-0 ${stack ? "aspect-square w-full" : "aspect-square w-full sm:w-52"}`}>
        <Link href={`/products/${p.slug}`} tabIndex={-1} aria-hidden="true" className="absolute inset-0 flex items-center justify-center p-5 sm:p-7">
          <Image src={p.image} alt="" width={240} height={240} className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.04]" />
        </Link>
        {corner && <span className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide sm:left-3 sm:top-3 sm:px-2.5 sm:text-[11px] ${badgeTone(corner)}`}>{corner}</span>}
        <button onClick={() => toggle(p.id)} aria-label={wishLabel} aria-pressed={wished}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-card ring-1 ring-line transition hover:scale-105 sm:right-3 sm:top-3 sm:h-9 sm:w-9 ${wished ? "text-red-500" : "text-ink-muted hover:text-navy"}`}>
          <Icon name="heart" fill={wished} className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        </button>
      </div>
      <div className={`flex min-w-0 flex-1 flex-col px-1 pb-1 pt-3 sm:px-1.5 ${stack ? "" : "sm:py-2"}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[.1em] text-ink-faint">{p.brand}</p>
        <Link href={`/products/${p.slug}`} className="mt-1 line-clamp-2 min-h-[2.6em] text-[13px] font-semibold leading-[1.3] text-navy transition hover:text-brand sm:text-[15px]">{p.name}</Link>
        {!stack && <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">{p.tagline}</p>}
        <Rating rating={p.rating} reviews={p.reviews} small className="mt-1.5" />
        {!stack && <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-muted"><Icon name="shield" className="h-3.5 w-3.5 text-emerald-600" />{p.warranty}</p>}
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pt-3">
          <span className="text-base font-bold tracking-tight sm:text-lg">{taka(p.price)}</span>
          {p.oldPrice && <span className="text-xs text-ink-faint line-through sm:text-sm"><span className="sr-only">Was </span>{taka(p.oldPrice)}</span>}
          {p.oldPrice && named && <span className="text-xs font-semibold text-red-600">Save {off}%</span>}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button onClick={() => add(p.id)} className="btn-primary h-9 flex-1 px-3 text-xs sm:h-10 sm:text-sm"><Icon name="cart" className="h-4 w-4 shrink-0" /><span className="whitespace-nowrap"><span className="min-[400px]:hidden">Add</span><span className="hidden min-[400px]:inline">Add to cart</span></span></button>
          <button onClick={() => { if (!toggleCompare(p.id)) alert("You can compare up to 4 products."); }} aria-pressed={compared} aria-label={compared ? `Remove ${p.name} from compare` : `Add ${p.name} to compare`} title="Compare"
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition sm:h-10 sm:w-10 ${compared ? "border-brand bg-brand-soft text-brand" : "border-line text-ink-muted hover:border-navy/20 hover:text-navy"}`}>
            <Icon name={compared ? "check" : "compare"} className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
