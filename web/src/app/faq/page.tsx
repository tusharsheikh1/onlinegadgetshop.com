"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { faqs, support } from "@/data/content";

const tabIcons: Record<string, string> = { Delivery: "truck", Payment: "tag", Returns: "refresh", Warranty: "shield" };

export default function Faq() {
  const topics = Object.keys(faqs); const [t, setT] = useState(topics[0]); const [q, setQ] = useState(""); const [open, setOpen] = useState<string | null>(faqs[topics[0]][0].q);
  const list = q ? Object.values(faqs).flat().filter((x) => (x.q + x.a).toLowerCase().includes(q.toLowerCase())) : faqs[t];
  // Desktop puts the search inside the banner; phones and tablets put it under the banner, as in the mobile mockup.
  const search = (cls: string) => (
    <div className={`items-center gap-2 rounded-xl border border-line bg-white p-1.5 pl-3 ${cls}`}><Icon name="search" className="h-5 w-5 shrink-0 text-ink-muted" /><input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search help" placeholder="Search help articles or ask a question…" className="w-full min-w-0 bg-transparent py-2 text-sm outline-none" /></div>
  );
  const hours = support.hours.map(([d, h]) => `${d.replace("Saturday – Thursday", "Sat – Thu").replace("Friday", "Fri")} ${h}`).join(" · ");
  return (
    <div className="py-4 sm:py-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface to-blue-50 p-5 sm:p-10">
        <div className="relative z-10 max-w-[60%] sm:max-w-[55%] lg:max-w-[42%]">
          <span className="badge">FAQ</span><h1 className="mt-2 text-xl font-extrabold leading-tight tracking-tight sm:mt-3 sm:text-5xl">How can we help?</h1>
          <p className="mt-2 text-[13px] text-ink-muted sm:mt-3 sm:text-base">Find quick answers to common questions about orders, delivery, payment, returns, warranty, and more.</p>
          {search("mt-6 hidden lg:flex")}
        </div>
        <Image src="/img/support-products-m.png" alt="" width={369} height={304} className="pointer-events-none absolute bottom-0 right-0 h-full w-[42%] object-cover object-left lg:hidden" />
        <Image src="/img/banner-products.png" alt="" width={700} height={240} className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-auto max-w-[55%] object-cover object-left lg:block" />
      </section>
      {search("mt-4 flex lg:hidden")}
      <div role="tablist" aria-label="FAQ topics" className="chip-row mt-4 sm:mt-6 md:mx-0 md:grid md:grid-cols-4 md:gap-3 md:px-0">{topics.map((x) => <button key={x} role="tab" aria-selected={!q && t === x} onClick={() => { setQ(""); setT(x); setOpen(null); }} className={`chip flex items-center gap-2 md:justify-center md:gap-3 md:rounded-xl md:px-4 md:py-4 md:text-base md:font-bold ${!q && t === x ? "border-brand bg-brand text-white" : "border-line bg-white hover:border-brand"}`}><Icon name={tabIcons[x]} className="h-5 w-5 md:h-6 md:w-6" />{x}</button>)}</div>
      <div className="mt-5 grid items-start gap-5 sm:mt-6 sm:gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="card order-2 bg-brand-soft p-4 sm:p-5 lg:order-1 lg:space-y-3">
          <div className="flex items-center gap-3 lg:block lg:space-y-3">
            <Icon name="headset" className="h-8 w-8 shrink-0 text-brand lg:h-9 lg:w-9" />
            <div className="min-w-0 flex-1"><h2 className="text-base font-extrabold lg:text-2xl">Still need help?</h2><p className="text-xs text-ink-muted sm:text-sm">Our support team is here for you.</p></div>
            <Link href="/contact" className="btn-primary shrink-0 px-4 py-2 lg:hidden">Contact us<Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          <Link href="/contact" className="btn-primary hidden w-full py-3 lg:flex"><Icon name="chat" className="h-5 w-5" />Chat with us</Link>
          <div className="mt-3 hidden gap-3 sm:grid sm:grid-cols-2 lg:mt-0 lg:block lg:space-y-3">
            <div className="card flex items-center gap-3 p-3"><Icon name="mail" className="h-6 w-6 shrink-0" /><div className="min-w-0"><p className="font-bold">Email us</p><p className="break-words text-sm text-ink-muted">{support.email}</p></div></div>
            <div className="card flex items-center gap-3 p-3"><Icon name="phone" className="h-6 w-6 shrink-0" /><div><p className="font-bold">Call us</p><p className="text-sm text-ink-muted">{support.phone}<br />{hours}</p></div></div>
          </div>
        </aside>
        <section className="order-1 lg:order-2"><h2 className="h2 mb-3 sm:mb-4">{q ? `Results for “${q}”` : `${t} FAQs`}</h2>
          <div className="space-y-2.5 sm:space-y-3">{list.length === 0 && <p className="text-ink-muted">No answers found.</p>}{list.map((x) => { const o = open === x.q; return (
            <div key={x.q} className={`card overflow-hidden ${o ? "border-brand" : ""}`}><h3><button aria-expanded={o} onClick={() => setOpen(o ? null : x.q)} className={`flex w-full items-center justify-between gap-4 p-3.5 text-left text-[15px] font-bold sm:p-4 sm:text-base ${o ? "bg-brand-soft" : ""}`}>{x.q}<Icon name="chevron" className={`h-5 w-5 shrink-0 transition-transform ${o ? "rotate-180" : ""}`} /></button></h3>{o && <p className="px-3.5 py-3 text-sm text-ink-muted sm:px-4 sm:text-base">{x.a}</p>}</div>); })}</div></section>
      </div>
    </div>
  );
}
