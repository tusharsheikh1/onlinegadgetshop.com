"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = { id: string; qty: number };
type State = {
  cart: CartLine[]; wishlist: string[]; compare: string[]; lastOrder: { id: string; lines: CartLine[]; total: number; payment: string } | null;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => boolean;
  setLastOrder: (o: State["lastOrder"]) => void;
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [], wishlist: [], compare: [], lastOrder: null,
      addToCart: (id, qty = 1) => set((s) => {
        const ex = s.cart.find((l) => l.id === id);
        return { cart: ex ? s.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(10, l.qty + qty) } : l)) : [...s.cart, { id, qty }] };
      }),
      setQty: (id, qty) => set((s) => ({ cart: qty <= 0 ? s.cart.filter((l) => l.id !== id) : s.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(10, qty) } : l)) })),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((l) => l.id !== id) })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (id) => set((s) => ({ wishlist: s.wishlist.includes(id) ? s.wishlist.filter((x) => x !== id) : [...s.wishlist, id] })),
      toggleCompare: (id) => {
        const c = get().compare;
        if (c.includes(id)) { set({ compare: c.filter((x) => x !== id) }); return true; }
        if (c.length >= 4) return false;
        set({ compare: [...c, id] }); return true;
      },
      setLastOrder: (o) => set({ lastOrder: o }),
    }),
    { name: "gadgethub" }
  )
);

export const DELIVERY_FEE = 120;
