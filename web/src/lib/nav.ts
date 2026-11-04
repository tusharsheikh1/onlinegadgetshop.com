"use client";
import { useRouter } from "next/navigation";

declare global {
  // Set by scripts/static-export.mjs in the static build: maps "/path?q" to a relative file URL.
  interface Window { __ghStatic?: (path: string) => string }
}

/** Navigate to an app path. In the static build this is a full page load; otherwise client navigation. */
export function useGo() {
  const router = useRouter();
  return (path: string) => {
    if (typeof window !== "undefined" && window.__ghStatic) window.location.href = window.__ghStatic(path);
    else router.push(path);
  };
}
