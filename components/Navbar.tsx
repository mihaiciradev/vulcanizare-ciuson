"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";

export default function Navbar({ offerActive }: { offerActive: boolean }) {
  const [open, setOpen] = useState(false);

  const links = [
    ...(offerActive ? [{ href: "/oferte/schimb-anvelope", label: "Oferta 1+1" }] : []),
    { href: "/#servicii", label: "Servicii" },
    { href: "/vulcanizare-mobila-timisoara", label: "Vulcanizare mobilă" },
    { href: "/#locatie", label: "Locație" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 md:h-24">
        <Link href="/" className="shrink-0" aria-label="Ciuson, acasă">
          <Image
            src="/images/logo-ciuson.png"
            alt="Ciuson"
            width={720}
            height={348}
            priority
            className="h-14 w-auto md:h-[4.5rem]"
          />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-5 md:flex lg:gap-7">
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
          <a href={SITE.phoneHref} className="btn-primary whitespace-nowrap px-4 py-3 text-sm lg:px-5">
            <Phone className="h-4 w-4" aria-hidden />
            <span className="lg:hidden">Sună</span>
            <span className="hidden lg:inline">{SITE.phone}</span>
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline hidden px-5 py-3 text-sm lg:inline-flex"
          >
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="meniu-mobil"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          className="rounded-full p-2 md:hidden"
        >
          {open ? <X className="h-7 w-7" aria-hidden /> : <Menu className="h-7 w-7" aria-hidden />}
        </button>
      </div>

      {open && (
        <div id="meniu-mobil" className="border-t border-ink/10 bg-paper px-5 pb-6 pt-4 md:hidden">
          <nav aria-label="Meniu mobil" className="flex flex-col">
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
              Sună la atelier
            </a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Scrie pe WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
