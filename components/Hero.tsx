"use client";
import { motion } from "framer-motion";
import { Phone, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Background image */}
      <Image
        src="/hero_img.webp"
        alt="Vulcanizare Service Professional"
        fill
        className="absolute inset-0 object-cover object-center"
        priority
        quality={90}
      />

      {/* Dark overlay for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-transparent" />

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 24/7 availability badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2.5 glass-effect rounded-full px-4 sm:px-6 py-2 mb-8 mb-6 sm:mb-8"
        >
          <span className="w-2 h-2 bg-orange rounded-full animate-pulse shrink-0" />
          <span className="text-sm sm:text-base font-semibold tracking-wider uppercase text-text-light">
            Disponibil 24/7
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight"
        >
          <span className="text-text-light">SERVICE</span>
          <br />
          <span className="text-orange">VULCANIZARE</span>
          <br />
          <span className="text-text-light">TIMIȘOARA</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-text-muted mb-8 sm:mb-12 max-w-2xl mx-auto"
        >
          Vulcanizare profesională non-stop în Timișoara și Șag —
          anvelope auto, TIR, agricole și industriale. Intervenție mobilă pe DN59.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12 sm:mb-16"
        >
          <a
            href="tel:+40761627184"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group inline-flex items-center gap-3 bg-orange hover:bg-orange/90 text-white font-bold px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-lg shadow-orange/40 text-base sm:text-lg min-w-[200px] sm:min-w-[240px] justify-center hover:shadow-orange/60 hover:scale-105 active:scale-95"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Sună acum</span>
          </a>

          <motion.div
            className="text-text-muted text-sm sm:text-base"
            variants={itemVariants}
          >
            +40 761 627 184
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <button
            onClick={() => {
              const element = document.querySelector("#services");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group p-2 hover:scale-110 transition-transform duration-300"
            aria-label="Derulează în jos"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 text-orange/60 group-hover:text-orange" />
            </motion.div>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
