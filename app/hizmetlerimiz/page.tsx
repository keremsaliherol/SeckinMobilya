import type { Metadata } from "next";
import HizmetlerimizContent from "./HizmetlerimizContent";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description:
    "Anahtar teslim inşaat, iç mimarlık ve tasarım, özel üretim mobilya, tadilat ve renovasyon, ofis ve ticari alan tasarımı ile proje yönetimi hizmetleri.",
  alternates: { canonical: "/hizmetlerimiz" },
};

export default function HizmetlerimizPage() {
  return <HizmetlerimizContent />;
}

