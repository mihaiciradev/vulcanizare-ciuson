import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const prices = [
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
  { service: "Schimbare anvelope", price: "999 RON" },
];

export default function Preturi() {
  return (
    <div className="min-h-screen bg-beige py-12 md:py-16 px-6 mt-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-dark">Prețuri</h1>
          <Image
            src="/images/little_mechanic.svg"
            alt=""
            width={60}
            height={60}
            className="w-14 md:w-16"
          />
        </div>

        <div className="relative pb-20 md:pb-24">
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
                {prices.map((item, index) => (
                  <tr key={index} className="border-b border-dark/10">
                    <td className="py-2 px-4 text-base text-dark/90">
                      {item.service}
                    </td>
                    <td className="py-2 px-4 text-right text-base font-medium text-dark">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sticky bottom-6 z-40 mt-8">
            <div className="flex justify-center">
              <Button
                asChild
                className="bg-orange hover:bg-orange/90 text-white font-semibold px-8 py-5 rounded-full shadow-xl flex items-center gap-3 text-base"
              >
                <a href="tel:+40761627184">
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
