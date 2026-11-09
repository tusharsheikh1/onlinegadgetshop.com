import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CompareBar } from "@/components/CompareBar";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = { title: { default: "GadgetHub — The trusted gadget store in Bangladesh", template: "%s | GadgetHub" }, description: "Shop phones, laptops, headphones, smartwatches and more with official warranty and fast delivery across Bangladesh." };
export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
        <Header />
        <main id="main" className="container-x flex-1">{children}</main>
        <Footer />
        <CompareBar />
      </body>
    </html>
  );
}
