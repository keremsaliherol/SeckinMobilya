# Kalan Görevler — Faz 7 (Blog), Faz 8 (Kalite ve Teslim) ve yayın sonrası

> **Yeni oturum buradan başlar.** Bu dosyadaki işaretlenmemiş (`- [ ]`) görevleri
> sırayla yap. Bitirdiğin maddeyi `- [x]` yap ve gerekirse kısa bir not düş.
> Genel plan ve önceki fazların notları: `docs/TASARIM-PLANI.md`.
>
> Hazırlandığı tarih: 15.09.2026 · Durum: **Faz 0–8 tamamlandı.** Site 15.09.2026'da canlıya alındı; Faz 8 commit'li, push kullanıcıda.
> Açık kalanlar: marka sahibinden gelecek bilgiler (§2), Safari/Firefox testi (§3.4), Search Console (§3.1), blog takvimi (§4).
> `main` = yayındaki site; GitHub'a push Cloudflare'de otomatik yayın başlatır.

---

## 0. Çalışma kuralları (her faz için geçerli)

- **Dal:** `yeniden-tasarim`. `main`'e birleştirme ve `git push` yalnızca kullanıcı açıkça isterse.
- **Adım adım:** Kullanıcı her fazın sonunda sonucu görmek ve onaylamak istiyor.
  Faz bitince: lint + build + görsel kontrol + commit + Türkçe kısa rapor, sonra onay bekle.
- **Açık kararlar faz ortasında sorulmaz:** Yeni bir karar çıkarsa
  `docs/TASARIM-PLANI.md` §10.5 listesine ekle, raporda belirt, işe devam et.
- **Uydurma içerik yok:** Tarih, müşteri adı, yorum, fiyat, sertifika, "X yıl garanti" gibi
  doğrulanmamış bilgi yazma. Bilinmeyen içerik için bölümü gizle ya da taslak olarak işaretle.
- **İki dil:** Arayüz metinleri TR + EN (`contexts/LanguageContext.tsx`, `contexts/pageTranslations.ts`).
- **Next.js 16:** Kod yazmadan önce ilgili belgeyi `node_modules/next/dist/docs/` altından oku (AGENTS.md).

### Komutlar ve doğrulama

```bash
npx tsc --noEmit          # tip denetimi
npm run lint              # ESLint
npm run build             # statik export → out/  (ÖNCE dev sunucusunu durdur!)
```

- **Dev sunucusu açıkken build alma:** `out/` yeniden yazılınca Turbopack belleği ~8 GB'a
  çıkıp çöküyor. Sıra: sunucuyu durdur → build → gerekirse sunucuyu yeniden başlat.
