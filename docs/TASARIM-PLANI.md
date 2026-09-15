# Seçkin Mimarlık — Yeniden Tasarım Planı

> Durum: **Onaylandı (15.09.2026)** · Çalışma dalı: `yeniden-tasarim`
> Her faz ayrı ayrı yapılır, gösterilir, onaylanınca bir sonrakine geçilir.
>
> | Faz | Durum |
> |---|---|
> | 0 Hazırlık | ✅ Tamamlandı |
> | 1 Tasarım sistemi | ✅ Tamamlandı |
> | 2 Kabuk | ✅ Tamamlandı |
> | 3 Ana sayfa | ✅ Tamamlandı |
> | 4 Çizimden gerçeğe (video) | ✅ Tamamlandı |
> | 5 3D dolap anatomisi | ✅ Tamamlandı |
> | 6 İç sayfalar | ✅ Tamamlandı |
> | 7 Blog | ✅ Tamamlandı (4 yazı taslak, onay bekliyor) |
> | 8 Kalite ve teslim | ⏳ Sırada (önce §10.5 kararları sorulacak) |
>
> **Kalan işlerin ayrıntılı listesi: [`docs/KALAN-GOREVLER.md`](KALAN-GOREVLER.md)**

## 1. Bağlam

Site şu an **koyu tema** (siyah + bronz, Playfair + Inter). Marka sahibi,
**tmcmimari.com** gibi açık, fotoğraf ağırlıklı ve sade bir görünüm istiyor. Yeni
renk paleti ve yeni logo (kapsül içinde "S" monogramı) belirlendi. Bu fırsatla
siteye rakiplerden ayrıştıracak iki etkileyici bölüm ekleyeceğiz:

1. Kaydırdıkça **çizimden gerçek mutfağa dönüşen** video bölümü (projedeki videolar)
2. Kaydırdıkça **parçalarına ayrılan 3D dolap** (exploded view), yanında malzeme bilgileri

**Telif notu:** TMC'nin **sayfa yapısını ve tasarım yaklaşımını** örnek alıyoruz.
Metinlerini, fotoğraflarını, logosunu ve kodunu kopyalamıyoruz. Tüm içerik Seçkin'e ait olacak.

---

## 2. Referans site analizi (tmcmimari.com)

| Sayfa | Yapı |
|---|---|
| **Ana sayfa** | Şeffaf üst menü → tam ekran iç mekân fotoğrafı + büyük başlık + koyu dikdörtgen "Projeleri İncele" butonu → kısa slogan + sosyal ikonlar → büyük **öncesi/sonrası kaydırıcısı** → 9 **oda kategorisi** kartı (büyük fotoğraf + ortada etiket) → koyu footer |
| **Projeler** | Başlık + fotoğraf galerisi + büyütme penceresi (lightbox) |
| **Hakkımızda** | Giriş metni + buton → "Tasarım felsefemiz" (3 çevrilen kart) → 4 sayaç → müşteri yorumları |
| **İletişim** | "Link-in-bio" tarzı kart (ad, açıklama, butonlar) + Instagram akışı |
| **Blog** | Görselli yazı listesi (tarih + özet), proje odaklı SEO yazıları |
| **Genel** | Beyaz zemin, #1A1A1A/#2A2A2A koyu vurgular, **Outfit** fontu, logo solda, menü ortada büyük harf, hamburger ile açılan yan panel, sağ altta sabit yeşil "WhatsApp'tan Bilgi Al" butonu |

**Referansta alacağımız güçlü yanlar:** fotoğraf odaklı sade düzen, büyük
öncesi/sonrası karşılaştırması, oda kategorisi kartları, sabit WhatsApp butonu,
link-in-bio iletişim kartı.

**Referansı geçeceğimiz yerler:**
- Açılışta sayfa bir süre **bembeyaz** görünüyor (ağır Elementor + Slider Revolution). Bizim site statik ve hızlı kalacak.
- Çevrilen kartlar dokunmatik ekranda içeriği saklıyor. Bizde içerik açıkta olacak.
- Instagram eklentisi sayfayı ~5500 px uzatıyor. Bizde hafif, statik bir Instagram ızgarası olacak.
- Referansta süreç anlatımı, 3D ve form yok. Bizde hepsi olacak.

---

## 3. Tasarım sistemi

### 3.1 Renkler: "Sıcak Bej & Kahve" (kontrast değerleri ölçüldü)

