import type { Metadata } from "next";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import HotRepair from "@/components/HotRepair";
import Location from "@/components/Location";
import MobileTeaser from "@/components/MobileTeaser";
import Services from "@/components/Services";
import { getDictionary } from "@/lib/dictionaries";
import { languageAlternates, pageHref, toLocale } from "@/lib/i18n";
import { isOfferActive } from "@/lib/offer";

export const revalidate = 3600;

type Params = { params: { lang: string } };

export function generateMetadata({ params }: Params): Metadata {
  const locale = toLocale(params.lang);
  const t = getDictionary(locale).meta;
  return {
    title: { absolute: t.homeTitle },
    description: t.homeDescription,
    alternates: { canonical: pageHref(locale, "home"), languages: languageAlternates("home") },
    openGraph: { url: pageHref(locale, "home") },
  };
}

export default function Home({ params }: Params) {
  const locale = toLocale(params.lang);
  const t = getDictionary(locale);
  return (
    <>
      <Hero locale={locale} t={t.hero} common={t.common} offerActive={isOfferActive()} />
      <Location t={t} />
      <Services t={t.services} />
      <HotRepair t={t.hotRepair} common={t.common} />
      <MobileTeaser locale={locale} t={t.mobileTeaser} common={t.common} />
      <Faq t={t.faq} />
    </>
  );
}
