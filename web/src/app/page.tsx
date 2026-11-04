import Link from "next/link";
import Image from "next/image";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/Icon";
import { Trust } from "@/components/Trust";

export default function Home() {
  const featured = ["galaxy-a56", "sony-wh1000xm5", "watch-fit-3", "buds-pro-2"].map((id) => products.find((p) => p.id === id)!);
  return (
    <>
      <section className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-200 sm:mt-6">
        <div className="grid items-center lg:grid-cols-2">
          <div className="p-6 sm:p-10 lg:p-16">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">Upgrade your everyday.</h1>
            <p className="mt-5 max-w-md text-lg text-ink-muted">The latest phones, smartwatches and headphones for work, play and everything in between.</p>
            <Link href="/products" className="btn-primary mt-8 px-7 py-3.5 text-base">Shop now<Icon name="arrow" className="h-5 w-5" /></Link>
          </div>
          <Image src="/img/hero-products.png" alt="Headphones, smartwatch and phone" width={900} height={450} priority className="h-full w-full object-cover object-left" />
        </div>
      </section>

      <section aria-label="Categories" className="mt-5">
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => (
            <li key={c.slug}><Link href={`/category/${c.slug}`} className="card flex h-full flex-col items-center gap-2 p-3 text-sm font-medium hover:border-brand">
              <Image src={c.image} alt="" width={64} height={64} className="h-14 w-auto object-contain" />{c.name}</Link></li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between"><h2 className="h2">Featured products</h2><Link href="/products" className="flex items-center gap-1 text-sm font-semibold text-brand">View all products<Icon name="arrow" className="h-4 w-4" /></Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.id} p={p} layout="stack" />)}</div>
      </section>
      <Trust />
    </>
  );
}
