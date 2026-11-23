import type { Metadata } from "next";
import Link from "next/link";
import ConversionLink from "@/components/ConversionLink";
import { CONVERSIONS } from "@/lib/ads";
import { getDictionary } from "@/lib/dictionaries";
import { languageAlternates, pageHref, sectionHref, toLocale } from "@/lib/i18n";
import { isOfferActive } from "@/lib/offer";
import { SITE, whatsappUrl } from "@/lib/site";

export const revalidate = 3600;

type Params = { params: { lang: string } };

export function generateMetadata({ params }: Params): Metadata {
  const locale = toLocale(params.lang);
  const t = getDictionary(locale).offerPage;
  const active = isOfferActive();
  return {
    title: { absolute: active ? t.titleActive : t.titleEnded },
    description: active ? t.descriptionActive : t.descriptionEnded,
    alternates: { canonical: pageHref(locale, "offer"), languages: languageAlternates("offer") },
    robots: active ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default function OfferPage({ params }: Params) {
  const locale = toLocale(params.lang);
  const dict = getDictionary(locale);
  const t = dict.offerPage;

  if (!isOfferActive()) {
    return (
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-8">
        <h1 className="font-display text-5xl font-extrabold uppercase leading-none md:text-7xl">{t.endedTitle}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{t.endedText}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={sectionHref(locale, "servicii")} className="btn-primary">
            {t.servicesCta}
          </Link>
          <a href={SITE.phoneHref} className="btn-outline">
            {dict.common.callWorkshop}
          </a>
        </div>
      </section>
    );
  }

  return (
    <article>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-4xl px-5 pb-16 pt-32 sm:px-8 md:pt-40">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
            {t.eyebrow} · {t.validUntil}
          </p>
          <h1 className="mt-4 font-display text-[3.2rem] font-extrabold uppercase leading-[0.92] sm:text-7xl">
            {t.title}
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-20">
        <h2 className="font-display text-3xl font-bold uppercase">{t.termsTitle}</h2>
        <p className="mt-4 text-lg leading-relaxed">{t.terms}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ConversionLink href={SITE.phoneHref} sendTo={CONVERSIONS.offerCall} className="btn-primary">
            {dict.common.callWorkshop}
          </ConversionLink>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline">
            {dict.common.whatsapp}
          </a>
          <ConversionLink
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            sendTo={CONVERSIONS.offerDirections}
            className="btn-outline"
          >
            {t.directions}
          </ConversionLink>
        </div>

        <div className="mt-16 border-t-4 border-ink pt-8">
          <h2 className="font-display text-3xl font-bold uppercase">{t.workshopTitle}</h2>
          <p className="mt-4 text-lg">{dict.address}</p>
          <p className="mt-2 text-lg">
            {t.phoneLabel}:{" "}
            <a href={SITE.phoneHref} className="font-bold underline underline-offset-4 hover:text-brand">
              {SITE.phone}
            </a>
          </p>
        </div>
      </section>
    </article>
  );
}
