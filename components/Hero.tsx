import Image from "next/image";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-28 sm:px-8 md:pt-36 lg:grid-cols-12 lg:items-center lg:gap-14 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
            Vulcanizare Ciuson
          </p>
          <h1 className="mt-4 font-display text-[3.4rem] font-extrabold uppercase leading-[0.92] sm:text-7xl lg:text-[6.25rem]">
            Vulcanizare în Timișoara și Șag
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/85">
            Schimbăm, echilibrăm și reparăm anvelope la atelierul Ciuson, pe DN59, între Timișoara și Șag.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={SITE.phoneHref} className="btn-primary">
              Sună la atelier
            </a>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-paper"
            >
              Vezi traseul către atelier
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[4/5]">
            <Image
              src="/hero_img.webp"
              alt="Atelierul de vulcanizare Ciuson"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="h-2 w-full bg-[repeating-linear-gradient(90deg,#E80D13_0_36px,transparent_36px_56px)]"
          />
        </div>
      </div>
    </section>
  );
}
