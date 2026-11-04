export const orders = [
  { id: "GH-10428", date: "Nov 4, 2026", status: "Processing", total: 10600, items: ["aerosound-pro", "charging-adapter"], image: "/img/order-headphones.png" },
  { id: "GH-10316", date: "Oct 20, 2026", status: "Delivered", total: 4990, items: ["buds-pro-2"], image: "/img/order-watch.png" },
  { id: "GH-10225", date: "Oct 2, 2026", status: "Delivered", total: 2490, items: ["deal-4"], image: "/img/order-speaker.png" },
];

export const faqs: Record<string, { q: string; a: string }[]> = {
  Delivery: [
    { q: "How long does delivery take?", a: "Inside Dhaka, orders arrive in 1–2 working days. Outside Dhaka, delivery takes 2–4 working days." },
    { q: "How much is the delivery charge?", a: "Delivery is ৳120 inside Dhaka, and free on orders over ৳2,000." },
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

export const articles = [
  { slug: "choose-wireless-headphones", title: "How to choose your next wireless headphones", topic: "Audio", date: "Nov 4, 2026", image: "/img/featured-headphones.png", excerpt: "Battery, noise cancellation, comfort and codecs: what actually matters." },
  { slug: "smartwatch-guide", title: "Smartwatch buying guide: fitness vs. lifestyle", topic: "Wearables", date: "Oct 28, 2026", image: "/img/article-watch.png", excerpt: "Pick the right watch for your habits and phone." },
  { slug: "laptop-guide", title: "Which laptop is right for study and work?", topic: "Laptops", date: "Oct 21, 2026", image: "/img/article-laptop.png", excerpt: "RAM, storage and CPU explained without the jargon." },
  { slug: "charging-guide", title: "Fast charging explained: chargers, cables and power banks", topic: "Accessories", date: "Oct 14, 2026", image: "/img/article-charger.png", excerpt: "Watts, standards and how to avoid slow charging." },
];

export const policies: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
  privacy: { title: "Privacy Policy", sections: [
    { h: "Information we collect", p: "We collect the details you give us at checkout and in your account, such as name, address, phone and email." },
    { h: "How we use it", p: "To process orders, provide support and improve the store. We do not sell personal data." },
    { h: "Your choices", p: "You can edit or request deletion of your account data by contacting support." } ] },
  terms: { title: "Terms & Conditions", sections: [
    { h: "Using the store", p: "By placing an order you agree to provide accurate information and to pay for the items ordered." },
    { h: "Prices and availability", p: "Prices are in Bangladeshi taka and may change. Orders are confirmed once stock is verified." },
    { h: "Liability", p: "Our liability is limited to the value of the order, to the extent permitted by law." } ] },
  shipping: { title: "Shipping Policy", sections: [
    { h: "Delivery times", p: "Dhaka: 1–2 working days. Outside Dhaka: 2–4 working days." },
    { h: "Delivery charges", p: "৳120 inside Dhaka. Free delivery on orders over ৳2,000." },
    { h: "Tracking", p: "Track your order any time from My Orders using your order number." } ] },
  returns: { title: "Returns & Warranty Policy", sections: [
    { h: "Return eligibility", p: "Items can be returned within 7 days of delivery if unused, in original packaging and with all accessories." },
    { h: "How to request a return", p: "Open My Orders, select the order and choose Request return. Our team will confirm within one working day." },
    { h: "Warranty coverage", p: "Warranty covers manufacturing defects for the period listed on the product page. It does not cover physical or liquid damage." } ] },
};
