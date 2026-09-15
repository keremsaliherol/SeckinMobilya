# Seçkin Mimarlık Mobilya İnşaat — Kurumsal Web Sitesi

https://seckinmimarliktr.com · Next.js 16 ile geliştirilmiş, tamamen statik kurumsal tanıtım sitesi.
TR/EN iki dilli; iletişim formu sunucuya değil WhatsApp'a yönlendirir.

## Geliştirme

```bash
npm install
npm run dev        # http://localhost:3000
npx tsc --noEmit   # tip denetimi
npm run lint       # ESLint
npm run build      # statik çıktı → out/
```

- **Dev sunucusu açıkken `npm run build` çalıştırmayın.** Build `out/` klasörünü yeniden yazar,
  Turbopack'in bellek kullanımı ~8 GB'a çıkıp sunucu çöker. Önce sunucuyu durdurun.
- `app/globals.css` değişikliği dev sunucusunda görünmüyorsa (OneDrive klasöründe dosya izleyici
  kaçırabiliyor): sunucuyu durdurun, `.next/dev` klasörünü silin, yeniden başlatın.

## Yayına alma

GitHub'daki `main` dalına gönderilen her değişiklik Cloudflare Workers Builds tarafından
otomatik derlenip https://seckinmimarliktr.com'a yayınlanır (birkaç dakika sürer).

| Ayar | Değer |
|---|---|
| Yapılandırma | `wrangler.jsonc` (proje adı `seckinmobilya`, varlık klasörü `out`, 404 sayfası) |
| Build komutu | `npm run build` |
| Ortam değişkeni | `NEXT_PUBLIC_SITE_URL = https://seckinmimarliktr.com` |
| Eski adres yönlendirmeleri | `public/_redirects` |
| Video Worker'ı | `worker/index.js` — yalnızca `/video/*`; Range isteklerine 206 döner (iPhone Safari bunsuz MP4 oynatmıyor) |

`NEXT_PUBLIC_SITE_URL`; `sitemap.xml`, `robots.txt`, canonical adresler ve paylaşım
önizlemelerinde kullanılır. Ayarlanmazsa `lib/site.ts` içindeki varsayılan geçerli olur.

## İçerik güncelleme

| Ne değişecek | Dosya |
|---|---|
| Telefon, WhatsApp, Instagram, adres, harita | `lib/site.ts` (tek kaynak; koda elle yazmayın) |
| Projeler (başlık, açıklama, kategori, görseller) | `data/projects.ts` |
| Blog yazıları | `data/blog.ts` |
| Hizmet görselleri ve örnek projeleri | `data/services.ts` (metinler `contexts/pageTranslations.ts`) |
| Ana sayfadaki oda kartları | `data/rooms.ts` |
| 3D dolabın parça ve malzeme listesi | `data/cabinetParts.ts` |
| Sayfa metinleri (TR/EN) | `contexts/pageTranslations.ts`, `contexts/LanguageContext.tsx` |
| SEO başlık/açıklama, işletme bilgisi (JSON-LD) | `app/layout.tsx`, her sayfanın `page.tsx` dosyası |
| Renkler ve tema | `app/globals.css` (`:root` bloğu) |

Metin eklerken iki dili de güncelleyin. Doğrulanmamış bilgi (fiyat, süre, garanti, müşteri
yorumu) yazmayın.

### Yeni proje ekleme

1. Fotoğrafları `public/projeler/<proje-adi>/` klasörüne `01.jpg`, `02.jpg`… sırasıyla koyun.
   Klasör adı **Türkçe karakter ve boşluk içermemeli**.
2. Fotoğrafları küçültün: uzun kenar ~1600 px, kalite ~%78.
3. Küçük WebP sürümlerini üretin (mobilde bunlar iner, var olanları atlar):
   ```bash
   node scripts/gorsel-surumleri.mjs
   ```
4. `data/projects.ts` içine kaydı ekleyin; `galeri("proje-adi", <adet>)` görsel yollarını üretir.

Kategoriler: `mobilya`, `insaat`, `ic-mimari`. Filtrede yalnızca projesi olan kategoriler görünür.
Görselleri bileşenlerde `lib/gorsel.ts` → `duyarli(src, sizes)` ile kullanın; `srcset` kendiliğinden kurulur.

### Blog yazısı yayınlama

1. `data/blog.ts` içinde yazıyı bulun (ya da yeni kayıt ekleyin).
2. `taslak: false` yapın, `tarih` alanını yayın günü (`YYYY-AA-GG`) olarak girin.
3. `main`'e gönderin. Yazı listede ve `sitemap.xml`'de görünür.
4. Google Search Console'da yazının adresi için "dizine eklenmesini iste".

