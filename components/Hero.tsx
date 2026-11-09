import { Phone, ChevronDown, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      <Image
        src="/hero_img.webp"
        alt="Vulcanizare Service Professional"
        fill
        className="absolute inset-0 object-cover object-center"
        sizes="100vw"
        quality={60}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
          <span className="text-text-light">SERVICE</span>
          <br />
          <span className="text-orange">VULCANIZARE</span>
          <br />
          <span className="text-text-light">TIMIȘOARA</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-text-muted mb-8 sm:mb-12 max-w-2xl mx-auto">
          Vulcanizare profesională în Timișoara și Șag.
          Anvelope auto, TIR, agricole și industriale. Intervenție mobilă pe DN59.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
          <a
            href="tel:+40761627184"
            className="inline-flex items-center gap-3 bg-cta-call hover:bg-cta-call-hover text-white font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg shadow-orange/40 text-base sm:text-lg min-w-[200px] sm:min-w-[240px] justify-center"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Sună acum</span>
          </a>

          <a
            href="https://wa.me/40761627184"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-cta-wa hover:bg-cta-wa-hover text-white font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg text-base sm:text-lg min-w-[200px] sm:min-w-[240px] justify-center"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>WhatsApp</span>
          </a>
        </div>

        <div className="text-text-muted text-sm sm:text-base">
          +40 761 627 184
        </div>

        <div className="flex justify-center">
          <a
            href="#services"
            className="group p-2"
            aria-label="Derulează în jos"
          >
            <ChevronDown className="w-8 h-8 text-orange/60 group-hover:text-orange animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
