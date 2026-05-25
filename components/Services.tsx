"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "VULCANIZARE",
    icon: "/images/serviciu_vulcanizare.png",
    description:
      "Professional tire repair with latest technology. De la bicicletă până la tractor, noi le facem pe toate!",
  },
  {
    id: "02",
    title: "VULCANIZARE MOBILĂ",
    icon: "/images/serviciu_vulcanizare_mobila.png",
    description:
      "Mobile service 24/7 in Timișoara area. Fie că sunteți blocat pe marginea drumului, echipa noastră vine la dumneavoastră.",
  },
  {
    id: "03",
    title: "REPARAȚII ANVELOPE",
    icon: "/images/serviciu_reparatii.png",
    description:
      "Cold/hot repairs for all vehicle types. Specializați în repararea anvelopelor de orice dimensiune.",
  },
  {
    id: "04",
    title: "SPĂLĂTORIE AUTO",
    icon: "/images/serviciu_spalatorie.png",
    description:
      "Complete car washing & detailing. Servicii premium incluzând interior cleaning, wax și ceramic treatments.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Services() {
  return (
    <section id="services" className="relative py-16 sm:py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-orange text-xs sm:text-sm font-bold tracking-widest uppercase mb-3">
            CE OFERIM
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light mb-4">
            Servicii vulcanizare în Timișoara și Șag
          </h2>
          <div className="w-12 h-1 bg-orange rounded-full mx-auto" />
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group relative glass-effect rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:shadow-orange/30 cursor-pointer transition-shadow duration-300"
            >
              {/* Number badge */}
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange/10 group-hover:bg-orange/20 mb-4 sm:mb-6 transition-colors">
                <span className="text-lg sm:text-xl font-bold text-orange">
                  {service.id}
                </span>
              </div>

              {/* Icon */}
              <div className="relative h-32 sm:h-40 mb-6 sm:mb-8 flex items-center justify-center overflow-hidden rounded-xl">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={160}
                  height={160}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <h3 className="text-xl sm:text-2xl font-bold text-text-light mb-3 group-hover:text-orange transition-colors">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                {service.description}
              </p>

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
