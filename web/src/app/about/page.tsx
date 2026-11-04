import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icon";
export const metadata: Metadata = { title: "About Us" };
const values = [["star", "Product quality", "Every item is sourced from authorised distributors."], ["shield", "Warranty", "Official warranty on every gadget we sell."], ["headset", "Support", "Real people, every day from 9 AM to 10 PM."]];
export default function About() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Technology for everyday life</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">GadgetHub is a Bangladesh gadget store built to make great technology easy to buy and easy to trust.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2"><Image src="/img/showroom.png" alt="GadgetHub showroom" width={825} height={340} className="w-full rounded-2xl object-cover" /><Image src="/img/team.png" alt="The GadgetHub team" width={593} height={279} className="h-full w-full rounded-2xl object-cover" /></div>
      <section className="mt-10 max-w-3xl"><h2 className="h2">Our story</h2><p className="mt-3 text-ink-muted">We started with a simple idea: buying gadgets should be transparent. Clear prices in taka, genuine products, honest warranty terms and delivery you can count on across the country.</p></section>
      <ul className="mt-10 grid gap-4 sm:grid-cols-3">{values.map(([i, t, d]) => <li key={t} className="card p-6"><Icon name={i} className="h-8 w-8 text-brand" /><h3 className="mt-3 font-bold">{t}</h3><p className="mt-1 text-sm text-ink-muted">{d}</p></li>)}</ul>
    </div>
  );
}
