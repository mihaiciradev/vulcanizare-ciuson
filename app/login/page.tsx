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

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("Login attempt:", { email, password });
    setTimeout(() => {
      setLoading(false);
      if (email === "admin" && password === "password") {
        alert("Login reușit! (simulare)");
      } else {
        alert("Email sau parolă incorectă");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md shadow-2xl bg-beige/80 backdrop-blur-sm border-dark/10">
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
                className="text-center bg-white/80 placeholder:text-dark/50 focus-visible:ring-orange"
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
                className="text-center bg-white/80 placeholder:text-dark/50 focus-visible:ring-orange"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange hover:bg-orange/90 text-white font-semibold py-6 rounded-full shadow-xl"
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
