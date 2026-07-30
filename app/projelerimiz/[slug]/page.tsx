import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import ProjectGallery from "./ProjectGallery";

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
    alternates: { canonical: `/projelerimiz/${project.slug}` },
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

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pb-16">
            <Link
              href="/projelerimiz"
              className="inline-flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors mb-6"
            >
              <ArrowLeft size={16} /> Tüm Projeler
            </Link>
            <span className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.25em] uppercase text-primary mb-4">
              <span className="w-10 h-px bg-primary" />
              {project.categoryLabel}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
                Proje Hakkında
              </h2>
              <p className="text-muted text-base leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-surface p-6 border border-border">
                <h3 className="font-heading font-semibold text-base text-foreground mb-4">
                  Proje Bilgileri
                </h3>
                <div className="flex flex-col gap-4">
                  {project.location && (
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-primary shrink-0" />
                      <div>
                        <div className="text-xs text-muted">Konum</div>
                        <div className="text-sm font-medium text-foreground">{project.location}</div>
                      </div>
                    </div>
                  )}
                  {project.year && (
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-primary shrink-0" />
                      <div>
                        <div className="text-xs text-muted">Yıl</div>
                        <div className="text-sm font-medium text-foreground">{project.year}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted">Kategori</div>
                      <div className="text-sm font-medium text-foreground">{project.categoryLabel}</div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/iletisim"
                className="bg-primary text-background font-semibold py-3.5 px-6 text-center hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
              >
                Benzer Proje Talebi <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProjectGallery
        images={project.images}
        title={project.title}
        heading="Proje Görselleri"
      />

      {project.beforeImage && project.afterImage && (
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
              Öncesi / Sonrası
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-medium tracking-widest uppercase text-muted mb-3">
                  Öncesi
                </div>
                <div className="overflow-hidden aspect-[4/3] border border-border">
                  <img
                    src={project.beforeImage}
                    alt="Öncesi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="text-xs font-medium tracking-widest uppercase text-primary mb-3">
                  Sonrası
                </div>
                <div className="overflow-hidden aspect-[4/3] border border-border">
                  <img
                    src={project.afterImage}
                    alt="Sonrası"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
          {prevProject ? (
            <Link
              href={`/projelerimiz/${prevProject.slug}`}
              className="flex items-center gap-3 group"
            >
              <ArrowLeft size={20} className="text-muted group-hover:text-primary transition-colors" />
              <div>
                <div className="text-xs text-muted mb-1">Önceki Proje</div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {prevProject.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextProject && (
            <Link
              href={`/projelerimiz/${nextProject.slug}`}
              className="flex items-center gap-3 text-right group"
            >
              <div>
                <div className="text-xs text-muted mb-1">Sonraki Proje</div>
                <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {nextProject.title}
                </div>
              </div>
              <ArrowRight size={20} className="text-muted group-hover:text-primary transition-colors" />
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
