export type ProjectCategory = "mobilya" | "insaat" | "ic-mimari";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  /** Bilinmiyorsa boş bırakılabilir; arayüzde otomatik gizlenir. */
  location?: string;
  /** Bilinmiyorsa boş bırakılabilir; arayüzde otomatik gizlenir. */
  year?: number;
  description: string;
  coverImage: string;
  images: string[];
  beforeImage?: string;
  afterImage?: string;
  featured: boolean;
}

/** Bir klasördeki sıralı görselleri (01.jpg, 02.jpg …) yola çevirir. */
const galeri = (slug: string, adet: number) =>
  Array.from(
    { length: adet },
    (_, i) => `/projeler/${slug}/${String(i + 1).padStart(2, "0")}.jpg`
  );

export const projects: Project[] = [
  {
    id: 101,
    slug: "daca-boutique",
    title: "Daca Boutique",
    category: "ic-mimari",
    categoryLabel: "İç Mimari",
    year: 2025,
    description:
      "Daca Boutique, 2025 yılında modern ve zarif bir anlayış sunmak amacıyla tasarlanmıştır. Mekânda doğal malzemeler, özel üretim mobilyalar ve işlevsel planlama bir araya getirilerek estetik ve kullanıcı odaklı bir iç mekân oluşturulmuştur.",
    coverImage: "/projeler/daca-boutique/01.jpg",
    images: galeri("daca-boutique", 20),
    featured: true,
  },
  {
    id: 104,
    slug: "bahcesehir-mutfak",
    title: "Bahçeşehir Mutfak",
    category: "mobilya",
    categoryLabel: "Mobilya",
    description:
      "Konut mutfağına yönelik özel üretim dolap uygulaması. Parlak beyaz üst modüller ile ahşap dokulu alt dolaplar, siyah mermer desenli tezgâh ve sırt paneli, siyah çerçeveli dekoratif camlı vitrinler ve ankastre fırın kolonu bir arada kurgulanmıştır. Dolap altı aydınlatma ile çalışma alanı desteklenmiştir.",
    coverImage: "/projeler/bahcesehir-mutfak/01.jpg",
    images: galeri("bahcesehir-mutfak", 5),
    featured: true,
  },
  {
    id: 103,
    slug: "sefakoy",
    title: "Sefaköy Projesi",
    category: "mobilya",
    categoryLabel: "Mobilya",
    description:
      "Konutun tamamına yönelik özel üretim mobilya uygulaması. Mermer desenli tezgâh ve sırt panelleriyle bütünlenen mutfak dolabı, ahşap dokulu banyo dolabı ve yuvarlak ayna, salonda aydınlatmalı vitrinli TV ünitesi ve lambri duvar kaplaması projede yer almaktadır.",
    coverImage: "/projeler/sefakoy/01.jpg",
    images: galeri("sefakoy", 8),
    featured: true,
  },
  {
    id: 102,
    slug: "soyak-olympiakent",
    title: "Soyak Olympiakent",
    category: "ic-mimari",
    categoryLabel: "İç Mimari",
    description:
      "Salon ve yaşam alanına yönelik iç mimari uygulama. Altın çerçeveli bölme aynası, LED aydınlatmalı vitrin rafları, siyah mermer desenli TV arkası panel, kabartma desenli dresuar ve balıksırtı parke uygulaması ile bütünlüklü bir yaşam alanı kurgulanmıştır.",
    coverImage: "/projeler/soyak-olympiakent/01.jpg",
    images: galeri("soyak-olympiakent", 13),
    featured: true,
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

/** Öncesi/sonrası karşılaştırması olan projeler. */
export const getBeforeAfterProjects = () =>
  projects.filter((p) => p.beforeImage && p.afterImage);

/** Projelerde fiilen kullanılan kategoriler (boş filtre göstermemek için). */
export const getUsedCategories = () =>
  new Set(projects.map((p) => p.category));
