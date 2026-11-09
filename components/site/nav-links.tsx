"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { fr } from "@/content/fr";

/**
 * The site's only navigation. On desktop it sits inline in the header; on mobile the
 * same <nav> opens as a panel under the header (data-open on <header>). One nav in the DOM.
 */
export function HeaderNav({ brand, cta }: { brand: React.ReactNode; cta: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);
  return <header className="header" data-open={open ? "" : undefined}>
    <div className="container header-inner">
      {brand}
      <button type="button" className="menu-btn" aria-expanded={open} aria-controls="site-nav" aria-label={fr.nav.menu} onClick={() => setOpen((o) => !o)}>
        <Menu className="i-open" size={20} aria-hidden="true" /><X className="i-close" size={20} aria-hidden="true" />
      </button>
      <nav id="site-nav" className="nav" aria-label="Navigation principale">
        {fr.nav.items.map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}<ArrowRight size={18} aria-hidden="true" /></Link>)}
      </nav>
      {cta}
    </div>
  </header>;
}
