@AGENTS.md

# Seçkin Mimarlık Mobilya İnşaat — Proje Bilgileri

Bir arkadaşımızın markası için yapılmış kurumsal tanıtım sitesi. Yeni özellikler
ve tasarım değişiklikleri adım adım eklenecek. Bu dosyadaki marka bilgileri
değişirse **hem burayı hem `lib/site.ts`'yi** güncelle.

## ▶ Devam eden iş — yeni oturumda önce bunu oku

Yeniden tasarımın Faz 0–7'si bitti ve **15.09.2026'da canlıya alındı** (`main`). Faz 8 yayından sonra yapılıyor. **Tamamlanmamış görevler
`docs/KALAN-GOREVLER.md` dosyasında.** Kullanıcı "devam" / "kalan görevleri yap" dediğinde:

1. `docs/KALAN-GOREVLER.md`'yi baştan sona oku (çalışma kuralları §0'da).
2. İşaretlenmemiş (`- [ ]`) görevleri sırayla yap: önce Faz 7'de açık kalan **blog yazısı onayı**
   (onaylananlar `taslak: false`), sonra **Faz 8'den önce bekleyen kararları kullanıcıya tek tek sor**,
   sonra **Faz 8 Kalite ve Teslim**.
3. Biten maddeyi `- [x]` yap. Her faz sonunda: tsc + lint + build (dev sunucusu kapalıyken)
   + görsel kontrol (`scripts/sayfa-goruntusu.mjs`) + commit + Türkçe kısa rapor, sonra onay bekle.
4. Faz ortasında çıkan yeni kararları sorma; `docs/TASARIM-PLANI.md` §10.5'e ekle.
5. `git push` yalnızca kullanıcı isterse: `main`'e her gönderim canlı siteyi günceller.

Tüm görevler bitince bu bölümü kaldır.

## Marka / Firma

- **Tam ad:** Seçkin Mimarlık Mobilya İnşaat (EN: Seçkin Architecture Furniture Construction)
- **Kuruluş:** 1975, aile şirketi olarak
- **Slogan:** "1975'ten Bugüne Güven, Kalite ve Tecrübe"
- **Tanıtım:** Mimarlık, mobilya ve inşaat alanlarında anahtar teslim profesyonel
  çözümler. Kalite, güven ve müşteri memnuniyeti ön planda; modern tasarım
  anlayışı güçlü uygulama tecrübesiyle birleştiriliyor.
- **Sitede kullanılan rakamlar:** 100+ tamamlanan proje · 50+ yıl deneyim ·
  100+ mutlu müşteri · 5+ ülkede hizmet
- **Hizmet bölgesi:** Türkiye geneli + yurt dışı projeler (merkez İstanbul)
- **Teklif modeli:** Ücretsiz keşif ve danışmanlık
- **Genelde kullanılan malzemeler (marka sahibinden):** kapakta en çok akrilik ve membran,
  18 mm akrilik MDF kapak/çekmece önü, 3 mm PVC kenar bandı, siyah metal gola kulp,
  Samet frenli menteşe, Samet tandem ray (frenli, tam açılım), 18 mm MDF raf, 8 mm MDF arkalık,
  12'lik ayak + baza, 18 mm MDF-lam gövde. Referans ürün fotoğrafı: `assets-kaynak/dolap.jpeg`.

## İletişim Bilgileri

| Bilgi | Değer |
|---|---|
| Telefon 1 (birincil, işletme sahibi) | **0541 723 85 51** — `+905417238551` |
| Telefon 2 | **0533 520 97 78** — `+905335209778` |
| WhatsApp | 0541 723 85 51 → `https://wa.me/905417238551` |
| Instagram | **@seckinmobilyainsaat** — https://instagram.com/seckinmobilyainsaat |
| E-posta (Gmail) | **Henüz yok** — projede kayıtlı bir e-posta adresi bulunmuyor. Öğrenilince buraya ve `lib/site.ts`'ye eklenmeli. |
| Web sitesi | https://seckinmimarliktr.com |

