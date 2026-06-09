import type { Metadata } from "next";
import HizmetlerimizContent from "./HizmetlerimizContent";

export const metadata: Metadata = {
  title: "Hizmetlerimiz | Seçkin Mobilya & İnşaat",
  description: "Mobilya imalatı, inşaat & tadilat ve iç mimari dekorasyon hizmetlerimiz hakkında detaylı bilgi alın.",
};

export default function HizmetlerimizPage() {
  return <HizmetlerimizContent />;
}

