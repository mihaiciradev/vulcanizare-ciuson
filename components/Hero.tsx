"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/lib/firebase";

export default function Hero() {
  return (
    <section className="relative h-[85vh] md:h-[90vh] min-h-[620px] flex items-center justify-center overflow-hidden">
      {/* Background image with subtle scale for depth */}
      <Image
        src="/images/hero_img.png"
        alt="Service Vulcanizare Timișoara"
        fill
        className="object-cover object-center scale-105"
        priority
      />

      {/* Layered gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-tr from-orange/8 via-transparent to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* 24/7 availability badge */}
        <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-5 py-2 mb-8 hero-fade-1">
          <span className="w-2 h-2 bg-orange rounded-full animate-pulse shrink-0" />
          <span className="text-white/90 font-semibold text-sm tracking-widest uppercase">
            Disponibil 24/7
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight hero-fade-2">
          SERVICE{" "}
          <span className="text-orange">VULCANIZARE</span>
          <br />
          TIMIȘOARA
        </h1>

        <p className="text-base md:text-xl text-white/75 mb-10 max-w-xl mx-auto hero-fade-3">
          Servicii profesionale de vulcanizare și întreținere anvelope
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 mb-14 hero-fade-4">
          <Button
            size="lg"
            className="bg-orange hover:bg-orange/90 text-white font-semibold px-10 py-6 rounded-full shadow-2xl shadow-orange/30 flex items-center gap-3 text-lg min-w-[220px] hover:shadow-orange/50 hover:scale-105 transition-all duration-300"
            asChild
          >
            <a
              href="tel:+40761627184"
              onClick={() => {
                if (analytics) {
                  logEvent(analytics, "call_button_click", { page: "hero" });
                }
              }}
            >
              <Phone className="w-6 h-6" />
              Sună acum
            </a>
          </Button>

          <p className="text-white/70 text-base md:text-lg">
            Rezolvăm orice problemă cu anvelopele tale!
          </p>
        </div>

        <div className="flex justify-center hero-fade-5">
          <a
            href="#services"
            className="group cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Image
              src="/images/hero_section_arrow.svg"
              alt="Derulează în jos"
              width={36}
              height={36}
              className="opacity-50 group-hover:opacity-100 transition-all duration-300 animate-bounce"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
