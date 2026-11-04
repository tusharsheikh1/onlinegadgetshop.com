"use client";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageTitle } from "@/components/Page";
import { byId, taka } from "@/data/products";
import { useHydrated } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { totals } from "@/lib/totals";

const pays = [["bKash", "Pay securely with your bKash account", "#E2136E"], ["Nagad", "Pay securely with your Nagad account", "#F26522"], ["Card", "Pay with Visa, Mastercard or American Express", "#2563EB"], ["Cash on delivery", "Pay in cash when you receive your order", "#16A34A"]];
const fields = [["name", "Full name", "text", "name"], ["phone", "Phone number", "tel", "tel"], ["email", "Email", "email", "email"], ["area", "Area / District", "text", "address-level2"], ["address", "Street address", "text", "street-address"]] as const;

export default function Checkout() {
  const router = useRouter(); const ready = useHydrated();
  const cart = useStore((s) => s.cart); const clear = useStore((s) => s.clearCart); const setLast = useStore((s) => s.setLastOrder);
  const [pay, setPay] = useState("Cash on delivery");
  const [f, setF] = useState<Record<string, string>>({ name: "", phone: "", email: "", area: "Dhaka", address: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const lines = ready ? cart : []; const t = totals(lines);
  const validate = () => {
    const e: Record<string, string> = {};
    if (f.name.trim().length < 2) e.name = "Enter your full name";
    if (!/^(\+?880|0)1[3-9]\d{8}$/.test(f.phone.replace(/[\s-]/g, ""))) e.phone = "Enter a valid Bangladeshi mobile number";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (!f.area.trim()) e.area = "Required";
    if (f.address.trim().length < 5) e.address = "Enter your full address";
    return e;
  };
  const submit = (ev: React.FormEvent) => {
    ev.preventDefault(); const e = validate(); setErr(e);
    if (Object.keys(e).length || !lines.length) return;
    setLast({ id: "GH-" + (10429 + Math.floor(Math.random() * 500)), lines, total: t.total, payment: pay });
    clear(); router.push("/confirmation");
  };
  if (ready && !lines.length) return <div className="py-16 text-center"><p className="font-bold">Your cart is empty.</p><Link href="/products" className="btn-primary mt-4">Continue shopping</Link></div>;
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <PageTitle title="Checkout" sub="Review your order, add delivery details and choose a payment method." />
      <form onSubmit={submit} noValidate className="grid items-start gap-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <section className="card p-6"><h2 className="mb-5 flex items-center gap-3 text-xl font-extrabold"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm text-white">1</span>Delivery address</h2>
            <div className="grid gap-4 sm:grid-cols-2">{fields.map(([k, l, type, ac]) => (
              <div key={k} className={k === "address" ? "sm:col-span-2" : ""}><label htmlFor={k} className="label">{l} <span className="text-red-500">*</span></label>
                <input id={k} type={type} autoComplete={ac} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined} className={`input ${err[k] ? "border-red-500" : ""}`} />
                {err[k] && <p id={`${k}-e`} className="mt-1 text-sm text-red-600">{err[k]}</p>}</div>))}</div>
            <p className="mb-2 mt-5 font-bold">Delivery option</p>
            <label className="flex items-center gap-3 rounded-xl border-2 border-brand bg-brand-soft p-4"><input type="radio" checked readOnly className="accent-brand" /><Icon name="truck" className="h-6 w-6" /><span className="flex-1"><span className="block font-bold">Dhaka delivery</span><span className="text-sm text-ink-muted">Standard delivery within Dhaka city</span></span><b>{taka(120)}</b></label></section>
          <fieldset className="card p-6"><legend className="sr-only">Payment method</legend><h2 className="mb-5 flex items-center gap-3 text-xl font-extrabold" aria-hidden="true"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm text-white">2</span>Payment method</h2>
            <div className="space-y-3">{pays.map(([p, d, c]) => <label key={p} className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 ${pay === p ? "border-brand bg-brand-soft ring-1 ring-brand" : "border-line"}`}><input type="radio" name="pay" checked={pay === p} onChange={() => setPay(p)} className="accent-brand" /><span className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-extrabold text-white" style={{ background: c }}>{p[0]}</span><span><span className="block font-bold">{p}</span><span className="text-sm text-ink-muted">{d}</span></span></label>)}</div></fieldset>
        </div>
        <aside className="card p-6" aria-label="Order summary"><h2 className="text-xl font-extrabold">Order summary ({lines.reduce((a, l) => a + l.qty, 0)} items)</h2>
          <ul className="mt-4 space-y-3">{lines.map((l) => { const p = byId(l.id); return p ? <li key={l.id} className="flex items-center gap-3"><Image src={p.image} alt="" width={64} height={64} className="h-16 w-16 rounded-lg bg-surface object-contain p-1" /><span className="flex-1 text-sm font-bold">{p.name}<span className="block font-normal text-ink-muted">Qty {l.qty}</span></span><span className="font-bold">{taka(p.price * l.qty)}</span></li> : null; })}</ul>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{taka(t.subtotal)}</dd></div><div className="flex justify-between"><dt>Delivery (Dhaka)</dt><dd>{taka(t.delivery)}</dd></div><div className="flex justify-between border-t border-line pt-3 text-xl font-extrabold"><dt>Total</dt><dd>{taka(t.total)}</dd></div></dl>
          <p className="mt-4 flex items-center gap-3 rounded-xl bg-surface p-3 text-sm"><Icon name="truck" className="h-6 w-6 shrink-0" /><span><b className="block">Estimated delivery</b><span className="text-ink-muted">Within Dhaka: Nov 5 – Nov 6 2026</span></span></p>
          <button className="btn-primary mt-5 w-full py-3.5 text-base"><Icon name="lock" className="h-5 w-5" />Place order ({taka(t.total)})</button>
          <p className="mt-3 text-center text-xs text-ink-muted">By placing this order, you agree to GadgetHub&apos;s <Link href="/policy/terms" className="underline">Terms of Service</Link> and <Link href="/policy/privacy" className="underline">Privacy Policy</Link>.</p></aside>
      </form>
    </>
  );
}
