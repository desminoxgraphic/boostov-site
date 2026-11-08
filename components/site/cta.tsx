"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { MESSAGES, waHref, type MessageKey } from "@/lib/contact";
import { fr } from "@/content/fr";

/** The only action on the site: the gold "Commander sur WhatsApp" button, message names the product. */
export function Cta({ msg, size, block, className = "", children }: { msg: MessageKey; size?: "sm" | "lg"; block?: boolean; className?: string; children?: React.ReactNode }) {
  const cls = ["cta", size && `cta--${size}`, block && "cta--block", className].filter(Boolean).join(" ");
  return <a className={cls} href={waHref(MESSAGES[msg])} target="_blank" rel="noopener noreferrer">
    <MessageCircle size={size === "sm" ? 18 : 20} aria-hidden="true" />{children ?? fr.cta}
  </a>;
}

const BY_PATH: Record<string, MessageKey> = { "/grow": "grow", "/pro": "pro", "/connect": "connect", "/revendeurs": "reseller" };

/** Message for the current page (header button and mobile bar). */
export function PageCta(props: Omit<Parameters<typeof Cta>[0], "msg">) {
  const path = usePathname();
  return <Cta msg={BY_PATH[path] ?? "info"} {...props} />;
}

/**
 * Mobile-only sticky bar; body padding keeps it from covering content.
 * Hidden while a hero CTA ([data-hero-cta]) is on screen, so the first screen shows one gold button.
 */
export function CtaBar() {
  const path = usePathname();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.querySelector("[data-hero-cta]");
    let raf = 0;
    // Shown once the hero button has scrolled out of view (above the header); always shown on pages without one.
    const check = () => { raf = 0; setShow(!hero || hero.getBoundingClientRect().bottom < 64); };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    raf = requestAnimationFrame(check);
    addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [path]);
  return <div className={`cta-bar${show ? " is-shown" : ""}`} aria-hidden={!show || undefined} inert={!show || undefined}><PageCta size="lg" block /></div>;
}
