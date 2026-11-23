"use client";

import { useEffect, useRef } from "react";

/** px of strip movement per px scrolled. */
const SCROLL_FACTOR = 0.8;
/** Slow drift when the page is still. */
const DRIFT_PX_PER_S = 45;

/**
 * The red offer strip. It moves with the scroll (forwards and backwards),
 * on top of a slow drift, so every part of the text passes by.
 */
export default function OfferMarquee({ items }: { items: string[] }) {
  const trackRef = useRef<HTMLSpanElement>(null);
  const halfRef = useRef<HTMLSpanElement>(null);
  const hovered = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const half = halfRef.current;
    if (!track || !half) return;

    let visible = true;
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    observer.observe(track);

    let drift = 0;
    let lastTime = performance.now();
    let lastX = NaN;
    let frame = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const delta = now - lastTime;
      lastTime = now;
      if (!visible) return;
      if (!hovered.current) drift += (DRIFT_PX_PER_S * delta) / 1000;
      const width = half.offsetWidth;
      if (!width) return;
      const x = -((drift + window.scrollY * SCROLL_FACTOR) % width);
      if (Math.abs(x - lastX) < 0.1) return;
      lastX = x;
      track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const renderHalf = (key: string, ref?: React.Ref<HTMLSpanElement>) => (
    <span key={key} ref={ref} className="flex shrink-0 items-center">
      {[...items, ...items].map((item, i) => (
        <span
          key={i}
          className="flex shrink-0 items-center font-display text-2xl font-extrabold uppercase leading-none md:text-4xl"
        >
          <span className="px-6 md:px-8">{item}</span>
          <span className="h-2 w-2 rounded-full bg-white/80" />
        </span>
      ))}
    </span>
  );

  return (
    <span
      aria-hidden
      className="flex min-w-0 flex-1 overflow-hidden py-3 md:py-4"
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
    >
      <span ref={trackRef} className="flex shrink-0 items-center will-change-transform">
        {renderHalf("a", halfRef)}
        {renderHalf("b")}
      </span>
    </span>
  );
}
