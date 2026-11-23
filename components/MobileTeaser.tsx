"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { pageHref, type Locale } from "@/lib/i18n";
import { SITE, whatsappUrl } from "@/lib/site";

/** Same curve for the road and for the van that drives it. */
const ROUTE = "M44 190 C 130 190, 150 92, 236 104 S 330 74, 356 50";

function RouteMap({ workshop, you }: { workshop: string; you: string }) {
  // The van starts driving after mount, so the server HTML and the first render match.
  const [drive, setDrive] = useState(false);
  useEffect(() => setDrive(true), []);

  return (
    <svg viewBox="0 0 400 240" className="h-auto w-full" aria-hidden>
      <path d={ROUTE} fill="none" stroke="#262626" strokeWidth="22" strokeLinecap="round" />
      <path
        d={ROUTE}
        fill="none"
        stroke="#F5F3EF"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeDasharray="12 12"
        className="route-road"
      />

      {/* The workshop */}
      <g transform="translate(44 190)">
        <rect x="-15" y="-15" width="30" height="30" rx="7" fill="#F5F3EF" />
        <rect x="-6" y="-6" width="12" height="12" rx="2" fill="#000" />
      </g>
      <text x="29" y="228" textAnchor="start" className="fill-paper/70 text-[11px] font-bold uppercase tracking-[0.15em]">
        {workshop}
      </text>

      {/* You */}
      <g transform="translate(356 50)">
        <circle r="22" fill="#E80D13" opacity="0.18">
          {drive && <animate attributeName="r" values="14;26;14" dur="2.2s" repeatCount="indefinite" />}
        </circle>
        <circle r="11" fill="#E80D13" />
        <circle r="4" fill="#fff" />
      </g>
      <text x="356" y="20" textAnchor="middle" className="fill-paper text-[11px] font-bold uppercase tracking-[0.15em]">
        {you}
      </text>

      {/* The van: drives the route, waits at the pin, starts again */}
      <g transform={drive ? undefined : "translate(44 190)"}>
        {drive && (
          <animateMotion
            dur="4.5s"
            repeatCount="indefinite"
            path={ROUTE}
            keyPoints="0;1;1"
            keyTimes="0;0.7;1"
            calcMode="spline"
            keySplines="0.45 0 0.25 1; 0 0 1 1"
          />
        )}
        <circle r="9" fill="#E80D13" stroke="#000" strokeWidth="3" />
      </g>
    </svg>
  );
}

type Props = { locale: Locale; t: Dictionary["mobileTeaser"]; common: Dictionary["common"] };

export default function MobileTeaser({ locale, t, common }: Props) {
  return (
    <section aria-labelledby="mobil-titlu" className="relative overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="h-1.5 w-full bg-[repeating-linear-gradient(90deg,#E80D13_0_44px,transparent_44px_72px)]"
      />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-12 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-6"
        >
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">{t.eyebrow}</p>
          <h2
            id="mobil-titlu"
            className="mt-4 font-display text-[clamp(3rem,7vw,6.5rem)] font-extrabold uppercase leading-[0.86]"
          >
            {t.title} <span className="text-brand">{t.titleAccent}</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper/80">
            {t.text}
          </p>

          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <a
              href={whatsappUrl(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              {t.locationCta}
            </a>
            <a href={SITE.phoneHref} className="btn-outline-paper">
              <Phone className="h-5 w-5" aria-hidden />
              {common.call}
            </a>
          </div>
          <Link
            href={pageHref(locale, "mobile")}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-paper/70 underline-offset-4 hover:text-paper hover:underline"
          >
            {t.more} <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <div className="lg:col-span-6">
          <div className="rounded-[1.75rem] border border-paper/10 bg-white/[0.03] p-5 sm:p-8">
            <RouteMap workshop={t.mapWorkshop} you={t.mapYou} />
            <ol className="mt-6 grid gap-4 xl:grid-cols-3 xl:gap-5">
              {t.steps.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 xl:block"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-display text-lg font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase leading-tight xl:mt-3">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-paper/65">{step.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-paper/55">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            {t.note}
          </p>
        </div>
      </div>
    </section>
  );
}
