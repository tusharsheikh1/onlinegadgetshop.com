import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/Icon";
import { articles } from "@/data/content";
import { categories, products, taka } from "@/data/products";

export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const a = articles.find((x) => x.slug === params.slug); return { title: a?.title ?? "Article", description: a?.excerpt }; }

const toc = (a: (typeof articles)[number]) => a.sections.map((s) => [s.id, s.h ?? "Introduction"] as const);

export default function Article({ params }: { params: { slug: string } }) {
  const a = articles.find((x) => x.slug === params.slug); if (!a) notFound();
  const picks = products.filter((p) => p.category === a.picks && p.inStock && !p.id.startsWith("deal-")).slice(0, 3);
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Buying guides", href: "/blog" }, { label: a.title }]} />
      <div className="grid gap-10 pb-6 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0 max-w-3xl">
          <span className="badge">Buying guide</span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.05]">{a.title}</h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted"><b className="text-navy">GadgetHub Team</b><span className="flex items-center gap-1.5"><Icon name="calendar" className="h-4 w-4" />{a.date.replace(",", "")}</span><span className="flex items-center gap-1.5"><Icon name="clock" className="h-4 w-4" />{a.readTime}</span></p>
          <Image src={a.hero ?? a.image} alt="" width={839} height={302} priority className="mt-6 w-full rounded-2xl bg-surface object-cover" />
          <div className="mt-6 space-y-4 leading-relaxed text-navy/80">
            {a.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-32 space-y-4">
                {s.h && <h2 className="pt-3 text-2xl font-extrabold text-navy">{s.h}</h2>}
                {s.p.map((t, i) => <p key={i}>{t}</p>)}
                {s.callout && <aside className="flex gap-4 rounded-xl bg-brand-soft p-4"><Icon name="battery" className="h-9 w-9 shrink-0 text-brand" /><div><p className="font-bold text-navy">{s.callout.t}</p><p className="text-sm">{s.callout.p}</p></div></aside>}
              </section>))}
          </div>
          <Link href={categories.some((c) => c.slug === a.picks) ? `/category/${a.picks}` : "/products"} className="btn-primary mt-8">Shop {a.picks}</Link>
        </article>
        <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
          <nav aria-label="Table of contents" className="card hidden p-5 lg:block"><p className="mb-3 text-lg font-extrabold">Table of contents</p><ul className="space-y-1 text-sm">{toc(a).map(([id, l]) => <li key={id}><a href={`#${id}`} className="block rounded-md px-3 py-1.5 text-ink-muted hover:bg-brand-soft hover:text-brand">{l}</a></li>)}</ul></nav>
          {picks.length > 0 && <section className="card p-5"><h2 className="mb-3 text-lg font-extrabold">{a.picksTitle}</h2><ul className="divide-y divide-line">{picks.map((p) => <li key={p.id} className="flex items-center gap-3 py-3"><Image src={p.image} alt="" width={64} height={64} className="h-14 w-14 shrink-0 rounded-lg bg-surface object-contain p-1" /><div className="min-w-0 flex-1"><p className="text-sm font-bold leading-snug">{p.name}</p><p className="font-extrabold">{taka(p.price)}</p></div><Link href={`/products/${p.slug}`} className="btn-outline px-3 py-1.5 text-brand">View</Link></li>)}</ul></section>}
        </aside>
      </div>
    </>
  );
}
