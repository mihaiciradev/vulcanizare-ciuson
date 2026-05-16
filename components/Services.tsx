import Image from "next/image";
import AnimatedWheelBar from "./AnimatedWheelBar";

const services = [
  {
    title: "VULCANIZARE",
    image: "/images/serviciu_vulcanizare.png",
    description:
      "De la bicicletă până la tractor, noi le facem pe toate! Serviciul nostru de vulcanizare oferă soluții profesionale pentru orice tip de vehicul. Folosim tehnologie de ultimă generație și materiale premium pentru a asigura siguranța și longevitatea anvelopelor dumneavoastră.",
  },
  {
    title: "VULCANIZARE MOBILĂ",
    image: "/images/serviciu_vulcanizare_mobila.png",
    description:
      "Serviciul nostru mobil vine la dumneavoastră oriunde în Timișoara și împrejurimi, 24/7! Fie că sunteți blocat pe marginea drumului sau preferați confortul locației proprii, echipa noastră vine echipată cu toate sculele necesare pentru a rezolva orice problemă cu anvelopele.",
  },
  {
    title: "REPARAȚII ANVELOPE LA CALD",
    image: "/images/serviciu_reparatii.png",
    description:
      "Specializați în repararea anvelopelor de orice dimensiune – de la autoturisme până la camioane și utilaje agricole! Reparăm anvelope pentru tractoare și alte utilaje grele, oferind soluții durabile și profesionale pentru a prelungi viața anvelopelor dumneavoastră.",
  },
  {
    title: "SPĂLĂTORIE AUTO",
    image: "/images/serviciu_spalatorie.png",
    description:
      "Servicii complete de spălătorie auto, incluzând curățare interior, polish, ceruire și tratamente ceramice. Folosim detergenți premium și tehnologii moderne pentru a asigura că vehiculul dumneavoastră strălucește ca nou. Oferim pachete personalizate pentru toate tipurile de vehicule.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-32">
      <div className="relative">
        <AnimatedWheelBar />

        <div className="max-w-5xl mx-auto px-6 lg:pr-32">
          {/* Section heading */}
          <div className="flex flex-col items-center mb-16 md:mb-24">
            <span className="text-orange/80 text-xs font-bold tracking-[0.35em] uppercase mb-3">
              Ce oferim
            </span>
            <div className="flex items-center gap-4">
              <h2 className="text-4xl md:text-5xl font-bold text-dark">
                Serviciile noastre
              </h2>
              <Image
                src="/images/little_mechanic.svg"
                alt=""
                width={60}
                height={60}
                className="w-14 md:w-16"
              />
            </div>
            <div className="mt-4 w-16 h-1 rounded-full bg-orange/50" />
          </div>

          <div className="space-y-6 md:space-y-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 p-8 md:p-10 rounded-2xl border border-transparent hover:border-orange/15 hover:bg-dark/[0.03] transition-all duration-300"
              >
                {/* Number + image */}
                <div className="flex-shrink-0 relative flex flex-col items-center gap-2">
                  <span className="text-5xl font-black text-dark/8 leading-none select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={170}
                    height={140}
                    className="object-contain drop-shadow-md group-hover:scale-105 group-hover:drop-shadow-xl transition-all duration-300"
                  />
                </div>

                {/* Text */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Orange accent bar (desktop only) */}
                  <div className="hidden lg:block w-8 h-0.5 bg-orange/60 mb-4 group-hover:w-14 transition-all duration-300" />
                  <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4 group-hover:text-orange/90 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-lg text-dark/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
