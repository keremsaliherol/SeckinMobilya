# Seçkin Mimarlık Mobilya İnşaat — Kurumsal Web Sitesi

Next.js ile geliştirilmiş, tamamen statik kurumsal tanıtım sitesi.

## Geliştirme

```bash
npm install
npm run dev
```

Site `http://localhost:3000` adresinde açılır.

## Yayına alma (Cloudflare Pages)

Site statik olarak dışa aktarılır; sunucu tarafı hiçbir özellik kullanmaz.
`npm run build` komutu `out/` klasörüne düz HTML/CSS/JS üretir.

### Cloudflare Pages ayarları

| Alan | Değer |
|---|---|
| Framework preset | **None** (Next.js seçilmemeli — statik dışa aktarma kullanılıyor) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | 20 veya üzeri |

### Ortam değişkeni

Alan adı belli olduğunda **Settings → Environment variables → Production**
bölümüne eklenmeli:

```
NEXT_PUBLIC_SITE_URL = https://seckinmimarliktr.com
```

Bu değer `sitemap.xml`, `robots.txt` ve sosyal medya paylaşım
önizlemelerinde kullanılır. Ayarlanmazsa `lib/site.ts` içindeki varsayılan
adres geçerli olur. Değişiklikten sonra yeniden derleme gerekir.

## İçerik güncelleme

Kod bilgisi gerektirmeyen, sık değişen içerikler tek dosyada toplanmıştır:

| Ne değişecek | Dosya |
|---|---|
| Telefon, Instagram, adres, harita konumu | `lib/site.ts` |
| Projeler (başlık, açıklama, kategori, görseller) | `data/projects.ts` |
| Hizmet açıklamaları | `data/services.ts` |
| Sayfa metinleri (TR/EN) | `contexts/pageTranslations.ts` |
| Renkler ve tema | `app/globals.css` (`:root` bloğu) |

### Yeni proje ekleme

1. Fotoğrafları `public/projeler/<proje-adi>/` klasörüne `01.jpg`, `02.jpg`…
   sırasıyla koyun. Klasör adı **Türkçe karakter ve boşluk içermemeli**.
2. Fotoğrafları web için küçültün (uzun kenar ~1600 px, kalite ~%78).
   Optimize edilmemiş telefon fotoğrafları siteyi ciddi biçimde yavaşlatır.
3. `data/projects.ts` içine yeni kaydı ekleyin; `galeri("proje-adi", <adet>)`
   yardımcısı görsel yollarını otomatik üretir.

Kategoriler: `mobilya`, `insaat`, `ic-mimari`. Proje filtreleri, yalnızca
gerçekten projesi olan kategorileri gösterir.

## Mimari notlar

- **Giriş animasyonları** (`components/ui/animations.tsx`) `whileInView`
  kullanmaz. Animasyon motoru ilerlemezse içerik `opacity: 0`'da donup
  kalıcı olarak görünmez kalıyordu. Bunun yerine `useReveal` kancası ve
  belirli bir süre sonra devreye giren görünürlük güvencesi kullanılır.
  Yeni animasyonlu bileşenlere `data-reveal` özniteliği eklenmelidir.
- **Yumuşak kaydırma** (`SmoothScrollProvider`) sağlık kontrollüdür: animasyon
  döngüsü ilerlemezse kütüphane kapatılıp tarayıcının kendi kaydırmasına
  dönülür, böylece sayfa hiçbir koşulda kilitlenmez.
- **İletişim formu** sunucuya değil WhatsApp'a yönlendirir; bu yüzden site
  statik kalabiliyor ve barındırma ücretsiz.