| Görev | Renk | HEX | Kullanım kuralı |
|---|---|---|---|
| Ana zemin | Kırık sıcak bej | `#F6F1EA` | Sayfa arka planı |
| İkincil zemin | Açık bej | `#E7DED2` | Kartlar, alternatif bölümler, 3D sahne |
| Vurgu | Sıcak taş | `#C6B29A` | **Sadece** çizgi, ayraç, büyük dekoratif öğe (bej üstünde 1.8:1, yazıda kullanılmaz) |
| Ana koyu | Koyu kahve | `#4A372A` | Butonlar, footer, CTA bandı (bej üstünde 10:1) |
| Metin | Çok koyu | `#1A1A1A` | Başlık ve gövde metni (15.5:1) |
| Soluk metin | Kahve gri | `#6B5B4E` | Açıklama, etiket (5.8:1, AA geçer) |
| Logo kahvesi | Monogram | `#734925` | Logodan ölçüldü: logo, küçük vurgular, aktif menü (6.9:1) |

- Koyu bölümler siyah değil, **koyu kahve** (`#4A372A`) olacak. Böylece açık sayfada "yanlışlıkla konmuş siyah blok" hissi oluşmaz.
- Gölgeler siyah değil, kahve tonlu (`rgba(74,55,42,…)`).
- Mevcut hafif grain (kumlu doku) efekti açık zemine göre ayarlanıp korunacak.

### 3.2 Tipografi

- **Başlıklar:** *Cormorant Garamond*. İnce-kalın kontrastı logodaki zarif "S" ile uyumlu.
- **Gövde, menü, buton:** *Outfit* (referansın fontu). Geometrik ve modern.
- **Mevcut hata düzeltmesi:** Fontlar şu an sadece `latin` alt kümesiyle yükleniyor, bu yüzden **ş, ğ, ı, İ** harfleri yedek fonttan geliyor. Yeni fontlar `latin-ext` ile yüklenecek.
- Büyük başlıklarda negatif harf aralığı, küçük etiketlerde geniş harf aralığı. Başlıklarda `text-wrap: balance`. Rakamlarda `tabular-nums`.

### 3.3 Logo ve marka motifi

- `seckinlogo.jpeg` **vektöre (SVG) çevrilecek.** Kapsül çerçeve, "S" ve ince çapraz çizgiler olarak ayrı parçalar halinde. Böylece her boyutta net görünür ve animasyonla çizilebilir.
- `components/ui/Logo.tsx` baştan yazılacak: **monogram + "SEÇKİN MİMARLIK" yazısı + "Tasarım · Üretim · Montaj"** alt satırı (videonun kapanış kartındaki ifade).
- Yeni logodan `app/icon.png`, `app/apple-icon.png`, `favicon.ico` ve `public/og.jpg` yeniden üretilecek.
- **Kapsül motifi** sitenin imzası olacak: kapsül maskeli fotoğraflar, kapsül çerçeveli video, logodaki çapraz çizgiden türetilen ince ayraçlar. (Referansın açılış fotoğrafındaki kapsül ayna da bu fikri destekliyor.)
- **Marka cümlesi:** "Önce çiziyoruz. Sonra birebir uyguluyoruz." (videodan) + "1975'ten bugüne".

---

## 4. Yeni sayfa kurgusu

### 4.1 Ortak kabuk
- **Üst menü:** Açılışta fotoğraf üstünde şeffaf, kaydırınca bej zemine geçer. Logo solda, menü ortada küçük büyük harf, sağda telefon ikonu ve hamburger. Aktif sayfa logo kahvesiyle işaretlenir.
- **Yan panel (hamburger):** Mevcut `InfoModal` yerine sağdan açılan panel. İçinde proje küçük görselleri, telefonlar, Instagram, adres ve harita linki.
- **Sabit WhatsApp butonu:** Sağ altta "WhatsApp'tan bilgi al". Marka rengine uygun, kahve zeminli.
- **Footer:** Koyu kahve zemin. Monogram, iletişim bilgileri, site haritası. Sabit yazılmış Instagram linki `lib/site.ts`'ye bağlanacak.
- **Açılış perdesi (Intro):** Logo **kendini çizer** (kapsül çizgisi → S dolar). "Önce çiziyoruz" temasıyla uyumlu. Oturumda bir kez gösterilir, güvenlik ağı korunur.
- **Özel imleç (CustomCursor)** kaldırılacak. Açık ve sade tasarımda gereksiz, kullanılabilirliği düşürüyor.
- **Özel 404 sayfası** eklenecek. `wrangler.jsonc` zaten 404 sayfası bekliyor.

### 4.2 Ana sayfa (yukarıdan aşağıya)

