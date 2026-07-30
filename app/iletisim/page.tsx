import type { Metadata } from "next";
import IletisimContent from "./IletisimContent";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Projeniz için ücretsiz keşif ve danışmanlık alın. Seçkin Mimarlık Mobilya İnşaat ile telefon veya WhatsApp üzerinden hemen iletişime geçin.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimPage() {
  return <IletisimContent />;
}
