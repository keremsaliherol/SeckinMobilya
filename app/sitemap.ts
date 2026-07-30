import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteUrl } from "@/lib/site";

/** Statik dışa aktarmada (output: "export") dosya build sırasında üretilir. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/hakkimizda", priority: 0.8 },
    { path: "/hizmetlerimiz", priority: 0.9 },
    { path: "/projelerimiz", priority: 0.9 },
    { path: "/oncesi-sonrasi", priority: 0.7 },
    { path: "/iletisim", priority: 0.8 },
  ].map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${siteUrl}/projelerimiz/${project.slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
