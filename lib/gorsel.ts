/**
 * Duyarlı görsel öznitelikleri.
 *
 * `/projeler/**.jpg` ve `/blog/**.jpg` fotoğraflarının yanında 640, 828 ve 1200 px
 * WebP sürümleri bulunur (`scripts/gorsel-surumleri.mjs`). Tarayıcı `sizes`
 * değerine ve ekran yoğunluğuna göre uygun olanı seçer; JPEG yalnızca yedek.
 *
 * Kullanım: <img {...duyarli(proje.coverImage, "(min-width: 1024px) 30vw, 100vw")} alt="…" />
 */
const SURUMU_VAR = /^\/(projeler|blog)\/.+\.jpe?g$/i;

export function duyarli(src: string, sizes: string) {
  if (!SURUMU_VAR.test(src)) return { src };
  const kok = src.replace(/\.jpe?g$/i, "");
  return { src, srcSet: `${kok}-640.webp 640w, ${kok}-828.webp 828w, ${kok}-1200.webp 1200w`, sizes };
}
