"use client";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/lib/firebase";

export default function Contact() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: heading + mechanic + info + CTAs */}
          <div className="space-y-8 order-2 lg:order-1">

            {/* Heading row with mechanic image */}
            <div className="flex items-end gap-6">
              <h2 className="text-4xl md:text-5xl font-bold text-dark leading-tight">
                Vulcanizare rapidă.
                <br />
                Fără programare.
              </h2>
              <Image
                src="/images/contact_mechanic.png"
                alt=""
                width={110}
                height={110}
                className="object-contain shrink-0 hidden lg:block"
              />
            </div>

            {/* Services tags */}
            <div className="flex flex-wrap gap-2">
              {["Anvelope", "Jante", "Echilibrare", "TPMS"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full bg-dark/10 text-dark text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+40761627184"
                className="inline-flex items-center justify-center gap-3 bg-orange hover:bg-orange/90 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-orange/25 hover:shadow-orange/40 hover:scale-105 transition-all duration-300 text-base"
                onClick={() => {
                  if (analytics)
                    logEvent(analytics, "call_button_click", { page: "contact" });
                }}
              >
                <Phone className="w-5 h-5" />
                +40 761 627 184
              </a>

              <Link
                href="/preturi"
                className="inline-flex items-center justify-center gap-2 border-2 border-dark/20 hover:border-orange/50 text-dark hover:text-orange font-semibold px-8 py-4 rounded-full transition-all duration-300 text-base"
              >
                Vezi prețurile
              </Link>
            </div>

            {/* Address */}
            <a
              href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47455d8d5db8aafb:0x95407ff170160231?sa=X&ved=1t:8290&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-dark/60 hover:text-orange transition-colors text-base"
            >
              <MapPin className="w-5 h-5 shrink-0" />
              Timișoara, km9+700
            </a>
          </div>

          {/* Right: map takes its own full column */}
          <div className="order-1 lg:order-2 w-full aspect-[4/3] lg:aspect-auto lg:min-h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-dark/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2603.9340434700484!2d21.171664291577247!3d45.68839732149195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d8d5db8aafb%3A0x95407ff170160231!2sVulcanizare%20Ciuson%20-%20ANVELOPE%20AGRICOLE%20TIR%20SI%20INDUSTRIALE!5e0!3m2!1sen!2sro!4v1778935144963!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locație Vulcanizare Ciuson Timișoara"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
