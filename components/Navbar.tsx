"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/lib/firebase";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/" || pathname === "";
  const bgClass = isHome
    ? isScrolled
      ? "bg-dark/95 backdrop-blur-sm shadow-md"
      : "bg-transparent"
    : "bg-dark/95 backdrop-blur-sm shadow-md";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Vulcanizare Ciuson"
              width={160}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
          <div className="flex items-center gap-8">
            {!isHome && (
              <Link
                href="/"
                className="text-white/90 hover:text-orange font-medium text-base transition-colors"
              >
                Acasă
              </Link>
            )}

            {pathname !== "/preturi" && (
              <Link
                href="/preturi"
                className="text-white/90 hover:text-orange font-medium text-base transition-colors"
              >
                Prețuri
              </Link>
            )}

            <a
              href="tel:+40761627184"
              className="flex items-center gap-2 text-white/90 hover:text-orange font-medium text-base transition-colors"
              onClick={() => {
                if (analytics) {
                  logEvent(analytics, "call_button_click", {
                    page: "preturi",
                  });
                }
              }}
            >
              <Phone className="w-5 h-5" />
              <span className="hidden md:inline">+40 761 627 184</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
