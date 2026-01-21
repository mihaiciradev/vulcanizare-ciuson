import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-beige py-8 md:py-12 border-t border-dark/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="hidden md:flex items-center w-full max-w-2xl">
            <div className="flex-1 h-px bg-dark/20" />
            <div className="px-8">
              <Image
                src="/images/logo_footer.svg"
                alt="Vulcanizare Ciuson Logo"
                width={180}
                height={60}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex-1 h-px bg-dark/20" />
          </div>

          <div className="md:hidden">
            <Image
              src="/images/logo.svg"
              alt="Vulcanizare Ciuson Logo"
              width={160}
              height={50}
              className="object-contain"
              priority
            />
          </div>

          <p className="text-sm md:text-base text-dark/70 text-center">
            © {currentYear} Ciuson Service Vulcanizare. Toate drepturile
            rezervate.
          </p>

          <p className="text-xs md:text-sm text-dark/60">
            website powered by{" "}
            <Link
              href="https://www.webbinghub.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-dark transition-colors"
            >
              WebbingHUB
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
