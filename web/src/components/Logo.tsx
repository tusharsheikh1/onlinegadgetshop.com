import Link from "next/link";
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 text-2xl font-extrabold tracking-tight ${className}`} aria-label="GadgetHub home">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#2563EB" />
        <path d="M22.500 11.500A8 8 0 1016 24c3 0 5.500-1.600 6.500-4H16v-3.500h10.500V18c0 4.700-4.200 9-10.500 9A11 11 0 1124.500 8.500l-2 3z" fill="#fff" />
      </svg>
      <span><span className="text-navy">Gadget</span><span className="text-brand">Hub</span></span>
    </Link>
  );
}
