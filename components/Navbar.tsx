"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/" || pathname === "";
  const bgClass = isScrolled
    ? "bg-dark-bg/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-orange/10"
    : "bg-transparent";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logo.svg"
              alt="Ciuson Service"
              width={180}
              height={120}
              className="w-[7.5rem] h-20 sm:w-[10.5rem] sm:h-28 -my-4 sm:-my-6 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12">
            {!isHome && (
              <Link
                href="/"
                className="text-text-muted hover:text-text-light font-semibold text-sm transition-colors"
              >
                Acasă
              </Link>
            )}

            <button
              onClick={() => {
                const element = document.querySelector("#services");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-text-muted hover:text-text-light font-semibold text-sm transition-colors"
            >
              Servicii
            </button>

            {pathname !== "/preturi" && (
              <Link
                href="/preturi"
                className="text-text-muted hover:text-text-light font-semibold text-sm transition-colors"
              >
                Prețuri
              </Link>
            )}

            <a
              href="tel:+40761627184"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-semibold px-4 sm:px-6 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-orange/40"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden lg:inline">+40 761 627 184</span>
              <span className="lg:hidden">Sună</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-light hover:text-orange transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-orange/10 space-y-3 bg-dark-bg/98 backdrop-blur-sm relative z-50">
            {!isHome && (
              <Link
                href="/"
                className="block px-4 py-2 text-text-muted hover:text-text-light hover:bg-orange/10 rounded-lg font-semibold text-sm transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Acasă
              </Link>
            )}

            <button
              onClick={() => {
                const element = document.querySelector("#services");
                element?.scrollIntoView({ behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-text-muted hover:text-text-light hover:bg-orange/10 rounded-lg font-semibold text-sm transition-colors"
            >
              Servicii
            </button>

            {pathname !== "/preturi" && (
              <Link
                href="/preturi"
                className="block px-4 py-2 text-text-muted hover:text-text-light hover:bg-orange/10 rounded-lg font-semibold text-sm transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Prețuri
              </Link>
            )}

            <a
              href="tel:+40761627184"
              className="block px-4 py-2 bg-orange hover:bg-orange/90 text-white font-semibold rounded-lg transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sună acum: +40 761 627 184
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

