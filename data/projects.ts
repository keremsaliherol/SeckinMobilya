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
    id: 105,
    slug: "basaksehir-misstanbul",
    title: "Başakşehir Misstanbul Evleri",
    category: "ic-mimari",
    categoryLabel: "İç Mimari",
    description:
      "Konutun yaşam alanlarına yönelik iç mimari tasarım ve uygulama. Altın rengi profillerle çerçevelenmiş kumaş dokulu gardırop cepheleri, dikey lambri panelli duvar kaplamaları, gizli aydınlatmalı asma tavan ve mekâna özel üretilmiş komodinler projede yer almaktadır.",
    coverImage: "/projeler/basaksehir-misstanbul/01.jpg",
    images: galeri("basaksehir-misstanbul", 8),
    featured: true,
  },
  {
    id: 106,
    slug: "halkali-soyakkent",
    title: "Halkalı Soyakkent",
    category: "ic-mimari",
    categoryLabel: "İç Mimari",
    description:
      "Konutun tamamına yönelik iç mimari tasarım ve uygulama çalışması. Yaşam alanlarının planlanması, özel üretim dolap ve ünite çözümleri ile aydınlatma kurgusu bir arada ele alınmıştır.",
    coverImage: "/projeler/halkali-soyakkent/01.jpg",
    images: galeri("halkali-soyakkent", 6),
    featured: true,
  },
  {
    id: 107,
    slug: "bizimevler-5",
    title: "Bizimevler 5",
    category: "ic-mimari",
    categoryLabel: "İç Mimari",
    description:
      "Konut iç mimari tasarım ve uygulaması. Aynalı sürgü kapaklı beyaz gardırop, dikey lambri kaplama üzerine gizli aydınlatmalı yuvarlak ayna ve askılı makyaj ünitesi ile giriş holü bütünlüklü biçimde kurgulanmıştır.",
    coverImage: "/projeler/bizimevler-5/01.jpg",
    images: galeri("bizimevler-5", 5),
    featured: true,
  },
  {
    id: 108,
    slug: "sariyer-cobanoglu",
    title: "Sarıyer Çobanoğlu Otomotiv",
    category: "mobilya",
    categoryLabel: "Mobilya",
    description:
      "Ticari alan için özel üretim mutfak uygulaması. Ahşap dokulu ve antrasit cepheler, mermer desenli tezgâh ile sırt paneli, cam kapaklı üst modüller ve ray spot aydınlatma ile işlevsel bir çalışma alanı oluşturulmuştur.",
    coverImage: "/projeler/sariyer-cobanoglu/01.jpg",
    images: galeri("sariyer-cobanoglu", 8),
    featured: true,
  },
  {
    id: 109,
    slug: "15-temmuz-evleri",
    title: "15 Temmuz Evleri Mutfak ve Kahve Köşesi",
    category: "mobilya",
    categoryLabel: "Mobilya",
    description:
      "Konut mutfağı ve kahve köşesi için özel üretim dolap uygulaması. Açık bej tonlarında kulpsuz cepheler, ankastre fırın ve buzdolabı nişleri, cam kapaklı kiler ünitesi ile sade ve kullanışlı bir düzen kurulmuştur.",
    coverImage: "/projeler/15-temmuz-evleri/01.jpg",
    images: galeri("15-temmuz-evleri", 5),
    featured: true,
  },
  {
    id: 110,
    slug: "istinye-akdag",
    title: "İstinye Akdağ Madencilik",
    category: "mobilya",
    categoryLabel: "Mobilya",
    description:
      "Ofis yaşam alanı için özel üretim ünite çalışması. Masif görünümlü ahşap gövde, kapaklı alt dolaplar, açık raflı kitaplık bölümleri ve gizli aydınlatmalı televizyon nişi ile klasik çizgide bir duvar ünitesi üretilmiştir.",
    coverImage: "/projeler/istinye-akdag/01.jpg",
    images: galeri("istinye-akdag", 4),
    featured: true,
  },
  {
    id: 111,
    slug: "mutfak-projelerimiz",
    title: "Mutfak Projelerimiz",
    category: "mobilya",
    categoryLabel: "Mobilya",
    description:
      "Farklı konut ve mekânlarda gerçekleştirdiğimiz özel üretim mutfak uygulamalarından bir seçki. Her mutfak, mekânın ölçülerine ve kullanıcının ihtiyaçlarına göre ayrı ayrı tasarlanmış ve üretilmiştir.",
    coverImage: "/projeler/mutfak-projelerimiz/01.jpg",
    images: galeri("mutfak-projelerimiz", 7),
    featured: true,
  },
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
