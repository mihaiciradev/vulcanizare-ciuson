import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Barlow_Condensed, Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { getDictionary } from "@/lib/dictionaries";
import { LOCALES, isLocale, type Locale } from "@/lib/i18n";
import { isOfferActive } from "@/lib/offer";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const barlow = Barlow_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F3EF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

type Params = { params: { lang: string } };

export function generateMetadata({ params }: Params): Metadata {
  const locale: Locale = isLocale(params.lang) ? params.lang : "ro";
  const t = getDictionary(locale).meta;
  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: t.siteTitle,
      template: "%s | Ciuson",
    },
    description: t.siteDescription,
    applicationName: "Ciuson",
    authors: [{ name: "Ciuson", url: SITE.url }],
    category: "Automotive",
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      siteName: "Ciuson",
      images: [{ url: "/metadata-social.png", width: 1200, height: 630, alt: t.ogImageAlt }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: {
      google: "google4a53b1bac6f1b89c",
    },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
      apple: "/apple-touch-icon.png",
    },
    other: {
      "geo.region": "RO-TM",
      "geo.placename": "Timișoara",
      "geo.position": `${SITE.geo.lat};${SITE.geo.lng}`,
      ICBM: `${SITE.geo.lat}, ${SITE.geo.lng}`,
    },
  };
}

function structuredData(locale: Locale) {
  const t = getDictionary(locale);
  const homeUrl = locale === "ro" ? `${SITE.url}/` : `${SITE.url}/en`;

  const business = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "TireShop", "LocalBusiness"],
    "@id": `${SITE.url}/#business`,
    name: "Vulcanizare Ciuson",
    alternateName: ["Ciuson", "Ciuson Service", "Ciuson Vulcanizare"],
    url: homeUrl,
    logo: `${SITE.url}/images/logo-ciuson.png`,
    image: [`${SITE.url}/images/tires.jpg`, `${SITE.url}/metadata-social.png`],
    description: t.meta.businessDescription,
    telephone: "+40761627184",
    address: {
      "@type": "PostalAddress",
      streetAddress: "DN59 km 9+700",
      addressLocality: "Timișoara",
      addressRegion: "Timiș",
      addressCountry: "RO",
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    hasMap: SITE.mapsUrl,
    areaServed: [
      { "@type": "City", name: "Timișoara" },
      { "@type": "City", name: "Șag" },
    ],
    sameAs: ["https://www.facebook.com/vulcanizareciuson", SITE.mapsUrl],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: `${SITE.url}/`,
    name: "Ciuson",
    inLanguage: ["ro-RO", "en"],
    publisher: { "@id": `${SITE.url}/#business` },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: t.meta.inLanguage,
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return [business, website, faq];
}

export default function RootLayout({ children, params }: { children: React.ReactNode } & Params) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang;
  const t = getDictionary(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${barlow.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="format-detection" content="telephone=yes" />
        {structuredData(locale).map((data, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
        ))}
      </head>

      <body className="flex min-h-screen flex-col">
        <Navbar locale={locale} nav={t.nav} common={t.common} offerActive={isOfferActive()} />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer locale={locale} t={t} />
        <MobileActionBar t={t} />
        <Toaster />
      </body>
    </html>
  );
}
