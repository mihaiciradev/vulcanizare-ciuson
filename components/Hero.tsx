import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[80vh] md:h-[85vh] min-h-[600px] flex items-center justify-center">
      {/* bg Image */}
      <Image
        src="/images/hero_img.png"
        alt="Service Vulcanizare Timișoara"
        fill
        className="object-cover object-center"
        priority
      />

      {/*  overlay dark */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-snug">
          SERVICE VULCANIZARE
          <br />
          TIMIȘOARA
        </h1>

        <p className="text-base md:text-lg text-white/90 mb-6">
          Servicii profesionale de vulcanizare și întreținere anvelope
        </p>

        <p className="text-xl md:text-2xl font-semibold text-orange mb-10">
          disponibile 24/7
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-12">
          <Button
            size="lg"
            className="bg-orange hover:bg-orange/90 text-white font-semibold px-10 py-6 rounded-full shadow-xl flex items-center gap-3 text-lg min-w-[220px]"
            asChild
          >
            <a href="tel:+40712345678">
              <Phone className="w-6 h-6" />
              Sună acum
            </a>
          </Button>

          <p className="text-white/90 text-base md:text-lg font-medium">
            Rezolvăm orice problemă cu anvelopele tale!
          </p>
        </div>

        <div className="flex justify-center">
          <div className="group cursor-pointer">
            <Image
              src="/images/hero_section_arrow.svg"
              alt="Derulează în jos"
              width={36}
              height={36}
              className="opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
