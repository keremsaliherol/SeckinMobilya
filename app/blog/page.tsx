import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Mutfak ve dolaplarda kullandığımız malzemeler, uygulama detayları ve projelerimizin hikâyeleri: akrilik ve membran kapak, gola kulp, frenli menteşe ve daha fazlası.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  return <BlogContent />;
}
