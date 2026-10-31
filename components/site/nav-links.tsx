"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export const NAV = [
  { href: "/produits", label: "Produits" },
  { href: "/stands", label: "Stands" },
  { href: "/revendeurs", label: "Revendeurs" },
  { href: "/faq", label: "FAQ" },
] as const;

export function NavLinks({ mobile }: { mobile?: boolean }) {
  const path = usePathname();
  // Closing the <details> menu after navigation keeps the mobile menu JS-free otherwise.
  const close = (e: React.MouseEvent) => e.currentTarget.closest("details")?.removeAttribute("open");
  return <>{NAV.map(({ href, label }) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined} onClick={mobile ? close : undefined}>{label}{mobile && <ArrowRight size={18} aria-hidden="true" />}</Link>)}</>;
}
