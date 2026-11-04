export type Category = { slug: string; name: string; image: string };
export type Product = {
  id: string; slug: string; name: string; tagline: string; category: string; brand: string;
  price: number; oldPrice?: number; rating: number; reviews: number; image: string;
  warranty: string; warrantyMonths: number; inStock: boolean; badge?: string; wireless?: boolean;
  specs?: Record<string, string>;
};

export const categories: Category[] = [
  { slug: "phones", name: "Phones", image: "/img/phone.png" },
  { slug: "laptops", name: "Laptops", image: "/img/laptop.png" },
  { slug: "headphones", name: "Headphones", image: "/img/headphones.png" },
  { slug: "smartwatches", name: "Smartwatches", image: "/img/watch.png" },
  { slug: "earbuds", name: "Earbuds", image: "/img/earbuds.png" },
  { slug: "tablets", name: "Tablets", image: "/img/tablet.png" },
  { slug: "speakers", name: "Speakers", image: "/img/speaker.png" },
  { slug: "gaming", name: "Gaming", image: "/img/controller.png" },
];

export const products: Product[] = [
  { id: "aerosound-pro", slug: "aerosound-pro", name: "AeroSound Pro", tagline: "Immersive sound, all-day comfort, and long-lasting battery.", category: "headphones", brand: "AeroSound", price: 8990, rating: 4.6, reviews: 1248, image: "/img/main-headphones.png", warranty: "1 year official warranty", warrantyMonths: 12, inStock: true, badge: "Wireless Headphones", wireless: true,
    specs: { Driver: "40 mm dynamic drivers", Connectivity: "Bluetooth 5.3, 3.5 mm (wired)", "Battery Life": "Up to 60 hours (ANC off), up to 40 hours (ANC on)", "Noise Cancellation": "Hybrid Active Noise Cancellation (up to 35 dB)", Charging: "USB-C, ~2 hours for full charge", Weight: "≈ 260 g", "What's in the box": "AeroSound Pro, USB-C charging cable, 3.5 mm audio cable, carry case, user guide" } },
  { id: "charging-adapter", slug: "charging-adapter", name: "Fast Charging Adapter 30W", tagline: "Compact USB-C wall charger.", category: "accessories", brand: "Anker", price: 1490, rating: 4.5, reviews: 612, image: "/img/cart-charger.png", warranty: "6 months warranty", warrantyMonths: 6, inStock: true },
  { id: "iphone-16-pro", slug: "iphone-16-pro", name: "Apple iPhone 16 Pro 256GB (Natural Titanium)", tagline: "A powerful pro iPhone with a stunning display and pro camera.", category: "phones", brand: "Apple", price: 179999, rating: 4.8, reviews: 2140, image: "/img/p1.png", warranty: "1 year official warranty", warrantyMonths: 12, inStock: true, badge: "New" },
  { id: "hp-pavilion-15", slug: "hp-pavilion-15", name: "HP Pavilion 15 (2026) Core i5, 16GB, 512GB SSD", tagline: "A reliable everyday laptop for work, study, and entertainment.", category: "laptops", brand: "HP", price: 89900, rating: 4.4, reviews: 530, image: "/img/p2.png", warranty: "2 years warranty", warrantyMonths: 24, inStock: true, badge: "Popular" },
  { id: "bose-qc-headphones", slug: "bose-quietcomfort-headphones", name: "Bose QuietComfort Headphones (QC)", tagline: "World-class noise cancellation with all-day comfort.", category: "headphones", brand: "Bose", price: 32900, rating: 4.8, reviews: 3912, image: "/img/p3.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true, badge: "Bestseller", wireless: true, specs: { "Battery Life": "Up to 24 hours", "Noise Cancellation": "Yes (Adaptive)", Connectivity: "Bluetooth 5.3, USB-C (audio & charging)" } },
  { id: "apple-watch-10", slug: "apple-watch-series-10", name: "Apple Watch Series 10 (GPS) 46mm", tagline: "A smarter, healthier, more connected you.", category: "smartwatches", brand: "Apple", price: 56999, rating: 4.7, reviews: 980, image: "/img/p4.png", warranty: "1 year official warranty", warrantyMonths: 12, inStock: true },
  { id: "bose-qc-earbuds", slug: "bose-quietcomfort-earbuds-ii", name: "Bose QuietComfort Earbuds II", tagline: "Premium sound and powerful noise cancellation in a compact fit.", category: "earbuds", brand: "Bose", price: 24500, rating: 4.6, reviews: 1120, image: "/img/p5.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true, wireless: true },
  { id: "galaxy-tab-s10", slug: "samsung-galaxy-tab-s10", name: 'Samsung Galaxy Tab S10 (11") 128GB', tagline: "A versatile tablet for work, creativity, and entertainment.", category: "tablets", brand: "Samsung", price: 52999, rating: 4.6, reviews: 410, image: "/img/p6.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true },
  { id: "redmi-note-14-pro", slug: "xiaomi-redmi-note-14-pro", name: "Xiaomi Redmi Note 14 Pro 5G (12GB, 256GB)", tagline: "Powerful performance, stunning camera, and all-day battery life.", category: "phones", brand: "Xiaomi", price: 36999, rating: 4.5, reviews: 870, image: "/img/p7.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true },
  { id: "anker-powercore", slug: "anker-powercore-20000", name: "Anker PowerCore 20,000mAh (22.5W)", tagline: "High-capacity, fast charging for your everyday devices.", category: "accessories", brand: "Anker", price: 4199, rating: 4.7, reviews: 2210, image: "/img/p8.png", warranty: "18 months warranty", warrantyMonths: 18, inStock: true },
  { id: "dualsense", slug: "playstation-dualsense", name: "PlayStation DualSense Wireless Controller", tagline: "Immersive haptic feedback and adaptive triggers for a next-level gaming experience.", category: "gaming", brand: "Sony", price: 8999, rating: 4.8, reviews: 1650, image: "/img/p9.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true },
  { id: "galaxy-a56", slug: "galaxy-a56-5g", name: "Galaxy A56 5G", tagline: "8GB RAM • 256GB Storage", category: "phones", brand: "Samsung", price: 49999, rating: 4.6, reviews: 1248, image: "/img/featured-phone.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true },
  { id: "sony-wh1000xm5", slug: "sony-wh-1000xm5", name: "Sony WH-1000XM5", tagline: "Wireless Noise Cancelling Headphones", category: "headphones", brand: "Sony", price: 42990, oldPrice: 49900, rating: 4.8, reviews: 3912, image: "/img/featured-headphones.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true, wireless: true, specs: { "Battery Life": "Up to 30 hours", "Noise Cancellation": "Yes (Industry-leading)", Connectivity: "Bluetooth 5.2, USB-C (wired)" } },
  { id: "watch-fit-3", slug: "watch-fit-3", name: "Watch Fit 3", tagline: "Health & Fitness Smartwatch", category: "smartwatches", brand: "Huawei", price: 12490, rating: 4.5, reviews: 2067, image: "/img/featured-watch.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true },
  { id: "buds-pro-2", slug: "buds-pro-2", name: "Buds Pro 2", tagline: "ANC True Wireless Earbuds", category: "earbuds", brand: "Samsung", price: 7990, rating: 4.7, reviews: 1538, image: "/img/featured-earbuds.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true, wireless: true },
  { id: "jbl-go-speaker", slug: "portable-bluetooth-speaker", name: "Portable Bluetooth Speaker", tagline: "Rugged, splash-proof speaker with up to 12 hours of playtime.", category: "speakers", brand: "JBL", price: 2490, rating: 4.6, reviews: 1320, image: "/img/order-speaker.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true, wireless: true },
  { id: "deal-1", slug: "phone-deal", name: "Violet 5G Smartphone 128GB", tagline: "Gadget Week deal", category: "phones", brand: "Apple", price: 74900, oldPrice: 89900, rating: 4.7, reviews: 640, image: "/img/deal-1.png", warranty: "1 year official warranty", warrantyMonths: 12, inStock: true, badge: "17% OFF" },
  { id: "deal-2", slug: "laptop-deal", name: "SlimBook 14 Laptop (16GB, 512GB SSD)", tagline: "Gadget Week deal", category: "laptops", brand: "HP", price: 69900, oldPrice: 79900, rating: 4.5, reviews: 310, image: "/img/deal-2.png", warranty: "2 years warranty", warrantyMonths: 24, inStock: true, badge: "13% OFF" },
  { id: "deal-3", slug: "headphones-deal", name: "Sony WH-CH720N Noise-Cancelling Headphones", tagline: "Gadget Week deal", category: "headphones", brand: "Sony", price: 14990, oldPrice: 18990, rating: 4.6, reviews: 905, image: "/img/deal-3.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true, badge: "21% OFF", wireless: true, specs: { "Battery Life": "Up to 50 hours", "Noise Cancellation": "Yes (Adaptive)", Connectivity: "Bluetooth 5.2, USB-C (charging)" } },
  { id: "deal-4", slug: "watch-deal", name: "FitPulse Smartwatch", tagline: "Gadget Week deal", category: "smartwatches", brand: "Xiaomi", price: 5990, oldPrice: 7990, rating: 4.3, reviews: 260, image: "/img/deal-4.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true, badge: "25% OFF" },
  { id: "deal-5", slug: "earbuds-deal", name: "True Wireless Earbuds", tagline: "Gadget Week deal", category: "earbuds", brand: "AeroSound", price: 3490, oldPrice: 4990, rating: 4.4, reviews: 310, image: "/img/deal-5.png", warranty: "1 year warranty", warrantyMonths: 12, inStock: true, badge: "30% OFF", wireless: true },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const byId = (id: string) => products.find((p) => p.id === id);
export const catalog = products.filter((p) => ["p1","p2","p3","p4","p5","p6","p7","p8","p9"].some((k) => p.image === `/img/${k}.png`));
export const taka = (n: number) => "৳" + n.toLocaleString("en-US");
