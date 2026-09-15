import type { Metadata } from "next";
import HakkimizdaContent from "./HakkimizdaContent";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "1975'ten bugüne Bağcılar merkezli mimarlık, mobilya ve inşaat firması. Deneyimimiz, değerlerimiz ve çalışma anlayışımız hakkında bilgi edinin.",
  alternates: { canonical: "/hakkimizda" },
};

export default function HakkimizdaPage() {
  return <HakkimizdaContent />;
}
