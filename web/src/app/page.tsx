import Link from "next/link";
import Image from "next/image";
import { categories, products, taka, byId } from "@/data/products";
import { articles } from "@/data/content";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/Icon";
import { Trust } from "@/components/Trust";

function SectionHead({ eyebrow, title, href, cta }: { eyebrow: string; title: string; href?: string; cta?: string }) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4 sm:mb-7">
      <div><p className="eyebrow">{eyebrow}</p><h2 className="h2 mt-1.5">{title}</h2></div>
      {href && <Link href={href} className="group flex shrink-0 items-center gap-1.5 text-sm font-semibold text-navy transition hover:text-brand">{cta}<Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-0.5" /></Link>}
    </div>
  );
}

export default function Home() {
  const featured = ["galaxy-a56", "sony-wh1000xm5", "watch-fit-3", "buds-pro-2"].map((id) => byId(id)!);
  const deals = products.filter((p) => p.oldPrice && !featured.includes(p)).sort((a, b) => b.oldPrice! - b.price - (a.oldPrice! - a.price)).slice(0, 4);
  const best = ["iphone-16-pro", "bose-qc-headphones", "apple-watch-10", "dualsense"].map((id) => byId(id)!);
  const spotlight = byId("aerosound-pro")!;
  const counts = Object.fromEntries(categories.map((c) => [c.slug, products.filter((p) => p.category === c.slug).length]));

  return (
    <>
      {/* Hero */}
      <section className="relative mt-4 overflow-hidden rounded-3xl bg-navy text-white sm:mt-6">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_40%,rgba(59,130,246,.45),transparent_70%),radial-gradient(40%_60%_at_10%_100%,rgba(99,102,241,.25),transparent_70%)]" />
        <div aria-hidden className="absolute inset-0 opacity-[.07] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(70%_70%_at_70%_50%,black,transparent)]" />
        <div className="relative grid items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="px-6 pt-10 sm:px-12 sm:pt-14 lg:py-20 lg:pl-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />New season arrivals are in</span>
            <h1 className="mt-5 text-[38px] font-extrabold leading-[1.02] tracking-[-.035em] sm:text-6xl lg:text-[68px]">Upgrade your<br /><span className="bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200 bg-clip-text text-transparent">everyday.</span></h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">The latest phones, smartwatches and headphones — genuine, under official warranty and delivered fast across Bangladesh.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn h-12 bg-white px-6 text-[15px] text-navy hover:bg-blue-50">Shop now<Icon name="arrow" className="h-4 w-4" /></Link>
              <Link href="/offers" className="btn h-12 border border-white/20 px-6 text-[15px] text-white hover:bg-white/10">View deals</Link>
            </div>
            <dl className="mt-10 hidden grid-cols-3 gap-6 border-t border-white/10 pt-6 sm:grid sm:max-w-md">
              {[["10,000+", "Happy customers"], ["4.8★", "Average rating"], ["1–2 days", "Dhaka delivery"]].map(([v, l]) => <div key={l}><dt className="sr-only">{l}</dt><dd className="text-xl font-bold tracking-tight">{v}</dd><dd className="mt-0.5 text-xs text-white/50">{l}</dd></div>)}
            </dl>
          </div>
          <div className="relative px-6 pb-8 sm:px-12 sm:pb-12 lg:py-12 lg:pl-0 lg:pr-12">
            <div aria-hidden className="absolute inset-x-10 bottom-6 h-24 rounded-[100%] bg-blue-500/40 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,.6)] ring-1 ring-white/15">
              <Image src="/img/hero-products.png" alt="Headphones, smartwatch and phone" width={697} height={334} priority className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-14 sm:mt-20">
        <SectionHead eyebrow="Browse" title="Shop by category" href="/products" cta="All products" />
        <ul className="grid grid-cols-4 gap-2 sm:gap-4 lg:grid-cols-8">
          {categories.map((c) => (
            <li key={c.slug}><Link href={`/category/${c.slug}`} className="group flex h-full flex-col items-center gap-2 text-center sm:gap-3">
              <span className="img-well aspect-square w-full rounded-2xl ring-1 ring-transparent transition duration-300 group-hover:bg-brand-soft group-hover:ring-brand/20"><Image src={c.image} alt="" width={96} height={96} className="h-3/5 w-3/5 object-contain transition duration-300 group-hover:scale-110" /></span>
              <span><span className="block text-xs font-semibold sm:text-sm">{c.name}</span><span className="hidden text-xs text-ink-faint sm:block">{counts[c.slug]} item{counts[c.slug] === 1 ? "" : "s"}</span></span>
            </Link></li>
          ))}
        </ul>
      </section>

      {/* Featured */}
      <section className="mt-14 sm:mt-20">
        <SectionHead eyebrow="Hand-picked" title="Featured products" href="/products" cta="View all" />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.id} p={p} layout="stack" />)}</div>
      </section>

      {/* Spotlight */}
      <section className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-brand-soft sm:mt-20">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div className="order-2 px-6 pb-10 md:order-1 md:py-16 md:pl-14">
            <p className="eyebrow">Spotlight</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-.03em] sm:text-[44px] sm:leading-[1.05]">{spotlight.name}</h2>
            <p className="mt-4 max-w-md text-ink-muted sm:text-lg">{spotlight.tagline} Hybrid ANC, up to 60 hours of playtime and USB-C fast charging.</p>
            <ul className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">{["60h battery", "Hybrid ANC", "Bluetooth 5.3"].map((t) => <li key={t} className="rounded-full bg-white px-3 py-1.5 ring-1 ring-line">{t}</li>)}</ul>
            <div className="mt-8 flex items-center gap-5">
              <Link href={`/products/${spotlight.slug}`} className="btn-dark h-12 px-6 text-[15px]">Discover more<Icon name="arrow" className="h-4 w-4" /></Link>
              <span className="text-xl font-bold tracking-tight">{taka(spotlight.price)}</span>
            </div>
          </div>
          <div className="order-1 flex justify-center px-6 pt-10 md:order-2 md:p-10">
            <Image src={spotlight.image} alt={spotlight.name} width={480} height={480} className="w-full max-w-[420px] mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* Deals */}
      <section className="mt-14 sm:mt-20">
        <SectionHead eyebrow="Limited time" title="Today's best deals" href="/offers" cta="All deals" />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{deals.map((p) => <ProductCard key={p.id} p={p} layout="stack" />)}</div>
      </section>

      {/* Bestsellers */}
      <section className="mt-14 sm:mt-20">
        <SectionHead eyebrow="Customer favourites" title="Best sellers" href="/products" cta="Shop all" />
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{best.map((p) => <ProductCard key={p.id} p={p} layout="stack" />)}</div>
      </section>

      {/* Guides */}
      <section className="mt-14 sm:mt-20">
        <SectionHead eyebrow="The Gadget Journal" title="Buying guides & tips" href="/blog" cta="Read the journal" />
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lift">
              <div className="img-well aspect-[16/9] rounded-none"><Image src={a.image} alt="" width={460} height={260} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /></div>
              <div className="p-5"><p className="eyebrow">{a.topic}</p><h3 className="mt-2 line-clamp-2 text-[17px] font-semibold leading-snug tracking-tight group-hover:text-brand">{a.title}</h3><p className="mt-2 text-xs text-ink-faint">{a.date} · {a.readTime}</p></div>
            </Link>
          ))}
        </div>
      </section>

      <Trust />
    </>
  );
}