| # | Bölüm | Açıklama |
|---|---|---|
| 1 | **Açılış (Hero)** | Tam ekran fotoğraf, serif başlık, koyu kahve "Projeleri İncele" butonu. **Farkımız:** fotoğraf önce logodaki gibi bir **kapsül içinde** görünür, kaydırdıkça tam ekrana açılır. |
| 2 | **Slogan** | "Önce çiziyoruz. Sonra birebir uyguluyoruz." + tek cümle tanıtım + Instagram / WhatsApp / Harita ikonları |
| 3 | **Çizimden gerçeğe** 🎬 | Kaydırmayla oynayan video (bkz. §5) |
| 4 | **Oda kategorileri** | Mutfak · Yatak & giyinme odası · TV ünitesi · Kahve köşesi · Ofis & ticari · Anahtar teslim. Referanstaki büyük kartlar, ama eşit 3'lü ızgara yerine **asimetrik ızgara**. Kaydırırken hafif **3D eğim ve derinlik** (parallax). |
| 5 | **Bir dolabın anatomisi** 🧩 | 3D exploded view (bkz. §6) |
| 6 | **Çizim / Uygulama karşılaştırması** | Referanstaki gibi büyük sürükleme kaydırıcısı. İlk karşılaştırma videodan: çizim karesi ↔ gerçek mutfak karesi (birebir hizalı). |
| 7 | **Öne çıkan projeler** | Sabitlenen yatay kayan proje şeridi |
| 8 | **Rakamlar** | 1975 · 100+ proje · 50+ yıl · 5+ ülke. İnce çizgiler, sayaç animasyonu. |
| 9 | **Instagram + CTA** | Koyu kahve bant: "Bir proje başlatalım", WhatsApp ve telefon. Yanında telefon çerçevesinde **reels videosu** (`seckin_blueprint_reels`) döngüde oynar, "@seckinmobilyainsaat" linki. |

### 4.3 İç sayfalar

- **Projelerimiz:** Kategori filtresi (mevcut) + **masonry ızgara** + mevcut `Lightbox`. Kartlarda kaydırırken hafif derinlik efekti.
- **Proje detay:** Büyük kapak fotoğrafı, künye (konum, yıl, kategori), masonry galeri, "Sonraki proje", CTA.
- **Hizmetlerimiz:** Eşit kartlar yerine numaralı **zig-zag** düzen (fotoğraf + alt hizmetler). Her hizmetten ilgili projelere link.
- **Hakkımızda:** Metin + kapsül maskeli fotoğraf → "Tasarım felsefemiz" (3 madde, çevrilen kart yok) → **1975'ten bugüne zaman çizelgesi** → rakamlar → müşteri yorumları (*gerçek yorum gelirse*).
- **Öncesi-Sonrası:** Şu an **boş** (hiçbir projede öncesi/sonrası görseli yok). Video karelerinden gelen ilk karşılaştırmayla dolacak, yeni görsellere hazır olacak.
- **İletişim:** Referanstaki gibi **link-in-bio kartı** (Ara · WhatsApp · Instagram · Yol tarifi) + mevcut WhatsApp formu + harita + Instagram ızgarası.
- **Blog (opsiyonel, Faz 7):** Proje hikâyeleri ve SEO yazıları, statik veri dosyasından. İçerik gerektirir.

---

## 5. "Çizimden gerçeğe" kaydırmalı video bölümü

**Kaynak:** İki video da 1440×2560 (dikey), 8 sn, 24 fps. İçerik: mutfak çizimi → renklenme → gerçek fotoğraf.
- `hf_20260914_…mp4`: **yazısız** sürüm → kaydırma bölümünde kullanılacak. Yazıları HTML ile kendimiz koyacağız; iki dil desteklenir ve metin net kalır.
- `seckin_blueprint_reels.mp4`: **yazılı** sürüm ("Önce çiziyoruz." / "Sonra birebir uyguluyoruz." / "SEÇKİN MİMARLIK · Tasarım · Üretim · Montaj") → Instagram/CTA bölümündeki telefon çerçevesinde döngüde oynayacak.

