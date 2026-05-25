"use client";
import { motion } from "framer-motion";
import { Suspense, lazy } from "react";

const WheelCanvas = lazy(() => import("./WheelCanvas"));

const features = [
  "Reparații profesionale",
  "Tehnologie modernă",
  "Garanție de calitate",
];

export default function WheelSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light mb-4">
            Expertiză Premium în Vulcanizare
          </h2>
          <p className="text-text-muted text-sm sm:text-base max-w-2xl mx-auto">
            Dotați cu echipamente de ultimă generație și experiență de peste 10 ani
          </p>
        </motion.div>

        {/* Wheel Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left features */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-orange mt-2 shrink-0" />
                <p className="text-text-light font-semibold">{feature}</p>
              </div>
            ))}
          </motion.div>

          {/* Center wheel (3D or image placeholder) */}
          <motion.div
            className="relative w-full h-[300px] sm:h-[400px] flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Suspense fallback={<div className="text-text-muted">Încarcă model 3D...</div>}>
              <WheelCanvas />
            </Suspense>
          </motion.div>

          {/* Right features */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <p className="text-text-light font-semibold flex-1">{feature}</p>
                <div className="w-2 h-2 rounded-full bg-orange mt-2 shrink-0" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
