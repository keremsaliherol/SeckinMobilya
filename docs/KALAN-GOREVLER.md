# Kalan Görevler — Faz 7 (Blog) ve Faz 8 (Kalite ve Teslim)

> **Yeni oturum buradan başlar.** Bu dosyadaki işaretlenmemiş (`- [ ]`) görevleri
> sırayla yap. Bitirdiğin maddeyi `- [x]` yap ve gerekirse kısa bir not düş.
> Genel plan ve önceki fazların notları: `docs/TASARIM-PLANI.md`.
>
> Hazırlandığı tarih: 15.09.2026 · Durum: Faz 0–7 tamamlandı ve **15.09.2026'da canlıya alındı** (kullanıcı kararı, Faz 8'den önce).
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

## 2. Faz 8 öncesi — Bekleyen kararları sor

Kullanıcı bu konuların fazlar bitince **birlikte** sorulmasını istedi. Faz 8'e başlamadan
`docs/TASARIM-PLANI.md` §10.5'teki açık maddeleri **tek tek** sor (AskUserQuestion uygun),
cevaba göre uygula ve listeyi güncelle:

- [x] **Aynı mutfak iki kez** (ana sayfada süreç bölümü + çizim/uygulama kaydırıcısı): kaydırıcı
  ana sayfada kalsın mı, `/oncesi-sonrasi`'ye mi taşınsın, gerçek öncesi/sonrası fotoğrafı mı beklensin?
  → Kullanıcı karar verdi (15.09.2026): kaydırıcı boş oda → bitmiş mutfak videosunun kareleriyle değişti.
- [ ] **Süreç videosu gerçek proje mi?** (`hf_…` dosya adı yapay zekâ üretimi olabilir; kaydırıcıdaki boş oda videosu da `hf_…`) — yayın onayı / metin
- [ ] **Taslak metinler:** "Her proje yerinde ölçüyle başlar", süreç adımları, "onaylanan çizimle
  üretim", Instagram bandı — marka sahibi onayladı mı?
- [ ] **Bağlantı parçaları** ("Minifix ve kavela") doğru mu? (`data/cabinetParts.ts` no. 10)
- [ ] **Ayak ölçüsü:** "12'lik ayak" = 12 cm mi?
- [ ] **Açılış fotoğrafı** (`public/hero/yatak-odasi.jpg`, kaynağı belirsiz) gerçek bir proje fotoğrafıyla değişsin mi?
- [ ] **Kapakta membran** seçeneği malzeme listesine eklensin mi? (şu an yalnızca akrilik yazıyor)

### Marka sahibinden beklenen bilgiler (§11) — geldiyse işle
- [ ] Gmail adresi → `lib/site.ts` (`contact.email`), CLAUDE.md, footer, iletişim kartı, JSON-LD `email`
- [ ] Gerçek müşteri yorumları → Hakkımızda'ya yorum bölümü (yoksa ekleme)
- [ ] 1975'ten bugüne kilometre taşları → Hakkımızda'ya zaman çizelgesi (yoksa ekleme)
- [ ] Oda fotoğrafları (kahve köşesi, TV ünitesi, giyinme odası) → `data/rooms.ts`
- [x] ~~Gerçek öncesi/sonrası fotoğraf çiftleri~~ → İptal (15.09.2026): kullanıcı `/oncesi-sonrasi` sayfasını ve projelerdeki öncesi/sonrası alanlarını kaldırdı.
  (uzun kenar ~1600 px, kalite ~%78, klasör adında Türkçe karakter yok)

---

## 3. Faz 8 — Kalite ve Teslim

### 3.1 SEO ve paylaşım
- [ ] **Google Search Console:** Kurulu değilse kurulsun (alan adı doğrulaması kullanıcı/marka sahibi hesabıyla yapılır),
  `https://seckinmimarliktr.com/sitemap.xml` gönderilsin. Kullanıcıya adım adım anlat; hesap işlemini kendisi yapar.
- [ ] **OG görseli yenile:** `public/og.jpg` hâlâ eski koyu tasarımdan. 1200×630, bej zemin,
  monogram (`components/ui/monogram.ts`) + "Seçkin Mimarlık" + gerçek bir proje fotoğrafı.
  Seçenek: `app/opengraph-image.tsx` (statik export'ta build sırasında üretilir; font dosyası
  gerekir) ya da sharp ile tek seferlik üretim. `app/layout.tsx` içindeki `ogImage.alt` ve yorumu güncelle.
- [ ] `app/layout.tsx` JSON-LD: `image` hâlâ `/hero/mutfak.jpg` → açılışta kullanılan ya da gerçek
  proje görseline çevir; `logo` `/icon.png` (yeni monogram, doğru); e-posta gelirse ekle.
- [ ] Sayfa `metadata` açıklamalarını yeni metinlerle uyumlu hâle getir (her `app/*/page.tsx`),
  blog dahil. Canonical'lar sonda `/` ile (trailingSlash) tutarlı mı kontrol et.
- [ ] `robots.ts` / `sitemap.ts` son hâl; `out/sitemap.xml` içeriğini kontrol et.
- [ ] Not: EN içerik ayrı URL'de değil (dil yalnızca istemci durumu) → arama motorları yalnızca TR
  görür. Bu bilinçli; değiştirilecekse kullanıcıya sor (ayrı `/en/` rotaları büyük iş).

### 3.2 Erişilebilirlik (`design:accessibility-review` skill'ini kullan)
- [ ] **"İçeriğe atla" linki yok:** `app/layout.tsx` → `<main id="icerik">` + gövdenin başına
  klavye odağında görünen gizli bağlantı (TR "İçeriğe atla" / EN "Skip to content").
