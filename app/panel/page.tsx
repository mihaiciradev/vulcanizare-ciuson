"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Hardcoded inițial – mai târziu va veni din Firebase
const initialPrices = [
  { id: 1, name: "Schimbare roți", price: "999" },
  { id: 2, name: "Schimbare roți", price: "999" },
  { id: 3, name: "Schimbare roți", price: "999" },
  { id: 4, name: "Schimbare roți", price: "999" },
];

export default function AdminPanel() {
  const [prices, setPrices] = useState(initialPrices);
  const [loading, setLoading] = useState(false);

  const handlePriceChange = (id: number, newPrice: string) => {
    setPrices(
      prices.map((item) =>
        item.id === id ? { ...item, price: newPrice } : item
      )
    );
  };

  const handleSave = () => {
    setLoading(true);
    // AICI VEI PUNE MAI TÂRZIU CODUL CU FIREBASE
    // Exemplu viitor:
    // await updateDoc(doc(db, "prices", "list"), { items: prices });

    console.log("Prețuri salvate:", prices);
    setTimeout(() => {
      setLoading(false);
      alert("Prețuri salvate cu succes! (simulare)");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-3xl shadow-2xl bg-beige/90">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-dark">
            Panou de control
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-dark">Prețuri</h3>

            {prices.map((item) => (
              <div key={item.id} className="flex items-center gap-6">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={item.name}
                    readOnly
                    className="bg-white/60 text-dark/80 cursor-not-allowed"
                  />
                </div>

                <div className="w-32">
                  <Input
                    type="text"
                    value={item.price}
                    onChange={(e) => handlePriceChange(item.id, e.target.value)}
                    className="text-center bg-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-orange hover:bg-orange/90 text-white font-semibold px-10 py-6 rounded-full shadow-xl"
            >
              {loading ? "Se salvează..." : "Salvează"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
