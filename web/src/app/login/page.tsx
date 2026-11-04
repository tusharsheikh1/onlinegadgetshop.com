"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [err, setErr] = useState("");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); const d = new FormData(e.currentTarget);
    if (!/^\S+@\S+\.\S+$/.test(String(d.get("email")))) return setErr("Enter a valid email address.");
    if (String(d.get("password")).length < 6) return setErr("Password must be at least 6 characters.");
    router.push("/account");
  };
  return (
    <div className="mx-auto my-8 grid max-w-5xl overflow-hidden rounded-2xl border border-line lg:grid-cols-2">
      <div className="p-6 sm:p-10">
        <div role="tablist" className="mb-6 flex gap-6 border-b border-line">{([["in", "Sign in"], ["up", "Create account"]] as const).map(([k, l]) => <button key={k} role="tab" aria-selected={mode === k} onClick={() => { setMode(k); setErr(""); }} className={`-mb-px border-b-2 pb-3 font-bold ${mode === k ? "border-brand text-brand" : "border-transparent text-ink-muted"}`}>{l}</button>)}</div>
        <h1 className="h2">{mode === "in" ? "Welcome back" : "Join GadgetHub"}</h1>
        <form onSubmit={submit} noValidate className="mt-6 space-y-4">
          {mode === "up" && <div><label className="label" htmlFor="name">Full name</label><input id="name" name="name" className="input" autoComplete="name" /></div>}
          <div><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" className="input" autoComplete="email" /></div>
          <div><label className="label" htmlFor="password">Password</label><input id="password" name="password" type="password" className="input" autoComplete={mode === "in" ? "current-password" : "new-password"} /></div>
          {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
          {mode === "in" && <div className="flex items-center justify-between text-sm"><label className="flex items-center gap-2"><input type="checkbox" className="accent-brand" />Remember me</label><a href="#" className="font-medium text-brand">Forgot password?</a></div>}
          <button className="btn-primary w-full py-3">{mode === "in" ? "Sign in" : "Create account"}</button>
        </form>
      </div>
      <Image src="/img/login-artwork.png" alt="" width={804} height={726} className="hidden h-full w-full object-cover lg:block" />
    </div>
  );
}
