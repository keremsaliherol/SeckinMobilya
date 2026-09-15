/**
 * "Bir dolabın anatomisi" bölümündeki parça listesi.
 *
 * ⚠ Malzeme bilgileri TASLAK — marka sahibi onaylamalı
 * (docs/TASARIM-PLANI.md §6 ve §10.5). Gerçek bilgiler gelince yalnızca
 * bu dosyayı güncellemek yeterli; 3D sahnedeki numaralar `no` ile eşleşir.
 *
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
    ad: { TR: "Kapak", EN: "Door" },
    malzeme: { TR: "18 mm lake MDF, PVC kenar bandı", EN: "18 mm lacquered MDF, PVC edge banding" },
  },
  {
    no: 2,
    asama: 0,
    ad: { TR: "Çekmece önleri", EN: "Drawer fronts" },
    malzeme: { TR: "18 mm lake MDF", EN: "18 mm lacquered MDF" },
  },
  {
    no: 3,
    asama: 0,
    ad: { TR: "Kulplar", EN: "Handles" },
    malzeme: { TR: "Metal profil kulp", EN: "Metal profile handles" },
  },
  {
    no: 4,
    asama: 0,
    ad: { TR: "Menteşeler", EN: "Hinges" },
    malzeme: { TR: "Frenli (yavaş kapanan) menteşe", EN: "Soft-close hinges" },
  },
  {
    no: 5,
    asama: 1,
    ad: { TR: "Çekmece kutusu ve rayı", EN: "Drawer boxes and runners" },
    malzeme: { TR: "Frenli, tam açılım ray", EN: "Soft-close, full-extension runners" },
  },
  {
    no: 6,
    asama: 1,
    ad: { TR: "Raf", EN: "Shelf" },
    malzeme: { TR: "18 mm suntalam", EN: "18 mm melamine board" },
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
    malzeme: { TR: "Ayarlanabilir ayak, baza", EN: "Adjustable legs, plinth" },
  },
  {
    no: 9,
    asama: 3,
    ad: { TR: "Gövde", EN: "Carcass" },
    malzeme: { TR: "18 mm suntalam veya MDF-lam", EN: "18 mm melamine board or MDF" },
  },
  {
    no: 10,
    asama: 3,
    ad: { TR: "Bağlantı parçaları", EN: "Joinery" },
    malzeme: { TR: "Minifix ve kavela", EN: "Cam fittings and dowels" },
  },
];
