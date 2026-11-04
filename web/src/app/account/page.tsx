"use client";
import { useState } from "react";
import { AccountShell } from "@/components/AccountNav";
import { Icon } from "@/components/Icon";

export default function Account() {
  const [edit, setEdit] = useState(false);
  const [p, setP] = useState({ name: "Samira Rahman", email: "samira@example.com", phone: "01712 345678" });
  const [addr, setAddr] = useState<string | null>("House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh");
  return (
    <AccountShell title="My Account" sub="Manage your profile, orders, addresses and account settings.">
      <section id="profile" className="card p-6"><h2 className="text-xl font-extrabold">Profile</h2>
        <div className="mt-4 flex flex-wrap items-center gap-5">
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-soft text-3xl font-extrabold text-brand" aria-hidden="true">SR</span>
          <div className="flex-1">{edit ? <input aria-label="Name" className="input max-w-xs text-lg font-bold" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} /> : <p className="text-2xl font-extrabold">{p.name}</p>}<p className="text-ink-muted">{p.email}</p></div>
          <button onClick={() => setEdit(!edit)} className="btn-outline border-brand text-brand">{edit ? "Save changes" : "Edit Profile"}</button></div>
        <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
          <div className="flex items-center gap-4"><dt className="flex w-40 items-center gap-2 text-ink-muted"><Icon name="chat" className="h-5 w-5" />Email</dt><dd>{edit ? <input aria-label="Email" className="input" value={p.email} onChange={(e) => setP({ ...p, email: e.target.value })} /> : p.email}</dd></div>
          <div className="flex items-center gap-4"><dt className="flex w-40 items-center gap-2 text-ink-muted"><Icon name="phone" className="h-5 w-5" />Phone</dt><dd>{edit ? <input aria-label="Phone" className="input" value={p.phone} onChange={(e) => setP({ ...p, phone: e.target.value })} /> : p.phone}</dd></div>
          <div className="flex items-center gap-4"><dt className="flex w-40 items-center gap-2 text-ink-muted"><Icon name="calendar" className="h-5 w-5" />Member since</dt><dd>Nov 4 2026</dd></div></dl></section>
      <section id="address" className="card mt-6 p-6"><div className="flex items-center justify-between"><h2 className="text-xl font-extrabold">Saved Address</h2>{!addr && <button onClick={() => setAddr("House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh")} className="btn-outline border-brand text-brand"><Icon name="plus" className="h-4 w-4" />Add New Address</button>}</div>
        {addr ? <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl bg-surface p-4"><Icon name="pin" className="h-7 w-7 shrink-0" /><div className="min-w-[200px] flex-1"><p className="font-extrabold">Home (Dhaka) <span className="badge ml-2">Default</span></p><p className="text-sm text-ink-muted">{addr}</p></div>
          <button onClick={() => setEdit(true)} className="btn-outline py-2">Edit</button><button onClick={() => setAddr(null)} className="btn-outline border-red-200 py-2 text-red-600">Delete</button></div> : <p className="mt-4 text-ink-muted">No saved addresses.</p>}</section>
    </AccountShell>
  );
}
