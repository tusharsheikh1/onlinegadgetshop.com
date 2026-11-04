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
    <div className="py-4 sm:py-8">
      <section className="grid items-center gap-5 sm:gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div><p className="text-xs font-bold uppercase tracking-widest text-brand sm:text-sm">The Gadget Journal</p>
          <h1 className="mt-2 text-[28px] font-extrabold leading-[1.05] tracking-tight sm:mt-3 sm:text-5xl">Buying Guides, Tips &amp; Expert Advice</h1>
          <p className="mt-3 max-w-md text-sm text-ink-muted sm:mt-4 sm:text-lg">Make smarter tech decisions with in-depth buying guides, comparisons, and practical tips for everyday gadgets.</p>
          <ul className="mt-8 hidden flex-wrap gap-6 sm:flex">{features.map(([i, a, b]) => <li key={a} className="flex items-center gap-2"><Icon name={i} className="h-7 w-7 text-brand" /><div><p className="text-sm font-bold">{a}</p><p className="text-xs text-ink-muted">{b}</p></div></li>)}</ul></div>
        <Link href={`/blog/${f.slug}`} className="card grid overflow-hidden bg-surface md:grid-cols-[1.2fr_1fr]">
          <Image src={f.image} alt="" width={445} height={354} className="h-40 w-full object-cover sm:h-full sm:min-h-[240px]" />
          <div className="flex flex-col justify-center p-4 sm:p-6"><span className="badge self-start uppercase">Featured guide</span>
            <h2 className="mt-2 text-xl font-extrabold leading-tight sm:mt-3 sm:text-2xl">{f.title}</h2><p className="mt-3 text-sm text-ink-muted">{f.excerpt}</p>
            <p className="mt-4 flex items-center gap-4 text-xs text-ink-muted"><span className="flex items-center gap-1"><Icon name="calendar" className="h-4 w-4" />{f.date.replace(",", "")}</span><span className="flex items-center gap-1"><Icon name="clock" className="h-4 w-4" />{f.readTime}</span></p>
            <span className="btn-primary mt-4 self-start sm:mt-5">Read the Buying Guide<Icon name="arrow" className="h-4 w-4" /></span></div></Link>
      </section>
      <div role="tablist" aria-label="Article topics" className="chip-row mt-6 border-b border-line pb-4 sm:mt-10 sm:pb-5">{topics.map((x) => <button key={x} role="tab" aria-selected={t === x} onClick={() => setT(x)} className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold sm:px-4 sm:py-2 ${t === x ? "bg-brand text-white" : "bg-surface hover:bg-brand-soft"}`}>{topicIcons[x] && <Icon name={topicIcons[x]} className="h-4 w-4" />}{x}</button>)}</div>
      {/* Phones list articles as compact rows with a thumbnail, as in the mobile mockup; larger screens use cards. */}
      <ul className="mt-4 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">{list.map((a) => (
        <li key={a.slug}><Link href={`/blog/${a.slug}`} className="card flex h-full gap-3 overflow-hidden p-2.5 hover:border-brand sm:block sm:p-0"><Image src={a.image} alt="" width={440} height={260} className="h-24 w-28 shrink-0 rounded-lg object-cover sm:h-48 sm:w-full sm:rounded-none" />
          <div className="min-w-0 py-0.5 sm:p-5"><p className="text-[11px] font-bold uppercase tracking-wide text-brand sm:text-xs">{a.topic}</p><h3 className="mt-0.5 line-clamp-2 text-[15px] font-extrabold leading-snug sm:mt-1 sm:line-clamp-none sm:text-xl">{a.title}</h3><p className="mt-1 line-clamp-2 text-xs text-ink-muted sm:mt-2 sm:line-clamp-none sm:text-sm">{a.excerpt}</p>
            <p className="mt-1.5 flex items-center gap-3 text-[11px] text-ink-muted sm:mt-3 sm:gap-4 sm:text-xs"><span className="flex items-center gap-1"><Icon name="calendar" className="h-4 w-4" />{a.date.replace(",", "")}</span><span className="flex items-center gap-1"><Icon name="clock" className="h-4 w-4" />{a.readTime}</span></p></div></Link></li>))}
        {list.length === 0 && <li className="text-ink-muted">No articles in this topic yet.</li>}</ul>
    </div>
  );
}
