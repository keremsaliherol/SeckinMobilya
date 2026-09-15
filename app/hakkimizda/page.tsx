import type { Metadata } from "next";
import HakkimizdaContent from "./HakkimizdaContent";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "1975'te aile şirketi olarak kurulan, Bağcılar/İstanbul merkezli mimarlık, mobilya ve inşaat firması. Hikâyemiz, değerlerimiz, misyonumuz ve vizyonumuz.",
  alternates: { canonical: "/hakkimizda/" },
};

export default function HakkimizdaPage() {
  return <HakkimizdaContent />;
}
