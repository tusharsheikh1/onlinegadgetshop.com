export function PageTitle({ title, sub, subClass = "", aside }: { title: React.ReactNode; sub?: string; subClass?: string; aside?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4 pt-1 sm:pb-6 sm:pt-2">
      <div className="min-w-0">
        <h1 className="h1">{title}</h1>
        {sub && <p className={`mt-1 text-sm text-ink-muted sm:mt-2 sm:text-base ${subClass}`}>{sub}</p>}
      </div>
      {aside}
    </div>
  );
}
