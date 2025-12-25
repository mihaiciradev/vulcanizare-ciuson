"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { ref, onValue, set } from "firebase/database";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};
interface PriceItem {
  id: string;
  name: string;
  price: string;
}
export default function AdminPanel() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (authLoading) return;

    const pricesRef = ref(db, "prices");

    const unsubscribe = onValue(pricesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedPrices: PriceItem[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setPrices(loadedPrices);
      } else {
        setPrices([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authLoading]);
  const handleChange = (id: string, field: "name" | "price", value: string) => {
    setPrices(
      prices.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAdd = () => {
    const newItem: PriceItem = {
      id: Date.now().toString(),
      name: "Serviciu nou",
      price: "0",
    };
    setPrices([...prices, newItem]);
  };

  const handleDelete = (id: string) => {
    setPrices(prices.filter((item) => item.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const pricesObj = prices.reduce((acc, item) => {
        acc[item.id] = { name: item.name, price: item.price };
        return acc;
      }, {} as Record<string, { name: string; price: string }>);

      await set(ref(db, "prices"), pricesObj);
      alert("Prețuri salvate cu succes!");
    } catch (error) {
      console.error("Eroare salvare:", error);
      alert("Eroare la salvarea prețurilor");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <p className="text-2xl text-dark">Se încarcă panoul...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-4xl shadow-2xl bg-beige/90">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-dark">
            Panou de control
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-dark">Prețuri</h3>
              <Button
                onClick={handleAdd}
                variant="outline"
                className="flex items-center gap-2 border-orange text-orange hover:bg-orange/10"
              >
                <Plus className="w-5 h-5" />
                Adaugă serviciu
              </Button>
            </div>

            {prices.length === 0 ? (
              <p className="text-center text-dark/60 py-12">
                Nu există servicii adăugate încă. Apasă butonul de mai sus
                pentru a începe.
              </p>
            ) : (
              <div className="space-y-4">
                {prices.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white/60 rounded-lg shadow-sm"
                  >
                    <div className="flex-1">
                      <Input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleChange(item.id, "name", e.target.value)
                        }
                        className="bg-white"
                      />
                    </div>

                    <div className="w-32">
                      <Input
                        type="text"
                        value={item.price}
                        onChange={(e) =>
                          handleChange(item.id, "price", e.target.value)
                        }
                        className="text-center bg-white"
                      />
                    </div>

                    <Button
                      onClick={() => handleDelete(item.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-center flex-col md:flex-row pt-6 gap-6">
            <Button
              onClick={handleSave}
              disabled={saving || prices.length === 0}
              className="bg-orange hover:bg-orange/90 text-white font-semibold px-12 py-6 rounded-full shadow-xl text-lg"
            >
              {saving ? "Se salvează..." : "Salvează modificările"}
            </Button>
            <Button
              onClick={() => signOut(auth).then(() => router.push("/login"))}
              variant="outline"
              className="border-red-600 text-red-600 hover:bg-red-50  font-semibold px-12 py-6 rounded-full shadow-xl text-lg"
            >
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
