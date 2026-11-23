import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { pageHref, sectionHref, type Locale } from "@/lib/i18n";
import { SITE, whatsappUrl } from "@/lib/site";

export default function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
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
            className="h-20 w-auto md:h-24"
          />
          <p className="mt-5 max-w-xs text-base leading-relaxed text-muted">{t.footer.tagline}</p>
        </div>

        <div className="text-base">
          <p className="font-bold uppercase tracking-wide">{t.footer.contact}</p>
          <a href={SITE.phoneHref} className="mt-3 block font-display text-3xl font-bold hover:text-brand">
            {SITE.phone}
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block font-semibold underline underline-offset-4 hover:text-brand"
          >
            {t.common.whatsapp}
          </a>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block font-semibold underline underline-offset-4 hover:text-brand"
          >
            {t.address}
          </a>
        </div>

        <nav aria-label={t.footer.aria} className="flex flex-col gap-3 text-base font-semibold">
          <p className="font-bold uppercase tracking-wide">{t.footer.pages}</p>
          <Link href={sectionHref(locale, "servicii")} className="hover:text-brand">
            {t.nav.services}
          </Link>
          <Link href={pageHref(locale, "mobile")} className="hover:text-brand">
            {t.nav.mobile}
          </Link>
          <Link href={pageHref(locale, "offer")} className="hover:text-brand">
            {t.nav.offer}
          </Link>
          <Link href={sectionHref(locale, "locatie")} className="hover:text-brand">
            {t.nav.location}
          </Link>
        </nav>
      </div>

      <div className="border-t border-ink/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-sm text-muted sm:px-8">
          © {year} Ciuson. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
