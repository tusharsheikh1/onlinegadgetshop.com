"use client";
import { useRouter } from "next/navigation";

/** Phones and tablets pick a policy from a dropdown; desktop uses the sidebar links. */
export function PolicySwitcher({ current, options }: { current: string; options: [string, string][] }) {
  const router = useRouter();
  return (
    <label className="mt-4 block lg:hidden">
      <span className="sr-only">Choose a policy</span>
      <select value={current} onChange={(e) => router.push(`/policy/${e.target.value}`)} className="input font-semibold">
        {options.map(([slug, title]) => <option key={slug} value={slug}>{title}</option>)}
      </select>
    </label>
  );
}
