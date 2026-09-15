/**
 * Proje ve blog fotoğraflarının küçük WebP sürümlerini üretir.
 *
 * Neden var: site statik (`images.unoptimized`), Next görsel optimizasyonu yok.
 * Mobilde 1200 px'lik JPEG'lerin inmesi Lighthouse'ta sayfa başına 500–700 KB
 * gereksiz veri demekti. Her `NN.jpg` için yanına `NN-640.webp`, `NN-828.webp` ve `NN-1200.webp`
 * yazılır; bileşenler `lib/gorsel.ts` → `duyarli()` ile `srcset` kurar, JPEG
 * yedek olarak kalır (paylaşım görseli, JSON-LD).
 *
 * Yeni fotoğraf ekledikten sonra çalıştırın (var olanları atlar):
 *   node scripts/gorsel-surumleri.mjs
 */
import { readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const KLASORLER = ["public/projeler", "public/blog"];
const GENISLIKLER = [640, 828, 1200];
const KALITE = 74;

const jpgler = (klasor) =>
  readdirSync(klasor).flatMap((ad) => {
    const yol = join(klasor, ad);
    if (statSync(yol).isDirectory()) return jpgler(yol);
    return /\.jpe?g$/i.test(ad) ? [yol] : [];
  });

let uretilen = 0;
let atlanan = 0;
for (const kaynak of KLASORLER.flatMap(jpgler)) {
  const kok = kaynak.replace(/\.jpe?g$/i, "");
  const kaynakZamani = statSync(kaynak).mtimeMs;
  for (const genislik of GENISLIKLER) {
    const hedef = `${kok}-${genislik}.webp`;
    if (existsSync(hedef) && statSync(hedef).mtimeMs >= kaynakZamani) {
      atlanan++;
      continue;
    }
    await sharp(kaynak)
      .rotate()
      .resize({ width: genislik, withoutEnlargement: true })
      .webp({ quality: KALITE, effort: 5 })
      .toFile(hedef);
    uretilen++;
  }
}
console.log(`${uretilen} sürüm üretildi, ${atlanan} güncel sürüm atlandı.`);