- [ ] **`<html lang>` dil değişince güncellenmiyor:** `LanguageProvider` dil değişince
  `document.documentElement.lang` değerini `tr`/`en` yapmalı (efekt içinde DOM güncellemesi; setState değil).
- [ ] Klavye turu: menü paneli (odak tuzağı, Escape), Lightbox, ana sayfadaki boş oda / mutfak kaydırıcısı (ok tuşları),
  form, proje filtreleri, 3D bölüm (tuval `aria-hidden`, liste okunur olmalı).
- [ ] Kontrast: fotoğraf üstü yazılar (hero ikinci cümle, oda kartları), `text-muted` küçük yazılar,
  `on-ink/60` etiketler. Palet kontrast değerleri `docs/TASARIM-PLANI.md` §3.1'de.
- [ ] Görsel alt metinleri: galeri, oda kartları, hizmet görselleri, blog kapakları anlamlı mı.
- [ ] Hareketi azalt: tüm sayfalar `--azhareket` ile gezilsin (hero, süreç, oda kartları, dolap, proje şeridi, intro).

### 3.3 Performans
- [ ] Build çıktısını statik sunucuyla ölç (ör. `npx serve out` ya da `npx wrangler dev`) —
  Lighthouse (mobil): LCP, CLS, TBT. Hedef: LCP < 2.5 s, CLS < 0.1.
- [ ] İlk JS paketi ~851 KB (sıkıştırılmamış, Faz 5 ölçümü). framer-motion, lenis, React; gzip boyutunu ölç,
  gereksiz içe aktarmaları ara. three.js ayrı parçada (~895 KB, yalnızca dolap bölümüne yaklaşınca) — korunmalı.
- [ ] Görseller: proje fotoğrafları 1200×1600 (~100–200 KB). Izgaralarda (proje kartları, galeri,
  oda kartları) küçük sürüm yeterli → sharp ile 600 px genişlikte kopya üretip `srcset`/`sizes`
  eklemeyi değerlendir (`images.unoptimized: true`, yani Next görsel optimizasyonu yok).
- [ ] Hero görseli (`fetchPriority="high"`) boyutu; `public/hero/*.jpg` optimizasyonu.
- [ ] Süreç kareleri (masaüstü 96 / mobil 48, ~4 MB) bölüme yaklaşınca iniyor — ağ sekmesinde tekrar doğrula.
- [ ] Font yüklemesi: Cormorant italik gerçekten kullanılıyor mu (evet: vurgu satırları); gereksiz ağırlık var mı.

### 3.4 Tarayıcı ve cihaz
- [ ] Safari/iOS riskleri: `dvh`, `clip-path: inset(... round ...)` (hero kapsül), canvas çizimi,
  `position: sticky` + Lenis, `inert` özniteliği. Gerçek iPhone'da kullanıcıdan test iste.
- [ ] Firefox'ta hero kapsül ve 3D dolap.
- [ ] Yavaş ağda (DevTools throttling) süreç bölümü ve dolap yedek görselleri.

### 3.5 Temizlik
- [ ] Kullanılmayan dosyalar: `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
  (Next şablonundan kalma), `public/hero/santiye.jpg` (artık kullanılmıyor), `public/hero/mutfak.jpg`
  (yalnızca JSON-LD'de; 3.1'den sonra kullanılmıyorsa sil). Silmeden önce `grep` ile doğrula.
- [ ] Kullanılmayan çeviri anahtarlarını ara (`LanguageContext.tsx`, `pageTranslations.ts`).
- [ ] Bilinen zararsız uyarılar: dev'de framer-motion "container non-static position"
  (pencere kaydırmasında ölçümler doğru; istenirse `html { position: relative }` denenip hero/dolap ölçümleri yeniden doğrulanır),
  three.js "THREE.Clock deprecated" (R3F içi).
- [ ] `README.md`'yi yeni yapıya göre güncelle (içerik güncelleme tablosu: projeler, blog, hizmet görselleri,
  dolap malzemeleri `data/cabinetParts.ts`; 3D dolap yedek görsellerinin nasıl yeniden üretileceği).
- [ ] CLAUDE.md'yi son hâle getir; "Devam eden iş" bölümünü kaldır ya da güncelle.

### 3.6 Teslim
- [ ] Son tam kontrol: tüm sayfalar masaüstü + mobil + hareketi azalt; konsol hatası yok; 404 çalışıyor.
- [ ] `npm run build` temiz; `out/` statik sunucuda gezilebiliyor (404 dahil).
- [x] Yayın günü: `data/blog.ts` → akrilik yazısının `tarih` alanını gerçek yayın gününe çek; `out/sitemap.xml`'de
  yalnızca bu yazı var mı, diğer üç yazının adresi 404 veriyor mu kontrol et. Kapak fotoğrafının yayın izni (§10.5) alınmış olmalı.
  → 15.09.2026: tarih zaten yayın günü; sitemap ve taslak adresleri kontrol edildi. Kullanıcı kapak fotoğrafıyla yayınlamayı seçti; izin marka sahibiyle ayrıca teyit edilecek.
- [ ] Commit: `Faz 8: kalite ve teslim`; plan dosyasında tüm fazlar ✅.
- [x] Kullanıcıya sor: `yeniden-tasarim` → `main` birleştirilsin mi, yayına (Cloudflare Pages) alınsın mı?
  → 15.09.2026: kullanıcı istedi, `main`'e alındı ve GitHub'a gönderildi (Faz 8'den önce). Faz 8 düzeltmeleri de aynı yolla yayınlanır.
  Cloudflare ayarları değişmedi: build `npm run build`, çıktı `out`, framework preset "None".

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

