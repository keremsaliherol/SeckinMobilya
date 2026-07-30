import type { Metadata } from "next";
import HakkimizdaContent from "./HakkimizdaContent";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Seçkin Mobilya & İnşaat hakkında bilgi edinin. 1975'ten bugüne uzanan deneyimimiz, vizyonumuz ve değerlerimiz.",
  alternates: { canonical: "/hakkimizda" },
};

export default function HakkimizdaPage() {
  return <HakkimizdaContent />;
}
