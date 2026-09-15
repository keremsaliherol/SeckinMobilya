/**
 * "Bir dolabın anatomisi" bölümündeki parça listesi.
 *
 * Malzemeler marka sahibinden alındı (15.09.2026). Yalnızca 10 numara
 * (bağlantı parçaları) henüz doğrulanmadı; bkz. docs/TASARIM-PLANI.md §10.5.
 * Sitede listenin altında "malzeme ve donanım seçimi projeye göre birlikte
 * belirlenir" notu durur; liste "genelde bunları kullanıyoruz" anlamındadır.
 *
 * 3D sahnedeki numaralar `no` ile eşleşir.
 * `asama`: parçanın kaydırma sırasında ayrıldığı adım (0 → 3).
 */
export type Asama = 0 | 1 | 2 | 3;

type Metin = { TR: string; EN: string };

export interface DolapParcasi {
  no: number;
  asama: Asama;
  ad: Metin;
  malzeme: Metin;
}

export const asamaAdlari: Metin[] = [
  { TR: "Kapak ve önler", EN: "Doors and fronts" },
  { TR: "Çekmece ve raf", EN: "Drawers and shelf" },
  { TR: "Arkalık ve ayaklar", EN: "Back panel and legs" },
  { TR: "Gövde ve bağlantılar", EN: "Carcass and joinery" },
];

export const dolapParcalari: DolapParcasi[] = [
  {
    no: 1,
    asama: 0,
    ad: { TR: "Kapaklar", EN: "Doors" },
    malzeme: { TR: "18 mm akrilik MDF, 3 mm PVC kenar bandı", EN: "18 mm acrylic MDF, 3 mm PVC edge banding" },
  },
  {
    no: 2,
    asama: 0,
    ad: { TR: "Çekmece önleri", EN: "Drawer fronts" },
    malzeme: { TR: "18 mm akrilik MDF", EN: "18 mm acrylic MDF" },
  },
  {
    no: 3,
    asama: 0,
    ad: { TR: "Kulp", EN: "Handles" },
    malzeme: { TR: "Siyah metal gola kulp", EN: "Black metal gola (handleless) profile" },
  },
  {
    no: 4,
    asama: 0,
    ad: { TR: "Menteşeler", EN: "Hinges" },
    malzeme: { TR: "Samet frenli menteşe", EN: "Samet soft-close hinges" },
  },
  {
    no: 5,
    asama: 1,
    ad: { TR: "Çekmece ve rayı", EN: "Drawers and runners" },
    malzeme: { TR: "Samet tandem ray, frenli ve tam açılım", EN: "Samet tandem runners, soft-close, full extension" },
  },
  {
    no: 6,
    asama: 1,
    ad: { TR: "Raf", EN: "Shelf" },
    malzeme: { TR: "18 mm MDF", EN: "18 mm MDF" },
  },
  {
    no: 7,
    asama: 2,
    ad: { TR: "Arkalık", EN: "Back panel" },
    malzeme: { TR: "8 mm MDF", EN: "8 mm MDF" },
  },
  {
    no: 8,
    asama: 2,
    ad: { TR: "Ayak ve baza", EN: "Legs and plinth" },
    malzeme: { TR: "12 cm ayak, baza", EN: "12 cm legs, plinth" },
  },
  {
    no: 9,
    asama: 3,
    ad: { TR: "Gövde", EN: "Carcass" },
    malzeme: { TR: "18 mm MDF-lam", EN: "18 mm melamine-faced MDF" },
  },
  {
    no: 10,
    asama: 3,
    ad: { TR: "Bağlantı parçaları", EN: "Joinery" },
    malzeme: { TR: "Minifix ve kavela", EN: "Cam fittings and dowels" },
  },
];
