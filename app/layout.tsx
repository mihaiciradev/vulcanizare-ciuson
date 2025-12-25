import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vulcanizare Ciuson Timișoara | 24/7 | Service Anvelope & Roți",
    template: "%s | Vulcanizare Ciuson Timișoara",
  },
  description:
    "Service vulcanizare profesional în Timișoara - schimbare anvelope, reparații la cald, vulcanizare mobilă, spălătorie auto. Disponibil 24/7. Sună acum!",
  keywords:
    "vulcanizare timisoara, schimbare anvelope, vulcanizare mobila, reparatii anvelope, spalatorie auto timisoara, 24/7",
  creator: "WebbingHUB",
  publisher: "Vulcanizare Ciuson",
  metadataBase: new URL("https://ciuson.ro"),
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://ciuson.ro",
    siteName: "Vulcanizare Ciuson",
    title: "Vulcanizare Ciuson Timișoara | Service Anvelope 24/7",
    description:
      "Schimbare anvelope, vulcanizare mobilă, reparații la cald, spălătorie auto. Disponibil non-stop în Timișoara.",
    images: [
      {
        url: "/images/social-og.png",
        width: 1200,
        height: 630,
        alt: "Vulcanizare Ciuson Timișoara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vulcanizare Ciuson Timișoara | 24/7",
    description: "Service complet anvelope & roți - disponibil non-stop",
    images: ["/images/social-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://vulcanizare-ciuson.ro",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="robots" content="index, follow" />
      </head>

      <body
        className={`${montserrat.variable} font-sans antialiased bg-beige min-h-screen relative`}
      >
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <Image
            src="/images/bg.svg"
            alt=""
            fill
            className="object-cover object-center opacity-50"
            priority
          />
        </div>

        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
