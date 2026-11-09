import { Icon } from "./Icon";
export function EmptyState({ icon, title, text, children, className = "" }: { icon: string; title: string; text?: React.ReactNode; children?: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col items-center rounded-3xl border border-dashed border-line bg-surface/60 px-6 py-14 text-center sm:py-20 ${className}`}>
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand shadow-card ring-1 ring-line"><Icon name={icon} className="h-7 w-7" /></span>
      <p className="mt-5 text-lg font-bold tracking-tight">{title}</p>
      {text && <p className="mt-1.5 max-w-sm text-sm text-ink-muted">{text}</p>}
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
