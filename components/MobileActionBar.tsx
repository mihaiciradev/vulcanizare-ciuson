import { MapPin, MessageCircle, Phone } from "lucide-react";
import { SITE, whatsappUrl } from "@/lib/site";

export default function MobileActionBar() {
  return (
    <nav
      aria-label="Contact rapid"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 gap-px bg-ink pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <a href={SITE.phoneHref} className="flex flex-col items-center gap-1 bg-brand py-3 text-sm font-bold text-white">
        <Phone className="h-5 w-5" aria-hidden />
        Sună
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 bg-ink py-3 text-sm font-bold text-paper"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        WhatsApp
      </a>
      <a
        href={SITE.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 bg-paper py-3 text-sm font-bold text-ink"
      >
        <MapPin className="h-5 w-5" aria-hidden />
        Traseu
      </a>
    </nav>
  );
}
