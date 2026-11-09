"use client";

import { useEffect, useRef, useState } from "react";
import { fr } from "@/content/fr";
import { Phone, rewardLine } from "@/components/site/phone";
import { frameAt, SLOTS, type Frame } from "@/lib/story";

const STEPS = fr.story.steps;

const label = (f: Frame) => `${fr.phone.alt} ${STEPS[f.step][0]} : ${f.count}/${SLOTS}, ${rewardLine(f.state, f.count)}.`;

/**
 * Signature section. A sticky stage holds the phone; the frame is computed from the
 * track's scroll position on each animation frame (no IntersectionObserver, so it also
 * works in in-app browsers and capture tools). Only the phone's inner state changes:
 * no layout shift. prefers-reduced-motion shows four static frames instead (CSS).
 */
export function ScrollStory() {
  const track = useRef<HTMLDivElement>(null);
  const [f, setF] = useState<Frame>({ step: 0, state: "tap", count: 0 });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const stage = el.firstElementChild as HTMLElement | null;
      const travel = r.height - (stage?.offsetHeight ?? innerHeight);
      const next = frameAt(travel > 0 ? -r.top / travel : 0);
      setF((cur) => (cur.step === next.step && cur.count === next.count ? cur : next));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    raf = requestAnimationFrame(update);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const statics: Frame[] = [{ step: 0, state: "tap", count: 0 }, { step: 1, state: "stamps", count: 4 }, { step: 2, state: "gift", count: SLOTS }, { step: 3, state: "loop", count: 0 }];

  return <>
    <div className="story-track" ref={track}>
      <div className="story-stage container">
        <div className="story-phone"><Phone state={f.state} count={f.count} label={label(f)} /></div>
        <ol className="story-steps" aria-live="polite">
          {STEPS.map(([title, text], i) => <li key={title} className={`story-step${i === f.step ? " is-active" : ""}`}><span>{i + 1}</span>{title}<small>{text}</small></li>)}
        </ol>
        <div className="story-progress" aria-hidden="true">{STEPS.map(([t], i) => <i key={t} className={i === f.step ? "is-active" : undefined} />)}</div>
      </div>
    </div>
    <div className="story-static container">
      {statics.map((s) => <figure key={s.step}><Phone state={s.state} count={s.count} label={label(s)} /><figcaption>{s.step + 1}. {STEPS[s.step][0]}</figcaption></figure>)}
    </div>
  </>;
}
