import { Icon } from "./Icon";
export function Rating({ rating, reviews, className = "", small = false }: { rating: number; reviews?: number; className?: string; small?: boolean }) {
  return (
    <div className={`flex items-center gap-1 ${small ? "text-xs sm:text-sm" : "text-sm"} ${className}`}>
      <span className="sr-only">Rated {rating.toFixed(1)} out of 5{reviews !== undefined ? `, ${reviews.toLocaleString("en-US")} reviews` : ""}</span>
      <Icon name="star" fill className={`${small ? "h-3.5 w-3.5 sm:h-4 sm:w-4" : "h-4 w-4"} shrink-0 text-amber-400`} />
      <span aria-hidden="true" className="font-semibold">{rating.toFixed(1)}</span>
      {reviews !== undefined && <span aria-hidden="true" className="text-ink-muted">({reviews.toLocaleString("en-US")} reviews)</span>}
    </div>
  );
}
