"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { articles } from "@/data/content";

export default function Blog() {
  const topics = ["All", ...Array.from(new Set(articles.map((a) => a.topic)))]; const [t, setT] = useState("All");
  const list = articles.filter((a) => t === "All" || a.topic === t); const [f, ...rest] = list;
  return (
    <div className="py-8"><h1 className="h1">The Gadget Journal</h1>
      <div role="tablist" className="mt-5 flex flex-wrap gap-2">{topics.map((x) => <button key={x} role="tab" aria-selected={t === x} onClick={() => setT(x)} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${t === x ? "border-brand bg-brand text-white" : "border-line"}`}>{x}</button>)}</div>
      {f && <Link href={`/blog/${f.slug}`} className="card mt-6 grid overflow-hidden md:grid-cols-2"><Image src={f.image} alt="" width={445} height={354} className="h-64 w-full bg-surface object-contain md:h-full" /><div className="p-6 sm:p-10"><span className="badge">{f.topic}</span><h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{f.title}</h2><p className="mt-3 text-ink-muted">{f.excerpt}</p><p className="mt-4 text-sm text-ink-faint">{f.date}</p></div></Link>}
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{rest.map((a) => <li key={a.slug}><Link href={`/blog/${a.slug}`} className="card block h-full overflow-hidden hover:border-brand"><Image src={a.image} alt="" width={400} height={240} className="h-44 w-full object-cover" /><div className="p-4"><span className="badge">{a.topic}</span><h3 className="mt-2 font-bold">{a.title}</h3><p className="mt-1 text-sm text-ink-muted">{a.excerpt}</p></div></Link></li>)}</ul></div>
  );
}
