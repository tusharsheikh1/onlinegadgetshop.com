import { Icon } from "./Icon";
export function Rating({ rating, reviews, className = "" }: { rating: number; reviews?: number; className?: string }) {
  return (
    <div className={`flex items-center gap-1 text-sm ${className}`} aria-label={`Rated ${rating} out of 5`}>
      <Icon name="star" fill className="h-4 w-4 text-amber-400" />
      <span className="font-semibold">{rating.toFixed(1)}</span>
      {reviews !== undefined && <span className="text-ink-muted">({reviews.toLocaleString("en-US")} reviews)</span>}
    </div>
  );
}
