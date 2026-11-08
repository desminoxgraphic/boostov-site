"use client";

import { useEffect, useRef, useState } from "react";
import { fr } from "@/content/fr";
import { Phone, type PhoneState } from "@/components/site/phone";

const STEPS = fr.story.steps;

/**
 * Signature section: a sticky phone that plays the 4 loyalty steps as the visitor scrolls.
 * Renders in "live" mode (sticky stage, so no layout shift on hydration); invisible step triggers
 * watched by one IntersectionObserver set data-state. With prefers-reduced-motion it falls back
 * to a static row of 4 phones.
 * Only transform/opacity animate, the stage has a fixed size: no layout shift.
 */
export function ScrollStory({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const [live, setLive] = useState(true);
  const [step, setStep] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setLive(!mq.matches && "IntersectionObserver" in window);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!live) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setStep(Number((e.target as HTMLElement).dataset.i));
    }, { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [live]);

  const H = headingLevel;
  return <section className={`story${live ? " story--live" : ""}`} aria-labelledby="story-title">
    <div className="story-head container">
      <span className="eyebrow">{fr.story.eyebrow}</span>
      <H id="story-title" className="h2">{fr.story.title}</H>
    </div>
    <div className="story-stage">
      <div className="story-phone"><Phone state={String(step + 1) as PhoneState} label={`${fr.phone.alt} ${STEPS[step]}`} /></div>
      <ol className="story-caps" aria-live="polite">
        {STEPS.map((s, i) => <li key={s} className={`story-cap${i === step ? " is-active" : ""}`} aria-hidden={live && i !== step ? true : undefined}><span>{i + 1}</span>{s}</li>)}
      </ol>
      <div className="story-dots" aria-hidden="true">{STEPS.map((s, i) => <i key={s} className={i === step ? "is-active" : undefined} />)}</div>
      <div className="story-static-phones">
        {STEPS.map((s, i) => <figure key={s}><Phone state={String(i + 1) as PhoneState} label={`${fr.phone.alt} ${s}`} /><figcaption>{i + 1}. {s}</figcaption></figure>)}
      </div>
    </div>
    <div className="story-steps" aria-hidden="true">
      {STEPS.map((s, i) => <div key={s} className="story-step" data-i={i} ref={(el) => { refs.current[i] = el; }} />)}
    </div>
  </section>;
}
