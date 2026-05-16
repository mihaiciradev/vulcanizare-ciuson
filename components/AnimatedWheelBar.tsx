"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function AnimatedWheelBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current || !wheelRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const sectionHeight = containerRef.current.offsetHeight;
        const wheelSize = 48;
        const maxY = sectionHeight - wheelSize;

        const scrolledIntoSection = -rect.top;
        const fastY = scrolledIntoSection * 2.0;
        const clampedY = Math.max(0, Math.min(maxY, fastY));
        const rotation = clampedY * 2.4;

        // Direct DOM mutation — no React re-render, no lag
        wheelRef.current.style.top = `${clampedY}px`;
        wheelRef.current.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block absolute right-8 top-0 bottom-0 w-20 pointer-events-none z-20"
    >
      {/* Dashed track line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px z-10"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(47,47,47,0.35) 0px, rgba(47,47,47,0.35) 8px, transparent 8px, transparent 18px)",
        }}
      />

      {/* Rolling wheel — position driven directly via style ref, no state */}
      <div
        ref={wheelRef}
        className="absolute left-1/2 z-20"
        style={{ top: 0, transform: "translateX(-50%) rotate(0deg)" }}
      >
        <Image
          src="/images/servicii_movingwheel.svg"
          alt=""
          width={48}
          height={48}
          className="drop-shadow-lg"
        />
      </div>
    </div>
  );
}
