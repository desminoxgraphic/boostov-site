import { Check, Gift, MapPin, MessageCircle, Nfc, RotateCcw, UserRound } from "lucide-react";
import { fr } from "@/content/fr";

import { SLOTS, type PhoneState } from "@/lib/story";
export type { PhoneState };

const p = fr.phone;
// Confetti for the unlock: fixed vectors (in em), no JS.
const BURST = [[-4.4, -5.6], [3.8, -6.9], [-6.2, -1.2], [5.9, -2.5], [-2.5, -8.1], [1.9, -3.8], [-5.3, 2.5], [5, 1.9], [0, -8.8], [-1.2, 3.8], [6.9, -5.6], [-7.5, -4.4]];

// Decorative QR-style pattern (not scannable), deterministic so server and client match.
const QR = (() => {
  const n = 21; let seed = 11; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  const cells: string[] = [];
  const inFinder = (x: number, y: number) => (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8);
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!inFinder(x, y) && rnd() > .5) cells.push(`M${x} ${y}h1v1h-1z`);
  for (const [fx, fy] of [[0, 0], [n - 7, 0], [0, n - 7]]) cells.push(`M${fx} ${fy}h7v7h-7zM${fx + 1} ${fy + 1}v5h5v-5zM${fx + 2} ${fy + 2}h3v3h-3z`);
  return { n, d: cells.join("") };
})();

/** The reward line under the card, always consistent with the counter. */
export function rewardLine(state: PhoneState, count: number) {
  if (state === "gift") return p.unlocked;
  if (state === "loop") return p.newCard;
  const left = SLOTS - count;
  return left === 1 ? p.oneLeft : p.left.replace("{n}", String(left));
}

/**
 * Code-drawn phone with a Boostov Grow v2 loyalty card. One counter, driven by `count`,
 * so the number, the stamps and the reward line always agree. Decorative text is
 * aria-hidden; the role="img" label describes the current frame.
 */
export function Phone({ state, count, label }: { state: PhoneState; count: number; label: string }) {
  return <div className="phone" data-state={state} role="img" aria-label={label}>
    <div className="screen" aria-hidden="true">
      <div className="lc">
        <div className="lc-top"><span className="lc-logo">V</span><div><div className="lc-name">{p.shop}</div><div className="lc-kind">{p.kind}</div></div></div>
        <div className="stamps">
          {[1, 2, 3, 4].map((n) => <span key={n} className={`stamp${count >= n ? " is-on" : ""}`}><Check strokeWidth={3} /></span>)}
          <span className={`stamp stamp--gift${count >= SLOTS ? " is-on" : ""}`}><Gift strokeWidth={2.4} /></span>
        </div>
        <div className="lc-foot">
          <div><small>{p.member}</small><b>{p.memberName}</b></div>
          <div className="lc-count">{count}<small>/{SLOTS}</small></div>
        </div>
      </div>
      <div className={`reward${state === "gift" ? " is-unlocked" : ""}`}>
        <span className="reward-ico"><Gift /></span>
        <div><small>{rewardLine(state, count)}</small><b>{p.reward}</b></div>
      </div>
      <div className="code">
        <svg viewBox={`0 0 ${QR.n} ${QR.n}`} shapeRendering="crispEdges"><path d={QR.d} fill="#0B0F1A" fillRule="evenodd" /></svg>
        <div><b>{p.code}</b><small>{p.codeText}</small></div>
      </div>
      <div className="rows">
        <div className="row"><i><MessageCircle /></i>{p.rowWa}</div>
        <div className="row"><i><UserRound /></i>{p.rowContact}</div>
        <div className="row"><i><MapPin /></i>{p.rowReview}</div>
      </div>
      {state === "tap" && <div className="tap"><div className="tap-core"><span className="tap-ring" /><span className="tap-ring" /><span className="tap-ring" /><Nfc /></div><div className="tap-label">{p.tap}</div></div>}
      {state === "gift" && <div className="burst">{BURST.map(([x, y], i) => <i key={i} style={{ "--x": `${x}em`, "--y": `${y}em`, animationDelay: `${(i % 4) * 40}ms` } as React.CSSProperties} />)}</div>}
      {state === "loop" && <div className="loop-badge"><RotateCcw />{p.newCard} · 0/{SLOTS}</div>}
    </div>
  </div>;
}
