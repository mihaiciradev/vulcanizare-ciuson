"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import OfferMarquee from "@/components/OfferMarquee";
import tiresPhoto from "@/public/images/tires.jpg";
import type { Dictionary } from "@/lib/dictionaries";
import { pageHref, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

// Called right after mount so three.js downloads while the entrance plays.
const loadWheelScene = () => import("@/components/WheelScene");
const WheelScene = dynamic(loadWheelScene, { ssr: false });

/** Must match ROLL_END in WheelScene (not imported, to keep three.js out of the main bundle). */
const ROLL_END = 0.8;

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function RoadLine({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-1.5 bg-[repeating-linear-gradient(90deg,#E80D13_0_44px,transparent_44px_72px)] ${className}`}
    />
  );
}

type Props = {
  locale: Locale;
  t: Dictionary["hero"];
  common: Dictionary["common"];
  offerActive: boolean;
};

export default function Hero({ locale, t, common, offerActive }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const wheelDrives = useRef(false);

  const [use3D, setUse3D] = useState(false);

  // Desktop pins the hero while the wheel rolls across. Mobile plays it while the hero scrolls away.
  const { scrollYProgress: pinned } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const { scrollYProgress: leaving } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const progress = useMotionValue(0);
  const amount = useMotionValue(0); // 0 on the server, 1 once mounted, so the first render matches
  const desktop = useMotionValue(0);
  // How much of the photo frame has turned into the offer panel. Written by the wheel when it runs.
  const reveal = useMotionValue(0);

  useMotionValueEvent(pinned, "change", (v) => desktop.get() && progress.set(v));
  useMotionValueEvent(leaving, "change", (v) => !desktop.get() && progress.set(v));
  // Without WebGL the panel still slides in with the scroll.
  useMotionValueEvent(progress, "change", (v) => {
    if (!wheelDrives.current) reveal.set(amount.get() ? clamp01(v / ROLL_END) : 0);
  });

  useEffect(() => {
    amount.set(1);
    if (hasWebGL()) {
      wheelDrives.current = true;
      setUse3D(true);
      loadWheelScene();
    }

    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      desktop.set(media.matches ? 1 : 0);
      progress.set(media.matches ? pinned.get() : leaving.get());
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [amount, desktop, progress, pinned, leaving]);

  const onWheelFail = () => {
    wheelDrives.current = false;
    setUse3D(false);
  };

  // The offer panel is uncovered from the left, right behind the rolling wheel.
  const hiddenRight = useTransform(reveal, (r) => (1 - r) * 100);
  const panelClip = useMotionTemplate`inset(0 ${hiddenRight}% 0 0)`;
  const panelVisibility = useTransform(reveal, (r) => (r > 0.01 ? "visible" : "hidden"));
  const panelContentOpacity = useTransform(reveal, [0.35, 0.75], [0, 1]);
  const panelContentY = useTransform(reveal, [0.35, 0.85], [30, 0]);

  // Light parallax on the photo itself.
  const photoY = useTransform([progress, amount] as MotionValue<number>[], ([p, a]: number[]) => -30 * p * a);

  const hintOpacity = useTransform(
    [progress, amount, desktop] as MotionValue<number>[],
    ([p, a, d]: number[]) => a * d * (1 - clamp01(p / 0.04)),
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-titlu"
      className="relative bg-paper text-ink md:h-[200svh]"
    >
      {/* Fetch the model in parallel with three.js instead of after it. */}
      <link rel="preload" href="/models/wheel.glb" as="fetch" crossOrigin="anonymous" />

      <div className="relative flex flex-col md:sticky md:top-0 md:h-svh md:overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-5 pb-10 pt-28 sm:px-8 md:grid-cols-12 md:gap-x-6 md:min-h-0 md:pb-8 md:pt-28">
          <div className="relative z-10 md:col-span-5">
            <p
              className="fade-up flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-ink/70 sm:text-sm"
              style={delay(0)}
            >
              <span aria-hidden className="live-dot relative h-2.5 w-2.5 rounded-full bg-brand" />
              {t.eyebrow}
            </p>

            <h1
              id="hero-titlu"
              className="mt-5 font-display text-[clamp(3.1rem,min(6.6vw,10svh),6.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.01em]"
            >
              <span className="reveal-line">
                <span style={delay(120)}>{t.titleLine1}</span>
              </span>
              <span className="reveal-line">
                <span style={delay(220)}>{t.titleLine2}</span>
              </span>
              <span className="reveal-line">
                <span style={delay(320)}>
                  {t.titleLine3} <span className="text-brand">{t.titleAccent}</span>
                </span>
              </span>
            </h1>

            <p className="fade-up mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg" style={delay(480)}>
              {t.lead}
            </p>

            <div className="fade-up mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap" style={delay(580)}>
              <a href={SITE.phoneHref} className="btn-primary group px-4 text-[15px] sm:px-7 sm:text-base">
                {common.callWorkshop}
                <span
                  aria-hidden
                  className="hidden transition-transform duration-300 group-hover:translate-x-1 sm:inline"
                >
                  →
                </span>
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-4 text-[15px] sm:px-7 sm:text-base"
              >
                {common.directions}
              </a>
            </div>

            <ul className="fade-up hero-tall-only mt-8 hidden flex-wrap gap-2 sm:flex" style={delay(680)} aria-label={t.vehiclesAria}>
              {t.vehicles.map((vehicle) => (
                <li
                  key={vehicle}
                  className="rounded-full border border-ink/15 bg-white/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-ink/75"
                >
                  {vehicle}
                </li>
              ))}
            </ul>

            {/* Scroll cue, in the text column so it never sits on top of anything. */}
            <motion.div
              aria-hidden
              style={{ opacity: hintOpacity }}
              className="hero-tall-only mt-10 hidden items-center gap-4 text-[11px] font-bold uppercase tracking-[0.25em] text-ink/55 md:flex"
            >
              <span className="relative h-[2px] w-12 overflow-hidden rounded-full bg-ink/15">
                <span className="scroll-cue-x absolute inset-y-0 left-0 w-4 rounded-full bg-brand" />
              </span>
              {offerActive ? t.scrollHintOffer : t.scrollHint}
            </motion.div>
          </div>

          {/* The frame bleeds to the right edge on desktop. Its bottom edge is the road the wheel stands on. */}
          <div className="relative md:col-span-7 md:mr-[calc(max(2rem,(100vw_-_80rem)/2_+_2rem)*-1)]">
            <div
              ref={photoRef}
              className="fade-up relative aspect-[3/2] w-full md:ml-auto md:w-[min(100%,calc((100svh_-_16rem)*1.5))] overflow-hidden rounded-[1.75rem] bg-paper-2 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] md:rounded-r-none"
              style={delay(150)}
            >
              <div className="zoom-settle absolute inset-0" style={delay(150)}>
                <motion.div style={{ y: photoY }} className="absolute -inset-y-[5%] inset-x-0">
                  <Image
                    src={tiresPhoto}
                    alt={t.photoAlt}
                    fill
                    priority
                    placeholder="blur"
                    quality={80}
                    sizes="(min-width: 768px) 62vw, 100vw"
                    className="object-cover [filter:contrast(1.08)_saturate(0.92)]"
                  />
                </motion.div>
              </div>
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),rgba(0,0,0,0.28)_55%,rgba(0,0,0,0.22))]"
              />
              <p className="absolute right-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wide backdrop-blur md:right-8 md:top-6">
                {t.photoBadge}
              </p>

              {/* Revealed behind the rolling wheel. */}
              <motion.div
                style={{ clipPath: panelClip, visibility: panelVisibility }}
                className={`absolute inset-0 flex items-center ${offerActive ? "bg-brand" : "bg-ink"} text-white`}
              >
                <motion.div
                  style={{ opacity: panelContentOpacity, y: panelContentY }}
                  className="w-full px-5 py-6 sm:px-10 md:pr-[max(2.5rem,calc((100vw_-_80rem)/2_+_2.5rem))] lg:px-14"
                >
                  {offerActive ? (
                    <>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80 sm:text-sm">
                        {t.panelEyebrow}
                      </p>
                      <h2 className="mt-2 font-display text-[clamp(2.1rem,5.6vw,6rem)] font-extrabold uppercase leading-[0.86] sm:mt-4">
                        {t.panelTitle}
                      </h2>
                      <p className="mt-4 hidden max-w-md text-base leading-relaxed text-white/90 sm:block lg:text-lg">
                        {t.panelText}
                      </p>
                      <Link href={pageHref(locale, "offer")} className="btn-ink mt-4 px-5 py-3 text-sm sm:mt-7 sm:px-7 sm:py-4 sm:text-base">
                        {t.panelCta}
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70 sm:text-sm">
                        {t.endedEyebrow}
                      </p>
                      <h2 className="mt-2 font-display text-[clamp(2.1rem,5.6vw,6rem)] font-extrabold uppercase leading-[0.86] sm:mt-4">
                        {t.endedTitle} <span className="text-brand">{t.endedAccent}</span>
                      </h2>
                      <a
                        href={SITE.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary mt-4 px-5 py-3 text-sm sm:mt-7 sm:px-7 sm:py-4 sm:text-base"
                      >
                        {common.directions}
                      </a>
                    </>
                  )}
                </motion.div>
              </motion.div>

              <RoadLine className="absolute inset-x-0 bottom-0" />
            </div>
          </div>
        </div>

        {use3D && (
          <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
            <WheelScene
              progress={progress}
              anchor={photoRef}
              reveal={reveal}
              onFail={onWheelFail}
            />
          </div>
        )}


        {offerActive && (
          <Link
            href={pageHref(locale, "offer")}
            className="relative z-10 flex items-stretch overflow-hidden bg-brand text-white"
          >
            <span className="sr-only">
              {t.marqueeSr}
            </span>
            <span
              aria-hidden
              className="z-10 flex shrink-0 items-center bg-ink px-4 text-xs font-bold uppercase tracking-[0.2em] sm:px-6"
            >
              {t.marqueeTab}
            </span>
            <OfferMarquee items={t.marqueeItems} />
          </Link>
        )}
      </div>
    </section>
  );
}
