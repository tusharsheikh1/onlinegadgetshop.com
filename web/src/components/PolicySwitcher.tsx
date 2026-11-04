"use client";
import { useGo } from "@/lib/nav";

/** Phones and tablets pick a policy from a dropdown; desktop uses the sidebar links. */
export function PolicySwitcher({ current, options }: { current: string; options: [string, string][] }) {
  const go = useGo();
  return (
    <label className="mt-4 block lg:hidden">
      <span className="sr-only">Choose a policy</span>
      <select value={current} onChange={(e) => go(`/policy/${e.target.value}`)} className="input font-semibold">
        {options.map(([slug, title]) => <option key={slug} value={slug}>{title}</option>)}
      </select>
    </label>
  );
}
