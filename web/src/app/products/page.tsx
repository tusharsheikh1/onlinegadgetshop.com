import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Catalog } from "@/components/Catalog";
import { PageTitle } from "@/components/Page";
import { products } from "@/data/products";
export const metadata: Metadata = { title: "All Products" };
export default function AllProducts() {
  return (<><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All Products" }]} /><PageTitle title="All Products" /><Catalog items={products} /></>);
}
