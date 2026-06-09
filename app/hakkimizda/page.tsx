import type { Metadata } from "next";
import HakkimizdaContent from "./HakkimizdaContent";

export const metadata: Metadata = {
  title: "Hakkımızda | Seçkin Mobilya & İnşaat",
  description: "Seçkin Mobilya & İnşaat hakkında bilgi edinin. 10 yılı aşkın deneyimimiz, vizyonumuz ve değerlerimiz.",
};

export default function HakkimizdaPage() {
  return <HakkimizdaContent />;
}
