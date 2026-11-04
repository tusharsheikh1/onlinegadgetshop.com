"use client";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { faqs } from "@/data/content";

const tabIcons: Record<string, string> = { Delivery: "truck", Payment: "tag", Returns: "refresh", Warranty: "shield" };

export default function Faq() {
  const topics = Object.keys(faqs); const [t, setT] = useState(topics[0]); const [q, setQ] = useState(""); const [open, setOpen] = useState<string | null>(faqs[topics[0]][0].q);
  const list = q ? Object.values(faqs).flat().filter((x) => (x.q + x.a).toLowerCase().includes(q.toLowerCase())) : faqs[t];
  return (
    <div className="py-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface to-blue-50 p-6 sm:p-10">
        <span className="badge">FAQ</span><h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">How can we help?</h1>
        <p className="mt-3 max-w-md text-ink-muted lg:max-w-[42%]">Find quick answers to common questions about orders, delivery, payment, returns, warranty, and more.</p>
        <div className="mt-6 flex max-w-xl lg:max-w-[42%] items-center gap-2 rounded-xl border border-line bg-white p-1.5 pl-3"><Icon name="search" className="h-5 w-5 text-ink-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search help" placeholder="Search help articles or ask a question…" className="w-full bg-transparent py-2 text-sm outline-none" /></div>
        <Image src="/img/banner-products.png" alt="" width={700} height={240} className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-auto max-w-[55%] object-cover object-left lg:block" />
      </section>
      <div role="tablist" className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">{topics.map((x) => <button key={x} role="tab" aria-selected={!q && t === x} onClick={() => { setQ(""); setT(x); setOpen(null); }} className={`flex items-center justify-center gap-3 rounded-xl border px-4 py-4 font-bold ${!q && t === x ? "border-brand bg-brand text-white" : "border-line bg-white hover:border-brand"}`}><Icon name={tabIcons[x]} className="h-6 w-6" />{x}</button>)}</div>
      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="card order-2 space-y-3 bg-brand-soft p-5 lg:order-1"><Icon name="headset" className="h-9 w-9 text-brand" /><h2 className="text-2xl font-extrabold">Still need help?</h2><p className="text-sm text-ink-muted">Our support team is here for you.</p>
          <a href="/contact" className="btn-primary w-full py-3"><Icon name="chat" className="h-5 w-5" />Chat with us</a>
          <div className="card flex items-center gap-3 p-3"><Icon name="mail" className="h-6 w-6" /><div><p className="font-bold">Email us</p><p className="text-sm text-ink-muted">support@gadgethub.example</p></div></div>
          <div className="card flex items-center gap-3 p-3"><Icon name="phone" className="h-6 w-6" /><div><p className="font-bold">Call us</p><p className="text-sm text-ink-muted">+880 9612-345678<br />Sun – Fri, 9:00 AM – 9:00 PM</p></div></div></aside>
        <section className="order-1 lg:order-2"><h2 className="h2 mb-4">{q ? `Results for “${q}”` : `${t} FAQs`}</h2>
          <div className="space-y-3">{list.length === 0 && <p className="text-ink-muted">No answers found.</p>}{list.map((x) => { const o = open === x.q; return (
            <div key={x.q} className={`card overflow-hidden ${o ? "border-brand" : ""}`}><h3><button aria-expanded={o} onClick={() => setOpen(o ? null : x.q)} className={`flex w-full items-center justify-between gap-4 p-4 text-left font-bold ${o ? "bg-brand-soft" : ""}`}>{x.q}<Icon name="chevron" className={`h-5 w-5 shrink-0 transition-transform ${o ? "rotate-180" : ""}`} /></button></h3>{o && <p className="px-4 py-3 text-ink-muted">{x.a}</p>}</div>); })}</div></section>
      </div>
    </div>
  );
}
