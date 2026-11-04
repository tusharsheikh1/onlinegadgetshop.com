import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: { default: "GadgetHub — The trusted gadget store in Bangladesh", template: "%s | GadgetHub" }, description: "Shop phones, laptops, headphones, smartwatches and more with official warranty and fast delivery across Bangladesh." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
        <Header />
        <main id="main" className="container-x min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
