"use client";

import { RefObject, useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Adds `.in` to every `.rv` element under root once it enters the viewport.
 *  Content stays visible without JS: hiding only applies under [data-motion="on"]. */
export function useReveal(root: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = root.current;
    if (!el || !enabled) return;
    el.setAttribute("data-motion", "on");
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    el.querySelectorAll(".rv").forEach((node) => io.observe(node));
    return () => { io.disconnect(); el.removeAttribute("data-motion"); };
  }, [root, enabled]);
}

/** Writes the element's scroll progress (0 → 1 while it crosses the viewport) to a CSS variable.
 *  Only listens while the element is on screen; one rAF write per frame. */
export function useScrollProgress(target: RefObject<HTMLElement | null>, enabled: boolean, name = "--p") {
  useEffect(() => {
    const el = target.current;
    if (!el || !enabled) return;
    let frame = 0;
    let active = false;
    const write = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
      el.style.setProperty(name, p.toFixed(3));
    };
    const onScroll = () => { if (active && !frame) frame = requestAnimationFrame(write); };
    const io = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; if (active) onScroll(); });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [target, enabled, name]);
}

/** Pointer tilt for mouse/trackpad only (touch devices get the tap demo instead). */
export function useTilt(target: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = target.current;
    if (!el || !enabled || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const write = () => { frame = 0; el.style.setProperty("--tx", x.toFixed(3)); el.style.setProperty("--ty", y.toFixed(3)); };
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      x = (event.clientX - rect.left) / rect.width - 0.5;
      y = (event.clientY - rect.top) / rect.height - 0.5;
      if (!frame) frame = requestAnimationFrame(write);
    };
    const onLeave = () => { x = 0; y = 0; if (!frame) frame = requestAnimationFrame(write); };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); if (frame) cancelAnimationFrame(frame); };
  }, [target, enabled]);
}

/** True once the element is within `margin` of the viewport — used to lazy-start heavier demos. */
export function useNearViewport(target: RefObject<HTMLElement | null>, margin = "300px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [target, margin]);
  return near;
}