Başka sosyal medya hesabı (Facebook, YouTube, TikTok, LinkedIn vb.) projede
tanımlı değil; şu an sadece Instagram var.

## Adres ve Konum

- **Adres:** 100. Yıl, Kışla Cd. No:86, 34204 Bağcılar/İstanbul
- **Koordinat:** 41.0614783, 28.8527604
- **Google Maps (yol tarifi):** https://maps.app.goo.gl/nTArNXMrnyHXxQgL6
- **Harita gömme:** `https://maps.google.com/maps?q=41.0614783,28.8527604&hl=tr&z=17&output=embed`
  (API anahtarı gerektirmez)

## Hizmetler (`data/services.ts`)

1. **Anahtar Teslim İnşaat Projeleri** — konut, villa, ofis, ticari alan inşaatı;
   kaba & ince işçilik; anahtar teslim teslimat.
2. **İç Mimari ve Tasarım** — konsept tasarım, 3D görselleştirme, renk & malzeme
   danışmanlığı, aydınlatma tasarımı, mekân planlama, dekorasyon uygulama.
3. **Özel Üretim Mobilya** — mutfak dolabı, TV ünitesi, yatak odası, vestiyer &
   giyinme odası, dekoratif mobilya, özel ölçü üretim.
4. **Tadilat ve Renovasyon** — komple daire, ofis, mağaza tadilatı; banyo & mutfak
   renovasyonu; zemin & duvar kaplamaları; elektrik & tesisat.
5. **Ofis ve Ticari Alan Tasarımı** — ofis, mağaza, showroom, kurumsal kimlik
   uyumu, açık ofis planlama, toplantı odası.
6. **Uygulama ve Proje Yönetimi** — planlama, süreç yönetimi, kalite kontrol,
   zaman çizelgesi, bütçe yönetimi, saha koordinasyonu.

## Referans Projeler (`data/projects.ts`, görseller `public/projeler/<slug>/`)

| Proje | Kategori |
|---|---|
| Başakşehir Misstanbul Evleri | iç mimari |
| Halkalı Soyakkent | iç mimari |
| Bizimevler 5 | iç mimari |
| Soyak Olympiakent | iç mimari |
| Daca Boutique (2025) | iç mimari |
| Sarıyer Çobanoğlu Otomotiv | mobilya |
| 15 Temmuz Evleri Mutfak ve Kahve Köşesi | mobilya |
| İstinye Akdağ Madencilik | mobilya |
| Mutfak Projelerimiz | mobilya |
| Bahçeşehir Mutfak | mobilya |
| Sefaköy Projesi | mobilya |

Kategoriler: `mobilya`, `insaat`, `ic-mimari`.

## Görsel Kimlik (`app/globals.css`)

Yeniden tasarım devam ediyor. Plan ve faz durumu: `docs/TASARIM-PLANI.md`.
Yeni tasarım 15.09.2026'dan beri `main`'de ve yayında (geliştirme geçmişi `yeniden-tasarim` dalında).

**Palet: "Sıcak Bej & Kahve" (açık tema).** Tailwind sınıf adları parantezde.

| Görev | HEX | Sınıf | Not |
|---|---|---|---|
| Ana zemin | `#F6F1EA` | `background` | |
| İkincil zemin | `#E7DED2` | `surface` | `surface-dark` `#DCD0C0` |
| Çizgi / kenarlık | `#D6C8B5` | `border` | |
| Sıcak taş | `#C6B29A` | `accent` | Açık zeminde **yazı için kullanılmaz** (1.8:1). Koyu zemin/fotoğraf üstünde vurgu yazısı olarak kullanılır. |
| Koyu kahve | `#4A372A` | `primary`, `ink` | Butonlar, footer, CTA bandı |
| Logo kahvesi | `#734925` | `brand` | Monogram, aktif menü |
| Metin | `#1A1A1A` | `foreground` | |
| Soluk metin | `#6B5B4E` | `muted` | |
| Koyu zemin üstü metin | `#F6F1EA` | `on-ink` | |
| Fotoğraf karartması | `#1F1711` | `shade` | Siyah (`black`) yerine bunu kullan |

