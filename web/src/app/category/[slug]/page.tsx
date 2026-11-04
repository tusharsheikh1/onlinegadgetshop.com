import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Catalog } from "@/components/Catalog";
import { categories, products } from "@/data/products";

export function generateStaticParams() { return categories.map((c) => ({ slug: c.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const c = categories.find((x) => x.slug === params.slug); return { title: c ? c.name : "Category" }; }

const chips: Record<string, string[]> = { headphones: ["Wireless", "Over-ear", "Earbuds"], phones: ["5G", "Pro"], laptops: ["Core i5"] };

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categories.find((c) => c.slug === params.slug);
  if (!cat) notFound();
  const items = products.filter((p) => p.category === cat.slug);
  const headphones = cat.slug === "headphones";
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/products" }, { label: cat.name }]} />
      {/* Phones show the title above the banner (mobile mockup); larger screens show the banner first (desktop mockup). */}
      <div className="flex flex-col">
        <div className="mb-3 sm:order-2 sm:mb-4">
          <div className="flex items-baseline gap-3"><h1 className="h1">{cat.name}</h1><span className="text-sm text-ink-muted">{items.length} products</span></div>
          {headphones && <p className="mt-1 text-sm text-ink-muted sm:hidden">Wireless, over-ear and earbuds for music, work and gaming.</p>}
        </div>
        <div className="mb-4 sm:order-1 sm:mb-6">
          {headphones ? (
            <>
              <Link href="/blog/choose-wireless-headphones" className="block overflow-hidden rounded-2xl sm:hidden">
                <Image src="/img/category-banner-m.png" alt="Editorial: Find the right headphones for you. A simple guide to sound, comfort and everyday use. Read the buying guide." width={806} height={304} priority className="w-full" />
              </Link>
              <Image src="/img/category-hero.png" alt="Headphones: find your perfect sound. Wireless freedom, immersive audio and all-day comfort." width={1380} height={209} priority className="hidden w-full rounded-2xl sm:block" />
            </>
          ) : (
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-blue-200 p-5 sm:p-10">
              <div className="max-w-[65%] sm:max-w-md">
                <p className="text-xs font-bold uppercase tracking-wide text-brand sm:text-sm">{cat.name}</p>
                <p className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Shop {cat.name}</p>
                <p className="mt-2 text-sm text-ink-muted sm:text-base">Discover the best {cat.name.toLowerCase()} with official warranty and fast delivery across Bangladesh.</p>
              </div>
              <Image src={cat.image} alt="" width={160} height={160} className="absolute bottom-3 right-3 h-20 w-auto object-contain sm:bottom-2 sm:right-6 sm:h-32" />
            </section>
          )}
        </div>
      </div>
      <Catalog items={items} showCategory={false} chips={chips[cat.slug]} />
    </>
  );
}
