import type { Metadata } from "next";

const SITE_URL = "https://ciuson.ro";

export const metadata: Metadata = {
  title:
    "Prețuri Vulcanizare Timișoara — Anvelope auto, TIR, agricole",
  description:
    "Prețuri transparente pentru servicii de vulcanizare în Timișoara și Șag. Schimbare și reparații anvelope auto, TIR, industriale și agricole. Actualizate în timp real.",
  keywords: [
    "pret vulcanizare timisoara",
    "pret schimbare anvelope timisoara",
    "tarif vulcanizare",
    "pret vulcanizare sag",
    "pret reparatii anvelope",
    "pret anvelope tir",
    "pret echilibrare roti timisoara",
  ],
  alternates: { canonical: `${SITE_URL}/preturi` },
  openGraph: {
    title: "Prețuri Vulcanizare Ciuson Timișoara",
    description:
      "Tarife actualizate pentru vulcanizare, schimbare anvelope, reparații TIR și agricole în Timișoara și Șag.",
    url: `${SITE_URL}/preturi`,
    type: "website",
    locale: "ro_RO",
  },
};

export default function PreturiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
