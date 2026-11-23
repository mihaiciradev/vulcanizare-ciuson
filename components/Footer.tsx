import Image from "next/image";
import Link from "next/link";
import { SITE, whatsappUrl } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-paper-2">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3 md:py-20">
        <div>
          <Image
            src="/images/logo-ciuson.png"
            alt="Ciuson"
            width={720}
            height={348}
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-xs text-base leading-relaxed text-muted">
            Atelier de vulcanizare pe DN59, între Timișoara și Șag.
          </p>
        </div>

        <div className="text-base">
          <p className="font-bold uppercase tracking-wide">Contact</p>
          <a href={SITE.phoneHref} className="mt-3 block font-display text-3xl font-bold hover:text-brand">
            {SITE.phone}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block font-semibold underline underline-offset-4 hover:text-brand"
          >
            Scrie pe WhatsApp
          </a>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block font-semibold underline underline-offset-4 hover:text-brand"
          >
            {SITE.address}
          </a>
        </div>

        <nav aria-label="Subsol" className="flex flex-col gap-3 text-base font-semibold">
          <p className="font-bold uppercase tracking-wide">Pagini</p>
          <Link href="/#servicii" className="hover:text-brand">Servicii</Link>
          <Link href="/vulcanizare-mobila-timisoara" className="hover:text-brand">Vulcanizare mobilă</Link>
          <Link href="/oferte/schimb-anvelope" className="hover:text-brand">Oferta de schimb</Link>
          <Link href="/#locatie" className="hover:text-brand">Locație</Link>
        </nav>
      </div>

      <div className="border-t border-ink/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-sm text-muted sm:px-8">
          © {year} Ciuson. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
