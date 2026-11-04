"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { articles } from "@/data/content";

const topicIcons: Record<string, string> = { Audio: "headset", Laptops: "grid", Wearables: "clock", Accessories: "battery" };
const topics = ["All Articles", "Audio", "Laptops", "Wearables", "Accessories"];
const features = [["book", "Buying Guides", "Choose the right gadget"], ["compare", "Comparisons", "See what's best for you"], ["help", "Tips & How-Tos", "Get more from your tech"]];

export default function Blog() {
  const [t, setT] = useState("All Articles");
  const [f, ...others] = articles; // featured guide is always the first article
  const list = t === "All Articles" ? others : articles.filter((a) => a.topic === t);
  return (
    <div className="py-8">
      <section className="grid items-center gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div><p className="text-sm font-bold uppercase tracking-widest text-brand">The Gadget Journal</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">Buying Guides, Tips &amp; Expert Advice</h1>
          <p className="mt-4 max-w-md text-lg text-ink-muted">Make smarter tech decisions with in-depth buying guides, comparisons, and practical tips for everyday gadgets.</p>
          <ul className="mt-8 flex flex-wrap gap-6">{features.map(([i, a, b]) => <li key={a} className="flex items-center gap-2"><Icon name={i} className="h-7 w-7 text-brand" /><div><p className="text-sm font-bold">{a}</p><p className="text-xs text-ink-muted">{b}</p></div></li>)}</ul></div>
        <Link href={`/blog/${f.slug}`} className="card grid overflow-hidden bg-surface md:grid-cols-[1.2fr_1fr]">
          <Image src={f.image} alt="" width={445} height={354} className="h-full min-h-[240px] w-full object-cover" />
          <div className="flex flex-col justify-center p-6"><span className="badge self-start uppercase">Featured guide</span>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight">{f.title}</h2><p className="mt-3 text-sm text-ink-muted">{f.excerpt}</p>
            <p className="mt-4 flex items-center gap-4 text-xs text-ink-muted"><span className="flex items-center gap-1"><Icon name="calendar" className="h-4 w-4" />{f.date.replace(",", "")}</span><span className="flex items-center gap-1"><Icon name="clock" className="h-4 w-4" />{f.readTime}</span></p>
            <span className="btn-primary mt-5 self-start">Read the Buying Guide<Icon name="arrow" className="h-4 w-4" /></span></div></Link>
      </section>
      <div role="tablist" aria-label="Article topics" className="mt-10 flex flex-wrap gap-2 border-b border-line pb-5">{topics.map((x) => <button key={x} role="tab" aria-selected={t === x} onClick={() => setT(x)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${t === x ? "bg-brand text-white" : "bg-surface hover:bg-brand-soft"}`}>{topicIcons[x] && <Icon name={topicIcons[x]} className="h-4 w-4" />}{x}</button>)}</div>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map((a) => (
        <li key={a.slug}><Link href={`/blog/${a.slug}`} className="card block h-full overflow-hidden hover:border-brand"><Image src={a.image} alt="" width={440} height={260} className="h-48 w-full object-cover" />
          <div className="p-5"><p className="text-xs font-bold uppercase tracking-wide text-brand">{a.topic}</p><h3 className="mt-1 text-xl font-extrabold leading-snug">{a.title}</h3><p className="mt-2 text-sm text-ink-muted">{a.excerpt}</p>
            <p className="mt-3 flex items-center gap-4 text-xs text-ink-muted"><span className="flex items-center gap-1"><Icon name="calendar" className="h-4 w-4" />{a.date.replace(",", "")}</span><span className="flex items-center gap-1"><Icon name="clock" className="h-4 w-4" />{a.readTime}</span></p></div></Link></li>))}
        {list.length === 0 && <li className="text-ink-muted">No articles in this topic yet.</li>}</ul>
    </div>
  );
}
