import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { articles } from "@/data/content";

export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { const a = articles.find((x) => x.slug === params.slug); return { title: a?.title ?? "Article", description: a?.excerpt }; }
const toc = [["intro", "Introduction"], ["battery", "Battery life"], ["anc", "Noise cancellation"], ["comfort", "Comfort & fit"]];

export default function Article({ params }: { params: { slug: string } }) {
  const a = articles.find((x) => x.slug === params.slug); if (!a) notFound();
  return (
    <><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Buying guides", href: "/blog" }, { label: a.title }]} />
      <div className="grid gap-10 pb-6 lg:grid-cols-[1fr_240px]">
        <article className="max-w-3xl"><span className="badge">{a.topic}</span><h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{a.title}</h1>
          <p className="mt-3 text-sm text-ink-muted">{a.date} · GadgetHub Team</p>
          <Image src={a.image} alt="" width={839} height={302} className="mt-6 w-full rounded-2xl bg-surface object-contain" />
          <div className="mt-6 space-y-5 leading-relaxed text-ink-muted">
            <p id="intro">{a.excerpt} This guide walks through the points that make the biggest difference, so you can compare options with confidence.</p>
            <h2 id="battery" className="pt-2 text-2xl font-extrabold text-navy">Battery life</h2>
            <p>Look for 30+ hours with noise cancellation off. Fast charging that gives hours of playback from a few minutes on the cable is a useful bonus.</p>
            <h2 id="anc" className="pt-2 text-2xl font-extrabold text-navy">Noise cancellation</h2>
            <p>Hybrid ANC handles both low rumble and voices. Check that a transparency mode is included for commutes.</p>
            <h2 id="comfort" className="pt-2 text-2xl font-extrabold text-navy">Comfort &amp; fit</h2>
            <p>Weight, clamp force and ear-cup size matter more than most spec sheets. Try before you buy at our showroom if you can.</p></div>
          <Link href="/category/headphones" className="btn-primary mt-8">Shop headphones</Link></article>
        <aside className="hidden lg:block"><nav aria-label="Table of contents" className="sticky top-32 card p-5"><p className="mb-3 font-bold">On this page</p><ul className="space-y-2 text-sm">{toc.map(([id, l]) => <li key={id}><a href={`#${id}`} className="text-ink-muted hover:text-brand">{l}</a></li>)}</ul></nav></aside>
      </div></>
  );
}
