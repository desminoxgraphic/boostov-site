"use client";
/* eslint-disable @next/next/no-img-element -- the logo preview is a local object URL from the visitor's own file. */

import { useEffect, useId, useState } from "react";
import { ImagePlus, MessageCircle, X } from "lucide-react";
import { waHref } from "@/lib/contact";
import { stands } from "@/content/pages.fr";

const t = stands.preview;
const SWATCHES = ["#0b1220", "#2864f0", "#7c2d12", "#14532d", "#6b21a8", "#be123c", "#f5f0e6"];
const PRODUCTS = { connect: { label: "Connect", line: "Contactez-nous" }, grow: { label: "Grow", line: "Donnez votre avis" } } as const;
type ProductKey = keyof typeof PRODUCTS;

// Pick black or white text for readable contrast on the chosen background.
function textOn(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "#0b1220" : "#ffffff";
}

function QrPlaceholder() {
  // Decorative pattern, not a scannable code.
  const bits = "1110111010110101011100100111011010001110110101101010011101011100110111001011";
  const n = 9;
  return <svg viewBox="0 0 9 9" className="sp-qr" aria-hidden="true" shapeRendering="crispEdges">
    {Array.from({ length: n * n }, (_, i) => {
      const x = i % n, y = Math.floor(i / n);
      const finder = (x < 3 && y < 3) || (x > 5 && y < 3) || (x < 3 && y > 5);
      const on = finder ? !(x % 6 === 1 && y % 6 === 1) : bits[i % bits.length] === "1";
      return on ? <rect key={i} x={x} y={y} width="1" height="1" /> : null;
    })}
  </svg>;
}

export function StandPreview() {
  const id = useId();
  const [product, setProduct] = useState<ProductKey>("grow");
  const [color, setColor] = useState(SWATCHES[0]);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<string | null>(null);

  // Release the local object URL when the logo changes or the component unmounts.
  useEffect(() => () => { if (logo) URL.revokeObjectURL(logo); }, [logo]);

  const ink = textOn(color);
  const shown = name.trim() || t.namePlaceholder;
  const message = `Salam, bghit Stand ${PRODUCTS[product].label} personnalisé. Couleur : ${color}. Nom : ${shown}.${logo ? " Nb3t lik logo f WhatsApp." : ""}`;

  return <div className="sp">
    <div className="sp-stage" aria-live="polite">
      <div className="sp-stand" style={{ "--sp-bg": color, "--sp-ink": ink } as React.CSSProperties}>
        <div className="sp-panel">
          {logo
            ? <img className="sp-logo" src={logo} alt={`Logo de ${shown}`} />
            : <span className="sp-mono" aria-hidden="true">{shown.slice(0, 1).toUpperCase()}</span>}
          <b className="sp-name">{shown}</b>
          <svg className="sp-nfc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M7 8.5a5 5 0 0 1 0 7" /><path d="M11 6a8.5 8.5 0 0 1 0 12" /><path d="M15 3.5a12 12 0 0 1 0 17" /></svg>
          <span className="sp-qrbox"><QrPlaceholder /></span>
          <span className="sp-tap">{t.tap}</span>
          <span className="sp-line">{PRODUCTS[product].line}</span>
        </div>
        <span className="sp-base" aria-hidden="true" />
      </div>
      <p className="sp-note">{t.disclaimer}</p>
    </div>

    <div className="sp-controls">
      <fieldset className="sp-field">
        <legend>{t.product}</legend>
        <div className="seg">{(Object.keys(PRODUCTS) as ProductKey[]).map((k) => <button key={k} type="button" aria-pressed={product === k} onClick={() => setProduct(k)}>{PRODUCTS[k].label}</button>)}</div>
      </fieldset>
      <fieldset className="sp-field">
        <legend>{t.color}</legend>
        <div className="swatches">
          {SWATCHES.map((c) => <button key={c} type="button" className="swatch" style={{ background: c }} aria-label={`Couleur ${c}`} aria-pressed={color === c} onClick={() => setColor(c)} />)}
          <label className="swatch swatch--custom" title="Autre couleur"><span className="sr-only">Autre couleur</span><input type="color" value={color} onChange={(e) => setColor(e.target.value)} /></label>
        </div>
      </fieldset>
      <div className="sp-field">
        <label htmlFor={`${id}-name`}>{t.name}</label>
        <input id={`${id}-name`} className="input" type="text" maxLength={28} placeholder={t.namePlaceholder} value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
      </div>
      <div className="sp-field">
        <span className="sp-label">{t.logo}</span>
        <div className="sp-logo-row">
          <label className="btn btn--ghost"><ImagePlus size={18} aria-hidden="true" />Choisir un fichier<input className="sr-only" type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) setLogo(URL.createObjectURL(f)); e.target.value = ""; }} /></label>
          {logo && <button type="button" className="btn btn--ghost" onClick={() => setLogo(null)}><X size={18} aria-hidden="true" />{t.removeLogo}</button>}
        </div>
        <p className="small">{t.logoHint}</p>
      </div>
      <a className="btn btn--wa btn--lg btn--block" href={waHref(message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} aria-hidden="true" />{t.cta}</a>
    </div>
  </div>;
}
