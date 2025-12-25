import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";

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
        <div className="fixed inset-0 top-0 pointer-events-none">
          <Image
            src="/images/bg.svg"
            alt=""
            fill
            className="object-cover object-center opacity-60"
            priority
          />
        </div>

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
