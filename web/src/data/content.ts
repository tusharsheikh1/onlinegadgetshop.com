export const orders = [
  { id: "GH-10428", date: "Nov 4, 2026", status: "Processing", total: 10600, items: ["aerosound-pro", "charging-adapter"], image: "/img/order-headphones.png", thumbs: ["/img/order-headphones.png", "/img/order-watch.png"] },
  { id: "GH-10316", date: "Oct 20, 2026", status: "Delivered", total: 4990, items: ["buds-pro-2"], image: "/img/order-watch.png", thumbs: ["/img/order-earbuds.png", "/img/order-phone.png"] },
  { id: "GH-10225", date: "Oct 2, 2026", status: "Delivered", total: 2490, items: ["jbl-go-speaker"], image: "/img/order-speaker.png", thumbs: ["/img/order-speaker.png"] },
];

export const faqs: Record<string, { q: string; a: string }[]> = {
  Delivery: [
    { q: "How long does delivery take?", a: "Delivery usually takes 1–3 business days for Dhaka city and 2–5 business days for other cities and districts across Bangladesh, depending on your location and product availability. You'll see the estimated delivery time on the product page and at checkout." },
    { q: "Do you deliver all over Bangladesh?", a: "Yes. We deliver to all districts through trusted courier partners." },
    { q: "Can I track my order?", a: "Yes. Open My Orders and choose View order to see live progress." },
    { q: "What is the delivery charge?", a: "Delivery is ৳120 inside Dhaka, and free on orders over ৳2,000." },
    { q: "What happens if I'm not available at the time of delivery?", a: "The courier will call you and try again, or you can reschedule through support." },
    { q: "Can I change my delivery address after ordering?", a: "Yes, contact support before your order is shipped and we will update it." },
  ],
  Payment: [
    { q: "Which payment methods do you accept?", a: "bKash, Nagad, credit/debit cards and Cash on delivery." },
    { q: "Is my payment secure?", a: "Yes. Card and mobile banking payments are processed over encrypted connections." },
  ],
  Returns: [
    { q: "What is your return policy?", a: "You can request a return within 7 days of delivery for eligible, unused items in original packaging." },
    { q: "How do I start a return?", a: "Open your order in My Orders and choose Request return, or contact support." },
  ],
  Warranty: [
    { q: "Are products covered by warranty?", a: "Yes. Every product lists its official warranty period on the product page." },
    { q: "How do I claim warranty?", a: "Bring your order number and the product to our showroom, or contact support." },
  ],
};

export type Section = { id: string; h?: string; p: string[]; callout?: { t: string; p: string } };
export type Article = { slug: string; title: string; topic: string; date: string; readTime: string; image: string; hero?: string; excerpt: string; picks: string; picksTitle: string; sections: Section[] };

