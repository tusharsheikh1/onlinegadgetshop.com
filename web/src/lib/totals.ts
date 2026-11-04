import { byId } from "@/data/products";
import { DELIVERY_FEE } from "./store";

export function totals(lines: { id: string; qty: number }[], discount = 0) {
  const subtotal = lines.reduce((n, l) => n + (byId(l.id)?.price ?? 0) * l.qty, 0);
  const delivery = lines.length ? DELIVERY_FEE : 0;
  const disc = Math.round(subtotal * discount);
  return { subtotal, delivery, disc, total: subtotal + delivery - disc };
}
