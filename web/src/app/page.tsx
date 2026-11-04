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
      <section className="mt-3 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-200 sm:mt-6">
        {/* Phones: text beside the image, as in the mobile mockup. Tablet: stacked. Desktop: two columns. */}
        <div className="grid grid-cols-[1.3fr_1fr] items-center sm:grid-cols-1 lg:grid-cols-2">
          <div className="py-5 pl-4 pr-1 sm:p-10 lg:p-16">
            <h1 className="text-[24px] font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">Upgrade your everyday.</h1>
            <p className="mt-2.5 text-[13px] leading-snug text-ink-muted sm:mt-5 sm:max-w-md sm:text-lg">The latest phones, smartwatches and headphones for work, play and everything in between.</p>
            <Link href="/products" className="btn-primary mt-4 px-4 py-2.5 sm:mt-8 sm:px-7 sm:py-3.5 sm:text-base">Shop now<Icon name="arrow" className="h-4 w-4 sm:h-5 sm:w-5" /></Link>
          </div>
          <Image src="/img/hero-products-m.png" alt="Headphones, smartwatch and phone" width={436} height={366} priority className="h-full w-full self-end object-contain object-right-bottom sm:hidden" />
          <Image src="/img/hero-products.png" alt="Headphones, smartwatch and phone" width={900} height={450} priority className="hidden h-full w-full object-contain object-right-bottom sm:block" />
        </div>
      </section>

      <section aria-label="Categories" className="mt-4 sm:mt-5">
        <ul className="grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-8">
          {categories.map((c) => (
            <li key={c.slug}><Link href={`/category/${c.slug}`} className="card flex h-full flex-col items-center gap-1 p-1.5 text-center text-[11px] font-medium leading-tight tracking-tight hover:border-brand sm:gap-2 sm:p-3 sm:text-sm sm:tracking-normal">
              <Image src={c.image} alt="" width={64} height={64} className="h-9 w-auto object-contain sm:h-14" />{c.name}</Link></li>
          ))}
        </ul>
      </section>

      <section className="mt-7 sm:mt-10">
        <div className="mb-3 flex items-end justify-between gap-3 sm:mb-4"><h2 className="h2">Featured products</h2><Link href="/products" aria-label="View all products" className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand sm:text-sm">View all<span className="hidden sm:inline"> products</span><Icon name="arrow" className="h-4 w-4" /></Link></div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.id} p={p} layout="stack" />)}</div>
      </section>
      <Trust />
    </>
  );
}
