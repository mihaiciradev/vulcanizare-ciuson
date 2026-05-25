"use client";

import { Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { motion } from "framer-motion";
import { analytics } from "@/lib/firebase";

interface PriceItem {
  id: string;
  name: string;
  price: string;
}

export default function Preturi() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const pricesRef = ref(db, "prices");

    const unsubscribe = onValue(pricesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedPrices: PriceItem[] = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].name,
          price: data[key].price,
        }));
        loadedPrices.sort((a, b) => a.name.localeCompare(b.name));
        setPrices(loadedPrices);
      } else {
        setPrices([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange mx-auto mb-4" />
          <p className="text-lg text-text-muted">Se încarcă prețurile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-24 sm:pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-light mb-4">
            Prețuri Servicii
          </h1>
          <p className="text-text-muted text-base sm:text-lg">
            Transparent și accesibil pentru toți clienții
          </p>
        </motion.div>

        {/* Prices table */}
        {prices.length === 0 ? (
          <motion.div
            className="text-center py-16 glass-effect rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl text-text-muted">
              Momentan nu sunt disponibile prețuri. Reveniți mai târziu!
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="overflow-x-auto glass-effect rounded-2xl p-6 sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-orange/20">
                  <th className="text-left py-4 px-4 text-base sm:text-lg font-bold text-text-light">
                    Serviciu
                  </th>
                  <th className="text-right py-4 px-4 text-base sm:text-lg font-bold text-text-light">
                    Preț
                  </th>
                </tr>
              </thead>
              <tbody>
                {prices.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    className="border-b border-orange/10 hover:bg-orange/5 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <td className="py-3 sm:py-4 px-4 text-sm sm:text-base text-text-light">
                      {item.name}
                    </td>
                    <td className="py-3 sm:py-4 px-4 text-right text-base sm:text-lg font-bold text-orange">
                      {item.price}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          className="flex justify-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="tel:+40761627184"
            className="inline-flex items-center gap-3 bg-orange hover:bg-orange/90 text-white font-bold px-8 sm:px-10 py-4 rounded-full shadow-lg shadow-orange/40 hover:shadow-orange/60 text-base sm:text-lg transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
            Sună acum
          </a>
        </motion.div>
      </div>
    </div>
  );
}