export const articles: Article[] = [
  { slug: "choose-wireless-headphones", title: "How to choose your next wireless headphones", topic: "Audio", date: "Nov 4, 2026", readTime: "7 min read", image: "/img/featured-headphones.png", hero: "/img/article-headphones.png", picks: "headphones", picksTitle: "Top picks: Wireless headphones",
    excerpt: "From sound quality and noise cancellation to comfort and battery life — here's everything you need to choose the right headphones in 2026.",
    sections: [
      { id: "intro", p: ["Wireless headphones have become a daily essential for work, study, travel and entertainment. With so many options — from budget-friendly models to premium noise-cancelling headsets — it can be hard to know which one is right for you.", "In this guide we walk through the key factors to consider, such as sound quality, battery life, comfort and noise cancellation, so you can confidently choose a pair that fits your needs and budget in Bangladesh."] },
      { id: "battery", h: "Battery life", p: ["Battery life is one of the most important factors, especially if you use your headphones for long hours, commute daily, or travel often. A longer battery life means fewer charges and a more hassle-free experience."], callout: { t: "What to look for", p: "Aim for at least 20–30 hours of playback on a single charge. Many mid-range and premium models now offer 40 hours or more, and some also support fast charging (for example, 5–10 minutes for a few hours of use)." } },
      { id: "sound", h: "Sound quality", p: ["Look for balanced sound rather than just heavy bass. Larger drivers (40 mm and up) usually deliver fuller sound, and an equaliser in the companion app lets you tune the result to your taste."] },
      { id: "anc", h: "Noise cancellation (ANC)", p: ["Active noise cancellation is excellent for noisy commutes and busy offices. Hybrid ANC handles both low rumble and voices, and a transparency mode lets you hear announcements without removing the headphones."] },
      { id: "comfort", h: "Comfort and fit", p: ["Weight, clamp force and ear-cup size matter more than most spec sheets suggest. If you wear headphones for hours, choose a lightweight pair with soft, breathable ear pads — and try them at our showroom if you can."] },
      { id: "connectivity", h: "Connectivity and features", p: ["Bluetooth 5.3 gives a stable connection and better range. Multipoint pairing lets you switch between a phone and a laptop, and a 3.5 mm cable is a handy backup when the battery runs out."] },
      { id: "price", h: "Price and value", p: ["Good wireless headphones now start around ৳5,000. Mid-range models between ৳8,000 and ৳15,000 add effective ANC and long battery life, while premium pairs above ৳30,000 focus on refined sound and materials."] },
      { id: "picks", h: "Our recommendations", p: ["See the top picks alongside this guide, or browse the full range of headphones to compare prices, warranty and availability."] },
      { id: "final", h: "Final thoughts", p: ["Decide what matters most — battery, noise cancellation, comfort or price — and choose the pair that gets those right. With official warranty and easy 7-day returns, GadgetHub makes it simple to buy with confidence."] },
    ] },
  { slug: "smartwatch-guide", title: "Smartwatch Buying Guide (2026): Features, Brands & Best Picks", topic: "Wearables", date: "Nov 4, 2026", readTime: "7 min read", image: "/img/article-watch.png", picks: "smartwatches", picksTitle: "Top picks: Smartwatches",
    excerpt: "Track fitness, stay connected, and do more. Learn what features to look for and which smartwatches offer the best value in 2026.",
    sections: [
      { id: "intro", p: ["A smartwatch can track your workouts, show notifications and keep an eye on your health. This guide explains the features that matter so you can pick the right one for your habits and your phone."] },
      { id: "fitness", h: "Fitness and health tracking", p: ["Look for heart-rate, sleep and step tracking as a baseline. Built-in GPS is worth having if you run or cycle outdoors, and SpO2 sensors add useful wellness insights."] },
      { id: "battery", h: "Battery life", p: ["Premium smartwatches typically last one to two days, while fitness bands and value watches can last a week or more."], callout: { t: "What to look for", p: "If you dislike daily charging, choose a model rated for 7+ days. Always-on displays reduce battery life noticeably." } },
      { id: "display", h: "Display and design", p: ["AMOLED screens are bright and easy to read outdoors. Choose a case size that suits your wrist and straps that are comfortable for all-day wear."] },
      { id: "compat", h: "Phone compatibility", p: ["Apple Watch works only with iPhone, while many Android watches also support iPhone with fewer features. Check compatibility before you buy."] },
      { id: "price", h: "Price and value", p: ["Capable fitness watches start around ৳5,000. Premium models with LTE, ECG and sapphire glass sit well above ৳50,000."] },
      { id: "final", h: "Final thoughts", p: ["Match the watch to how you will actually use it — fitness, notifications or both — and you will get far more value from it."] },
    ] },
  { slug: "laptop-guide", title: "Laptop Buying Guide (2026): Choose the Right Laptop for Work, Study or Gaming", topic: "Laptops", date: "Nov 4, 2026", readTime: "10 min read", image: "/img/article-laptop.png", picks: "laptops", picksTitle: "Top picks: Laptops",
    excerpt: "Confused about which laptop to buy? This guide breaks down key specs, use cases, and our top recommendations for every budget.",
    sections: [
      { id: "intro", p: ["The right laptop depends on what you do every day. This guide explains the specs that matter, in plain language, so you can choose with confidence."] },
      { id: "cpu", h: "Processor and RAM", p: ["For study and office work, a recent Core i5 or Ryzen 5 with 16 GB of RAM keeps everything smooth. Gamers and creators should look for a dedicated graphics card."] },
      { id: "storage", h: "Storage", p: ["An SSD is essential. 512 GB is a comfortable starting point; choose 1 TB if you store lots of photos, video or games."] },
      { id: "display", h: "Display", p: ["Full HD is the minimum. Look for an IPS panel with good brightness, and consider 100% sRGB coverage if you edit photos."] },
      { id: "battery", h: "Battery life and portability", p: ["If you carry your laptop daily, prioritise weight under 1.6 kg and real-world battery life of 8+ hours."] },
      { id: "budget", h: "Budget picks", p: ["Good everyday laptops start near ৳60,000. Spending a little more often buys a better screen, build quality and longer warranty."] },
      { id: "final", h: "Final thoughts", p: ["Balance performance, portability and budget — and check the warranty. Official warranty is included on every laptop we sell."] },
    ] },
  { slug: "charging-guide", title: "Charging Guide (2026): Chargers, Cables & Power Banks Explained", topic: "Accessories", date: "Nov 4, 2026", readTime: "6 min read", image: "/img/article-charger.png", picks: "accessories", picksTitle: "Top picks: Chargers & power banks",
    excerpt: "From fast charging to power banks, learn what to buy, how it works, and which accessories are worth it in 2026.",
    sections: [
      { id: "intro", p: ["Slow charging is usually down to a mismatched charger, cable or phone setting. This guide explains the basics so you can charge faster and safer."] },
      { id: "watts", h: "Wattage explained", p: ["Watts tell you how quickly a charger can deliver power. A 20–30 W charger suits most phones, while laptops may need 65 W or more."] },
      { id: "cables", h: "Cables and standards", p: ["USB-C Power Delivery (PD) is the most widely supported fast-charging standard. Use a cable rated for the wattage you want."], callout: { t: "What to look for", p: "Choose certified cables and chargers from trusted brands — cheap uncertified accessories can charge slowly or damage batteries." } },
      { id: "banks", h: "Power banks", p: ["10,000 mAh is a good balance of size and capacity for daily use, while 20,000 mAh suits travel. Look for PD output if you want fast charging on the go."] },
      { id: "gan", h: "GaN chargers", p: ["GaN chargers are smaller and run cooler than traditional ones, and a single 65 W GaN charger can power a phone, tablet and laptop."] },
      { id: "final", h: "Final thoughts", p: ["Match your charger, cable and power bank to your devices, and keep an eye on the warranty. Genuine accessories last longer and charge safer."] },
    ] },
];

