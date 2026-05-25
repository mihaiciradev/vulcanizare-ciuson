import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://ciuson.ro";
const BUSINESS_NAME = "Vulcanizare Ciuson";
const PHONE = "+40761627184";
const GEO = { lat: 45.688397, lng: 21.171664 };
const STREET = "DN59 km 9+700";
const CITY = "Timișoara";
const REGION = "Timiș";

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default:
      "Vulcanizare Timișoara 24/7 — Ciuson | Anvelope auto, TIR, agricole, Șag",
    template: "%s | Vulcanizare Ciuson Timișoara",
  },
  description:
    "Vulcanizare profesională în Timișoara și Șag — non-stop 24/7. Schimbare și reparații anvelope auto, TIR, industriale și agricole. Vulcanizare mobilă pe DN59. Sună: +40 761 627 184.",
  keywords: [
    "vulcanizare timisoara",
    "vulcanizare",
    "vulcanizare sag",
    "vulcanizare non stop",
    "vulcanizare 24/7",
    "vulcanizare mobila timisoara",
    "schimbare anvelope timisoara",
    "reparatii anvelope timisoara",
    "anvelope tir timisoara",
    "anvelope agricole timisoara",
    "anvelope industriale timisoara",
    "vulcanizare aproape de mine",
    "vulcanizare DN59",
    "ciuson vulcanizare",
    "vulcanizare timis",
    "spalatorie auto timisoara",
  ],
  authors: [{ name: BUSINESS_NAME, url: SITE_URL }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  applicationName: BUSINESS_NAME,
  category: "Automotive",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: SITE_URL,
    languages: { "ro-RO": SITE_URL, ro: SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title:
      "Vulcanizare Timișoara 24/7 — Ciuson | Anvelope auto, TIR, agricole",
    description:
      "Vulcanizare non-stop în Timișoara și Șag. Anvelope auto, TIR, agricole și industriale. Mobilă pe DN59. Sună +40 761 627 184.",
    images: [
      {
        url: "/metadata-social.png",
        width: 1200,
        height: 630,
        alt: "Vulcanizare Ciuson Timișoara — service anvelope 24/7",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vulcanizare Ciuson Timișoara | 24/7 — Auto, TIR, Agricole",
    description:
      "Vulcanizare non-stop Timișoara, Șag. Anvelope auto/TIR/agricole. +40 761 627 184",
    images: ["/metadata-social.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  other: {
    "geo.region": "RO-TM",
    "geo.placename": "Timișoara",
    "geo.position": `${GEO.lat};${GEO.lng}`,
    ICBM: `${GEO.lat}, ${GEO.lng}`,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "TireShop", "LocalBusiness"],
  "@id": `${SITE_URL}#business`,
  name: BUSINESS_NAME,
  legalName: "Vulcanizare Ciuson — Anvelope Agricole TIR și Industriale",
  alternateName: ["Ciuson Service", "Ciuson Vulcanizare"],
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.svg`,
  image: [
    `${SITE_URL}/hero_img.webp`,
    `${SITE_URL}/metadata-social.png`,
  ],
  description:
    "Service profesional de vulcanizare în Timișoara și Șag. Schimbare și reparații anvelope auto, TIR, industriale și agricole. Vulcanizare mobilă non-stop pe DN59.",
  telephone: PHONE,
  email: "contact@ciuson.ro",
  priceRange: "$$",
  currenciesAccepted: "RON, EUR",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  address: {
    "@type": "PostalAddress",
    streetAddress: STREET,
    addressLocality: CITY,
    addressRegion: REGION,
    postalCode: "300000",
    addressCountry: "RO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: GEO.lat,
    longitude: GEO.lng,
  },
  hasMap: `https://www.google.com/maps?q=${GEO.lat},${GEO.lng}`,
  areaServed: [
    { "@type": "City", name: "Timișoara" },
    { "@type": "City", name: "Șag" },
    { "@type": "City", name: "Chișoda" },
    { "@type": "City", name: "Dumbrăvița" },
    { "@type": "City", name: "Moșnița Nouă" },
    { "@type": "City", name: "Sânmihaiu Român" },
    { "@type": "AdministrativeArea", name: "Județul Timiș" },
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: GEO.lat,
      longitude: GEO.lng,
    },
    geoRadius: 30000,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: [
    "https://www.facebook.com/vulcanizareciuson",
    "https://www.google.com/maps/place//data=!4m2!3m1!1s0x47455d8d5db8aafb:0x95407ff170160231",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicii Vulcanizare Ciuson",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vulcanizare anvelope auto",
          description:
            "Schimbare și echilibrare anvelope autoturisme în Timișoara.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Vulcanizare mobilă 24/7",
          description:
            "Intervenție mobilă non-stop pe DN59 și în zona Timișoara și Șag.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Reparații anvelope TIR și agricole",
          description:
            "Reparații la cald și la rece pentru anvelope TIR, industriale și agricole.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Spălătorie auto",
          description:
            "Spălătorie auto profesională în Timișoara.",
        },
      },
    ],
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: PHONE,
      contactType: "customer service",
      areaServed: "RO",
      availableLanguage: ["ro", "en"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: BUSINESS_NAME,
  inLanguage: "ro-RO",
  publisher: { "@id": `${SITE_URL}#business` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Faceți vulcanizare non-stop în Timișoara?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Da, suntem disponibili 24/7, inclusiv weekend-uri și sărbători. Sunați la +40 761 627 184.",
      },
    },
    {
      "@type": "Question",
      name: "Faceți vulcanizare mobilă în Șag și împrejurimi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Da, deplasăm echipa mobilă în zona Timișoara, Șag, Chișoda, Dumbrăvița și pe DN59.",
      },
    },
    {
      "@type": "Question",
      name: "Ce tipuri de anvelope reparați?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anvelope auto, TIR, camion, utilaje industriale și agricole — orice dimensiune.",
      },
    },
    {
      "@type": "Question",
      name: "Unde sunteți localizați?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pe DN59 km 9+700, între Timișoara și Șag — la 10 minute de centrul Timișoarei.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={inter.variable}>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" hrefLang="ro-RO" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="format-detection" content="telephone=yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
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

      <body className="font-sans antialiased bg-dark-bg text-text-light min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
