"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";

const WHATSAPP_MESSAGE =
  "Bună ziua, am o anvelopă deteriorată. Vă trimit o poză, să-mi spuneți dacă se poate repara la cald.";

const STEPS = [
  { title: "Evaluăm deteriorarea", text: "Îți spunem dacă anvelopa se poate repara." },
  { title: "Pregătim zona", text: "Curățăm și șlefuim marginile tăieturii." },
  { title: "Umplem cu cauciuc crud", text: "Material nou, pus exact unde lipsește." },
  { title: "Vulcanizăm la cald", text: "Căldura și presiunea leagă cauciucul de anvelopă." },
];

/**
 * Scroll breakpoints. Passing one starts the next stage, which then plays at its own pace.
 * Scrolling back above it plays the stage in reverse. The last one is "done".
 */
const TRIGGERS = [0.12, 0.34, 0.56, 0.8];
/** Where the illustration's timeline rests for each stage: evaluate, prepare, fill, cure, done. */
const STAGE_PHASE = [0.06, 0.3, 0.55, 0.86, 1];

// Tyre seen from the side, only the top arc is in view.
const CX = 300;
const CY = 760;
const R_OUT = 560;
const R_IN = 410;
const TREAD_ANGLES = Array.from({ length: 23 }, (_, i) => -33 + i * 3);

/** The cut through the tread. Also the shape of the patch that fills it. */
const CUT =
  "M287 206 L300 222 L291 240 L306 258 L294 276 L307 294 L298 318 L316 318 L326 294 L313 276 L326 258 L311 240 L320 222 L306 206 Z";

