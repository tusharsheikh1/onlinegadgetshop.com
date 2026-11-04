import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { policies } from "@/data/content";

export function generateStaticParams() { return Object.keys(policies).map((slug) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { return { title: policies[params.slug]?.title ?? "Policy" }; }

export default function Policy({ params }: { params: { slug: string } }) {
  const p = policies[params.slug]; if (!p) notFound();
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Policies", href: "/policy/returns" }, { label: p.title }]} />
      <div className="grid items-start gap-8 pb-6 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Policies" className="card overflow-hidden"><p className="bg-surface px-5 py-3.5 text-lg font-extrabold">Policies</p>
          <ul className="flex gap-1 overflow-x-auto p-2 lg:flex-col">{Object.entries(policies).map(([s, v]) => { const on = s === params.slug; return (
            <li key={s}><Link href={`/policy/${s}`} aria-current={on ? "page" : undefined} className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-medium ${on ? "bg-brand-soft font-bold text-brand" : "hover:bg-surface"}`}><Icon name={v.icon} className="h-5 w-5" />{v.nav}</Link></li>); })}</ul></nav>
        <article>
          <div className="grid items-start gap-6 xl:grid-cols-[1.35fr_1fr]">
            <div><h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.05]">{p.title}</h1>
              <p className="mt-2 text-sm text-ink-muted">Updated Nov 4 2026 · Illustrative policy copy</p>
              <p className="mt-4 leading-relaxed text-ink-muted">{p.intro}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">{p.highlights.map((h) => <li key={h.t} className="flex gap-3 rounded-xl bg-brand-soft/70 p-3"><Icon name={h.icon} className="h-7 w-7 shrink-0 text-brand" /><div><p className="text-sm font-bold leading-snug">{h.t}</p><p className="mt-0.5 text-xs text-ink-muted">{h.d}</p></div></li>)}</ul></div>
            <Image src="/img/hero-products.png" alt="" width={697} height={334} className="hidden w-full rounded-2xl object-cover xl:block" />
          </div>
          <div className="mt-6 divide-y divide-line border-t border-line">{p.sections.map((s) => (
            <section key={s.h} className="flex gap-4 py-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand"><Icon name={s.icon} className="h-6 w-6" /></span>
              <div className="min-w-0"><h2 className="text-2xl font-extrabold">{s.h}</h2>{s.intro && <p className="mt-1 text-ink-muted">{s.intro}</p>}
                {s.bullets && <ul className="mt-3 space-y-1.5 text-sm">{s.bullets.map((b) => <li key={b} className="flex gap-3"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />{b}</li>)}</ul>}
                {s.steps && <ol className="mt-3 space-y-2 text-sm">{s.steps.map((t, i) => <li key={t} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">{i + 1}</span><span className="pt-0.5">{t}</span></li>)}</ol>}
              </div></section>))}</div>
        </article>
      </div>
    </>
  );
}
