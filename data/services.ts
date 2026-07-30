export interface Service {
  id: number;
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  description: string;
  subServices: string[];
  image: string;
}

export const services: Service[] = [
  {
    id: 1,
    slug: "anahtar-teslim-insaat",
    icon: "HardHat",
    title: "Anahtar Teslim İnşaat Projeleri",
    shortDescription:
      "Konut, villa, ofis ve ticari alanlarda profesyonel inşaat yönetimi.",
    description:
      "Konut, villa, ofis ve ticari alanlarda proje planlama, uygulama ve teslim sürelerinin profesyonel yönetimi.",
    subServices: [
      "Konut inşaatı",
      "Villa inşaatı",
      "Ofis inşaatı",
      "Ticari alan inşaatı",
      "Kaba & ince işçilik",
      "Anahtar teslim teslimat",
    ],
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800&q=80",
  },
  {
    id: 2,
    slug: "ic-mimarlik-tasarim",
    icon: "Ruler",
    title: "İç Mimari ve Tasarım",
    shortDescription:
      "Modern, estetik ve işlevsel yaşam alanları için özel çözümler.",
    description:
      "Modern, estetik ve işlevsel yaşam alanları için özel iç mimari çözümler ve 3D proje tasarımları.",
    subServices: [
      "Konsept tasarım",
      "3D görselleştirme",
      "Renk & malzeme danışmanlığı",
      "Aydınlatma tasarımı",
      "Mekân planlama",
      "Dekorasyon uygulama",
    ],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    id: 3,
    slug: "ozel-uretim-mobilya",
    icon: "Armchair",
    title: "Özel Üretim Mobilya",
    shortDescription:
      "Mekâna özel ölçüler ve tasarımlarla kaliteli mobilya üretimi.",
    description:
      "Mekâna özel ölçüler ve tasarımlarla mutfak dolabı, TV ünitesi, yatak odası, vestiyer ve dekoratif mobilya üretimi.",
    subServices: [
      "Mutfak dolabı",
      "TV ünitesi",
      "Yatak odası mobilyaları",
      "Vestiyer & giyinme odası",
      "Dekoratif mobilyalar",
      "Özel ölçüler üretim",
    ],
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  },
  {
    id: 4,
    slug: "tadilat-renovasyon",
    icon: "HardHat",
    title: "Tadilat ve Renovasyon",
    shortDescription:
      "Ev, ofis ve ticari alanların yenilenmesi ve modernize edilmesi.",
    description:
      "Ev, ofis, mağaza ve ticari alanların yenilenmesi, modernize edilmesi ve kullanım konforunun artırılması.",
    subServices: [
      "Komple daire tadilatı",
      "Ofis yenileme",
      "Mağaza tadilatı",
      "Banyo & mutfak renovasyon",
      "Zemin & duvar kaplamaları",
      "Elektrik & tesisat",
    ],
    image:
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80",
  },
  {
    id: 5,
    slug: "ofis-ticari-alan",
    icon: "Ruler",
    title: "Ofis ve Ticari Alan Tasarımı",
    shortDescription:
      "Kurumsal kimliğe uygun modern çalışma alanları ve ticari mekân çözümleri.",
    description:
      "Kurumsal kimliğe uygun modern çalışma alanları ve fonksiyonel ticari mekân çözümleri.",
    subServices: [
      "Ofis tasarımı",
      "Mağaza tasarımı",
      "Showroom düzenleme",
      "Kurumsal kimlik uyumu",
      "Açık ofis planlama",
      "Toplantı odası tasarımı",
    ],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  },
  {
    id: 6,
    slug: "proje-yonetimi",
    icon: "Ruler",
    title: "Uygulama ve Proje Yönetimi",
    shortDescription:
      "Tüm süreçlerin profesyonel ekipler tarafından yönetilmesi.",
    description:
      "Tüm süreçlerin profesyonel ekipler tarafından planlanması, uygulanması ve kontrol edilmesi.",
    subServices: [
      "Proje planlama",
      "Süreç yönetimi",
      "Kalite kontrol",
      "Zaman çizelgesi",
      "Bütçe yönetimi",
      "Saha koordinasyonu",
    ],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
  },
];
