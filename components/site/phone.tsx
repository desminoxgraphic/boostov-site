import { Check, Gift, MapPin, MessageCircle, Nfc, RotateCcw, UserRound } from "lucide-react";
import { fr } from "@/content/fr";

export type PhoneState = "1" | "2" | "3" | "4" | "hero";

const p = fr.phone;
// Confetti pieces for the unlock: fixed vectors, no JS.
const BURST = [[-70, -90], [60, -110], [-100, -20], [95, -40], [-40, -130], [30, -60], [-85, 40], [80, 30], [0, -140], [-20, 60], [110, -90], [-120, -70]];

/**
 * Code-drawn phone showing a Boostov Grow loyalty card. Pure CSS states (data-state),
 * so it costs no JS and never shifts layout. Shop name is generic on purpose.
 */
export function Phone({ state, label, id }: { state: PhoneState; label?: string; id?: string }) {
  return <div className="phone" data-state={state} id={id} role="img" aria-label={label ?? p.alt}>
    <div className="screen" aria-hidden="true">
      <div className="lc">
        <div className="lc-top"><span className="lc-logo">V</span><div><div className="lc-name">{p.shop}</div><div className="lc-kind">{p.kind}</div></div></div>
        <div className="stamps">
          {[1, 2, 3, 4].map((n) => <span key={n} className={`stamp s${n}`}><Check strokeWidth={3} /></span>)}
          <span className="stamp stamp--gift s5"><Gift strokeWidth={2.4} /></span>
        </div>
        <div className="lc-foot">
          <div><small>{p.member}</small><b>{p.memberName}</b></div>
          <div className="lc-count">
            <span className="c0">0<small>/5</small></span>
            <span className="c3">3<small>/5</small></span>
            <span className="c4">4<small>/5</small></span>
            <span className="c5">5<small>/5</small></span>
          </div>
        </div>
      </div>
      <div className="reward">
        <span className="reward-ico"><Gift /></span>
        <div className="r-off"><small>{p.rewardLabel}</small><b>{p.reward}</b></div>
        <div className="r-on"><small>{p.unlockedLabel}</small><b>{p.reward}</b></div>
      </div>
      <div className="rows">
        <div className="row row--wa"><i><MessageCircle /></i>{p.rowWa}</div>
        <div className="row"><i><UserRound /></i>{p.rowContact}</div>
        <div className="row"><i><MapPin /></i>{p.rowReview}</div>
      </div>
      <div className="tap">
        <div className="tap-core"><span className="tap-ring" /><span className="tap-ring" /><span className="tap-ring" /><Nfc /></div>
        <div className="tap-label">{p.tap}</div>
      </div>
      <div className="burst">{BURST.map(([x, y], i) => <i key={i} style={{ "--x": `${x / 16}em`, "--y": `${y / 16}em`, animationDelay: `${(i % 4) * 40}ms` } as React.CSSProperties} />)}</div>
      <div className="loop-badge"><RotateCcw />{p.loop}</div>
    </div>
  </div>;
}
