"use client";
import Image from "next/image";
import Link from "next/link";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/lib/firebase";

export default function Contact() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 order-2 lg:order-1">
            <h2 className="text-4xl md:text-5xl font-bold text-dark text-center lg:text-left">
              Vulcanizare rapidă.
              <br />
              Fără programare.
            </h2>

            <div className="space-y-4 text-center lg:text-left">
              <p className="text-lg md:text-xl font-bold text-dark">
                Anvelope • Jante • Echilibrare • TPMS
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-lg font-medium">
                <Link
                  href="/preturi"
                  className="text-dark hover:text-orange underline underline-offset-4 transition-colors"
                >
                  Vezi prețurile
                </Link>

                <span className="hidden sm:block text-dark/60">|</span>

                <a
                  href="tel:+40761627184"
                  className="text-dark hover:text-orange flex items-center gap-2 transition-colors"
                  onClick={() => {
                    if (analytics) {
                      logEvent(analytics, "call_button_click", {
                        page: "preturi",
                      });
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Sună acum +40 761 627 184
                </a>
              </div>

              <a
                href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x47455d8d5db8aafb:0x95407ff170160231?sa=X&ved=1t:8290&ictx=111"
                target="_blank"
                className="text-dark hover:text-orange flex items-center gap-2 transition-colors"
              >
                Adresă: Timișoara, km9+700
              </a>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0 aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2522.169044178749!2d21.170918175772744!3d45.68921561839775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d8d5db8aafb%3A0x95407ff170160231!2sVulcanizare%20Ciuson%20-%20ANVELOPE%20AGRICOLE%20TIR%20SI%20INDUSTRIALE!5e1!3m2!1sen!2sro!4v1766582750905!5m2!1sen!2sro"
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

          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <Image
              src="/images/contact_mechanic.png"
              alt="Mecanic fericit - Vulcanizare Ciuson"
              width={320}
              height={320}
              className="object-contain drop-shadow-2xl max-w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
