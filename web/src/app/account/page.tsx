"use client";
import Image from "next/image";
import { useState } from "react";
import { AccountShell } from "@/components/AccountNav";
import { Icon } from "@/components/Icon";

export default function Account() {
  const [edit, setEdit] = useState(false);
  const [p, setP] = useState({ name: "Samira Rahman", email: "samira@example.com", phone: "01712 345678" });
  const [addr, setAddr] = useState<string | null>("House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh");
  const row = "flex items-center gap-3 sm:gap-4";
  const term = "flex w-32 shrink-0 items-center gap-2 whitespace-nowrap text-ink-muted sm:w-40";
  return (
    <AccountShell title="My Account" sub="Manage your profile, orders, addresses and account settings.">
      <section id="profile" className="card scroll-mt-32 p-4 sm:p-6"><h2 className="text-lg font-extrabold sm:text-xl">Profile</h2>
        <div className="mt-3 flex flex-wrap items-center gap-4 sm:mt-4 sm:gap-5">
          <Image src="/img/profile-avatar.png" alt="" width={188} height={190} className="h-16 w-16 rounded-full object-cover sm:h-24 sm:w-24" />
          <div className="min-w-0 flex-1">{edit ? <input aria-label="Name" className="input max-w-xs text-lg font-bold" value={p.name} onChange={(e) => setP({ ...p, name: e.target.value })} /> : <p className="text-xl font-extrabold sm:text-2xl">{p.name}</p>}<p className="truncate text-sm text-ink-muted sm:text-base">{p.email}</p></div>
          <button onClick={() => setEdit(!edit)} className="btn-outline w-full border-brand text-brand sm:w-auto">{edit ? "Save changes" : "Edit Profile"}</button></div>
        <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm sm:mt-5">
          <div className={row}><dt className={term}><Icon name="mail" className="h-5 w-5" />Email</dt><dd className="min-w-0 break-words">{edit ? <input aria-label="Email" className="input" value={p.email} onChange={(e) => setP({ ...p, email: e.target.value })} /> : p.email}</dd></div>
          <div className={row}><dt className={term}><Icon name="phone" className="h-5 w-5" />Phone</dt><dd className="min-w-0">{edit ? <input aria-label="Phone" className="input" value={p.phone} onChange={(e) => setP({ ...p, phone: e.target.value })} /> : p.phone}</dd></div>
          <div className={row}><dt className={term}><Icon name="calendar" className="h-5 w-5" />Member since</dt><dd>Nov 4 2026</dd></div></dl></section>
      <section id="address" className="card mt-4 scroll-mt-32 p-4 sm:mt-6 sm:p-6"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-extrabold sm:text-xl">Saved Address</h2>{!addr && <button onClick={() => setAddr("House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh")} className="btn-outline border-brand text-brand"><Icon name="plus" className="h-4 w-4" />Add New Address</button>}</div>
        {addr ? <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-surface p-3 sm:mt-4 sm:gap-4 sm:p-4"><Icon name="pin" className="h-7 w-7 shrink-0" /><div className="min-w-[180px] flex-1"><p className="font-extrabold">Home (Dhaka) <span className="badge ml-2">Default</span></p><p className="text-sm text-ink-muted">{addr}</p></div>
          <div className="flex gap-2"><button onClick={() => setEdit(true)} className="btn-outline py-2">Edit</button><button onClick={() => setAddr(null)} className="btn-outline border-red-200 py-2 text-red-600">Delete</button></div></div> : <p className="mt-4 text-ink-muted">No saved addresses.</p>}</section>
    </AccountShell>
  );
}
