import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductDetail } from "@/components/ProductDetail";
import { categories, getProduct, products } from "@/data/products";

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const p = getProduct(params.slug); return { title: p?.name ?? "Product", description: p?.tagline }; }

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  const cat = categories.find((c) => c.slug === p.category);
  return (<><Breadcrumbs items={[{ label: "Home", href: "/" }, ...(cat ? [{ label: cat.name, href: `/category/${cat.slug}` }] : []), { label: p.name }]} /><ProductDetail p={p} /></>);
}
