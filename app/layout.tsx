import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Vulcanizare Ciuson - Service Vulcanizare Timișoara",
  description:
    "Servicii profesionale de vulcanizare și întreținere anvelope, disponibile 24/7",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className={`${montserrat.variable} font-sans antialiased bg-beige`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
