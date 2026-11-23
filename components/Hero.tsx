"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import WheelFallback from "@/components/WheelFallback";
import { SITE } from "@/lib/site";

const WheelScene = dynamic(() => import("@/components/WheelScene"), { ssr: false });

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero({ offerActive }: { offerActive: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pinned = !reduceMotion;
  const [use3D, setUse3D] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const roadScale = useTransform(scrollYProgress, [0.7, 1], [0, 1]);
  const wheelShift = useTransform(scrollYProgress, [0.7, 1], ["0vw", "-14vw"]);

  useEffect(() => {
    if (!reduceMotion && hasWebGL()) setUse3D(true);
  }, [reduceMotion]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-titlu"
      className={`relative bg-ink text-paper ${pinned ? "h-[200svh] md:h-[220svh]" : ""}`}
    >
      <div
        className={`flex flex-col overflow-hidden ${pinned ? "sticky top-0 h-svh" : "min-h-svh"}`}
      >
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-6 pt-24 sm:px-8 md:block md:pt-28">
          <div className="relative z-10 md:w-[46%] md:pt-[14svh]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
              Vulcanizare Ciuson
            </p>
            <h1
              id="hero-titlu"
              className="mt-4 font-display text-[3.2rem] font-extrabold uppercase leading-[0.9] sm:text-7xl lg:text-[6.5rem]"
            >
              Vulcanizare în Timișoara și Șag
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-paper/85 sm:text-lg">
              Pe DN59, între Timișoara și Șag. Schimbăm, echilibrăm și reparăm anvelope.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-paper"
              >
                Vezi traseul
              </a>
              <a href={SITE.phoneHref} className="btn-primary">
                Sună la atelier
              </a>
            </div>
          </div>

          <motion.div
            style={pinned ? { x: wheelShift } : undefined}
            className="relative mt-6 h-[44svh] w-full md:absolute md:right-[-16vw] md:top-[6svh] md:mt-0 md:h-[88svh] md:w-[88svh]"
          >
            {use3D ? (
              <WheelScene progress={scrollYProgress} onFail={() => setUse3D(false)} />
            ) : (
              <WheelFallback className="h-full w-full" />
            )}
          </motion.div>
        </div>

        {offerActive && (
          <div className="relative z-10 bg-brand text-white">
            {pinned && (
              <motion.div
                aria-hidden
                style={{ scaleX: roadScale }}
                className="absolute -top-2 left-0 right-0 h-2 origin-left bg-[repeating-linear-gradient(90deg,#E80D13_0_36px,transparent_36px_56px)]"
              />
            )}
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 sm:px-8 md:flex-row md:items-end md:justify-between md:gap-8 md:py-6">
              <p className="font-display text-3xl font-extrabold uppercase leading-none md:text-5xl">
                20% reducere la manopera de schimb pentru a doua mașină
              </p>
              <p className="max-w-sm text-sm leading-snug text-white/95 md:text-base">
                Vino cu ambele mașini împreună și menționează oferta. Valabilă până pe 20 decembrie inclusiv.
              </p>
            </div>
          </div>
        )}

        {!offerActive && pinned && (
          <motion.div
            aria-hidden
            style={{ scaleX: roadScale }}
            className="absolute bottom-0 left-0 right-0 h-2 origin-left bg-[repeating-linear-gradient(90deg,#E80D13_0_36px,transparent_36px_56px)]"
          />
        )}
      </div>
    </section>
  );
}
