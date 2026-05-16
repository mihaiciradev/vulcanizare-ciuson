"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AnimatedWheelBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wheelY, setWheelY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionHeight = containerRef.current.offsetHeight;
      const wheelSize = 48;
      const maxY = sectionHeight - wheelSize;

      // Distance scrolled past the top of this section
      const scrolledIntoSection = -rect.top;

      // Move at 2x the page scroll speed
      const fastY = scrolledIntoSection * 2.0;

      setWheelY(Math.max(0, Math.min(maxY, fastY)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate rolling: wheel diameter ~48px, circumference ~150px → ~2.4 deg/px
  const rotation = wheelY * 2.4;

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

      {/* Rolling wheel */}
      <div
        className="absolute left-1/2 z-20"
        style={{
          top: wheelY,
          transform: `translateX(-50%) rotate(${rotation}deg)`,
        }}
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
