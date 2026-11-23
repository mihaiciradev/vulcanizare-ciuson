import { SITE, whatsappUrl } from "@/lib/site";

export default function Location() {
  return (
    <section id="locatie" aria-labelledby="locatie-titlu" className="scroll-mt-20 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <h2 id="locatie-titlu" className="font-display text-5xl font-extrabold uppercase leading-none md:text-7xl">
            Ne găsești pe DN59
          </h2>
          <p className="mt-6 text-xl font-semibold">{SITE.address}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={SITE.phoneHref} className="btn-primary">
              Sună la atelier
            </a>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Deschide în Google Maps
            </a>
          </div>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-semibold underline underline-offset-4 hover:text-brand"
          >
            Scrie pe WhatsApp
          </a>
        </div>

        <div className="aspect-[4/3] overflow-hidden border-4 border-ink">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2603.9340434700484!2d21.171664291577247!3d45.68839732149195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d8d5db8aafb%3A0x95407ff170160231!2sVulcanizare%20Ciuson%20-%20ANVELOPE%20AGRICOLE%20TIR%20SI%20INDUSTRIALE!5e0!3m2!1sro!2sro!4v1778935144963"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Locația Vulcanizare Ciuson pe DN59, între Timișoara și Șag"
          />
        </div>
      </div>
    </section>
  );
}
