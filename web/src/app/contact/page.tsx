"use client";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/Icon";

export default function Contact() {
  const [sent, setSent] = useState(false); const [err, setErr] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const d = new FormData(e.currentTarget); const er: Record<string, string> = {};
    if (String(d.get("name")).trim().length < 2) er.name = "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email")))) er.email = "Enter a valid email";
    if (String(d.get("message")).trim().length < 10) er.message = "Message should be at least 10 characters";
    setErr(er); if (!Object.keys(er).length) setSent(true);
  };
  return (
    <div className="py-8"><h1 className="h1">How can we help?</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {sent ? <div role="status" className="card p-8"><h2 className="h2">Message sent</h2><p className="mt-2 text-ink-muted">Thanks! We will reply within one working day.</p></div> : (
          <form onSubmit={submit} noValidate className="card space-y-4 p-6">
            {[["name", "Name", "text"], ["email", "Email", "email"], ["order", "Order number (optional)", "text"]].map(([k, l, t]) => <div key={k}><label className="label" htmlFor={k}>{l}</label><input id={k} name={k} type={t} className="input" />{err[k] && <p className="mt-1 text-sm text-red-600">{err[k]}</p>}</div>)}
            <div><label className="label" htmlFor="message">Message</label><textarea id="message" name="message" rows={5} className="input" />{err.message && <p className="mt-1 text-sm text-red-600">{err.message}</p>}</div>
            <button className="btn-primary">Send message</button></form>)}
        <aside className="space-y-4">
          <a href="https://wa.me/8801000000000" className="btn-primary w-full bg-green-600 py-3 hover:bg-green-700"><Icon name="chat" />WhatsApp support</a>
          <div className="card space-y-3 p-5 text-sm"><p className="flex gap-3"><Icon name="pin" className="h-5 w-5 shrink-0 text-brand" />Demo showroom: House 12, Road 5, Dhanmondi, Dhaka 1205</p><p className="flex gap-3"><Icon name="clock" className="h-5 w-5 shrink-0 text-brand" />Support hours: Everyday, 9:00 AM – 10:00 PM</p><p className="flex gap-3"><Icon name="phone" className="h-5 w-5 shrink-0 text-brand" />Illustrative number: 01000-000000</p></div>
          <Image src="/img/map-illustration.png" alt="Map showing the Dhaka showroom location" width={868} height={220} className="w-full rounded-xl" />
        </aside>
      </div></div>
  );
}
