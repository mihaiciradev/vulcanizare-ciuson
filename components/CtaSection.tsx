"use client";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";

const services = ["Anvelope", "Jante", "Echilibrare", "TPMS"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function CtaSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 border-t border-orange/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Left side - Services & CTA */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light mb-4 sm:mb-6">
              Vulcanizare rapidă în Timișoara.
            </h2>
            <p className="text-lg sm:text-xl text-orange font-semibold mb-8 sm:mb-10">
              Fără programare — deservim Timișoara și Șag.
            </p>

            {/* Service tags (non-interactive labels) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-10 sm:mb-12">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="py-3 px-4 rounded-lg glass-effect font-semibold text-text-light text-sm sm:text-base text-center cursor-default select-none"
                >
                  {service}
                </motion.div>
              ))}
            </div>

            {/* Call CTA */}
            <motion.a
              href="tel:+40761627184"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-orange hover:bg-orange/90 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg shadow-orange/40 text-base sm:text-lg max-w-fit hover:shadow-orange/60"
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Sună acum</span>
            </motion.a>
          </motion.div>

          {/* Right side - Map & Info */}
          <motion.div variants={itemVariants} className="flex flex-col justify-between gap-6">
            {/* Info section */}
            <div className="glass-effect rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4 mb-6">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-orange mt-1 shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-light mb-2">
                    Locația
                  </h3>
                  <address className="not-italic text-text-muted text-sm sm:text-base">
                    DN59 km 9+700, Timișoara
                    <br />
                    Timiș, România — între Timișoara și Șag
                  </address>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-orange mt-1 shrink-0" />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-text-light mb-2">
                    Contact
                  </h3>
                  <a
                    href="tel:+40761627184"
                    className="text-orange hover:text-orange/80 font-semibold text-sm sm:text-base"
                  >
                    +40 761 627 184
                  </a>
                  <p className="text-text-muted text-xs sm:text-sm mt-1">
                    Disponibil 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Map embed — Ciuson location on DN59 between Timișoara and Șag */}
            <div className="rounded-2xl overflow-hidden h-48 sm:h-64 shadow-lg">
              <iframe
                title="Locație Vulcanizare Ciuson — DN59, Timișoara"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2603.9340434700484!2d21.171664291577247!3d45.68839732149195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47455d8d5db8aafb%3A0x95407ff170160231!2sVulcanizare%20Ciuson%20-%20ANVELOPE%20AGRICOLE%20TIR%20SI%20INDUSTRIALE!5e0!3m2!1sro!2sro!4v1778935144963"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* CTA button for prices */}
            <motion.a
              href="/preturi"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-center py-3 px-6 rounded-full border-2 border-orange text-orange hover:bg-orange/10 font-semibold transition-all"
            >
              Vezi Prețuri
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
