import type { Metadata } from "next";
import Image from "next/image";
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
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/products" }, { label: cat.name }]} />
      <section className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 to-blue-200 p-6 sm:p-10">
        <h1 className="h1">{cat.name}</h1>
        <p className="mt-2 max-w-md text-ink-muted">Discover the best {cat.name.toLowerCase()} with official warranty and fast delivery across Bangladesh.</p>
        <Image src={cat.image} alt="" width={160} height={160} className="absolute bottom-2 right-6 hidden h-32 w-auto object-contain sm:block" />
      </section>
      <Catalog items={items} showCategory={false} chips={chips[cat.slug]} />
    </>
  );
}
