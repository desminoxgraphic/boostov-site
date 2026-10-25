"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, Navigation } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type Offer = "Boostov Connect" | "Boostov Grow";
type Success = { offer: Offer; quantity: number; phone: string };

export function OrderModal({ open, offer, onOpenChange }: { open: boolean; offer: Offer; onOpenChange: (open: boolean) => void }) {
  const [selectedOffer, setSelectedOffer] = useState<Offer>(offer);
  const [location, setLocation] = useState("");
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);

  const shareLocation = () => {
    setError("");
    if (!navigator.geolocation) { setError("La géolocalisation n’est pas disponible sur cet appareil."); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(({ coords }) => { setLocation(`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`); setLocating(false); }, () => { setError("Localisation non partagée. Vous pouvez coller un lien Google Maps manuellement."); setLocating(false); }, { enableHighAccuracy: false, timeout: 10000 });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setSubmitting(true);
    const form = new FormData(event.currentTarget);
    const payload = { name: String(form.get("name") || "").trim(), phone: String(form.get("phone") || "").trim(), city: String(form.get("city") || "").trim(), offer: selectedOffer, quantity: Number(form.get("quantity")), location: location.trim(), website: String(form.get("website") || "") };
    try {
      const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error(data.message || "Votre commande n’a pas pu être envoyée.");
      setSuccess({ offer: selectedOffer, quantity: payload.quantity, phone: payload.phone });
    } catch (err) { setError(err instanceof Error ? err.message : "Un problème est survenu. Réessayez."); }
    finally { setSubmitting(false); }
  };

  return <Dialog open={open} onOpenChange={(next) => { onOpenChange(next); if (!next) { setSuccess(null); setError(""); } }}><DialogContent className="max-h-[92vh] overflow-y-auto border-0 bg-white p-0 shadow-2xl sm:max-w-[620px] max-sm:top-auto max-sm:bottom-0 max-sm:translate-y-0 max-sm:rounded-b-none">{success ? <div className="p-8 text-center sm:p-12"><div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#e8f0ff] text-[#0b5cff]"><Check size={30} strokeWidth={3} /></div><DialogTitle className="text-3xl tracking-[-.04em]">Commande bien reçue 🎉</DialogTitle><DialogDescription className="mx-auto mt-3 max-w-md text-base leading-7">Merci ! Nous vous contacterons rapidement pour confirmer votre commande.</DialogDescription><div className="my-7 rounded-2xl bg-[#f4f7fb] p-5 text-left text-sm"><p><b>Produit :</b> {success.offer}</p><p className="mt-2"><b>Quantité :</b> {success.quantity}</p><p className="mt-2"><b>Téléphone :</b> {success.phone}</p></div><DialogClose className="btn-primary w-full">Fermer</DialogClose></div> : <><DialogHeader className="border-b border-[#e5eaf1] p-6 pr-14 sm:p-8 sm:pr-16"><p className="eyebrow">Commande Boostov</p><DialogTitle className="text-2xl tracking-[-.04em]">Votre business commence ici.</DialogTitle><DialogDescription>Quelques informations suffisent. Nous vous contactons ensuite pour confirmer.</DialogDescription></DialogHeader><form className="grid gap-4 p-6 pt-1 sm:p-8 sm:pt-2" onSubmit={submit}><input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" /><div className="field-grid"><div className="field"><label htmlFor="name">Nom *</label><input id="name" name="name" required minLength={2} autoComplete="name" placeholder="Votre nom" /></div><div className="field"><label htmlFor="phone">Téléphone *</label><input id="phone" name="phone" required inputMode="tel" autoComplete="tel" pattern="(0[67][0-9]{8}|\+212[67][0-9]{8})" placeholder="06XXXXXXXX" /></div></div><div className="field-grid"><div className="field"><label htmlFor="city">Ville *</label><input id="city" name="city" required minLength={2} autoComplete="address-level2" placeholder="Casablanca" /></div><div className="field"><label htmlFor="quantity">Quantité *</label><input id="quantity" name="quantity" type="number" min="1" max="100" defaultValue="1" required /></div></div><div className="field"><label htmlFor="offer">Offre *</label><select id="offer" value={selectedOffer} onChange={(e) => setSelectedOffer(e.target.value as Offer)}><option>Boostov Connect</option><option>Boostov Grow</option></select></div><div className="field"><label htmlFor="location">Localisation <span className="font-normal text-[#748199]">(optionnel)</span></label><input id="location" value={location} onChange={(e) => setLocation(e.target.value)} inputMode="url" placeholder="Collez un lien Google Maps" /></div><button type="button" className="btn-secondary w-full" onClick={shareLocation} disabled={locating}><Navigation size={17} />{locating ? "Localisation en cours…" : "Partager ma localisation"}</button><p className="text-xs leading-5 text-[#728098]">Votre position n’est demandée qu’après votre clic et sert uniquement à faciliter la livraison.</p>{error && <p className="form-error" role="alert">{error}</p>}<button className="btn-primary mt-2 w-full" type="submit" disabled={submitting}>{submitting ? "Envoi sécurisé…" : "Confirmer ma commande"} {!submitting && <ArrowRight size={17} />}</button></form></>}</DialogContent></Dialog>;
}
