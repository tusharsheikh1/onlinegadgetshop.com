import Link from "next/link";
export function Logo({ className = "", inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center gap-2.5 text-[22px] font-extrabold tracking-[-.03em] ${className}`} aria-label="GadgetHub home">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <defs><linearGradient id="gh-logo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3B82F6" /><stop offset="1" stopColor="#1D4ED8" /></linearGradient></defs>
        <rect width="32" height="32" rx="9" fill="url(#gh-logo)" />
        <path d="M22.500 11.500A8 8 0 1016 24c3 0 5.500-1.600 6.500-4H16v-3.500h10.500V18c0 4.700-4.200 9-10.500 9A11 11 0 1124.500 8.500l-2 3z" fill="#fff" />
      </svg>
      <span><span className={inverted ? "text-white" : "text-navy"}>Gadget</span><span className={inverted ? "text-blue-400" : "text-brand"}>Hub</span></span>
    </Link>
  );
}