function Step({ index, stage, step }: { index: number; stage: number; step: (typeof STEPS)[number] }) {
  // The current step is fully lit; the final "done" stage keeps the last step lit.
  const current = index === Math.min(stage, STEPS.length - 1);
  const reached = index <= stage;
  return (
    <li
      aria-current={current ? "step" : undefined}
      className={`relative flex gap-5 pb-8 transition-opacity duration-500 last:pb-0 lg:pb-20 lg:last:pb-0 ${
        current ? "opacity-100" : "opacity-40"
      }`}
    >
      <span
        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold text-white transition-colors duration-500 ${
          reached ? "bg-brand" : "bg-ink"
        }`}
      >
        {index + 1}
      </span>
      <div className="pt-1">
        <h3 className="font-display text-2xl font-bold uppercase leading-tight">{step.title}</h3>
        <p className="mt-1 text-base leading-relaxed text-muted">{step.text}</p>
      </div>
    </li>
  );
}

function RepairIllustration({ progress }: { progress: MotionValue<number> }) {
  // 2. Prepare: the edge of the cut is traced.
  const traceOffset = useTransform(progress, [0.12, 0.3], [1, 0]);
  const traceOpacity = useTransform(progress, [0.1, 0.14, 0.55, 0.62], [0, 1, 1, 0]);
  // 3. Fill: raw rubber rises into the cut from the bottom.
  const fillScale = useTransform(progress, [0.3, 0.55], [0, 1]);
  // 4. Cure: the press comes down, the heat glows, grey rubber turns black.
  const pressY = useTransform(progress, [0.55, 0.66, 0.9, 1], [-260, 0, 0, -260]);
  const heat = useTransform(progress, [0.6, 0.7, 0.86, 0.96], [0, 1, 0.9, 0]);
  const patchColor = useTransform(progress, [0.66, 0.9], ["#8C8C8C", "#151515"]);
  // Done.
  const badgeOpacity = useTransform(progress, [0.92, 0.98], [0, 1]);

  return (
    <svg viewBox="0 0 600 440" className="h-auto w-full" role="img" aria-labelledby="ilustratie-titlu">
      <title id="ilustratie-titlu">
        Reparație la cald: tăietura din anvelopă este umplută cu cauciuc crud și vulcanizată sub presiune.
      </title>
      <defs>
        <radialGradient id="heat" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFB000" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#E80D13" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#E80D13" stopOpacity="0" />
        </radialGradient>
        <clipPath id="tyre-band">
          <path
            d={`M${CX - R_OUT} ${CY} A${R_OUT} ${R_OUT} 0 0 1 ${CX + R_OUT} ${CY} L${CX + R_IN} ${CY} A${R_IN} ${R_IN} 0 0 0 ${CX - R_IN} ${CY} Z`}
          />
        </clipPath>
      </defs>

      {/* Tread blocks */}
      {TREAD_ANGLES.map((angle) => (
        <rect
          key={angle}
          x={CX - 11}
          y={CY - R_OUT - 16}
          width="22"
          height="26"
          rx="4"
          fill="#151515"
          transform={`rotate(${angle} ${CX} ${CY})`}
        />
      ))}
      {/* Tyre band with a sidewall line */}
      <g clipPath="url(#tyre-band)">
        <rect x="0" y="0" width="600" height="440" fill="#151515" />
        <circle cx={CX} cy={CY} r={R_IN + 30} fill="none" stroke="#2A2A2A" strokeWidth="3" />
      </g>

      {/* The cut, open down to the cords */}
      <path d={CUT} fill="#EAE6DE" />
      <path d="M296 236 L318 236 M294 262 L320 262 M296 288 L318 288" stroke="#B9A88C" strokeWidth="2" />

      {/* Raw rubber filling the cut */}
      <motion.path
        d={CUT}
        strokeWidth="4"
        strokeLinejoin="round"
        style={{ scaleY: fillScale, fill: patchColor, stroke: patchColor, transformBox: "fill-box", transformOrigin: "50% 100%" }}
      />

      {/* Traced edge while preparing */}
      <motion.path
        d={CUT}
        fill="none"
        stroke="#E80D13"
        strokeWidth="3"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: traceOffset, opacity: traceOpacity }}
      />

      {/* Heat */}
      <motion.ellipse cx="306" cy="262" rx="120" ry="95" fill="url(#heat)" style={{ opacity: heat }} />
      <motion.g style={{ opacity: heat }} stroke="#E80D13" strokeWidth="3" fill="none" strokeLinecap="round">
        <path className="heat-wave" d="M250 120 q8 -12 0 -24 q-8 -12 0 -24" />
        <path className="heat-wave [animation-delay:0.4s]" d="M306 112 q8 -12 0 -24 q-8 -12 0 -24" />
        <path className="heat-wave [animation-delay:0.8s]" d="M362 120 q8 -12 0 -24 q-8 -12 0 -24" />
      </motion.g>

      {/* The press */}
      <motion.g style={{ y: pressY }}>
        <rect x="292" y="40" width="28" height="120" fill="#2A2A2A" />
        <rect x="226" y="150" width="160" height="44" rx="8" fill="#000" />
        <rect x="226" y="184" width="160" height="10" rx="3" fill="#E80D13" />
      </motion.g>

      {/* Done */}
      <motion.g style={{ opacity: badgeOpacity }}>
        <circle cx="470" cy="110" r="38" fill="#E80D13" />
        <path d="M452 110 L465 123 L489 98" stroke="#fff" strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

export default function HotRepair() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.2", "end end"] });
  const [stage, setStage] = useState(0);
  // The illustration's own timeline, animated towards the current stage at a readable pace.
  const phase = useMotionValue(STAGE_PHASE[0]);
  const lineScale = useTransform(phase, [STAGE_PHASE[0], 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStage(TRIGGERS.filter((trigger) => p >= trigger).length);
  });

  useEffect(() => {
    const target = STAGE_PHASE[stage];
    const distance = Math.abs(target - phase.get());
    const controls = animate(phase, target, {
      duration: Math.min(2.6, 0.9 + distance * 3),
      ease: [0.45, 0, 0.25, 1],
    });
    return () => controls.stop();
  }, [stage, phase]);

  return (
    <section ref={sectionRef} id="reparatii-la-cald" aria-labelledby="cald-titlu" className="scroll-mt-28 bg-paper-2 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Reparații la cald</p>
          <h2
            id="cald-titlu"
            className="mt-4 font-display text-[clamp(2.8rem,6vw,5.5rem)] font-extrabold uppercase leading-[0.88]"
          >
            O anvelopă tăiată nu e neapărat de aruncat
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Facem reparații de anvelope la cald. Zona deteriorată se umple cu cauciuc crud, care se vulcanizează sub
            presiune și devine una cu anvelopa. Merită mai ales la anvelopele mari, de camion, tractor sau utilaj.
          </p>

          <ol className="relative mt-10">
            <span aria-hidden className="absolute bottom-5 left-5 top-5 w-[2px] -translate-x-1/2 bg-ink/10" />
            <motion.span
              aria-hidden
              style={{ scaleY: lineScale }}
              className="absolute bottom-5 left-5 top-5 w-[2px] origin-top -translate-x-1/2 bg-brand"
            />
            {STEPS.map((step, index) => (
              <Step key={step.title} index={index} stage={stage} step={step} />
            ))}
          </ol>

          <div className="mt-10 grid gap-3 sm:flex sm:flex-wrap">
            <a href={whatsappUrl(WHATSAPP_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle className="h-5 w-5" aria-hidden />
              Trimite o poză pe WhatsApp
            </a>
            <a href={SITE.phoneHref} className="btn-outline">
              <Phone className="h-5 w-5" aria-hidden />
              Sună la atelier
            </a>
          </div>
        </div>

        <div className="sticky top-20 z-10 order-first -mx-5 bg-paper-2 px-5 pb-4 pt-3 sm:-mx-8 sm:px-8 lg:top-32 lg:order-none lg:col-span-7 lg:mx-0 lg:bg-transparent lg:p-0">
          <div
            className="overflow-hidden rounded-[1.75rem] bg-paper shadow-[0_40px_90px_-45px_rgba(0,0,0,0.45)]"
          >
            <RepairIllustration progress={phase} />
          </div>
        </div>
      </div>
    </section>
  );
}
