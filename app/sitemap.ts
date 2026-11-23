import type { MetadataRoute } from "next";
import { LOCALES, PAGE_PATHS, type PageKey } from "@/lib/i18n";
import { SITE } from "@/lib/site";

const PAGES: { page: PageKey; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
  { page: "home", changeFrequency: "weekly", priority: 1.0 },
  { page: "mobile", changeFrequency: "monthly", priority: 0.8 },
  { page: "offer", changeFrequency: "weekly", priority: 0.7 },
];

const absolute = (path: string) => `${SITE.url}${path === "/" ? "/" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.flatMap(({ page, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: absolute(PAGE_PATHS[page][locale]),
      lastModified,
      changeFrequency,
      // English is a translation of the Romanian main site.
      priority: locale === "ro" ? priority : Math.round(priority * 0.8 * 10) / 10,
      alternates: {
        languages: {
          ro: absolute(PAGE_PATHS[page].ro),
          en: absolute(PAGE_PATHS[page].en),
        },
      },
    })),
  );
}
