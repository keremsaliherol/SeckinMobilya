import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import { LanguageProvider } from "@/contexts/LanguageContext";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Seçkin Mimarlık Mobilya İnşaat | 1975'ten Bugüne Güven, Kalite ve Tecrübe",
  description:
    "1975'ten bugüne mimarlık, mobilya ve inşaat alanlarında anahtar teslim profesyonel çözümler. İç mimarlık, özel üretim mobilya, tadilat ve proje yönetimi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-background text-foreground">
        <LanguageProvider>
        <SmoothScrollProvider>
          <Preloader />
          <CustomCursor />
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
