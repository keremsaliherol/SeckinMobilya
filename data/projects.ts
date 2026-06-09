export type ProjectCategory = "mobilya" | "insaat" | "ic-mimari";

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  location: string;
  year: number;
  description: string;
  coverImage: string;
  images: string[];
  beforeImage?: string;
  afterImage?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "villa-yatak-odasi",
    title: "Villa Yatak Odası Takımı",
    category: "mobilya",
    categoryLabel: "Mobilya",
    location: "İstanbul, Beykoz",
    year: 2024,
    description:
      "Masif ceviz ağacından el işçiliğiyle üretilmiş villa yatak odası takımı. Gömme dolap, komodin, aydınger ve çalışma masası içermektedir.",
    coverImage:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
    ],
    beforeImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    slug: "konut-tadilati-kadikoy",
    title: "Kadıköy Konut Tadilatı",
    category: "insaat",
    categoryLabel: "İnşaat",
    location: "İstanbul, Kadıköy",
    year: 2024,
    description:
      "135m² dairenin komple yenilenmesi. Zemin kaplamaları, alçıpan tavan, elektrik ve sıhhi tesisat yenileme dahil tüm tadilat işleri tamamlanmıştır.",
    coverImage:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    ],
    beforeImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800&q=80",
    featured: true,
  },
  {
    id: 3,
    slug: "oturma-odasi-tasarimi",
    title: "Lüks Oturma Odası Tasarımı",
    category: "ic-mimari",
    categoryLabel: "İç Mimari",
    location: "Ankara, Çankaya",
    year: 2024,
    description:
      "Modern klasik tarzda oturma odası tasarımı ve uygulama. Özel üretim koltuk takımı, konsol, ayna ve tablo yerleşimleri dahildir.",
    coverImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=1200&q=80",
    ],
    featured: true,
  },
  {
    id: 4,
    slug: "mutfak-dolabi-tasarimi",
    title: "Modern Mutfak Dolabı",
    category: "mobilya",
    categoryLabel: "Mobilya",
    location: "İzmir, Karşıyaka",
    year: 2023,
    description:
      "Açık mutfak konsepti için tasarlanan mat beyaz ve meşe kombinasyonlu mutfak dolabı. Adacık tezgâh ve entegre aydınlatma sistemi dahildir.",
    coverImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    ],
    featured: true,
  },
  {
    id: 5,
    slug: "villa-insaati-sapanca",
    title: "Sapanca Villa İnşaatı",
    category: "insaat",
    categoryLabel: "İnşaat",
    location: "Sakarya, Sapanca",
    year: 2023,
    description:
      "280m² iki katlı müstakil villa inşaatı. Temel kazı, kaba inşaat, ince işler ve dış cephe kaplama dahil tüm süreçler yönetilmiştir.",
    coverImage:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=1200&q=80",
    ],
    beforeImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    featured: true,
  },
  {
    id: 6,
    slug: "ofis-ic-mimari",
    title: "Kurumsal Ofis Yenileme",
    category: "ic-mimari",
    categoryLabel: "İç Mimari",
    location: "İstanbul, Levent",
    year: 2023,
    description:
      "300m² kurumsal ofis alanının konsept tasarımı ve uygulama projesi. Açık çalışma alanları, toplantı odaları ve dinlenme köşeleri tasarlanmıştır.",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
    ],
    featured: true,
  },
  {
    id: 7,
    slug: "banyo-tasarimi",
    title: "Lüks Banyo Tasarımı",
    category: "ic-mimari",
    categoryLabel: "İç Mimari",
    location: "Bursa, Nilüfer",
    year: 2023,
    description:
      "Spa konseptli lüks banyo tasarımı. Duvar ve zemin kaplamaları, armatürler, aydınlatma ve aksesuarların seçimi dahil komple uygulama.",
    coverImage:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80",
    ],
    beforeImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    featured: false,
  },
  {
    id: 8,
    slug: "giyinme-odasi",
    title: "Giyinme Odası & Walk-in Closet",
    category: "mobilya",
    categoryLabel: "Mobilya",
    location: "İstanbul, Ataşehir",
    year: 2022,
    description:
      "Kadın giyinme odası için özel tasarım walk-in closet. Ahşap ve deri detaylı iç organizasyon, otomatik ışıklandırma sistemi.",
    coverImage:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=1200&q=80",
    ],
    beforeImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    afterImage:
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=80",
    featured: false,
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);

export const getBeforeAfterProjects = () =>
  projects.filter((p) => p.beforeImage && p.afterImage);
