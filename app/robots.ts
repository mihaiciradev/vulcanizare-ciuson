import { MetadataRoute } from "next";

const SITE_URL = "https://ciuson.ro";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/panel", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/login", "/panel", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
