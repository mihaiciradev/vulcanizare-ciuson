import { MetadataRoute } from "next";

const SITE_URL = "https://ciuson.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/preturi`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
