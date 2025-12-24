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
    <section className="relative bg-beige py-16 md:py-24">
      <div className="relative">
        <AnimatedWheelBar />

        <div className="max-w-5xl mx-auto px-6 lg:pr-32">
          <div className="flex items-center justify-center gap-4 mb-16 md:mb-20">
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

          <div className="space-y-20 md:space-y-28">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row items-center lg:items-start gap-10"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={180}
                    height={150}
                    className="object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
                    {service.title}
                  </h3>
                  <p className="text-base md:text-lg text-dark/80 leading-relaxed">
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