export type PolicySection = { icon: string; h: string; intro?: string; bullets?: string[]; steps?: string[] };
export type Policy = { title: string; nav: string; icon: string; intro: string; highlights: { icon: string; t: string; d: string }[]; sections: PolicySection[] };

export const policies: Record<string, Policy> = {
  privacy: { title: "Privacy Policy", nav: "Privacy Policy", icon: "shield", intro: "At GadgetHub, we respect your privacy. This policy explains what information we collect, how we use it, and the choices you have.",
    highlights: [{ icon: "shield", t: "Your data is protected", d: "Handled with care and never sold" }, { icon: "user", t: "You are in control", d: "Edit or delete your account data" }, { icon: "check", t: "Clear and honest", d: "Plain-language policy" }],
    sections: [
      { icon: "user", h: "Information we collect", intro: "We collect the details you give us when you order or create an account:", bullets: ["Name, phone number, email and delivery address.", "Order history and support conversations.", "Basic usage data to keep the store working well."] },
      { icon: "box", h: "How we use it", intro: "Your information helps us to:", bullets: ["Process and deliver your orders.", "Provide support, returns and warranty service.", "Improve the store. We do not sell your personal data."] },
      { icon: "lock", h: "Your choices", intro: "You can contact support at any time to:", bullets: ["Update or correct your details.", "Request deletion of your account data.", "Opt out of promotional messages."] },
    ] },
  terms: { title: "Terms & Conditions", nav: "Terms & Conditions", icon: "list", intro: "These terms explain how orders, prices and payments work when you shop at GadgetHub. By placing an order you agree to them.",
    highlights: [{ icon: "check", t: "Accurate information", d: "Provide correct order details" }, { icon: "tag", t: "Clear pricing", d: "All prices are in Bangladeshi taka" }, { icon: "shield", t: "Fair and balanced", d: "Rights for you and for us" }],
    sections: [
      { icon: "cart", h: "Using the store", intro: "When you place an order, you agree to:", bullets: ["Provide accurate delivery and contact details.", "Pay the full amount using your chosen payment method.", "Use the website lawfully."] },
      { icon: "tag", h: "Prices and availability", intro: "Please note that:", bullets: ["Prices are in Bangladeshi taka and may change without notice.", "Orders are confirmed once stock is verified.", "We may cancel and refund an order if an item is unavailable."] },
      { icon: "help", h: "Liability", intro: "To the extent permitted by law, our liability is limited to the value of the order placed." },
    ] },
  shipping: { title: "Shipping Policy", nav: "Shipping Policy", icon: "truck", intro: "This policy explains delivery areas, timeframes and charges for orders placed on GadgetHub.",
    highlights: [{ icon: "truck", t: "Fast delivery", d: "Dhaka in 1–2 working days" }, { icon: "tag", t: "Free over ৳2,000", d: "Otherwise ৳120 inside Dhaka" }, { icon: "pin", t: "Track every order", d: "Updates in My Orders" }],
    sections: [
      { icon: "clock", h: "Delivery times", intro: "Estimated delivery times after your order is confirmed:", bullets: ["Inside Dhaka: 1–2 working days.", "Outside Dhaka: 2–4 working days.", "Delivery times may vary during sales and public holidays."] },
      { icon: "tag", h: "Delivery charges", intro: "Delivery is calculated at checkout:", bullets: ["৳120 inside Dhaka.", "Free delivery on orders over ৳2,000."] },
      { icon: "pin", h: "Tracking your order", intro: "Track your order any time from My Orders using your order number." },
    ] },
  returns: { title: "Returns & Warranty Policy", nav: "Returns & Warranty", icon: "refresh", intro: "At GadgetHub, we want you to shop with confidence. This policy explains how returns, refunds, and product warranties work for orders placed on GadgetHub.",
    highlights: [{ icon: "refresh", t: "7-day return request", d: "Request a return within 7 days of delivery" }, { icon: "shield", t: "Official warranty", d: "Genuine products with brand warranty" }, { icon: "box", t: "Easy & transparent", d: "Simple process with clear updates" }],
    sections: [
      { icon: "box", h: "Return eligibility", intro: "You can request a return if:", bullets: ["The request is made within 7 days of delivery.", "The item is unused, unactivated, and in its original condition.", "All original accessories, manuals, and packaging are included.", "The item is defective, damaged during delivery, or you received the wrong product."] },
      { icon: "list", h: "How to request a return", intro: "Follow these simple steps to return a product:", steps: ["Go to My Account › Orders and select the item you want to return.", "Click “Request a Return” and choose the reason.", "Our support team will review your request and share return instructions.", "After we receive and inspect the item, we’ll process your refund or replacement (usually within 3–5 business days)."] },
      { icon: "shield", h: "Warranty coverage", intro: "Most products on GadgetHub come with an official brand warranty, typically 6 to 24 months, depending on the product and brand.", bullets: ["The warranty covers manufacturing defects and hardware malfunctions under normal use.", "It does not cover physical damage, liquid damage, unauthorized repairs, or normal wear and tear.", "To claim a warranty, contact our support team with your order number, product details, and a brief description of the issue."] },
    ] },
};
