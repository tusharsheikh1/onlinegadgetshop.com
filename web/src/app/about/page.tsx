import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
export const metadata: Metadata = { title: "About Us" };
const stats = [["pin", "Bangladesh", "Based in Bangladesh"], ["user", "10,000+", "Happy customers"], ["box", "500+", "Gadget products"], ["calendar", "Nov 4 2026", "Our journey continues"]];
const values = [["shield", "Product quality", "100% authentic gadgets from trusted brands, with proper quality checks."], ["star", "Warranty", "Official or store warranty (up to 12 months, depending on the product) for your peace of mind."], ["headset", "Customer support", "Friendly and responsive support to help you before and after your purchase."], ["heart", "Our values", "Trust, authenticity, customer happiness, and a long-term commitment to Bangladesh's tech community."]];
export default function About() {
  return (
    <div className="py-8">
      <section className="grid items-center gap-8 lg:grid-cols-[1fr_1.45fr]">
        <div><span className="badge">About Us</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">Technology for everyday life</h1>
          <p className="mt-5 text-lg text-ink-muted">GadgetHub is a trusted Bangladesh gadget store, making modern technology more accessible, reliable, and useful for everyone — from students and professionals to families across the country.</p>
          <div className="mt-6 flex flex-wrap gap-3"><Link href="/products" className="btn-primary px-6 py-3">Shop Our Gadgets<Icon name="arrow" className="h-4 w-4" /></Link><Link href="/offers" className="btn-outline px-6 py-3">Explore Deals</Link></div></div>
        <Image src="/img/showroom.png" alt="The GadgetHub showroom with laptops, headphones and smartwatches on display" width={825} height={340} priority className="w-full rounded-2xl object-cover" />
      </section>
      <hr className="my-10 border-line" />
      <section className="grid items-center gap-8 lg:grid-cols-[1fr_1fr]">
        <Image src="/img/team.png" alt="The GadgetHub team in the showroom" width={593} height={279} className="w-full rounded-2xl object-cover" />
        <div><h2 className="text-3xl font-extrabold tracking-tight">Our story</h2>
          <p className="mt-3 leading-relaxed text-ink-muted">GadgetHub started with a simple idea: to build a reliable, customer-first gadget store in Bangladesh. What began as a small online shop has grown into a trusted destination for authentic gadgets, with a curated range, competitive prices, and support you can count on.</p>
          <p className="mt-3 leading-relaxed text-ink-muted">Today, we serve thousands of customers across Bangladesh, both online and in our store, helping people choose the right technology for work, study, creativity, and everyday life.</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">{stats.map(([i, t, d]) => <li key={t} className="flex items-center gap-2"><Icon name={i} className="h-7 w-7 shrink-0 text-brand" /><div><p className="font-extrabold leading-tight">{t}</p><p className="text-xs text-ink-muted">{d}</p></div></li>)}</ul></div>
      </section>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{values.map(([i, t, d]) => <li key={t} className="flex gap-4 rounded-xl bg-brand-soft/60 p-5"><Icon name={i} className="h-9 w-9 shrink-0 text-brand" /><div><h3 className="text-lg font-extrabold">{t}</h3><p className="mt-1 text-sm text-ink-muted">{d}</p></div></li>)}</ul>
    </div>
  );
}
