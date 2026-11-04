"use client";
import { useMemo, useState } from "react";
import { Product, categories } from "@/data/products";
import { ProductCard } from "./ProductCard";
import { Icon } from "./Icon";

const PER_PAGE = 9;
const sorts = { newest: "Newest first", "price-asc": "Price: low to high", "price-desc": "Price: high to low", rating: "Top rated", relevance: "Relevance" } as const;
type Sort = keyof typeof sorts;

export function Catalog({ items, showCategory = true, defaultSort = "newest", chips }: { items: Product[]; showCategory?: boolean; defaultSort?: Sort; chips?: string[] }) {
  const [cats, setCats] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [min, setMin] = useState(""); const [max, setMax] = useState("");
  const [stock, setStock] = useState(false);
  const [warr, setWarr] = useState<number[]>([]);
  const [sort, setSort] = useState<Sort>(defaultSort);
  const [page, setPage] = useState(1);
  const [chip, setChip] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const brandList = useMemo(() => Array.from(new Set(items.map((p) => p.brand))).sort(), [items]);
  const catList = useMemo(() => categories.filter((c) => items.some((p) => p.category === c.slug)).concat(items.some((p) => p.category === "accessories") ? [{ slug: "accessories", name: "Accessories", image: "" }] : []), [items]);
  const bucket = (m: number) => (m <= 6 ? 0 : m <= 12 ? 1 : m <= 24 ? 2 : 3);

  const result = useMemo(() => {
    const r = items.filter((p) =>
      (!cats.length || cats.includes(p.category)) && (!brands.length || brands.includes(p.brand)) &&
      (!min || p.price >= +min) && (!max || p.price <= +max) && (!stock || p.inStock) &&
      (!warr.length || warr.includes(bucket(p.warrantyMonths))) &&
      (!chip || (chip === "Wireless" ? p.wireless : p.name.toLowerCase().includes(chip.toLowerCase()) || p.tagline.toLowerCase().includes(chip.toLowerCase()))));
    const s = [...r];
    if (sort === "price-asc") s.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") s.sort((a, b) => b.price - a.price);
    if (sort === "rating") s.sort((a, b) => b.rating - a.rating);
    return s;
  }, [items, cats, brands, min, max, stock, warr, sort, chip]);

  const pages = Math.max(1, Math.ceil(result.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const shown = result.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);
  const toggle = <T,>(arr: T[], v: T, set: (a: T[]) => void) => { set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]); setPage(1); };
  const clear = () => { setCats([]); setBrands([]); setMin(""); setMax(""); setStock(false); setWarr([]); setChip(null); setPage(1); };
  const count = (f: (p: Product) => boolean) => items.filter(f).length;

  const Box = ({ checked, onChange, label, n }: { checked: boolean; onChange: () => void; label: string; n?: number }) => (
    <label className="flex cursor-pointer items-center gap-2 py-1 text-sm"><input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded accent-brand" />{label}{n !== undefined && <span className="text-ink-muted">({n})</span>}</label>
  );

  const filters = (
    <div className="card p-4">
      <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">Filters</h2><button onClick={clear} className="text-sm font-medium text-brand">Clear all</button></div>
      {showCategory && <fieldset className="border-t border-line py-3"><legend className="mb-1 font-bold">Category</legend>{catList.map((c) => <Box key={c.slug} label={c.name} n={count((p) => p.category === c.slug)} checked={cats.includes(c.slug)} onChange={() => toggle(cats, c.slug, setCats)} />)}</fieldset>}
      <fieldset className="border-t border-line py-3"><legend className="mb-1 font-bold">Brand</legend>{brandList.map((b) => <Box key={b} label={b} n={count((p) => p.brand === b)} checked={brands.includes(b)} onChange={() => toggle(brands, b, setBrands)} />)}</fieldset>
      <fieldset className="border-t border-line py-3"><legend className="mb-2 font-bold">Price (৳)</legend>
        <div className="flex gap-2"><input className="input" inputMode="numeric" placeholder="Min" aria-label="Minimum price" value={min} onChange={(e) => { setMin(e.target.value.replace(/\D/g, "")); setPage(1); }} /><input className="input" inputMode="numeric" placeholder="Max" aria-label="Maximum price" value={max} onChange={(e) => { setMax(e.target.value.replace(/\D/g, "")); setPage(1); }} /></div></fieldset>
      <fieldset className="border-t border-line py-3"><legend className="mb-1 font-bold">Stock</legend><Box label="In stock only" n={count((p) => p.inStock)} checked={stock} onChange={() => { setStock(!stock); setPage(1); }} /></fieldset>
      <fieldset className="border-t border-line pt-3"><legend className="mb-1 font-bold">Warranty</legend>
        {["Up to 6 months", "6 – 12 months", "1 – 2 years", "2+ years"].map((l, i) => <Box key={l} label={l} n={count((p) => bucket(p.warrantyMonths) === i)} checked={warr.includes(i)} onChange={() => toggle(warr, i, setWarr)} />)}</fieldset>
    </div>
  );

  return (
    <div>
      {chips && <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Quick filters">{chips.map((c) => (
        <button key={c} aria-pressed={chip === c} onClick={() => { setChip(chip === c ? null : c); setPage(1); }} className={`rounded-full border px-4 py-1.5 text-sm font-medium ${chip === c ? "border-brand bg-brand text-white" : "border-line bg-white hover:border-brand"}`}>{c}</button>))}</div>}
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">{filters}</aside>
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-ink-muted" aria-live="polite">Showing {result.length ? (cur - 1) * PER_PAGE + 1 : 0}–{Math.min(cur * PER_PAGE, result.length)} of {result.length} products</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setFiltersOpen(!filtersOpen)} className="btn-outline py-2 lg:hidden" aria-expanded={filtersOpen}>Filters</button>
              <label className="flex items-center gap-2 text-sm font-semibold">Sort by
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="input w-auto">{Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
              <div className="hidden gap-1 sm:flex">
                <button aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")} className={`rounded-lg p-2 ${view === "grid" ? "bg-brand text-white" : "border border-line"}`}><Icon name="grid" className="h-5 w-5" /></button>
                <button aria-label="List view" aria-pressed={view === "list"} onClick={() => setView("list")} className={`rounded-lg p-2 ${view === "list" ? "bg-brand text-white" : "border border-line"}`}><Icon name="list" className="h-5 w-5" /></button>
              </div>
            </div>
          </div>
          {filtersOpen && <div className="mb-4 lg:hidden">{filters}</div>}
          {shown.length === 0 ? (
            <div className="card p-10 text-center"><p className="font-bold">No products match your filters.</p><button onClick={clear} className="btn-primary mt-4">Clear filters</button></div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3" : "grid gap-4"}>{shown.map((p) => <ProductCard key={p.id} p={p} layout={view === "grid" ? "stack" : "row"} />)}</div>
          )}
          {pages > 1 && (
            <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
              <button aria-label="Previous page" disabled={cur === 1} onClick={() => setPage(cur - 1)} className="btn-outline h-10 w-10 p-0"><Icon name="chevronL" className="h-4 w-4" /></button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => <button key={n} aria-current={n === cur ? "page" : undefined} onClick={() => setPage(n)} className={`h-10 w-10 rounded-xl text-sm font-semibold ${n === cur ? "bg-brand text-white" : "border border-line hover:bg-surface"}`}>{n}</button>)}
              <button aria-label="Next page" disabled={cur === pages} onClick={() => setPage(cur + 1)} className="btn-outline h-10 w-10 p-0"><Icon name="chevronR" className="h-4 w-4" /></button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
