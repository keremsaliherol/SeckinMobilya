import type { Metadata } from "next";
import ProjelerimizContent from "./ProjelerimizContent";

export const metadata: Metadata = {
  title: "Projelerimiz",
  description:
    "İstanbul'da tamamladığımız mutfak, gardırop, TV ünitesi ve iç mimari projelerinden bir seçki. Her biri mekânın ölçüsüne göre tasarlanıp üretildi.",
  alternates: { canonical: "/projelerimiz/" },
};

export default function ProjelerimizPage() {
  return <ProjelerimizContent />;
}
