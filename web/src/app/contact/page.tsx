"use client";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { support } from "@/data/content";

export default function Contact() {
  const [sent, setSent] = useState(false); const [err, setErr] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const d = new FormData(e.currentTarget); const er: Record<string, string> = {};
    if (String(d.get("name")).trim().length < 2) er.name = "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email")))) er.email = "Enter a valid email";
    if (String(d.get("message")).trim().length < 10) er.message = "Message should be at least 10 characters";
    setErr(er); if (!Object.keys(er).length) setSent(true);
  };
  const star = <span className="text-red-500"> *</span>;
  return (
    <div className="py-4 sm:py-6">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface to-blue-50 p-5 sm:p-10">
        <div className="relative z-10 max-w-[60%] sm:max-w-[55%] lg:max-w-[42%]">
          <span className="badge">Contact &amp; Support</span><h1 className="mt-2 text-xl font-extrabold leading-tight tracking-tight sm:mt-3 sm:text-5xl">How can we help you?</h1>
          <p className="mt-2 text-[13px] text-ink-muted sm:mt-3 sm:text-base"><span className="sm:hidden">Get support, ask about an order, or visit our Dhaka showroom.</span><span className="hidden sm:inline">Get in touch with our support team for product queries, orders, warranty, returns or anything about GadgetHub.</span></p>
        </div>
        <Image src="/img/contact-products-m.png" alt="" width={281} height={210} className="pointer-events-none absolute bottom-0 right-0 h-full w-[42%] object-cover object-left lg:hidden" />
        <Image src="/img/banner-products.png" alt="" width={700} height={240} className="pointer-events-none absolute bottom-0 right-0 hidden h-full w-auto max-w-[60%] object-cover object-left lg:block" />
      </section>
      <div className="mt-4 grid items-start gap-4 sm:mt-6 sm:gap-6 lg:grid-cols-[1fr_1.6fr]">
        {sent ? <div role="status" className="card p-6 sm:p-8"><h2 className="h2">Message sent</h2><p className="mt-2 text-ink-muted">Thanks! We will reply within one working day.</p></div> : (
          <form onSubmit={submit} noValidate className="card space-y-3 p-4 sm:space-y-4 sm:p-6">
            <div><h2 className="text-xl font-extrabold sm:text-2xl">Send us a message</h2><p className="mt-1 text-sm text-ink-muted">Have a question or need help? Fill out the form below and we&apos;ll get back to you as soon as possible.</p></div>
            <div><label className="label" htmlFor="name">Name{star}</label><input id="name" name="name" className="input" placeholder="Your full name" aria-invalid={!!err.name} aria-describedby={err.name ? "name-e" : undefined} />{err.name && <p id="name-e" className="mt-1 text-sm text-red-600">{err.name}</p>}</div>
            <div><label className="label" htmlFor="email">Email{star}</label><input id="email" name="email" type="email" className="input" placeholder="Your email address" aria-invalid={!!err.email} aria-describedby={err.email ? "email-e" : undefined} />{err.email && <p id="email-e" className="mt-1 text-sm text-red-600">{err.email}</p>}</div>
            <div><label className="label" htmlFor="order">Order number <span className="font-normal text-ink-muted">(optional)</span></label><input id="order" name="order" className="input" placeholder="e.g. GH-10428" /></div>
            <div><label className="label" htmlFor="message">Message{star}</label><textarea id="message" name="message" rows={4} className="input" placeholder="Tell us how we can help you..." aria-invalid={!!err.message} aria-describedby={err.message ? "message-e" : undefined} />{err.message && <p id="message-e" className="mt-1 text-sm text-red-600">{err.message}</p>}</div>
            <button className="btn-primary w-full py-3"><Icon name="send" className="h-5 w-5" />Send message</button></form>)}
        <div className="space-y-4">
          <section className="card flex flex-wrap items-center gap-3 border-green-200 bg-green-50/60 p-4 sm:gap-4 sm:p-5"><Icon name="chat" className="h-8 w-8 text-green-600 sm:h-10 sm:w-10" /><div className="min-w-[200px] flex-1"><h2 className="text-lg font-extrabold sm:text-xl">Chat on WhatsApp</h2><p className="text-sm text-ink-muted">Get quick support, order updates and product advice on WhatsApp.</p></div><a href="https://wa.me/8801000000000" className="btn-primary w-full sm:w-auto">Message on WhatsApp</a></section>
          <div className="grid gap-4 md:grid-cols-2">
            <section className="card p-4 sm:p-5"><h2 className="flex items-center gap-2 text-lg font-extrabold sm:text-xl"><Icon name="clock" className="h-6 w-6" />Support hours</h2><dl className="mt-3 space-y-2 text-sm">{support.hours.map(([d, t]) => <div key={d} className="flex justify-between gap-3"><dt className="flex items-center gap-2"><Icon name="calendar" className="h-4 w-4" />{d}</dt><dd className="text-right text-ink-muted">{t}</dd></div>)}</dl><p className="mt-3 text-xs text-ink-muted">All times are in Bangladesh Standard Time (BST). Illustrative.</p></section>
            <section className="card p-4 sm:p-5"><h2 className="flex items-center gap-2 text-lg font-extrabold sm:text-xl"><Icon name="pin" className="h-6 w-6" />Dhaka showroom</h2><div className="mt-3 space-y-2 text-sm"><p>Demo showroom: {support.showroom}</p><p className="flex items-center gap-2"><Icon name="phone" className="h-4 w-4" />{support.phone} (illustrative)</p><p className="flex items-center gap-2"><Icon name="mail" className="h-4 w-4" />{support.email}</p></div></section></div>
          <Image src="/img/map-illustration.png" alt="Map showing the Dhaka showroom location" width={868} height={220} className="w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
