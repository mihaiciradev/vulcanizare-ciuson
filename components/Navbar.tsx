"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import { LOCALES, pageFromPath, pageHref, sectionHref, type Locale } from "@/lib/i18n";
import { SITE, whatsappUrl } from "@/lib/site";

/** RO | EN pill. Links to the same page in the other language (home if the page has no translation). */
function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? "/";
  const page = pageFromPath(pathname) ?? "home";

  return (
    <nav aria-label={label} className="flex items-center rounded-full border border-ink/15 p-0.5 text-xs font-bold">
      {LOCALES.map((option) => {
        const active = option === locale;
        return (
          // A plain link, so the new page loads with its own <html lang> and metadata.
          <a
            key={option}
            href={pageHref(option, page)}
            hrefLang={option}
            lang={option}
            aria-current={active ? "true" : undefined}
            aria-label={option === "ro" ? "Română" : "English"}
            className={`rounded-full px-2.5 py-1.5 uppercase tracking-wide transition-colors ${
              active ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"
            }`}
          >
            {option}
          </a>
        );
      })}
    </nav>
  );
}

type Props = {
  locale: Locale;
  nav: Dictionary["nav"];
  common: Dictionary["common"];
  offerActive: boolean;
};

export default function Navbar({ locale, nav, common, offerActive }: Props) {
  const [open, setOpen] = useState(false);

  const links = [
    ...(offerActive ? [{ href: pageHref(locale, "offer"), label: nav.offer }] : []),
    { href: sectionHref(locale, "servicii"), label: nav.services },
    { href: pageHref(locale, "mobile"), label: nav.mobile },
    { href: sectionHref(locale, "locatie"), label: nav.location },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 md:h-24">
        <Link href={pageHref(locale, "home")} className="shrink-0" aria-label={nav.homeAria}>
          <Image
            src="/images/logo-ciuson.png"
            alt="Ciuson"
            width={720}
            height={348}
            priority
            className="h-14 w-auto md:h-[4.5rem]"
          />
        </Link>

        <nav aria-label={nav.mainAria} className="hidden items-center gap-5 md:flex lg:gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-ink/80 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitch locale={locale} label={nav.languageAria} />
          <a href={SITE.phoneHref} className="btn-primary whitespace-nowrap px-4 py-3 text-sm lg:px-5">
            <Phone className="h-4 w-4" aria-hidden />
            <span className="lg:hidden">{common.call}</span>
            <span className="hidden lg:inline">{SITE.phone}</span>
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline hidden px-5 py-3 text-sm xl:inline-flex"
          >
            WhatsApp
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitch locale={locale} label={nav.languageAria} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="meniu-mobil"
            aria-label={open ? nav.closeMenu : nav.openMenu}
            className="rounded-full p-2"
          >
            {open ? <X className="h-7 w-7" aria-hidden /> : <Menu className="h-7 w-7" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div id="meniu-mobil" className="border-t border-ink/10 bg-paper px-5 pb-6 pt-4 md:hidden">
          <nav aria-label={nav.mobileAria} className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/10 py-4 font-display text-2xl font-bold uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a href={SITE.phoneHref} className="btn-primary">
              <Phone className="h-5 w-5" aria-hidden />
              {common.callWorkshop}
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline">
              {common.whatsapp}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