**Nasıl çalışacak:**
- Bölüm ekrana sabitlenir (~300vh kaydırma alanı). Kaydırma ilerledikçe video kareleri bir `<canvas>`'a çizilir. Bu yöntem Apple ürün sayfalarında da kullanılıyor; `video.currentTime` ile ileri-geri sarmaktan çok daha akıcı ve Safari'de güvenilir.
- Kareler ffmpeg ile çıkarılır: ~96 WebP kare (12 fps, 720×1280, toplam ~3–4 MB). Bölüme yaklaşınca yüklenir. İlk kare her zaman hemen görünür.
- Metin adımları: **01 Tasarım** (çizim) → **02 Üretim** (renklenme) → **03 Montaj** (gerçek mekân).
- **Masaüstü:** Solda adımlar, sağda kapsül/yuvarlatılmış çerçevede dikey video.
- **Mobil:** Video zaten dikey olduğu için tam ekran oynar, metinler üstünde.
- **Hareketi azalt ayarı açıksa:** Kaydırma animasyonu yerine çizim/gerçek karşılaştırma kaydırıcısı gösterilir.
- Reels videosu ~9.7 MB → ~1.5 MB'a sıkıştırılır (720p, sessiz).

---

## 6. "Bir dolabın anatomisi": 3D exploded view

**Yaklaşım:** Dolap **kodla modellenir** (Three.js + React Three Fiber). Hazır 3D dosya gerekmez, renkler paletle birebir eşleşir, her parça ayrı kontrol edilir ve dosya boyutu küçük kalır.

**Sahne:** Açık bej zeminde, yumuşak ışıklı bir dolap (üst dolap + çekmeceli alt modül). Ekran sabitlenir. Kaydırdıkça **sırayla** parçalarına ayrılır: kapaklar → çekmeceler → raflar → arkalık → yan paneller. Her parça ayrılırken yanında etiketi belirir. Son aşamada dolap kendini yeniden toplar ve "Bu dolabı sizin için ölçüye özel üretiyoruz" CTA'sı çıkar.

**Parça ve malzeme listesi (taslak, marka sahibi doğrulamalı):**

| Parça | Hammadde / Donanım (taslak) |
|---|---|
| Yan paneller, alt/üst tabla | 18 mm suntalam / MDF-lam |
| Arkalık | 8 mm MDF |
| Raflar | 18 mm gövde malzemesi + raf pimi |
| Kapaklar | 18 mm lake MDF / akrilik / ahşap kaplama |
| Kenar bandı | 1–2 mm PVC / ABS |
| Menteşe | Frenli (yavaş kapanan) menteşe |
| Çekmece rayı | Frenli, tam açılım ray |
| Kulp | Alüminyum profil / gizli kulp |
| Bağlantı | Minifix + kavela |
| Ayak / baza | Ayarlanabilir ayak + baza |

**Teknik detaylar:**
- Yeni paketler: `three`, `@react-three/fiber`, `@react-three/drei`. React 19 uyumlu sürümler kurulumda doğrulanacak.
- **Sadece tarayıcıda** ve **bölüme yaklaşınca** yüklenir. İlk açılış hızı etkilenmez, statik export bozulmaz.
- Mobilde piksel yoğunluğu düşürülür. Etiketler 3D sahnede değil, altında liste olarak gösterilir.
- **WebGL yoksa veya hareket azaltılmışsa:** Aynı dolabın statik exploded çizimi (SVG) ve malzeme listesi gösterilir.

---

## 7. Uygulama fazları

Her faz sonunda: build + tarayıcıda masaüstü/mobil kontrol + ekran görüntüsü + onay.

### Faz 0: Hazırlık
- `npm install` (node_modules şu an kurulu değil). `node_modules/next/dist/docs` okunur (AGENTS.md kuralı).
- **Git başlatma önerisi:** Proje git deposu değil. Büyük değişiklik öncesi `git init` + ilk commit yapılırsa her faz geri alınabilir olur.
- Varlık hazırlığı (araçlar geçici klasörde çalışır, projeye sadece çıktılar girer):
  - Logo → SVG (`public/brand/`)
  - Video → WebP kare dizisi (`public/surec/kareler/`), çizim/uygulama kareleri, sıkıştırılmış reels (`public/video/`)
  - Kök dizindeki orijinal `.mp4` ve `.jpeg` dosyaları `assets-kaynak/` klasörüne taşınır (yayına girmez).

### Faz 1: Tasarım sistemi *(site hemen "yeni" görünür)*
- `app/globals.css`: Yeni renk değişkenleri, `color-scheme: light`, kahve tonlu gölgeler, kaydırma çubuğu ve seçim renkleri.
- `app/layout.tsx`: Cormorant Garamond + Outfit (`latin-ext`), `themeColor: #F6F1EA`.
- Koyu temaya bağlı sınıfların taranıp açık temaya çevrilmesi (**104 kullanım**, ~9 dosya: `text-white`, `bg-black/…`, `from-black…`).
- `components/ui/Logo.tsx`: SVG monogram. Favicon ve OG görseli yenilenir.
- Buton, link ve etiket stilleri tek yerde.

