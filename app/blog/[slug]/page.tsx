import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogYazilari, getYaziBySlug } from "@/data/blog";
import BlogYaziContent from "./BlogYaziContent";
import { siteUrl, siteName } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

/**
 * Taslaklar da üretilir: statik dışa aktarma boş parametre listesini kabul
 * etmiyor (henüz yayında yazı yokken build hata verirdi). Yayındaki sitede
 * taslak sayfası 404 içeriği gösterir; geliştirme sunucusunda önizlenir.
 */
export async function generateStaticParams() {
  return blogYazilari.map((y) => ({ slug: y.slug }));
}

/** Taslak yalnızca geliştirme sunucusunda açılır. */
const erisilebilir = (slug: string) => {
  const yazi = getYaziBySlug(slug);
  if (!yazi) return undefined;
  if (yazi.taslak && process.env.NODE_ENV !== "development") return undefined;
  return yazi;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const yazi = erisilebilir(slug);
  if (!yazi) return { title: "Yazı Bulunamadı", robots: { index: false } };
  return {
    title: yazi.baslik,
    description: yazi.ozet,
    alternates: { canonical: `/blog/${yazi.slug}/` },
    openGraph: {
      type: "article",
      title: yazi.baslik,
      description: yazi.ozet,
      publishedTime: yazi.tarih,
      images: [{ url: yazi.kapak, alt: yazi.kapakAlt }],
    },
    ...(yazi.taslak ? { robots: { index: false, follow: false } } : {}),
  };
}

/** JSON-LD içinde `<` kaçırılır: metin içinden `</script>` ile çıkılamasın. */
const jsonLd = (veri: object) => JSON.stringify(veri).replace(/</g, "\\u003c");

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const yazi = erisilebilir(slug);
  if (!yazi) notFound();

  const adres = `${siteUrl}/blog/${yazi.slug}/`;

  /** Arama sonuçlarında gezinme yolu: Ana Sayfa › Blog › Yazı başlığı. */
  const gezinmeYolu = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog/` },
      { "@type": "ListItem", position: 3, name: yazi.baslik },
    ],
  };

  const firma = {
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: { "@type": "ImageObject", url: `${siteUrl}/icon.png` },
  };

  const yaziVerisi = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: yazi.baslik,
    description: yazi.ozet,
    image: `${siteUrl}${yazi.kapak}`,
    datePublished: yazi.tarih,
    dateModified: yazi.tarih,
    inLanguage: "tr-TR",
    mainEntityOfPage: { "@type": "WebPage", "@id": adres },
    url: adres,
    author: firma,
    publisher: firma,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(gezinmeYolu) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(yaziVerisi) }} />
      <BlogYaziContent slug={yazi.slug} />
    </>
  );
}