- Dev sunucusu: `.claude/launch.json` → `seckin-dev` (http://localhost:3000).
- **Kaydırmalı bölümleri görsel doğrulama:** Uygulamanın tarayıcı paneli kaydırma sonrası
  ekran görüntüsü alamıyor. Bunun yerine:
  ```bash
  MSYS_NO_PATHCONV=1 node scripts/sayfa-goruntusu.mjs --yol / --noktalar 0,900,2000
  MSYS_NO_PATHCONV=1 node scripts/sayfa-goruntusu.mjs --yol /blog/ --mobil
  MSYS_NO_PATHCONV=1 node scripts/sayfa-goruntusu.mjs --yol / --azhareket
  ```
  Görüntüler işletim sisteminin geçici klasörüne (`seckin-goruntuler/`) yazılır; Read ile bak.
  Tam sayfa, kaydırmasız görüntü için: `msedge --headless=new --screenshot=... --window-size=1440,5000 --virtual-time-budget=9000 URL`
  (Edge headless'ta minimum pencere genişliği ~500 px; mobil için yukarıdaki betiği kullan).
- Tarayıcı panelinde (Claude Browser) tıklama, form, klavye testleri ve konsol hataları kontrol edilebilir.

### Kod kuralları (CLAUDE.md'den özet)

- Kaydırma animasyonu: `useTransform(scrollYProgress, transform([..],[..]))` (fonksiyon biçimi).
- Medya sorgusu: `components/ui/useMediaQuery.ts`. Overlay kilidi: `kaydirmayiKilitle()`.
- Görünür içerik animasyona bağlı olmamalı (`useReveal` / `data-reveal`); her hareketli bölüm
  "hareketi azalt" tercihinde çalışmalı.
- Renkler yalnızca palet sınıflarıyla (`background`, `surface`, `primary`, `brand`, `muted`, `ink`, `on-ink`, `shade`…).
- İletişim bilgisi yalnızca `lib/site.ts`'den.

---

## 1. Faz 7 — Blog

**Amaç:** Referans sitedeki gibi proje odaklı, arama motorlarında görünürlüğü artıran yazılar.
Kullanıcı blog yapılmasını istedi. İçerik taslakları marka sahibinin onayına sunulacak.

### 1.1 Altyapı
- [x] `data/blog.ts`: yazı listesi. Önerilen alanlar:
  `slug`, `baslik`, `ozet`, `tarih` (ISO; **yayın günü**, uydurma geçmiş tarih verme),
  `kapak` (mevcut proje fotoğrafı), `projeSlug?` (ilgili proje), `bolumler` (başlık + paragraf
  listesi; HTML/markdown yerine düz veri — statik ve güvenli), `taslak: boolean`.
  Yazı içerikleri **yalnızca Türkçe** olabilir (proje açıklamaları da öyle); arayüz etiketleri TR/EN.
- [x] `app/blog/page.tsx` (+ `BlogContent.tsx` istemci): `PageHeader` + yazı kartları
  (kapak, tarih, başlık, özet; ana sayfa proje kartlarıyla aynı dil: yazı fotoğrafın altında).
  `taslak: true` olan yazılar listelenmez.
- [x] `app/blog/[slug]/page.tsx`: `generateStaticParams` (statik export şartı), `generateMetadata`
  (başlık, açıklama, canonical `/blog/<slug>/`, OG görseli = kapak), JSON-LD `BlogPosting` +
  `BreadcrumbList` (bkz. `app/projelerimiz/[slug]/page.tsx` örneği).
  İçerik bileşeni: başlık, tarih, kemerli kapak (`rounded-t-full`), okunaklı gövde
  (`max-w-[68ch]`, Outfit 18px, satır aralığı rahat), ilgili proje kartı, WhatsApp/keşif çağrısı.
- [x] Menüye "Blog" ekle: `Navbar.tsx` linkleri, `MenuPanel.tsx` (aynı `links` dizisi),
  `Footer.tsx` sayfa listesi, `t.nav.blog` (TR "Blog", EN "Blog").
  Masaüstü menü genişliğini 1280 ve 1440 px'te kontrol et (7 link sığmalı).
- [x] `app/sitemap.ts`: `/blog/` ve yayında olan yazılar.
- [x] Metinler: `pageTranslations.blog` (TR/EN) — liste başlığı, "Devamını oku", tarih biçimi,
  "İlgili proje", boş durum ("Yakında ilk yazımızı paylaşacağız").

### 1.2 İlk içerik (taslak, onaya sunulacak)
Konular yalnızca **bilinen gerçeklere** dayanmalı: proje açıklamaları (`data/projects.ts`) ve
marka sahibinin verdiği malzeme bilgileri (CLAUDE.md → "Genelde kullanılan malzemeler").
- [x] 3–4 yazı taslağı, örnek konular:
  - Mutfak kapağında akrilik ve membran: farkları ve kullanım yerleri (marka sahibi en çok bu ikisini kullanıyor)
  - Gola kulp nedir, kulpsuz mutfak nasıl kurulur (siyah metal gola kullanıyorlar)
  - Frenli menteşe ve tandem ray: dolapta görünmeyen ama her gün hissedilen detaylar (Samet)
  - Bir projenin hikâyesi: ör. Daca Boutique (2025) — yalnızca proje açıklamasındaki bilgilerle
- [x] Hepsini `taslak: true` bırak; raporda başlık + özet listesini kullanıcıya göster,
  onaylananları `taslak: false` yap. Teknik iddiaları genel bilgi düzeyinde tut, marka/ürün
  performansı hakkında ölçülemeyen iddia yazma.
  → Kullanıcı kararı (15.09.2026): canlıya alırken yalnızca **"Mutfak kapağında akrilik mi, membran mı?"** yayında (`taslak: false`).
    Diğer üçü taslak; SEO için 2–3 haftada bir yayınlanacak (bkz. §4). Yayından önce marka sahibi yazıyı okumalı.

### 1.3 Doğrulama
- [x] tsc + lint + build (dev sunucusu kapalıyken); `out/blog/index.html` ve yazı sayfaları üretildi mi
- [x] Masaüstü + mobil görüntü (`scripts/sayfa-goruntusu.mjs --yol /blog/` ve bir yazı)
- [x] EN'e geçince arayüz etiketleri değişiyor mu; menüde Blog aktif sayfa işareti
- [x] Commit: `Faz 7: blog` + plan dosyasında durum tablosunu güncelle

---

## 2. Faz 8 öncesi — Bekleyen kararlar (15.09.2026'da soruldu)

- [x] **Aynı mutfak iki kez** → Kaydırıcı boş oda → bitmiş mutfak videosunun kareleriyle değişti (kullanıcı).
- [ ] **Süreç videosu gerçek proje mi?** (`hf_…` dosyaları yapay zekâ üretimi olabilir; kaydırıcı ve telefon videosu da) — marka sahibine kullanıcı soracak.
- [ ] **Taslak metinler:** "Her proje yerinde ölçüyle başlar", süreç adımları, "onaylanan çizimle üretim", Instagram bandı — marka sahibine kullanıcı soracak.
- [x] **Bağlantı parçaları** → "Minifix ve kavela" doğrulanmadığı için "Gövdeyi birleştiren bağlantı elemanları" oldu (kullanıcı).
- [x] **Ayak ölçüsü** → "12 cm" kaldı; sektörde "12'lik ayak" 12 cm demek (kullanıcı).
- [x] **Açılış fotoğrafı** → Önce Soyak Olympiakent TV duvarı yapıldı; kullanıcı isteğiyle (16.09.2026) **eski yatak odası fotoğrafı geri geldi** (`public/hero/yatak-odasi.jpg`), TV oda kartı yine Olympiakent. Fotoğrafın kaynağı (stok/yapay zekâ/kendi işleri) marka sahibine sorulacak.
- [x] **Kapakta membran** → Kapak ve çekmece önü satırlarına "ya da membran" eklendi (kullanıcı).
- Kullanıcı marka sahibine gidecek toplu bir soru mesajı istemedi; kendisi soracak.

### Marka sahibinden beklenen bilgiler (§11) — geldiyse işle
- [ ] Gmail adresi → `lib/site.ts` (`contact.email`), CLAUDE.md, footer, iletişim kartı, JSON-LD `email`
- [ ] Gerçek müşteri yorumları → Hakkımızda'ya yorum bölümü (yoksa ekleme)
- [ ] 1975'ten bugüne kilometre taşları → Hakkımızda'ya zaman çizelgesi (yoksa ekleme)
- [ ] Oda fotoğrafları (kahve köşesi, TV ünitesi, giyinme odası) → `data/rooms.ts` (sonra `node scripts/gorsel-surumleri.mjs`)
- [ ] Blog kapağındaki dolap fotoğrafının (`public/blog/akrilik-kapak.jpg`) yayın izni
- [x] ~~Gerçek öncesi/sonrası fotoğraf çiftleri~~ → İptal: `/oncesi-sonrasi` sayfası kaldırıldı.

---

## 3. Faz 8 — Kalite ve Teslim (15.09.2026)

### 3.1 SEO ve paylaşım
- [ ] **Google Search Console** → Kullanıcı marka sahibiyle ayrıca kuracak. Kurulunca `https://seckinmimarliktr.com/sitemap.xml` gönderilir.
- [x] **OG görseli** → `public/og.jpg` yenilendi: bej zemin, monogram, "Tasarımdan montaja, tek elden.", Olympiakent fotoğrafı kapsülde (51 KB).
- [x] **JSON-LD** `image` → `/projeler/soyak-olympiakent/03.jpg`.
- [x] **Sayfa açıklamaları** yeni içerikle uyumlu; blog açıklamasından yayında olmayan yazı adları çıkarıldı. Tüm canonical'lar sonda `/` ile.
- [x] `robots.txt` / `sitemap.xml` kontrol edildi (yalnızca yayındaki blog yazısı var).
- [x] EN ayrı URL'de değil → bilinçli olarak değiştirilmedi.

### 3.2 Erişilebilirlik
- [x] axe-core (WCAG 2.1 AA) 9 sayfa masaüstü + 3 sayfa mobil: **0 ihlal**. Lighthouse erişilebilirlik 96–100.
- [x] **İçeriğe atla** bağlantısı (`components/ui/SkipLink.tsx`, `<main id="icerik">`), TR/EN.
- [x] **`<html lang>`** dil değişince `tr`/`en` oluyor.
- [x] **Klavye:** menü paneli ve Lightbox'ta odak tuzağı + Escape; Lightbox kapanınca odak açan öğeye dönüyor; kaydırıcı ok tuşlarıyla. Gerçek tuş basışlarıyla test edildi.
- [x] **Odak halkası koyu zeminde görünmüyordu (1:1)** → `.bg-ink` ve `[data-koyu-zemin]` içinde taş rengi (5,5:1).
- [x] **Kontrast:** pasif dil düğmesi, logo alt yazısı, süreç bölümünde pasif adımlar, form alt çizgisi (1,5:1 → 3,3:1) ve seçim kutusu, Lightbox sayacı düzeltildi.
- [x] **Alt metinler:** oda kartları başlığı tekrar okutmuyor (`alt=""`), galeri ve Lightbox etiketleri iki dilli.
- [x] **Hareketi azalt:** Lenis açılmıyor, framer `MotionConfig reducedMotion="user"`; ana sayfa görsel kontrolü yapıldı.
- [x] **%200 yakınlaştırma / yatay telefon:** açılış kapsülü başlığın üstüne biniyordu → yatay ve 1024 px altında başlık solda, kapsül sağda (`globals.css`).
- [x] Logo bağlantısının erişilebilir adı görünen yazıyı içeriyor (WCAG 2.5.3).

### 3.3 Performans (Lighthouse mobil, yavaş 4G + 4× CPU benzetimi)
- [x] Ölçüm: ana sayfa 70 → 83, Hakkımızda 88, Hizmetlerimiz 85, Projelerimiz 74 → 81, proje detayı 85, blog 88, blog yazısı 82 → 88, İletişim 76. TBT 20–60 ms, CLS 0, SEO 100.
  Gerçek tarayıcıda LCP (1,6 Mbps + 4× CPU): ana sayfa 2,8 sn, Projelerimiz 4,4 → 2,6, Hizmetlerimiz 3,4 → 2,8, Hakkımızda 3,9 → 1,9, İletişim 4,0 → 1,5, blog 1,6 sn.
  Not: Lighthouse benzetimi İletişim'de haritayı hesaba katıp LCP'yi 8 sn gösteriyor; gözlenen değer 1,6 sn. Açılış perdesi LCP'yi geciktirmiyor (perdeli/perdesiz aynı).
- [x] İlk JS: 855 KB ham / 262 KB gzip (React DOM 62, Next 38, framer-motion 44 KB). three.js ayrı parçada kalıyor.
  İleride istenirse: framer-motion `LazyMotion` + `m` ile ~15–20 KB gzip kazanç (tüm hareketli bileşenlerde değişiklik gerekir).
- [x] **Görseller:** her proje/blog fotoğrafı için 640/828/1200 px WebP (`scripts/gorsel-surumleri.mjs`), bileşenlerde `lib/gorsel.ts` → `duyarli()` ile `srcset`/`sizes`. Mobilde sayfa başına ~500 KB daha az.
- [x] Menü panelindeki proje görselleri artık menü ilk açılınca iniyor (her sayfada ~130 KB tasarruf).
- [x] İlk ekrandaki büyük görseller animasyonsuz ve öncelikli; `PageHeader` CSS animasyonuyla beliriyor (JS beklemiyor).
- [x] Yenilemede açılış perdesi ilk karede çizilmiyor (`<head>` betiği + `html[data-intro-goruldu]`).
- [x] Süreç kareleri ve dolap yedek görselleri yavaş 3G'de doğrulandı: kare inerken çizim karesi, 3D inerken yedek görsel görünüyor.
- [x] Fontlar değiştirilmedi (Cormorant italik vurgu satırlarında kullanılıyor).

### 3.4 Tarayıcı ve cihaz
- [x] **Safari/iOS (kullanıcı iPhone'da test etti, 16.09.2026)** — iki hata bulundu ve düzeltildi:
  - **Süreç bölümünde görsel titriyordu** (bitmiş mutfak ↔ çizim): adres çubuğu kaydırırken bölüm yüksekliği (dvh) her karede
    değişiyor, tuval her seferinde temizlenip çizim sonraki kareye kalıyordu. Ölçüm: 60 yükseklik değişiminde eski kod 59 boş kare,
    yeni kod 0. Düzeltme `components/home/ProcessScroll.tsx` → `boyutla` (boyut aynıysa dokunma, değiştiyse aynı anda çiz).
  - **Telefon videosu oynamıyordu:** Cloudflare statik varlıkları Range isteklerine 206 dönmüyor, iPhone Safari MP4'ü oynatmıyor.
    Düzeltme: `worker/index.js` (yalnızca `/video/*`, wrangler.jsonc → `run_worker_first`), `wrangler dev` ile 206 doğrulandı.
    Ayrıca otomatik oynatma engellenirse (Düşük Güç Modu) videonun üstünde oynat düğmesi çıkıyor.
  - Yayından sonra canlıda kontrol: `curl -s -D - -o /dev/null -H "Range: bytes=0-1" https://seckinmimarliktr.com/video/bos-odadan-mutfaga.mp4` → 206.
- [ ] **Firefox:** makinede kurulu değil; kullanıcı test edecek (hero kapsül, 3D dolap).
- [x] Yavaş ağ (yavaş 3G benzetimi): süreç bölümü ve dolap yedek görselleri doğru.

### 3.5 Temizlik
- [x] Silindi: `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`, `public/hero/mutfak.jpg`, `santiye.jpg` (`yatak-odasi.jpg` 16.09.2026'da açılışa geri döndü). `public/brand/seckin-monogram.svg` marka dosyası olarak kaldı.
- [x] Kullanılmayan çeviri anahtarları silindi: `home.cabinet.loading`, `projeDetay.about`, `blog.postCount`.
- [x] Bilinen zararsız uyarılar (framer "container non-static position", three.js "THREE.Clock deprecated") olduğu gibi bırakıldı.
- [x] `README.md` yeni yapıya göre yeniden yazıldı (yayın akışı, içerik tablosu, blog yayınlama, görsel varlıklar, doğrulama betikleri).
- [x] CLAUDE.md güncellendi.

### 3.6 Teslim
- [x] Son kontrol: sayfalar masaüstü + mobil, konsol, 404; `npm run build` temiz.
- [x] Yayın günü blog tarihi ve taslak adresleri kontrol edildi (15.09.2026).
- [x] Commit: `Faz 8: kalite ve teslim`.
- [x] `main` 15.09.2026'da yayına alındı. Faz 8 değişiklikleri kullanıcı isteyince `git push` ile yayınlanır.

---

## 4. Yayından sonra — Blog yazı takvimi

Kullanıcı kararı (15.09.2026): yazılar SEO için ara ara, 2–3 haftada bir yayınlanır. Her yayında:
`data/blog.ts` → `taslak: false` + `tarih` = yayın günü → build → yayın → Search Console'da yazının adresi için
"dizine eklenmesini iste". Yayın sırası önerisi:

- [x] Mutfak kapağında akrilik mi, membran mı? (canlıya alınırken)
- [ ] Gola kulp nedir? Kulpsuz mutfak nasıl yapılır? (+2–3 hafta)
- [ ] Frenli menteşe ve tandem ray (+4–6 hafta)
- [ ] Bahçeşehir Mutfak proje hikâyesi (+6–9 hafta)
- [ ] Taslaklar bitince yeni konular: yalnızca marka sahibinden gelen bilgi ve proje açıklamalarıyla (uydurma içerik yok)

