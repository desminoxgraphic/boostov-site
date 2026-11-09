// Scroll story logic, kept pure (no React, no imports) so tests can check every frame.
export const SLOTS = 5;
export const STEP_COUNT = 4;
export type PhoneState = "idle" | "tap" | "stamps" | "gift" | "loop";
export type Frame = { step: number; state: PhoneState; count: number };

/**
 * Scroll progress (0..1 over the story track) → frame. Step 2 ("Il valide sa visite")
 * is split in four so the stamps fill 1/5, 2/5, 3/5, 4/5 as the visitor scrolls.
 */
export function frameAt(p: number): Frame {
  const x = Math.min(Math.max(p, 0), 0.9999) * STEP_COUNT;
  const step = Math.floor(x);
  if (step === 0) return { step, state: "tap", count: 0 };
  if (step === 1) return { step, state: "stamps", count: 1 + Math.floor((x - 1) * (SLOTS - 1)) };
  if (step === 2) return { step, state: "gift", count: SLOTS };
  return { step: 3, state: "loop", count: 0 };
}
