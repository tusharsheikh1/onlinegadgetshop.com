"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icon";

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [err, setErr] = useState(""); const [show, setShow] = useState(false);
  const switchTo = (m: "in" | "up") => { setMode(m); setErr(""); };
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const d = new FormData(e.currentTarget);
    if (mode === "up" && String(d.get("name")).trim().length < 2) return setErr("Enter your full name.");
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email")))) return setErr("Enter a valid email address.");
    if (String(d.get("password")).length < 6) return setErr("Password must be at least 6 characters.");
    router.push("/account");
  };
  return (
    <div className="grid gap-6 py-8 lg:grid-cols-[1.05fr_1fr]">
      <Image src="/img/login-artwork.png" alt="Black over-ear headphones on a stone plinth" width={804} height={726} priority className="hidden h-full w-full rounded-2xl object-cover lg:block" />
      <div className="card p-6 sm:p-8">
        <div role="tablist" className="mb-8 grid grid-cols-2 border-b border-line">{([["in", "Sign in"], ["up", "Create account"]] as const).map(([k, l]) => <button key={k} role="tab" aria-selected={mode === k} onClick={() => switchTo(k)} className={`-mb-px border-b-[3px] pb-3 text-lg font-bold ${mode === k ? "border-brand text-brand" : "border-transparent text-ink-muted"}`}>{l}</button>)}</div>
        <h1 className="text-3xl font-extrabold tracking-tight">{mode === "in" ? "Welcome back to GadgetHub" : "Join GadgetHub"}</h1>
        <p className="mt-2 text-ink-muted">{mode === "in" ? "Sign in to your account to continue shopping, track orders and more." : "Create an account to check out faster and track your orders."}</p>
        <form onSubmit={submit} noValidate className="mt-6 space-y-5">
          {mode === "up" && <div><label className="label" htmlFor="name">Full name</label><div className="relative"><Icon name="user" className="pointer-events-none absolute left-3.5 top-3 h-5 w-5 text-ink-muted" /><input id="name" name="name" className="input pl-11" placeholder="Enter your full name" autoComplete="name" /></div></div>}
          <div><label className="label" htmlFor="email">Email address</label><div className="relative"><Icon name="mail" className="pointer-events-none absolute left-3.5 top-3 h-5 w-5 text-ink-muted" /><input id="email" name="email" type="email" className="input pl-11" placeholder="Enter your email address" autoComplete="email" /></div></div>
          <div><label className="label" htmlFor="password">Password</label><div className="relative"><Icon name="lock" className="pointer-events-none absolute left-3.5 top-3 h-5 w-5 text-ink-muted" /><input id="password" name="password" type={show ? "text" : "password"} className="input px-11" placeholder="Enter your password" autoComplete={mode === "in" ? "current-password" : "new-password"} />
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-3 text-ink-muted"><Icon name="eye" className="h-5 w-5" /></button></div></div>
          {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
          {mode === "in" && <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="h-4 w-4 accent-brand" />Remember me</label><a href="#" className="font-medium text-brand">Forgot password?</a></div>}
          <button className="btn-primary w-full py-3.5 text-base">{mode === "in" ? "Sign in" : "Create account"}</button>
        </form>
        <div className="my-6 flex items-center gap-4 text-sm text-ink-muted"><hr className="flex-1 border-line" />{mode === "in" ? "New to GadgetHub?" : "Already have an account?"}<hr className="flex-1 border-line" /></div>
        <button onClick={() => switchTo(mode === "in" ? "up" : "in")} className="btn-outline w-full border-brand py-3.5 text-base text-brand">{mode === "in" ? "Create account" : "Sign in"}</button>
      </div>
    </div>
  );
}
