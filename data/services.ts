/**
 * Hizmetler sayfasının görsel ve bağlantı verisi.
 *
 * Başlık, açıklama ve alt hizmet metinleri iki dilli olduğu için
 * contexts/pageTranslations.ts → hizmetlerimiz.services içinde; bu listedeki
 * sıra oradaki sırayla birebir eşleşir.
 *
 * Görseller gerçek proje fotoğraflarıdır (eski sürümdeki stok görseller
 * kaldırıldı); `projeSlug` hizmetin altındaki "Örnek proje" bağlantısıdır.
 */
export interface Service {
  /** Sayfa içi bağlantı kimliği: /hizmetlerimiz#ozel-uretim-mobilya */
  slug: string;
  image: string;
  projeSlug: string;
}

export const services: Service[] = [
  {
    slug: "anahtar-teslim-insaat",
    image: "/projeler/soyak-olympiakent/01.jpg",
    projeSlug: "soyak-olympiakent",
  },
  {
    slug: "ic-mimarlik-tasarim",
    image: "/projeler/halkali-soyakkent/03.jpg",
    projeSlug: "halkali-soyakkent",
  },
  {
    slug: "ozel-uretim-mobilya",
    image: "/projeler/bahcesehir-mutfak/02.jpg",
    projeSlug: "bahcesehir-mutfak",
  },
  {
    slug: "tadilat-renovasyon",
    image: "/projeler/sefakoy/02.jpg",
    projeSlug: "sefakoy",
  },
  {
    slug: "ofis-ticari-alan",
    image: "/projeler/sariyer-cobanoglu/01.jpg",
    projeSlug: "sariyer-cobanoglu",
  },
  {
    slug: "proje-yonetimi",
    image: "/projeler/halkali-soyakkent/01.jpg",
    projeSlug: "halkali-soyakkent",
  },
];
