import type { Metadata } from "next";
import IletisimContent from "./IletisimContent";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Projeniz için ücretsiz keşif ve danışmanlık alın. Seçkin Mimarlık Mobilya İnşaat'a telefon, WhatsApp ya da teklif formuyla ulaşın; adres Bağcılar/İstanbul.",
  alternates: { canonical: "/iletisim/" },
};

export default function IletisimPage() {
  return <IletisimContent />;
}
