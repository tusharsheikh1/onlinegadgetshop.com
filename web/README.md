# GadgetHub web

Next.js 14 (App Router) + TypeScript + Tailwind storefront built from the mockups in `../UI`.
Mock data lives in `src/data`; cart, wishlist and compare use Zustand persisted to localStorage.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run lint
```
Try coupon `GADGET10` in the cart.

`npm run export` writes a static copy to `out/` that works from any URL prefix
(pages become `<route>/index.html`, links do full page loads). Use it to host the
demo without a Node server.

| Route | Mockup |
|---|---|
| `/` | 01 Home |
| `/products` | 02 All products |
| `/category/[slug]` | 03 Category |
| `/search?q=` | 04 Search results |
| `/products/[slug]` | 05 Product details (best: `aerosound-pro`) |
| `/compare` | 06 Compare |
| `/offers` | 07 Offers |
| `/wishlist` | 08 Wishlist |
| `/cart` | 09 Cart |
| `/checkout` | 10 Checkout |
| `/confirmation` | 11 Confirmation |
| `/login` | 12 Login / Register |
| `/account` | 13 My account |
| `/orders` | 14 My orders |
| `/orders/[id]` | 15 Order tracking |
| `/about` `/contact` `/faq` | 16–18 |
| `/blog` `/blog/[slug]` | 19–20 |
| `/policy/[slug]` | 21 Policy (privacy, terms, shipping, returns) |

Product images are crops from `../UI/Assets`; data and copy are illustrative.
