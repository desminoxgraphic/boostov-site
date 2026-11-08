import { Briefcase, Camera, Contact, Link2, MapPin, MessageCircle, UserRound } from "lucide-react";

const ICONS: Record<string, typeof MessageCircle> = {
  WhatsApp: MessageCircle,
  Instagram: Camera,
  Itinéraire: MapPin,
  "Enregistrer le contact": Contact,
  "Mes services": Briefcase,
};

/** Code-drawn phone showing a Boostov page (Pro or Connect). Generic placeholder identity, no real person or shop. */
export function PagePhone({ name, job, rows, alt, dark }: { name: string; job: string; rows: string[]; alt: string; dark?: boolean }) {
  return <div className="phone" data-state="page" role="img" aria-label={alt}>
    <div className={`screen pp${dark ? " pp--dark" : ""}`} aria-hidden="true">
      <div className="pp-cover" />
      <div className="pp-avatar"><UserRound /></div>
      <div className="pp-name">{name}</div>
      <div className="pp-job">{job}</div>
      <div className="pp-rows">
        {rows.map((r, i) => { const Icon = ICONS[r] ?? Link2; return <div key={r} className={`pp-row${i === 0 ? " pp-row--main" : ""}`}><Icon />{r}</div>; })}
      </div>
    </div>
  </div>;
}
