import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { policies } from "@/data/content";

export function generateStaticParams() { return Object.keys(policies).map((slug) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { return { title: policies[params.slug]?.title ?? "Policy" }; }

export default function Policy({ params }: { params: { slug: string } }) {
  const p = policies[params.slug]; if (!p) notFound();
  return (
    <div className="grid gap-8 py-8 lg:grid-cols-[240px_1fr]">
      <nav aria-label="Policies" className="card flex gap-1 overflow-x-auto p-2 lg:flex-col">{Object.entries(policies).map(([s, v]) => <Link key={s} href={`/policy/${s}`} aria-current={s === params.slug ? "page" : undefined} className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold ${s === params.slug ? "bg-brand text-white" : "hover:bg-surface"}`}>{v.title}</Link>)}</nav>
      <article className="max-w-3xl"><h1 className="h1">{p.title}</h1><p className="mt-2 text-sm text-ink-muted">Updated Nov 4 2026 · Illustrative policy copy</p>
        {p.sections.map((s) => <section key={s.h} className="mt-8"><h2 className="text-xl font-extrabold">{s.h}</h2><p className="mt-2 leading-relaxed text-ink-muted">{s.p}</p></section>)}</article>
    </div>
  );
}
