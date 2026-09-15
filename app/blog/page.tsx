import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Mutfak ve dolaplarda kullandığımız malzemeler, uygulama detayları ve projelerimizin hikâyeleri.",
  alternates: { canonical: "/blog/" },
};

export default function BlogPage() {
  return <BlogContent />;
}
