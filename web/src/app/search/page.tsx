import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "./SearchResults";
export const metadata: Metadata = { title: "Search" };
export default function SearchPage() { return <Suspense fallback={<p className="py-10">Loading…</p>}><SearchResults /></Suspense>; }
