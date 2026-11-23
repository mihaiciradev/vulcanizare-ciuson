"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { pageHref, type Locale } from "@/lib/i18n";

// not-found receives no params, so the language is read from the URL.
export default function NotFound() {
  const pathname = usePathname() ?? "/";
  const locale: Locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ro";
  const t = getDictionary(locale).notFound;

  return (
    <div className="flex min-h-screen items-center justify-center px-5 pt-24">
      <div className="text-center">
        <p className="font-display text-8xl font-extrabold text-brand">404</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase">{t.title}</h1>
        <Link href={pageHref(locale, "home")} className="btn-primary mt-8">
          {t.back}
        </Link>
      </div>
    </div>
  );
}
