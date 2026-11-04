import Link from "next/link";
import { Logo } from "./Logo";
const links = [["About", "/about"], ["Privacy Policy", "/policy/privacy"], ["Terms", "/policy/terms"], ["Shipping", "/policy/shipping"], ["Returns", "/policy/returns"], ["FAQ", "/faq"], ["Contact", "/contact"]];
export function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="container-x flex flex-col items-start justify-between gap-4 py-8 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4"><Logo /><span className="hidden text-sm text-ink-muted sm:inline">Your trusted gadget store in Bangladesh.</span></div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">{links.map(([l, h]) => <li key={h}><Link href={h} className="hover:text-brand">{l}</Link></li>)}</ul>
        <span className="text-sm text-ink-muted">© GadgetHub · Nov 4 2026</span>
      </div>
    </footer>
  );
}
