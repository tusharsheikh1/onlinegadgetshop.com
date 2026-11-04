export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return <div className="pb-6 pt-2"><h1 className="h1">{title}</h1>{sub && <p className="mt-2 text-ink-muted">{sub}</p>}</div>;
}
