import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/data/projects";
import ProjeDetayContent from "./ProjeDetayContent";
import { siteUrl, siteName } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Proje Bulunamadı" };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projelerimiz/${project.slug}/` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  /**
   * Arama sonuçlarında gezinme yolu (Ana Sayfa › Projelerimiz › Proje adı)
   * gösterir; yapay zekâ asistanları da sayfanın site içindeki yerini
   * buradan anlar.
   */
  const gezinmeYolu = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${siteUrl}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projelerimiz",
        item: `${siteUrl}/projelerimiz/`,
      },
      { "@type": "ListItem", position: 3, name: project.title },
    ],
  };

  /** Projenin kendisi: hangi hizmet kapsamında, kim tarafından yapıldı. */
  const projeVerisi = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: `${siteUrl}${project.coverImage}`,
    creator: { "@type": "Organization", name: siteName, url: siteUrl },
    ...(project.year ? { dateCreated: String(project.year) } : {}),
    ...(project.location ? { locationCreated: project.location } : {}),
    genre: project.categoryLabel,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gezinmeYolu) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projeVerisi) }}
      />
      <ProjeDetayContent slug={project.slug} />
    </>
  );
}
