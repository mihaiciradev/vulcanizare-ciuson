import { OFFER } from "@/lib/offer";
import { SITE } from "@/lib/site";

export default function OfferBanner() {
  return (
    <section aria-labelledby="oferta-titlu" className="bg-brand text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:items-end lg:py-20">
        <div className="lg:col-span-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em]">{OFFER.validUntil}</p>
          <h2
            id="oferta-titlu"
            className="mt-3 font-display text-4xl font-extrabold uppercase leading-[0.95] sm:text-6xl"
          >
            {OFFER.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">
            {OFFER.conditions}
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4">
          <a href={SITE.phoneHref} className="btn-ink">
            Sună la atelier
          </a>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white"
          >
            Vezi traseul către atelier
          </a>
        </div>
      </div>
    </section>
  );
}