- **Fontlar:** başlık **Cormorant Garamond** (`font-heading`), gövde **Outfit** (`font-sans`).
  İkisi de `latin-ext` ile yüklenir (ş, ğ, İ için şart).
- **Logo:** `components/ui/Logo.tsx` (monogram + yazı, `currentColor`; yalnız monogram için `Monogram`).
  Vektör verisi `components/ui/monogram.ts`, dosya `public/brand/seckin-monogram.svg`.
  Kaynak dosyalar `assets-kaynak/` klasöründe (videolar git'e girmez).
- **Ana sayfa** (`app/page.tsx`): `components/home/` altında HeroSection (kapsül → tam ekran),
  IntroStatement, ProcessScroll (kaydırmalı kare dizisi, canvas), RoomCategories (`data/rooms.ts`), CabinetSection (3D dolap, `components/home/cabinet/`,
  parça/malzeme listesi `data/cabinetParts.ts`, yedek görseller `public/anatomi/`), CompareSection
  (`components/ui/BeforeAfterSlider.tsx`), FeaturedProjects (masaüstünde sabitlenen yatay
  şerit), StatsSection, InstagramCta. Metinler `t.home.*` (LanguageContext).
- **İç sayfalar:** ortak başlık `components/ui/PageHeader.tsx`. Proje detay = sunucu `page.tsx`
  (metadata, JSON-LD) + istemci `ProjeDetayContent.tsx`. Hizmet görselleri ve örnek proje
  bağlantıları `data/services.ts`, hizmet metinleri `pageTranslations.hizmetlerimiz`.
  `/oncesi-sonrasi` sayfası kaldırıldı (içerik yoktu); eski adres `public/_redirects` ile `/projelerimiz/`'e yönlenir.
- **Kabuk:** menü `components/layout/Navbar.tsx` + yan panel `MenuPanel.tsx`, footer `Footer.tsx`,
  sabit WhatsApp butonu `components/ui/WhatsAppButton.tsx`, açılış perdesi `components/ui/Intro.tsx`,
  404 `app/not-found.tsx`. İkonlar (Instagram, WhatsApp) `components/ui/icons.tsx`,
  WhatsApp linki `whatsappLink()` (`lib/site.ts`).
- Katman/overlay açılırken sayfa kaydırmasını `kaydirmayiKilitle(true/false)` ile kilitle
  (`components/ui/SmoothScrollProvider.tsx`); yalnız `body overflow` Lenis'i durdurmaz.
- **Marka cümleleri:** "Önce çiziyoruz. Sonra birebir uyguluyoruz." ·
  "Tasarım · Üretim · Montaj" · "1975'ten bugüne"
- **Süreç videosu kareleri:** `public/surec/kareler/001–096.webp` (kaydırma bölümü),
  Instagram bandındaki telefon videosu `public/video/bos-odadan-mutfaga.mp4` (+ `-poster.webp`)
- **Ana sayfadaki boş oda / bitmiş mutfak kaydırıcısı (CompareSection):** `public/surec/bos-oda.webp` ve `bitmis-mutfak.webp`,
  kaynak `assets-kaynak/bos-odadan-mutfaga.mp4` (ilk ve son kare, kamera sabit)

## Teknik Yapı

- **Next.js 16.2.3** (App Router), React 19, Tailwind CSS v4, TypeScript,
  framer-motion, lenis (yumuşak kaydırma), lucide-react,
  three + @react-three/fiber + @react-three/drei (yalnız 3D dolap; `next/dynamic` ile geç yüklenir)
- **Tamamen statik** (`output: "export"`, `trailingSlash: true`) → `out/` klasörü.
  Sunucu API'si / server action kullanılmamalı.
- **Yayın:** GitHub `keremsaliherol/SeckinMobilya` (`origin`) → `main`'e push → Cloudflare Workers Builds
  otomatik build alıp https://seckinmimarliktr.com'u günceller (`wrangler.jsonc`, proje adı `seckinmobilya`).
  Eski adres yönlendirmeleri `public/_redirects`.
- **Dev sunucusu:** `npm run dev` → http://localhost:3000 (`.claude/launch.json` → `seckin-dev`).
  **Dev sunucusu açıkken `npm run build` çalıştırma**: `out/` yeniden yazılınca Turbopack
  belleği ~8 GB'a çıkıp çöküyor. Önce sunucuyu durdur, build al, sonra yeniden başlat.
- **İki dil:** TR/EN — `contexts/LanguageContext.tsx` (genel) ve
  `contexts/pageTranslations.ts` (sayfa metinleri). Metin eklerken iki dili de güncelle.
- **İletişim formu** sunucuya değil WhatsApp'a (`wa.me`) yönlendirir.

### Sayfalar

`/` ana sayfa · `/hakkimizda` · `/hizmetlerimiz` · `/projelerimiz` ·
`/projelerimiz/[slug]` · `/blog` · `/blog/[slug]` · `/iletisim`

### Nerede ne değişir

| Ne | Dosya |
|---|---|
| Telefon, Instagram, adres, harita | `lib/site.ts` (tek kaynak) |
| Projeler | `data/projects.ts` |
| Blog yazıları (yalnız TR; `taslak: true` yayında görünmez) | `data/blog.ts` (arayüz metinleri `pageTranslations.blog`) |
| Hizmet görselleri / örnek projeler | `data/services.ts` (metinler `pageTranslations.ts`) |
| Sayfa metinleri TR/EN | `contexts/pageTranslations.ts`, `contexts/LanguageContext.tsx` |
| Renk / tema | `app/globals.css` |
| SEO meta, JSON-LD işletme bilgisi | `app/layout.tsx` |

### Dikkat edilecekler

- İletişim bilgisini koda elle yazma, `lib/site.ts`'den import et.
- Animasyonlarda `whileInView` kullanma; `components/ui/animations.tsx`
  içindeki `useReveal` + `data-reveal` yaklaşımını kullan.
- Animasyon güvenlik ağlarında zamanlayıcıyı koşulsuz kurma: arka plan sekmesi (`document.hidden`),
  henüz çizilmemiş sayfa ve açılış perdesi (`introSonrasi`, `Intro.tsx`) normal durumlardır.
  Koşulsuz zamanlayıcı ekran dışındaki animasyonları erkenden bitiriyor ve Lenis'i kapatıyordu
  (bkz. `useReveal`, `SmoothScrollProvider`).
- Kaydırmaya bağlı animasyonda `useTransform(scrollYProgress, transform([..], [..]))`
  kullan (fonksiyon biçimi). Dizi biçimi `useScroll({ target })` ile birlikte yanlış
  (tüm sayfa) aralığa göre hesaplanıyor.
- Medya sorgusu (ekran genişliği, hareket azaltma) için `components/ui/useMediaQuery.ts` kullan;
  efekt içinde `matchMedia` + setState lint hatası veriyor.
- Her hareketli bölüm "hareketi azalt" tercihinde çalışmalı: ya CSS
  `@media (prefers-reduced-motion: reduce)` ile (bkz. `.hero-*`, `.oda-karti` kuralları)
  ya da `matchMedia` ile sabit/basit sürüme dönülür.
- Yeni proje fotoğrafları: klasör adında Türkçe karakter/boşluk yok,
  uzun kenar ~1600 px, kalite ~%78.