**Faz 0–1 notları (uygulama sırasında öğrenilenler):**
- ~~Çizim ve uygulama kareleri hizalı değil~~ → **Yanlış gözlem.** Faz 3'te kenar eşleştirmesiyle doğrulandı: ilk ve son kare aynı açıda, birebir hizalı. Kamera yalnızca ara karelerde (36–72) hareket ediyor.
- OG paylaşım görseli (`public/og.jpg`) Faz 8'e bırakıldı. Logolu yeni görsel orada üretilecek.
- Edge headless ekran görüntüsünde minimum pencere genişliği ~500 px. Mobil kontrol için tarayıcı panelinin mobil görünümü kullanılmalı.
- Eski koddan kalan bir hata düzeltildi: Ana sayfadaki hizmet sütunlarının iç boşluğu sıfırlanıyor, metinler birbirine yapışıyordu.

### Faz 2: Kabuk
`Navbar.tsx` · yan panel (`InfoModal.tsx` yerine) · `Footer.tsx` · `WhatsAppButton.tsx` (yeni) · `Intro.tsx` (logo çizim animasyonu) · `app/not-found.tsx` (yeni) · `CustomCursor` kaldırılır.

**Faz 2 notları:**
- Menüdeki telefon numarası kaldırıldı. 1440 px'te üç satıra bölünüyordu, referans sitede de yok. Telefona WhatsApp butonu, yan panel ve footer'dan ulaşılıyor.
- `h1–h6` yazı tipi kuralı `@layer base` içine alındı. Katmansız kural `font-sans` gibi yardımcı sınıfları eziyordu.
- Kaydırma kilidi: `kaydirmayiKilitle()` (`SmoothScrollProvider.tsx`) hem `body` taşmasını hem Lenis'i durdurur.
- Mobilde sabit WhatsApp butonu, hero'daki "sonraki slayt" okuyla çakışıyor. Faz 3'te yeni hero'da slayt kontrolleri kalkacak, çakışma kontrol edilmeli.

### Faz 3: Ana sayfa (videosuz / 3D'siz bölümler)
- Hero (kapsül → tam ekran), slogan, oda kategorileri (3D eğim), öne çıkan projeler, rakamlar, Instagram + CTA.
- `BeforeAfterSlider`, `app/oncesi-sonrasi/OncesiSonrasiContent.tsx` içinden `components/ui/BeforeAfterSlider.tsx`'e taşınır. Klavye ile kullanım ve pointer event desteği eklenir.
- Yeni veri: `data/rooms.ts` (oda kategorileri ve görselleri).

**Faz 3 notları:**
- Ana sayfa akışı: Hero (kapsül → tam ekran) · Önce çiziyoruz · Oda kategorileri · Çizim/Uygulama · Proje şeridi · Rakamlar · Instagram. Faz 4 videosu IntroStatement'tan, Faz 5 dolabı RoomCategories'ten sonra girecek (`app/page.tsx` yorumunda).
- **framer-motion tuzağı:** `useScroll({ target })` + `useTransform(v, [..], [..])` (dizi biçimi) opaklık/transform için tarayıcı hızlandırmalı ScrollTimeline kuruyor. Hedef ref henüz bağlı olmadığından **tüm sayfanın** kaydırma aralığını kullanıyor, değerler yanlış çıkıyor. Çözüm: `useTransform(v, transform([..], [..]))` (fonksiyon biçimi).
- Süreç videosu (`hf_…`) büyük olasılıkla yapay zekâ ile üretildi. Karşılaştırma bölümünde "teslim ettiğimiz proje" gibi bir iddia yok. Marka sahibine gerçek proje olup olmadığı sorulmalı.
- Eski ana sayfa bileşenleri silindi: MarqueeStrip, ServicesTeaser, AboutTeaser (stok fotoğraflıydı), CtaBanner. Kullanılmayan CSS (ken-burns, grain, underline-link) temizlendi.
- Geliştirme sunucusu uzun oturumda bellek sınırına (~8 GB) ulaşıp çöktü. Olursa `preview_start` ile yeniden başlatmak yeterli.
- Kaydırmaya bağlı bölümleri doğrulamak için Edge DevTools protokolüyle kaydırma noktalarında ekran görüntüsü alınıyor. Tarayıcı paneli kaydırma sonrası görüntü alamıyor.

