/**
 * Ana sayfadaki oda kategorisi kartları.
 *
 * Görseller gerçek proje fotoğraflarından seçildi; her kart ilgili projenin
 * detay sayfasına gider. Kart başlıkları iki dilli olduğu için çeviri
 * dosyasında (`t.home.rooms.items[id]`) tutulur.
 *
 * Yeni kart eklerken RoomCategories.tsx içindeki yerleşim sınıflarını da
 * güncelleyin: ızgara 6 karta göre kurgulandı.
 */
export type RoomId =
  | "mutfak"
  | "yatak-giyinme"
  | "tv-unitesi"
  | "kahve-kosesi"
  | "banyo"
  | "ofis-ticari";

export interface Room {
  id: RoomId;
  image: string;
  /** Kartın gittiği proje detay sayfası */
  href: string;
}

export const rooms: Room[] = [
  {
    id: "mutfak",
    image: "/projeler/mutfak-projelerimiz/01.jpg",
    href: "/projelerimiz/mutfak-projelerimiz",
  },
  {
    id: "yatak-giyinme",
    image: "/projeler/basaksehir-misstanbul/01.jpg",
    href: "/projelerimiz/basaksehir-misstanbul",
  },
  {
    id: "kahve-kosesi",
    image: "/projeler/basaksehir-misstanbul/05.jpg",
    href: "/projelerimiz/basaksehir-misstanbul",
  },
  {
    id: "tv-unitesi",
    image: "/projeler/soyak-olympiakent/03.jpg",
    href: "/projelerimiz/soyak-olympiakent",
  },
  {
    id: "banyo",
    image: "/projeler/sefakoy/08.jpg",
    href: "/projelerimiz/sefakoy",
  },
  {
    id: "ofis-ticari",
    image: "/projeler/sariyer-cobanoglu/02.jpg",
    href: "/projelerimiz/sariyer-cobanoglu",
  },
];
