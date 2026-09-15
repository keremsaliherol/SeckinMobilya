@AGENTS.md

# Seçkin Mimarlık Mobilya İnşaat — Proje Bilgileri

Bir arkadaşımızın markası için yapılmış kurumsal tanıtım sitesi. Yeni özellikler
ve tasarım değişiklikleri adım adım eklenecek. Bu dosyadaki marka bilgileri
değişirse **hem burayı hem `lib/site.ts`'yi** güncelle.

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

- Koyu tema. Arka plan `#0B0B0B`, yüzey `#151515`, kenarlık `#2C2C2C`
- Marka rengi **bronz** `#C6A15B` (açık `#D9B978`, koyu `#8C6D3F`)
- İkincil: taş `#A89B87`; metin `#F2F0ED`, soluk metin `#9A9A9A`
- Fontlar: başlıklar **Playfair Display**, gövde **Inter**

## Teknik Yapı

- **Next.js 16.2.3** (App Router), React 19, Tailwind CSS v4, TypeScript,
  framer-motion, lenis (yumuşak kaydırma), lucide-react
- **Tamamen statik** (`output: "export"`, `trailingSlash: true`) → `out/` klasörü.
  Sunucu API'si / server action kullanılmamalı.
- **Yayın:** Cloudflare Pages / Workers assets (`wrangler.jsonc`, proje adı `seckinmobilya`)
- **Dev sunucusu:** `npm run dev` → http://localhost:3000 (`.claude/launch.json` → `seckin-dev`)
- **İki dil:** TR/EN — `contexts/LanguageContext.tsx` (genel) ve
  `contexts/pageTranslations.ts` (sayfa metinleri). Metin eklerken iki dili de güncelle.
- **İletişim formu** sunucuya değil WhatsApp'a (`wa.me`) yönlendirir.

### Sayfalar

`/` ana sayfa · `/hakkimizda` · `/hizmetlerimiz` · `/projelerimiz` ·
`/projelerimiz/[slug]` · `/oncesi-sonrasi` · `/iletisim`

### Nerede ne değişir

| Ne | Dosya |
|---|---|
| Telefon, Instagram, adres, harita | `lib/site.ts` (tek kaynak) |
| Projeler | `data/projects.ts` |
| Hizmetler | `data/services.ts` |
| Sayfa metinleri TR/EN | `contexts/pageTranslations.ts`, `contexts/LanguageContext.tsx` |
| Renk / tema | `app/globals.css` |
| SEO meta, JSON-LD işletme bilgisi | `app/layout.tsx` |

### Dikkat edilecekler

- İletişim bilgisini koda elle yazma, `lib/site.ts`'den import et.
  (Not: `components/layout/Footer.tsx` içinde Instagram linki şu an sabit
  yazılmış, `contact.instagram` kullanmıyor.)
- Animasyonlarda `whileInView` kullanma; `components/ui/animations.tsx`
  içindeki `useReveal` + `data-reveal` yaklaşımını kullan.
- Yeni proje fotoğrafları: klasör adında Türkçe karakter/boşluk yok,
  uzun kenar ~1600 px, kalite ~%78.
