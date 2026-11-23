import type { Metadata } from "next";
import Faq from "@/components/Faq";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import MobileTeaser from "@/components/MobileTeaser";
import Services from "@/components/Services";
import { isOfferActive } from "@/lib/offer";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Vulcanizare Timișoara și Șag | Ciuson" },
  description:
    "Schimb, echilibrare și reparații de anvelope pe DN59, între Timișoara și Șag. Vulcanizare mobilă la fața locului. Sună +40 761 627 184.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero offerActive={isOfferActive()} />
      <Location />
      <Services />
      <MobileTeaser />
      <Faq />
    </>
  );
}
