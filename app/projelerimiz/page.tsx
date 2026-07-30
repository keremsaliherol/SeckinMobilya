import type { Metadata } from "next";
import ProjelerimizContent from "./ProjelerimizContent";

export const metadata: Metadata = {
  title: "Projelerimiz",
  description:
    "Tamamladığımız mobilya, inşaat ve iç mimari projelerinden örnekler. Her proje müşterimize özel tasarlanmış ve titizlikle hayata geçirilmiştir.",
  alternates: { canonical: "/projelerimiz" },
};

export default function ProjelerimizPage() {
  return <ProjelerimizContent />;
}
