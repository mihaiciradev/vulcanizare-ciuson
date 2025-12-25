"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

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

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/panel");
    } catch (err: any) {
      setError("Email sau parolă incorectă. Încearcă din nou.");
      console.error("Eroare login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-dark">Admin</CardTitle>
          <CardDescription className="text-dark/70">
            Introdu credentialele pentru acces panou control
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="text-center"
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="text-center"
              />
            </div>

            {error && (
              <p className="text-center text-red-600 text-sm">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-orange hover:bg-orange/90 text-white font-semibold py-6"
              disabled={loading}
            >
              {loading ? "Se conectează..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
