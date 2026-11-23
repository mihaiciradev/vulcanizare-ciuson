import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { faqs } from "@/lib/faq";
import { isOfferActive } from "@/lib/offer";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Vulcanizare Ciuson",
    template: "%s | Ciuson",
  },
  description:
    "Schimbăm, echilibrăm și reparăm anvelope la atelierul Ciuson, pe DN59, între Timișoara și Șag. Vulcanizare mobilă la fața locului.",
  applicationName: "Ciuson",
  authors: [{ name: "Ciuson", url: SITE.url }],
  category: "Automotive",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Ciuson",
    images: [
      {
        url: "/metadata-social.png",
        width: 1200,
        height: 630,
        alt: "Vulcanizare Ciuson, DN59 între Timișoara și Șag",
      },
    ],
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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "TireShop", "LocalBusiness"],
  "@id": `${SITE.url}/#business`,
  name: "Vulcanizare Ciuson",
  alternateName: ["Ciuson", "Ciuson Service", "Ciuson Vulcanizare"],
  url: `${SITE.url}/`,
  logo: `${SITE.url}/images/logo-ciuson.png`,
  image: [`${SITE.url}/hero_img.webp`, `${SITE.url}/metadata-social.png`],
  description:
    "Atelier de vulcanizare pe DN59, între Timișoara și Șag. Schimb și echilibrare anvelope, reparații, servicii pentru camioane și utilaje. Vulcanizare mobilă.",
  telephone: "+40761627184",
  address: {
    "@type": "PostalAddress",
    streetAddress: "DN59 km 9+700",
    addressLocality: "Timișoara",
    addressRegion: "Timiș",
    addressCountry: "RO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  hasMap: SITE.mapsUrl,
  areaServed: [
    { "@type": "City", name: "Timișoara" },
    { "@type": "City", name: "Șag" },
  ],
  sameAs: [
    "https://www.facebook.com/vulcanizareciuson",
    SITE.mapsUrl,
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: `${SITE.url}/`,
  name: "Ciuson",
  inLanguage: "ro-RO",
  publisher: { "@id": `${SITE.url}/#business` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${inter.variable} ${barlow.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="format-detection" content="telephone=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>

      <body className="flex min-h-screen flex-col">
        <Navbar offerActive={isOfferActive()} />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileActionBar />
        <Toaster />
      </body>
    </html>
  );
}
