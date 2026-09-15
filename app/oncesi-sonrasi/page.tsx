import type { Metadata } from "next";
import OncesiSonrasiContent from "./OncesiSonrasiContent";

export const metadata: Metadata = {
  title: "Öncesi / Sonrası",
  description:
    "Tadilat ve renovasyon projelerimizde gerçekleştirdiğimiz dönüşümler. Kaydırma çubuğuyla mekânların önceki ve sonraki hallerini karşılaştırın.",
  alternates: { canonical: "/oncesi-sonrasi" },
};

export default function OncesiSonrasiPage() {
  return <OncesiSonrasiContent />;
}
