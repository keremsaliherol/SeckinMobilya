import type { Asama } from "@/data/cabinetParts";

/**
 * Kaydırma ilerlemesi (0→1) ile dolabın açılıp kapanması arasındaki eşleme.
 * Hem 3D sahne hem de yazılı liste bu dosyayı kullanır; böylece ekrandaki
 * parça ile listede vurgulanan satır her zaman aynı anda değişir.
 *
 *   0.00–0.08  bekleme (dolap kapalı)
 *   0.08–0.50  dört aşamada, birbirine hafifçe binerek açılma
 *   0.50–0.72  bekleme (tüm parçalar ayrık; numaralar okunur)
 *   0.72–0.90  hepsi birlikte yeniden toplanma
 *   0.88+      "Bu dolabı sizin ölçünüze göre üretelim" çağrısı
 */
const ASAMA_ARALIKLARI: [number, number][] = [
  [0.08, 0.2],
  [0.18, 0.3],
  [0.28, 0.4],
  [0.38, 0.5],
];
const TOPLANMA: [number, number] = [0.72, 0.9];
export const CTA_ESIGI = 0.88;

const yumusak = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Bir aşamanın o anki açılma miktarı: 0 kapalı, 1 tamamen ayrık. */
export const acilmaMiktari = (asama: Asama, p: number) =>
  yumusak(...ASAMA_ARALIKLARI[asama], p) * (1 - yumusak(...TOPLANMA, p));

/**
 * Listede vurgulanacak aşama.
 * -1: açılma başlamadı · 0–3: o aşama ayrılıyor ·
 * "hepsi": tüm parçalar ayrık ya da dolap yeniden toplanıyor (bütün satırlar vurgulu).
 */
export type EtkinAsama = Asama | -1 | "hepsi";

export const etkinAsama = (p: number): EtkinAsama =>
  p < ASAMA_ARALIKLARI[0][0]
    ? -1
    : p < ASAMA_ARALIKLARI[1][0]
      ? 0
      : p < ASAMA_ARALIKLARI[2][0]
        ? 1
        : p < ASAMA_ARALIKLARI[3][0]
          ? 2
          : p < ASAMA_ARALIKLARI[3][1]
            ? 3
            : "hepsi";
