import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WheelSection from "@/components/WheelSection";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title:
    "Vulcanizare Timișoara 24/7 — Ciuson | Anvelope auto, TIR, agricole, Șag",
  description:
    "Vulcanizare profesională non-stop în Timișoara și Șag. Schimbare și reparații anvelope auto, TIR, industriale și agricole. Vulcanizare mobilă pe DN59. Sună: +40 761 627 184.",
  alternates: { canonical: "https://ciuson.ro" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WheelSection />
      <CtaSection />
      {/* SEO-only paragraph: location anchors for ranking on Timișoara, Șag */}
      <section aria-label="Zone deservite" className="sr-only">
        <h2>Zone deservite de Vulcanizare Ciuson</h2>
        <p>
          Service vulcanizare non-stop 24/7 în Timișoara și satele învecinate:
          Șag, Chișoda, Dumbrăvița, Moșnița Nouă, Sânmihaiu Român, pe DN59
          km 9+700. Schimbare anvelope, reparații la cald și la rece,
          echilibrare roți, vulcanizare mobilă pentru autoturisme, TIR,
          camioane, utilaje agricole și industriale.
        </p>
      </section>
    </>
  );
}
