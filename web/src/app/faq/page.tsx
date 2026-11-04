"use client";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { faqs } from "@/data/content";

export default function Faq() {
  const topics = Object.keys(faqs); const [t, setT] = useState(topics[0]); const [q, setQ] = useState(""); const [open, setOpen] = useState<string | null>(faqs[topics[0]][0].q);
  const list = q ? Object.values(faqs).flat().filter((x) => (x.q + x.a).toLowerCase().includes(q.toLowerCase())) : faqs[t];
  return (
    <div className="mx-auto max-w-3xl py-8"><h1 className="h1">How can we help?</h1>
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-line px-3"><Icon name="search" className="h-5 w-5 text-ink-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search help" placeholder="Search help" className="w-full bg-transparent py-3 text-sm outline-none" /></div>
      {!q && <div role="tablist" className="mt-5 flex flex-wrap gap-2">{topics.map((x) => <button key={x} role="tab" aria-selected={t === x} onClick={() => { setT(x); setOpen(null); }} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${t === x ? "border-brand bg-brand text-white" : "border-line"}`}>{x}</button>)}</div>}
      <div className="mt-6 space-y-3">{list.length === 0 && <p className="text-ink-muted">No answers found.</p>}{list.map((x) => { const o = open === x.q; return (
        <div key={x.q} className="card"><h2><button aria-expanded={o} onClick={() => setOpen(o ? null : x.q)} className="flex w-full items-center justify-between gap-4 p-4 text-left font-bold">{x.q}<Icon name="chevron" className={`h-5 w-5 shrink-0 transition-transform ${o ? "rotate-180" : ""}`} /></button></h2>{o && <p className="px-4 pb-4 text-ink-muted">{x.a}</p>}</div>); })}</div></div>
  );
}