`taslak: true` olan yazı yalnızca dev sunucusunda "Taslak" etiketiyle önizlenir; yayındaki sitede
adresi açılırsa 404 sayfası görünür ve arama motorlarına kapalıdır. Kapak için proje fotoğrafı ya da
`public/blog/` altında bir görsel kullanın (sonra `node scripts/gorsel-surumleri.mjs`).

## Görsel varlıklar

| Ne | Nerede | Nasıl yeniden üretilir |
|---|---|---|
| Süreç kaydırma kareleri | `public/surec/kareler/001–096.webp` | Kaynak videodan kare çıkarma (Faz 4, `docs/TASARIM-PLANI.md`) |
| Boş oda / bitmiş mutfak kaydırıcısı | `public/surec/bos-oda.webp`, `bitmis-mutfak.webp` | `assets-kaynak/bos-odadan-mutfaga.mp4` ilk ve son kare |
| Instagram bandı telefon videosu | `public/video/bos-odadan-mutfaga.mp4` (+ `-poster.webp`) | Aynı kaynak, ffmpeg ile 720×1280, sessiz, H.264 |
| 3D dolap yedek görselleri | `public/anatomi/dolap-kapali.webp`, `dolap-acik.webp` | Aynı 3D sahneden: Edge (SwiftShader) 1440×900 @2x, bölüm ilerlemesi 0.02 ve 0.60, tuval kırpılıp 1400 px WebP. Model değişirse yeniden alın. |
| Paylaşım önizlemesi | `public/og.jpg` (1200×630) | Site fontları ve monogramla bir HTML sayfası → Edge headless ekran görüntüsü |
| Proje fotoğraflarının WebP sürümleri | `public/projeler/**/NN-640/828/1200.webp` | `node scripts/gorsel-surumleri.mjs` |

Ham kaynaklar (videolar, logo) `assets-kaynak/` klasöründedir; videolar git'e girmez.

## Doğrulama betikleri

Kaydırmaya bağlı bölümleri ekran görüntüsüyle kontrol etmek için (dev sunucusu açıkken, Windows + Edge):

```bash
MSYS_NO_PATHCONV=1 node scripts/sayfa-goruntusu.mjs --yol / --noktalar 0,900,2000
MSYS_NO_PATHCONV=1 node scripts/sayfa-goruntusu.mjs --yol /blog/ --mobil
MSYS_NO_PATHCONV=1 node scripts/sayfa-goruntusu.mjs --yol / --azhareket
```

## Mimari notlar

- **Belirme animasyonları** (`components/ui/animations.tsx`) `whileInView` kullanmaz; `useReveal`
  kancası ve `data-reveal` özniteliğiyle çalışır. Güvenlik ağları (gözlemci haber vermezse içeriği
  gösterme, animasyon donarsa `data-zorla`) yalnızca gerçek bir arızada devreye girer; arka plan
  sekmesi, henüz çizilmemiş sayfa ve açılış perdesi normal durumlar sayılır.
- **İlk ekrandaki büyük görseller animasyonsuzdur** (proje kartlarının ilk satırı, blogdaki büyük kart,
  ilk hizmet görseli, Hakkımızda görseli). Sayfa başlığı (`PageHeader`) CSS animasyonuyla belirir.
  JavaScript'e bağlı animasyonlar sayfanın en büyük öğesini (LCP) 1–2 sn geciktiriyordu.
- **Yumuşak kaydırma** (`SmoothScrollProvider`, Lenis) sağlık kontrollüdür; animasyon döngüsü
  gerçekten ilerlemezse tarayıcının kendi kaydırmasına dönülür. Hareket azaltma tercihinde hiç açılmaz.
- **Açılış perdesi** (`components/ui/Intro.tsx`) sekmede bir kez görünür; `<head>` içindeki küçük betik
  sayesinde yenilemede ilk karede hiç çizilmez.
- **Erişilebilirlik:** içeriğe atla bağlantısı, dile göre değişen `<html lang>`, menü ve görüntüleyicide
  odak tuzağı, koyu zeminlerde açık renkli odak halkası (`[data-koyu-zemin]`, `.bg-ink`).
- **Süreç bölümü tuvali** (`ProcessScroll`) yalnızca boyutu gerçekten değişince temizlenir ve aynı anda yeniden çizilir;
  iPhone'da adres çubuğu kaydırırken bölüm yüksekliği sürekli değiştiği için aksi hâlde görsel titriyordu.
- **Katman açılırken** sayfa kaydırmasını `kaydirmayiKilitle(true/false)` ile kilitleyin;
  yalnız `body { overflow: hidden }` Lenis'i durdurmaz.