### Faz 4: Çizimden gerçeğe kaydırmalı video
`components/home/ProcessScroll.tsx` (canvas + `framer-motion` `useScroll`, mevcut Lenis ile uyumlu).

**Faz 4 notları:**
- `components/home/ProcessScroll.tsx`: bölüm sabitlenir, kaydırma ilerlemesi 96 kareye eşlenir ve kareler <canvas>'a çizilir. Adımlar: 0–%27 Tasarım, %27–55 Üretim, %55+ Montaj (videodaki geçişlerle eşleşik).
- Yükleme doğrulandı: sayfa açılışında yalnızca poster (001) iner. Kalan kareler bölüme bir ekran boyu kala başlar; masaüstünde 96, mobilde 48 kare (her ikinci kare). Eksik kare yerine en yakın yüklenmiş kare çizilir.
- Hareketi azaltma tercihinde üç sabit kare ve üç adım gösterilir (`SurecSabit`).
- `components/ui/useMediaQuery.ts` eklendi (`useSyncExternalStore`). FeaturedProjects da bu hook'a geçti.
- **Geliştirme sunucusu çökmesinin nedeni:** dev sunucusu açıkken `npm run build` çalıştırmak. Build `out/` klasörünü (kareler dahil) yeniden yazıyor, Turbopack izleyicisi ~10–15 dk içinde 8 GB belleğe çıkıp çöküyor. Build öncesi dev sunucusu durdurulmalı.
- Ana sayfada aynı mutfak iki kez görünüyor (süreç bölümü + çizim/uygulama kaydırıcısı). Gerçek öncesi/sonrası fotoğrafları gelince karşılaştırma bölümü onlarla değiştirilmeli.

### Faz 5: 3D exploded dolap
`components/home/cabinet/` (sahne, parça tanımları, etiketler, statik yedek) + `data/cabinetParts.ts` (TR/EN).

**Faz 5 notları:**
- Dosyalar: `components/home/cabinet/` (CabinetSection: yerleşim ve yedekler · CabinetCanvas: R3F sahnesi · zamanlama.ts: kaydırma → aşama eşlemesi), `data/cabinetParts.ts` (parça ve malzeme listesi, TR/EN).
- Paketler: three 0.186, @react-three/fiber 9.7, @react-three/drei 10.7 (React 19.2 ile uyumlu). three.js ayrı parçada (~895 KB, gzip ~230 KB); ilk açılış paketinde yok, bölüme bir ekran kala iner.
- Sahne `frameloop="demand"`: yalnız kaydırma değişince çizilir. drei `<Html>` işaretleri bir kare gecikmesin diye ilerleme değişince bir kare daha çizdirilir.
- Yedek görseller `public/anatomi/dolap-kapali.webp` (tuval yüklenirken) ve `dolap-acik.webp` (WebGL yok / hareket azaltma) **aynı 3D sahneden** alındı: Edge (SwiftShader) + DevTools, 1440×900 @2x, bölüm ilerlemesi 0.02 ve 0.60, tuval kutusu kırpılıp 1400 px WebP. Model değişirse yeniden üretilmeli.
- Mobilde alt açıklama paneli sabit yükseklikte (`h-60`); aksi hâlde aşama değişince tuval boyu ve dolabın büyüklüğü oynuyordu. Dar ekranda kamera daha geride.
- Konsolda three.js kaynaklı zararsız "THREE.Clock deprecated" uyarısı var (R3F içi), işlevi etkilemiyor.

### Faz 6: İç sayfalar
Projelerimiz, proje detay, hizmetlerimiz, hakkımızda, öncesi-sonrası, iletişim (§4.3).

