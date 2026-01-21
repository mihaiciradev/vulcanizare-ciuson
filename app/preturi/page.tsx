"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { logEvent } from "firebase/analytics";
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
        // Sortăm alfabetic după nume (opțional, dar frumos)
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
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <p className="text-2xl text-dark">Se încarcă prețurile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige py-12 md:py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-12 mt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">
            Prețuri spălătorie
          </h1>
          <Image
            src="/images/little_mechanic.svg"
            alt=""
            width={60}
            height={60}
            className="w-14 md:w-16"
          />
        </div>

        <div className="relative pb-20 md:pb-24">
          {prices.length === 0 ? (
            <p className="text-center text-xl text-dark/70 py-12">
              Momentan nu sunt disponibile prețuri. Reveniți mai târziu!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full max-w-3xl mx-auto border-collapse">
                <thead>
                  <tr className="border-b border-dark/20">
                    <th className="text-left py-3 px-4 text-lg font-semibold text-dark">
                      Serviciu
                    </th>
                    <th className="text-right py-3 px-4 text-lg font-semibold text-dark">
                      Preț
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((item) => (
                    <tr key={item.id} className="border-b border-dark/10">
                      <td className="py-2 px-4 text-base text-dark/90">
                        {item.name}
                      </td>
                      <td className="py-2 px-4 text-right text-base font-medium text-dark">
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="sticky bottom-6 z-40 mt-8">
            <div className="flex justify-center">
              <Button
                asChild
                className="bg-orange hover:bg-orange/90 text-white font-semibold px-8 py-5 rounded-full shadow-xl flex items-center gap-3 text-base"
              >
                <a
                  href="tel:+40761627184"
                  onClick={() => {
                    if (analytics) {
                      logEvent(analytics, "call_button_click", {
                        page: "preturi",
                      });
                    }
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Sună acum
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
