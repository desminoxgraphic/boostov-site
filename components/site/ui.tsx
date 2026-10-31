import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { MESSAGES, waHref, type MessageKey } from "@/lib/contact";

type Variant = "primary" | "wa" | "ghost" | "light" | "ghost-dark";
type ButtonProps = { href: string; variant?: Variant; size?: "md" | "lg"; block?: boolean; className?: string; children: React.ReactNode; "aria-label"?: string };

export function Button({ href, variant = "primary", size = "md", block, className = "", children, ...rest }: ButtonProps) {
  const cls = `btn btn--${variant}${size === "lg" ? " btn--lg" : ""}${block ? " btn--block" : ""} ${className}`.trim();
  if (href.startsWith("/") || href.startsWith("#")) return <Link className={cls} href={href} {...rest}>{children}</Link>;
  return <a className={cls} href={href} target="_blank" rel="noopener noreferrer" {...rest}>{children}</a>;
}

/** Every order button: opens WhatsApp with a prefilled message naming the product. */
export function WaButton({ msg, children, variant = "wa", ...rest }: Omit<ButtonProps, "href" | "variant"> & { msg: MessageKey; variant?: Variant }) {
  return <Button href={waHref(MESSAGES[msg])} variant={variant} {...rest}><MessageCircle size={18} aria-hidden="true" />{children}</Button>;
}

export function Section({ id, tone = "white", className = "", children }: { id?: string; tone?: "white" | "tint" | "dark"; className?: string; children: React.ReactNode }) {
  return <section id={id} className={`section${tone === "white" ? "" : ` section--${tone}`} ${className}`.trim()}><div className="container">{children}</div></section>;
}

export function SectionHead({ eyebrow, title, intro, center, as: H = "h2" }: { eyebrow?: string; title: React.ReactNode; intro?: React.ReactNode; center?: boolean; as?: "h1" | "h2" }) {
  return <div className={`section-head reveal${center ? " section-head--center" : ""}`}>
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <H className="h2">{title}</H>
    {intro && <p className="lead">{intro}</p>}
  </div>;
}

export function Card({ tone, raised, interactive, className = "", children, as: Tag = "div" }: { tone?: "dark"; raised?: boolean; interactive?: boolean; className?: string; children: React.ReactNode; as?: "div" | "article" | "li" }) {
  const cls = ["card", tone === "dark" && "card--dark", raised && "card--raised", interactive && "card--interactive", className].filter(Boolean).join(" ");
  return <Tag className={cls}>{children}</Tag>;
}

export function Badge({ tone, children }: { tone?: "solid" | "dark"; children: React.ReactNode }) {
  return <span className={`badge${tone ? ` badge--${tone}` : ""}`}>{children}</span>;
}

export function PageHead({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro: React.ReactNode; children?: React.ReactNode }) {
  return <header className="page-head">
    <div className="container">
      <span className="eyebrow rise">{eyebrow}</span>
      <h1 className="display rise rise-2">{title}</h1>
      <p className="lead rise rise-3">{intro}</p>
      {children}
    </div>
  </header>;
}
