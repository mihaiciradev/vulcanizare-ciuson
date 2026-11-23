import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { languageAlternates, pageHref, sectionHref, toLocale } from "@/lib/i18n";
import { SITE, whatsappUrl } from "@/lib/site";

type Params = { params: { lang: string } };

export function generateMetadata({ params }: Params): Metadata {
  const locale = toLocale(params.lang);
  const t = getDictionary(locale).mobilePage;
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    alternates: { canonical: pageHref(locale, "mobile"), languages: languageAlternates("mobile") },
  };
}

export default function MobileServicePage({ params }: Params) {
  const locale = toLocale(params.lang);
  const dict = getDictionary(locale);
  const t = dict.mobilePage;

  return (
    <article>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-4xl px-5 pb-16 pt-32 sm:px-8 md:pt-40">
          <h1 className="font-display text-[3.2rem] font-extrabold uppercase leading-[0.92] sm:text-7xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85">{t.text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={SITE.phoneHref} className="btn-primary">
              {t.callCta}
            </a>
            <a
              href={whatsappUrl(dict.mobileTeaser.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-paper"
            >
              {t.whatsappCta}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <p className="text-lg leading-relaxed">
          {t.workshopNote}{" "}
          <Link href={sectionHref(locale, "locatie")} className="font-bold underline underline-offset-4 hover:text-brand">
            {t.workshopLink}
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