**Faz 6 notları:**
- Ortak başlık: `components/ui/PageHeader.tsx` (iki satırlı başlık, ikinci satır italik logo kahvesi).
- **Stok görsel kalmadı:** Hakkımızda ve Hizmetlerimiz'deki Unsplash görselleri gerçek proje fotoğraflarıyla değişti. `data/services.ts` artık yalnızca görsel + örnek proje bağlantısı tutuyor, metinler `pageTranslations`'ta.
- Proje detay: sunucu bileşeni (metadata, JSON-LD) + `ProjeDetayContent.tsx` (istemci, TR/EN). Eski `ProjectGallery.tsx` silindi. Kemerli kapak, künye, sütunlu galeri + Lightbox, projeye özel hazır WhatsApp mesajı, "Diğer projeler".
- Öncesi/Sonrası artık boş değil: üstte çizim/uygulama karşılaştırması (CompareSection). `data/projects.ts` içinde `beforeImage` + `afterImage` eklenen projeler altta kendiliğinden listelenir.
- İletişim: kapsül tepeli link-in-bio kartı (Ara · WhatsApp · Instagram · Yol tarifi), alt çizgili form (WhatsApp'a gider), soldurulmuş harita.
- Hakkımızda'da **zaman çizelgesi ve müşteri yorumları yapılmadı**: kilometre taşları ve gerçek yorumlar gelmeden uydurma içerik konmadı (§11).
- Lightbox da `kaydirmayiKilitle` kullanıyor. Cormorant fontunda sayılar her yerde düz rakam (`.font-heading` → lining-nums).
- Plandaki "Instagram ızgarası" yapılmadı: proje fotoğraflarını Instagram gönderisi gibi göstermek yanıltıcı olurdu. Ana sayfadaki reels bandı ve iletişim kartındaki Instagram bağlantısı yeterli görüldü.

### Faz 7: Blog *(opsiyonel)*
`app/blog/`, `app/blog/[slug]/`, `data/blog.ts`, sitemap güncellemesi.

**Faz 7 notları:**
- İçerik düz veri (`data/blog.ts`: başlık, özet, tarih, kapak, bölümler → paragraf / madde listesi / görsel / site içi bağlantı). Yazılar yalnızca Türkçe; EN seçilince yazı sayfasında "yalnızca Türkçe" notu çıkar, arayüz etiketleri çevrilir.
- **Taslak akışı:** `taslak: true` yazı listede ve sitemap'te yok; dev sunucusunda "Taslak" etiketiyle önizlenir. Build'de sayfası yine üretilir (statik dışa aktarma boş `generateStaticParams` kabul etmiyor) ama 404 içeriği + `noindex` gösterir, metin sızmaz. Yayında yazı yokken `/blog/` "Yakında ilk yazımızı paylaşacağız" boş durumunu gösterir.
- Liste: ilk yazı büyük (fotoğraf solda), diğerleri 3 sütun. Yazı sayfası: kemerli kapak, masaüstünde sabit "Bu yazıda" içindekiler, 68ch gövde (Outfit 18px, satır aralığı 1.8), ilgili proje kartı, yazıya özel WhatsApp mesajı, "Diğer yazılar". JSON-LD `BlogPosting` + `BreadcrumbList` (`<` kaçırılarak).
- İlk 4 taslak: akrilik/membran kapak, gola kulp, frenli menteşe + tandem ray, Bahçeşehir Mutfak. Proje hikâyesi için Daca Boutique yerine **Bahçeşehir Mutfak** seçildi: Daca'nın açıklaması yazı çıkaracak kadar ayrıntılı değil, Bahçeşehir'inki malzeme ve düzen bilgisi içeriyor.
- **Menü:** 7 bağlantı 1280 px'te iki satıra düşüyordu. Masaüstü menü artık 1280 px ve üstünde (`xl`), aralık 1400 px altında daraltıldı; 1024–1279 px arasında yalnızca "Menü" düğmesi var.
- Sayfa geçişinde adres `#` içeriyorsa (blogdan `/#dolap`) kaydırma o bölüme gider (`SmoothScrollProvider`). Ana sayfadaki dolap bölümüne `id="dolap"` eklendi.

### Faz 8: Kalite ve teslim
Mobil kontroller, erişilebilirlik (odak halkası, kontrast, alt metinler, klavye, "içeriğe atla" linki), hareketi azalt ayarı, performans (görsel boyutları, lazy-load, JS boyutu), SEO meta/OG güncellemesi, `npm run build` ile statik export testi, `CLAUDE.md` ve `README.md` güncellemesi.

---

## 8. Korunacak mevcut yapılar
- `lib/site.ts`: Tüm iletişim bilgileri için tek kaynak.
- `components/ui/animations.tsx`: `useReveal` + `data-reveal` görünürlük güvencesi. **İlke: animasyon süstür, içerik ona bağlı olamaz.** Video ve 3D bölümleri de bu ilkeye uyar (ilk kare / statik yedek her zaman görünür).
- `components/ui/SmoothScrollProvider.tsx`: Sağlık kontrollü Lenis.
- `components/ui/Lightbox.tsx`, `data/projects.ts` içindeki `galeri()` ve `getUsedCategories()`.
- TR/EN dil sistemi. Tüm yeni metinler iki dilde yazılır.
- Statik export (`output: "export"`) ve Cloudflare yayını.

## 9. Kullanılacak skill'ler
- **redesign-skill:** Mevcut tasarımın denetimi ve düzeltme sırası (font → renk → durumlar → yerleşim)
- **frontend-design / taste-skill:** Estetik yön, şablon görünümünden kaçınma
- **ui-ux-pro-max:** Palet, font eşleşmesi ve bileşen kontrolü
- **design:accessibility-review:** Faz 8 erişilebilirlik denetimi
- **Tarayıcı ile doğrulama:** Her fazda dev sunucusu (`seckin-dev`) üzerinden masaüstü/mobil ekran görüntüleri

## 10. Doğrulama
1. `npm run lint` ve `npm run build`: Hatasız biter, `out/` klasörü oluşur.
2. Dev sunucusunda her sayfa 1440 px ve 375 px genişlikte gezilir, konsol hataları kontrol edilir.
3. Video bölümü: Kaydırma ileri-geri akıcı, ilk kare hemen görünür, ağ sekmesinde kareler sadece bölüme yaklaşınca iner.
4. 3D bölümü: Parçalar sırayla ayrılır/birleşir. WebGL kapalı ve hareket azaltılmış modda statik yedek görünür.
5. Öncesi/sonrası kaydırıcısı fare, dokunma ve klavye ile çalışır.
6. WhatsApp, telefon, Instagram ve harita linkleri doğru hedefe gider.
7. Türkçe karakterler (ş, ğ, ı, İ) yeni fontlarla doğru görünür.

## 10.5 En sona bırakılan kararlar

> Kullanıcı bu konuların fazlar bitince **birlikte** gözden geçirilmesini istedi (15.09.2026).
> Faz 8'den önce hepsi tek tek sorulacak.

- [ ] **Aynı mutfak iki kez:** Ana sayfada süreç bölümü ve çizim/uygulama kaydırıcısı aynı videoyu kullanıyor. Gerçek öncesi/sonrası fotoğrafı gelirse kaydırıcı onunla değişecek, gelmezse `/oncesi-sonrasi` sayfasına taşınacak.
- [ ] **Süreç videosu gerçek proje mi?** Dosya adı (`hf_…`) yapay zekâ üretimini düşündürüyor. Metinler bu yüzden tarafsız. Gerçekse metin güçlendirilecek, değilse marka sahibinin yayın onayı alınacak.
- [ ] **Taslak metinler:** "Her proje yerinde ölçüyle başlar", süreç adımlarının açıklamaları, "üretime onaylanan çizimle başlıyoruz", Instagram bandı cümleleri.
- [x] ~~Dolap malzeme etiketleri~~ → Marka sahibinden alındı (15.09.2026), `data/cabinetParts.ts` güncellendi. "Projeye göre birlikte belirlenir" notunun kalması onaylandı.
- [ ] **Bağlantı parçaları (10. madde):** "Minifix ve kavela" hâlâ doğrulanmadı.
- [ ] **Ayak ölçüsü:** Marka sahibi "12'lik ayak" dedi, sitede "12 cm ayak" yazıyor. cm olduğu teyit edilmeli.
- [x] ~~3D dolabın görünümü~~ → Marka sahibinin gönderdiği ürün fotoğrafına (`assets-kaynak/dolap.jpeg`) göre yeniden modellendi: şampanya akrilik kapak, siyah gola, solda 2 çekmece + sağda çift kapak, 12 cm ayak.
- [ ] **Blog kapağında ürün fotoğrafı:** "Akrilik mi, membran mı?" yazısının kapağı marka sahibinin gönderdiği `assets-kaynak/dolap.jpeg` (kopyası `public/blog/akrilik-kapak.jpg`). Kendi ürünleri mi, sitede yayınlanabilir mi?
- [ ] **Açılış fotoğrafı:** `public/hero/yatak-odasi.jpg` eski siteden, kaynağı bilinmiyor (stok ya da yapay zekâ olabilir). Gerçek bir proje fotoğrafıyla değiştirilmesi önerildi.

## 11. Marka sahibinden istenecekler
- [ ] Gmail adresi
- [x] Dolap parçalarının gerçek malzeme ve donanım bilgileri (bağlantı parçaları hariç)
- [ ] Gerçek müşteri yorumları (yoksa bölüm gizli kalır)
- [ ] 1975'ten bugüne kilometre taşları (zaman çizelgesi için)
- [ ] Oda kategorileri için fotoğraflar (özellikle kahve köşesi, TV ünitesi, giyinme odası)
- [ ] Varsa gerçek öncesi/sonrası fotoğraf çiftleri
- [x] Blog isteniyor mu? → Evet (15.09.2026), Faz 7
