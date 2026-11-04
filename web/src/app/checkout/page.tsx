"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageTitle } from "@/components/Page";
import { byId, taka } from "@/data/products";
import { useHydrated } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { totals } from "@/lib/totals";

const pays = ["bKash", "Nagad", "Card", "Cash on delivery"];
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
      <PageTitle title="Checkout" />
      <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <section><h2 className="mb-4 text-xl font-extrabold">Delivery address</h2>
            <div className="grid gap-4 sm:grid-cols-2">{fields.map(([k, l, type, ac]) => (
              <div key={k} className={k === "address" ? "sm:col-span-2" : ""}><label htmlFor={k} className="label">{l}</label>
                <input id={k} type={type} autoComplete={ac} value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined} className={`input ${err[k] ? "border-red-500" : ""}`} />
                {err[k] && <p id={`${k}-e`} className="mt-1 text-sm text-red-600">{err[k]}</p>}</div>))}</div>
            <p className="mt-3 text-sm text-ink-muted">Dhaka delivery: {taka(120)} · 1–2 working days</p></section>
          <fieldset><legend className="mb-4 text-xl font-extrabold">Payment</legend>
            <div className="grid gap-3 sm:grid-cols-2">{pays.map((p) => <label key={p} className={`card flex cursor-pointer items-center gap-3 p-4 font-semibold ${pay === p ? "border-brand ring-2 ring-brand/20" : ""}`}><input type="radio" name="pay" checked={pay === p} onChange={() => setPay(p)} className="accent-brand" />{p}</label>)}</div></fieldset>
        </div>
        <aside className="card h-fit p-6" aria-label="Order summary"><h2 className="text-xl font-extrabold">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">{lines.map((l) => <li key={l.id} className="flex justify-between gap-3"><span>{byId(l.id)?.name} × {l.qty}</span><span>{taka((byId(l.id)?.price ?? 0) * l.qty)}</span></li>)}</ul>
          <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>{taka(t.subtotal)}</dd></div><div className="flex justify-between"><dt>Delivery</dt><dd>{taka(t.delivery)}</dd></div><div className="flex justify-between border-t border-line pt-3 text-lg font-extrabold"><dt>Total</dt><dd>{taka(t.total)}</dd></div></dl>
          <button className="btn-primary mt-5 w-full py-3 text-base">Place order</button></aside>
      </form>
    </>
  );
}
