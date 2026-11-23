import type { Metadata } from "next";
import Link from "next/link";
import { SITE, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Vulcanizare mobilă Timișoara | Ciuson" },
  description:
    "Vulcanizare mobilă în Timișoara și împrejurimi, cu atelierul Ciuson. Trimite-ne locația și vehiculul, iar noi confirmăm dacă putem interveni.",
  alternates: { canonical: "/vulcanizare-mobila-timisoara" },
};

const whatsappMessage =
  "Bună ziua, am nevoie de vulcanizare mobilă. Vă trimit locația și datele vehiculului.";

export default function VulcanizareMobila() {
  return (
    <article>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-4xl px-5 pb-16 pt-32 sm:px-8 md:pt-40">
          <h1 className="font-display text-[3.2rem] font-extrabold uppercase leading-[0.92] sm:text-7xl">
            Vulcanizare mobilă în Timișoara și împrejurimi
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/85">
            Cu atelierul mobil Ciuson facem la fața locului aceleași lucrări de vulcanizare ca la punctul nostru de lucru, pentru toate tipurile de vehicule. Trimite-ne locația și spune-ne ce vehicul ai și ce problemă ai. Îți confirmăm dacă putem interveni.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={SITE.phoneHref} className="btn-primary">
              Sună pentru intervenție
            </a>
            <a
              href={whatsappUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-paper"
            >
              Trimite locația pe WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
        <p className="text-lg leading-relaxed">
          Dacă ajungi la atelier, ne găsești pe DN59, între Timișoara și Șag.{" "}
          <Link href="/#locatie" className="font-bold underline underline-offset-4 hover:text-brand">
            Vezi locația atelierului
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
