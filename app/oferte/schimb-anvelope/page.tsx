import type { Metadata } from "next";
import Link from "next/link";
import { OFFER, isOfferActive } from "@/lib/offer";
import { SITE, whatsappUrl } from "@/lib/site";

export const revalidate = 3600;

const TITLE_ACTIVE = "Oferta 1+1: 20% la schimbul pentru a doua mașină | Ciuson";
const TITLE_ENDED = "Oferta s-a încheiat | Ciuson";

export function generateMetadata(): Metadata {
  const active = isOfferActive();
  return {
    title: { absolute: active ? TITLE_ACTIVE : TITLE_ENDED },
    description: active
      ? "Vii cu două mașini? Ai 20% reducere la manopera de schimb pentru a doua. Valabilă până pe 20 decembrie inclusiv."
      : "Oferta 1+1 pentru a doua mașină s-a încheiat. Vezi serviciile atelierului Ciuson, pe DN59.",
    alternates: { canonical: "/oferte/schimb-anvelope" },
    robots: active ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default function OfertaSchimbAnvelope() {
  const active = isOfferActive();

  if (!active) {
    return (
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-8">
        <h1 className="font-display text-5xl font-extrabold uppercase leading-none md:text-7xl">
          Oferta s-a încheiat
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Oferta 1+1 pentru a doua mașină nu mai este valabilă. Atelierul Ciuson rămâne deschis pentru schimb și echilibrare, reparații de anvelope, camioane și utilaje.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/#servicii" className="btn-primary">
            Vezi serviciile atelierului
          </Link>
          <a href={SITE.phoneHref} className="btn-outline">
            Sună la atelier
          </a>
        </div>
      </section>
    );
  }

  return (
    <article>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-4xl px-5 pb-16 pt-32 sm:px-8 md:pt-40">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Oferta 1+1 · {OFFER.validUntil}</p>
          <h1 className="mt-4 font-display text-[3.2rem] font-extrabold uppercase leading-[0.92] sm:text-7xl">
            Vii cu două mașini? Ai 20% reducere la manopera de schimb pentru a doua.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-20">
        <h2 className="font-display text-3xl font-bold uppercase">Condiții</h2>
        <p className="mt-4 text-lg leading-relaxed">{OFFER.conditions}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={SITE.phoneHref} className="btn-primary">
            Sună la atelier
          </a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Scrie pe WhatsApp
          </a>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Vezi traseul către atelier
          </a>
        </div>

        <div className="mt-16 border-t-4 border-ink pt-8">
          <h2 className="font-display text-3xl font-bold uppercase">Atelierul</h2>
          <p className="mt-4 text-lg">{SITE.address}</p>
          <p className="mt-2 text-lg">
            Telefon:{" "}
            <a href={SITE.phoneHref} className="font-bold underline underline-offset-4 hover:text-brand">
              {SITE.phone}
            </a>
          </p>
        </div>
      </section>
    </article>
  );
}
