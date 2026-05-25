import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-dark-bg border-t border-orange/10 mt-12 sm:mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Image
              src="/images/logo.svg"
              alt="Ciuson Service"
              width={160}
              height={80}
              className="w-40 h-20 sm:w-48 sm:h-24 object-contain"
            />
          </div>

          {/* Divider */}
          <div className="w-12 h-1 bg-orange rounded-full" />

          {/* Service area */}
          <p className="text-sm sm:text-base text-text-muted text-center max-w-2xl">
            Vulcanizare non-stop în <strong className="text-text-light">Timișoara</strong>{" "}
            și <strong className="text-text-light">Șag</strong> — anvelope auto,
            TIR, industriale și agricole. DN59 km 9+700.
          </p>

          {/* Copyright */}
          <p className="text-sm sm:text-base text-text-muted text-center">
            © {currentYear} Ciuson Service Vulcanizare. Toate drepturile
            rezervate.
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-text-muted">
            <a href="tel:+40761627184" className="hover:text-white hover:text-orange transition-colors">
              Sună acum
            </a>
            <span className="text-text-muted/30">•</span>
            <a href="#services" className="hover:text-white hover:text-orange transition-colors">
              Servicii
            </a>
            <span className="text-text-muted/30">•</span>
            <a href="/preturi" className="hover:text-white hover:text-orange transition-colors">
              Prețuri
            </a>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />
    </footer>
  );
}

