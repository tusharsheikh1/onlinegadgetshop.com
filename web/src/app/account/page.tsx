"use client";
import { useState } from "react";
import { AccountShell } from "@/components/AccountNav";

export default function Account() {
  const [edit, setEdit] = useState(false);
  const [p, setP] = useState({ name: "Samira Rahman", email: "samira@example.com", phone: "01712 345678" });
  const [addr] = useState("House 12, Road 5, Dhanmondi, Dhaka 1205");
  return (
    <AccountShell title="My account">
      <section id="profile" className="card p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-extrabold">Profile</h2><button onClick={() => setEdit(!edit)} className="btn-outline py-1.5">{edit ? "Save" : "Edit profile"}</button></div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">{(["name", "email", "phone"] as const).map((k) => <div key={k}><label className="label capitalize" htmlFor={k}>{k}</label>{edit ? <input id={k} className="input" value={p[k]} onChange={(e) => setP({ ...p, [k]: e.target.value })} /> : <p id={k} className="py-2.5 font-medium">{p[k]}</p>}</div>)}</div></section>
      <section id="address" className="card mt-6 p-6"><h2 className="text-xl font-extrabold">Saved address</h2><p className="mt-3 font-medium">{p.name}</p><p className="text-ink-muted">{addr}</p><span className="badge mt-3">Default · Dhaka delivery ৳120</span></section>
    </AccountShell>
  );
}
