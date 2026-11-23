/**
 * Languages and URLs.
 *
 * Romanian is the default and lives at the root (/, /oferte/...). English lives under /en with
 * English slugs. Internally every page sits in app/[lang]/...; middleware.ts maps the public
 * URLs onto those internal paths.
 */

export const LOCALES = ["ro", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ro";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Route params are plain strings; the layout already 404s anything that is not a locale. */
export function toLocale(value: string): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export type PageKey = "home" | "offer" | "mobile";

/** Public URL of each page, per language. */
export const PAGE_PATHS: Record<PageKey, Record<Locale, string>> = {
  home: { ro: "/", en: "/en" },
  offer: { ro: "/oferte/schimb-anvelope", en: "/en/offer" },
  mobile: { ro: "/vulcanizare-mobila-timisoara", en: "/en/mobile-tyre-service" },
};

/** Folder of each page inside app/[lang]. */
export const INTERNAL_PATHS: Record<PageKey, string> = {
  home: "",
  offer: "/oferte/schimb-anvelope",
  mobile: "/vulcanizare-mobila-timisoara",
};

export function pageHref(locale: Locale, page: PageKey) {
  return PAGE_PATHS[page][locale];
}

/** Link to a section of the home page, e.g. sectionHref("en", "servicii") -> "/en#servicii". */
export function sectionHref(locale: Locale, id: string) {
  return locale === "ro" ? `/#${id}` : `/en#${id}`;
}

/** Which page a pathname shows, from its public or internal form. Null for anything else. */
export function pageFromPath(pathname: string): PageKey | null {
  const path = pathname.replace(/\/+$/, "") || "/";
  for (const page of Object.keys(PAGE_PATHS) as PageKey[]) {
    const candidates = [
      PAGE_PATHS[page].ro,
      PAGE_PATHS[page].en,
      `/ro${INTERNAL_PATHS[page]}`,
      `/en${INTERNAL_PATHS[page]}`,
    ];
    if (candidates.includes(path)) return page;
  }
  return null;
}

/** hreflang alternates for a page's metadata. */
export function languageAlternates(page: PageKey) {
  return {
    ro: PAGE_PATHS[page].ro,
    en: PAGE_PATHS[page].en,
    "x-default": PAGE_PATHS[page].ro,
  };
}
