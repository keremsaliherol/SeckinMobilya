/**
 * Blog yazıları.
 *
 * İçerik HTML ya da markdown değil, düz veri: statik üretimde güvenli ve
 * sayfa düzeni tek yerden (app/blog/[slug]/BlogYaziContent.tsx) yönetiliyor.
 * Yazılar yalnızca Türkçedir (proje açıklamaları gibi); arayüz etiketleri
 * TR/EN olarak pageTranslations.blog içinde.
 *
 * Yeni yazı eklerken:
 * - `tarih` yayın günüdür (ISO, YYYY-AA-GG). Geçmişe dönük tarih verme.
 * - `taslak: true` olan yazı listede, sitemap'te ve yayındaki sitede görünmez;
 *   yalnızca geliştirme sunucusunda önizlenir. Onaylanınca `false` yap ve
 *   tarihi yayın gününe güncelle.
 * - Kapak ve bölüm görselleri mevcut proje fotoğrafları ya da `public/blog/`.
 * - Doğrulanmamış bilgi (fiyat, süre, garanti, müşteri yorumu) yazma.
 *
 * Yayın planı (15.09.2026): site canlıya alınırken yalnızca "akrilik mi, membran mı"
 * yayında; diğerleri 2–3 haftada bir, sırayla açılır (docs/KALAN-GOREVLER.md §4).
 */

export interface BlogBolumu {
  /** Ara başlık; yoksa bölüm girişin devamı gibi okunur. */
  baslik?: string;
  paragraflar: string[];
  /** Paragraflardan sonra gösterilen madde listesi. */
  liste?: string[];
  gorsel?: { src: string; alt: string };
  /** Bölüm sonunda site içi bağlantı (ör. ilgili sayfa). */
  baglanti?: { href: string; metin: string };
}

export interface BlogYazisi {
  slug: string;
  baslik: string;
  /** Liste kartında ve arama sonuçlarında görünen kısa açıklama. */
  ozet: string;
  /** Yayın günü, ISO (YYYY-AA-GG). */
  tarih: string;
  kapak: string;
  kapakAlt: string;
  /** İlgili proje (data/projects.ts slug'ı). */
  projeSlug?: string;
  bolumler: BlogBolumu[];
  taslak: boolean;
}

export const blogYazilari: BlogYazisi[] = [
  {
    slug: "mutfak-kapaginda-akrilik-mi-membran-mi",
    baslik: "Mutfak kapağında akrilik mi, membran mı?",
    ozet:
      "Mutfak ve dolap kapaklarında en çok kullandığımız iki yüzey akrilik ve membran. İkisinin nasıl üretildiğini, görünüşteki farklarını ve seçim yaparken nelere bakılacağını anlattık.",
    tarih: "2026-09-15",
    kapak: "/blog/akrilik-kapak.jpg",
    kapakAlt: "Şampanya rengi parlak kapaklı, siyah gola profilli ve koyu mermer desenli tezgâhlı mutfak dolabı",
    bolumler: [
      {
        paragraflar: [
          "Özel üretim bir mutfağa girildiğinde ilk görülen şey kapaklardır. Kapak yüzeyi mutfağın rengini, parlaklığını ve genel havasını belirler. Projelerimizde kapak yüzeyi olarak en çok akrilik ve membran kullanıyoruz.",
          "İki malzemenin de temelinde MDF vardır. Aradaki fark, MDF'nin yüzeyinin nasıl kaplandığındadır ve bu fark hem görüntüye hem de yapılabilecek kapak modellerine yansır.",
        ],
      },
      {
        baslik: "Akrilik kapak nedir?",
        paragraflar: [
          "Akrilik kapak, MDF levhanın yüzeyine akrilik kaplama uygulanarak üretilir. En bilinen hâli parlak yüzeydir: pürüzsüz, derin ve neredeyse ayna gibi bir parlaklık verir. Mat akrilik seçenekleri de bulunur.",
          "Akrilik kapaklar düz yüzeylidir. Kenarları, kapak rengine uygun PVC kenar bandıyla kapatılır. Dolaplarımızda genelde 18 mm kalınlığında akrilik MDF kapak ve çekmece önü, kenarlarda da 3 mm PVC kenar bandı kullanıyoruz.",
        ],
      },
      {
        baslik: "Membran kapak nedir?",
        paragraflar: [
          "Membran kapakta MDF önce istenen ölçü ve biçimde işlenir, ardından yüzeyi ısı ve vakum yardımıyla PVC folyoyla kaplanır. Folyo kapağın ön yüzünü ve kenarlarını tek parça hâlinde sardığı için ayrıca kenar bandı gerekmez.",
          "MDF'ye işlenen çerçeve, oluk ya da desenler folyonun altında da korunur. Bu yüzden klasik çerçeveli kapaklar ve profilli modeller membranla yapılabilir. Mat, parlak ve ahşap desenli gibi farklı folyo seçenekleri bulunur.",
        ],
      },
      {
        baslik: "Görünüşteki farklar",
        paragraflar: ["İki malzemeyi yan yana koyduğunuzda fark en çok şu noktalarda görülür:"],
        liste: [
          "Yüzey: Akrilik düz ve belirgin biçimde parlaktır. Membranda mat, parlak ya da ahşap desenli yüzeyler seçilebilir.",
          "Kenarlar: Akrilikte kenar bandı vardır. Membranda folyo kenarları da sardığı için kapak tek parça görünür.",
          "Kapak modeli: Akrilik düz kapaklara uygundur. Çerçeveli, oluklu ya da desenli kapaklar membranla yapılır.",
          "Tarz: Akrilik sade ve modern mutfaklarda, membran ise klasik çizgili ya da dokulu kapak istenen mutfaklarda öne çıkar.",
        ],
      },
      {
        baslik: "Kullanım ve temizlik",
        paragraflar: [
          "Parlak yüzeylerde parmak izi ve ince çizikler mat yüzeylere göre daha kolay fark edilir. Temizlikte yumuşak, nemli bir bez çoğu zaman yeterlidir; ovma tozları, sert süngerler ve çözücü içeren temizleyiciler yüzeye zarar verebilir.",
          "Membran kapaklarda fırın gibi yoğun ısı yayan cihazların hemen yanındaki kapaklara dikkat etmek gerekir; yüksek ısı folyonun zamanla kapaktan ayrılmasına yol açabilir. Bu yüzden ankastre cihazların yerleşimi planlanırken ısı konusu da hesaba katılmalıdır.",
        ],
      },
      {
        baslik: "Hangisini seçmeli?",
        paragraflar: [
          "Tek bir doğru yok; seçim mutfağın tarzına, kullanım alışkanlığına ve bütçeye göre değişir. Sade, düz ve parlak bir görünüm isteniyorsa akrilik, çerçeveli ya da desenli bir kapak isteniyorsa membran daha uygun olur.",
          "Mümkünse renk ve yüzey numunelerini mutfağın kendi ışığında görmek karar vermeyi kolaylaştırır. Malzeme ve donanım seçimini her projede mekâna ve bütçeye göre sizinle birlikte yapıyoruz.",
        ],
        baglanti: { href: "/#dolap", metin: "Bir dolabın parçalarını ve malzemelerini 3D olarak inceleyin" },
      },
    ],
    taslak: false,
  },
  {
    slug: "gola-kulp-nedir-kulpsuz-mutfak",
    baslik: "Gola kulp nedir? Kulpsuz mutfak nasıl yapılır?",
    ozet:
      "Kulpsuz mutfakların sade görüntüsünün arkasında gola profili var. Gola kulpun nasıl çalıştığını, dolaba nasıl yerleştirildiğini ve planlarken nelere dikkat edildiğini anlattık.",
    tarih: "2026-09-15",
    kapak: "/projeler/mutfak-projelerimiz/07.jpg",
    kapakAlt: "Parlak beyaz kulpsuz kapaklı, tavanı gizli aydınlatmalı L biçimli mutfak",
    projeSlug: "mutfak-projelerimiz",
    bolumler: [
      {
        paragraflar: [
          "Kapaklarında kulp görünmeyen mutfaklar, düz ve sakin cepheleriyle sık tercih edilen bir tarz. Bu görüntüyü sağlayan en yaygın çözüm gola kulptur. Mutfak ve dolap projelerimizde genelde siyah metal gola kulp kullanıyoruz.",
        ],
      },
      {
        baslik: "Gola kulp nedir?",
        paragraflar: [
          "Gola, kapağın üzerine vidalanan bir kulp değildir. Dolap gövdesine yatay olarak (boy dolaplarda dikey olarak) yerleştirilen bir metal profildir. Kapak ya da çekmece önü, profilin olduğu yerde biraz kısa tutulur; aradaki boşluk parmakların girip kapağı kenarından tutmasını sağlar.",
          "Sonuçta cephede çıkıntı yapan bir kulp olmaz, kapaklar arasında yalnızca ince bir çizgi görünür.",
        ],
      },
      {
        baslik: "Profil çeşitleri",
        paragraflar: ["Bir mutfakta genelde birkaç farklı gola profili birlikte kullanılır:"],
        liste: [
          "L profil: Tezgâhın hemen altında, en üstteki kapak ve çekmecelerin üzerinde yer alır.",
          "C profil: Üst üste dizilen çekmecelerin arasında kullanılır ve alttaki çekmeceyi tutmayı sağlar.",
          "Dikey profil: Boy dolaplarda ve kolonlarda, kapağın yan kenarında kullanılır.",
        ],
      },
      {
        baslik: "Kulpsuz mutfak nasıl planlanır?",
        paragraflar: [
          "Gola kulp, dolap bittikten sonra eklenebilecek bir parça değildir. Dolap gövdesi baştan bu profile göre üretilir: gövde yan panelleri profilin geçeceği yerden kesilir, kapak ve çekmece ölçüleri de profile göre hesaplanır. Bu yüzden kulpsuz mutfak kararının çizim aşamasında verilmesi gerekir.",
          "L profil tezgâhın altına geldiği için tezgâh yüksekliği, çekmece dizilimi ve bulaşık makinesi gibi ankastre cihazların kapakları da bu hizaya göre birlikte düşünülür.",
        ],
      },
      {
        baslik: "Renk seçimi",
        paragraflar: [
          "Gola profiller farklı renklerde bulunur. Siyah profil, açık renkli kapaklarda belirgin ve grafik bir çizgi oluşturur. Kapak rengine yakın bir profil ise bu çizgiyi daha sakin gösterir.",
        ],
      },
      {
        baslik: "Üst dolaplarda ne yapılır?",
        paragraflar: [
          "Üst dolaplarda gola yerine kapağın alt kenarını gövdeden biraz taşırarak tutma payı bırakmak ya da itince açılan (bas-aç) mekanizma kullanmak da mümkündür. Hangisinin uygun olduğu dolabın yüksekliğine ve ne sıklıkla kullanılacağına göre değişir.",
        ],
      },
    ],
    taslak: true,
  },
  {
    slug: "frenli-mentese-ve-tandem-ray",
    baslik: "Frenli menteşe ve tandem ray: dolapta görünmeyen detaylar",
    ozet:
      "Bir dolabın kalitesi en çok her gün açıp kapattığınız kapak ve çekmecelerde hissedilir. Frenli menteşenin ve tam açılımlı tandem rayın ne işe yaradığını anlattık.",
    tarih: "2026-09-15",
    kapak: "/projeler/15-temmuz-evleri/05.jpg",
    kapakAlt: "Montaj sırasında çekmeceleri ve kapakları açık duran bej tonlarında mutfak dolapları",
    projeSlug: "15-temmuz-evleri",
    bolumler: [
      {
        paragraflar: [
          "Dolap seçerken çoğunlukla kapak rengine ve tezgâha bakılır. Oysa bir dolabı her gün kullanırken hissedilen şey, kapakların nasıl kapandığı ve çekmecelerin nasıl kaydığıdır. Bu işi dışarıdan görünmeyen donanımlar yapar: menteşeler ve raylar.",
          "Dolaplarımızda genelde Samet marka frenli menteşe ve yine Samet marka frenli, tam açılımlı tandem ray kullanıyoruz.",
        ],
      },
      {
        baslik: "Frenli menteşe ne yapar?",
        paragraflar: [
          "Frenli menteşenin içinde kapanışı yavaşlatan bir amortisör bulunur. Kapağı ittiğinizde kapak, kapanışın son bölümünde yavaşlar ve gövdeye çarpmadan, sessizce yerine oturur.",
          "Böylece mutfakta kapak çarpma sesi olmaz; kapak ve gövde de her kapanışta darbe almamış olur.",
        ],
      },
      {
        baslik: "Menteşe ayarı",
        paragraflar: [
          "Dolap menteşelerinin üzerindeki vidalarla kapak sağa-sola, yukarı-aşağı ve öne-arkaya ayarlanabilir. Montajda kapaklar arasındaki boşluklar bu ayarlarla eşitlenir.",
          "Zamanla kapak hizasında küçük bir kayma fark ederseniz aynı vidalarla yeniden ayar yapılabilir.",
        ],
      },
      {
        baslik: "Tandem ray nedir?",
        paragraflar: [
          "Tandem ray, çekmece kutusunun altına yerleştirilen ve çekmece açıkken bile dışarıdan pek görünmeyen bir ray sistemidir. Çekmecenin yanlarında metal ray görüntüsü olmadığı için çekmece daha temiz görünür.",
          "Frenli modellerde çekmece de menteşe gibi kapanışın sonunda yavaşlar ve sessizce kapanır.",
        ],
      },
      {
        baslik: "Tam açılım neden önemli?",
        paragraflar: [
          "Tam açılımlı rayda çekmece gövdeden tamamen dışarı çıkar, en arka köşesine kadar rahatça ulaşılır. Kısmi açılımlı raylarda ise çekmecenin arka bölümü gövdenin içinde kalır ve arkadaki eşyalar görünmez.",
          "Tencere, tabak ve kiler malzemesi konan derin mutfak çekmecelerinde bu fark günlük kullanımda hemen hissedilir.",
        ],
      },
      {
        baslik: "Kullanırken",
        paragraflar: [
          "Çekmecelere ağır eşya koyarken yükü çekmece tabanına dengeli dağıtmak, rayların düzgün çalışması için iyi bir alışkanlıktır. Kapak ya da çekmece kapanırken sürtme sesi veya hizasızlık fark ederseniz ayar gerekebilir.",
        ],
        baglanti: { href: "/#dolap", metin: "Dolabın parçalarını ve donanımlarını 3D olarak inceleyin" },
      },
    ],
    taslak: true,
  },
  {
    slug: "bahcesehir-mutfak-proje-hikayesi",
    baslik: "Bahçeşehir Mutfak: parlak beyaz ve ahşap doku bir arada",
    ozet:
      "Bahçeşehir'deki bir konut mutfağı için ürettiğimiz dolaplarda parlak beyaz üst modülleri ahşap dokulu alt dolaplarla, siyah mermer desenli tezgâhla ve camlı vitrinlerle bir araya getirdik.",
    tarih: "2026-09-15",
    kapak: "/projeler/bahcesehir-mutfak/01.jpg",
    kapakAlt: "Parlak beyaz üst dolaplı, ahşap dokulu alt dolaplı ve siyah mermer desenli tezgâhlı mutfak",
    projeSlug: "bahcesehir-mutfak",
    bolumler: [
      {
        paragraflar: [
          "Bahçeşehir Mutfak, bir konut mutfağı için yaptığımız özel üretim dolap uygulaması. Projede iki farklı dolap yüzeyi, koyu renkli bir tezgâh, dekoratif camlı vitrinler ve ankastre fırın kolonu bir arada kullanıldı.",
        ],
      },
      {
        baslik: "Üstte parlak beyaz, altta ahşap doku",
        paragraflar: [
          "Mutfağın üst modülleri parlak beyaz, alt dolapları ise ahşap dokulu yüzeyle üretildi. Göz hizasındaki büyük dolap kütlesinin açık renkte olması mutfağı daha ferah gösterir; ahşap doku ise alt tarafa sıcaklık katar.",
        ],
        gorsel: {
          src: "/projeler/bahcesehir-mutfak/02.jpg",
          alt: "Parlak beyaz üst modüller, siyah çerçeveli camlı vitrin ve ahşap dokulu alt dolaplar",
        },
      },
      {
        baslik: "Tezgâh ve sırt paneli",
        paragraflar: [
          "Tezgâhta ve tezgâh arkasındaki sırt panelinde siyah mermer desenli yüzey kullanıldı. Tezgâhla aynı desenin duvara da devam etmesi, çalışma alanını tek parça gibi gösterir ve beyaz üst dolaplarla belirgin bir karşıtlık kurar.",
          "Üst dolapların altına yerleştirilen aydınlatma, tezgâh üzerindeki çalışma alanını destekler.",
        ],
        gorsel: {
          src: "/projeler/bahcesehir-mutfak/03.jpg",
          alt: "Siyah mermer desenli tezgâh ve açık bir çekmecede düzenleyici",
        },
      },
      {
        baslik: "Camlı vitrinler ve fırın kolonu",
        paragraflar: [
          "Siyah çerçeveli, dekoratif camlı vitrinler hem üst modüllerde hem de fırın kolonunun yanındaki dolap bloğunda yer aldı. Cam kapaklar, kapalı dolaplarla dolu bir mutfakta göz dinlendiren bir ara yüzey oluşturur.",
          "Ankastre cihazlar için ayrı bir fırın kolonu üretildi; böylece fırın tezgâh altında değil, boy dolabın içinde konumlandı.",
        ],
        gorsel: {
          src: "/projeler/bahcesehir-mutfak/05.jpg",
          alt: "Ahşap dokulu boy dolaplar arasında ankastre fırın kolonu ve siyah çerçeveli camlı vitrin",
        },
      },
    ],
    taslak: true,
  },
];

/** Tarihe göre yeniden eskiye sıralı. */
const siraliYazilar = [...blogYazilari].sort((a, b) => b.tarih.localeCompare(a.tarih));

/** Yayındaki yazılar: listede, sitemap'te ve yayındaki sitede görünenler. */
export const getYayindakiYazilar = () => siraliYazilar.filter((y) => !y.taslak);

/**
 * Sayfada gösterilecek yazılar. Geliştirme sunucusunda taslaklar da görünür
 * (önizleme için); build'de yalnızca yayındakiler.
 */
export const getGorunenYazilar = () =>
  process.env.NODE_ENV === "development" ? siraliYazilar : getYayindakiYazilar();

export const getYaziBySlug = (slug: string) => blogYazilari.find((y) => y.slug === slug);

/** Ortalama okuma hızı (kelime/dakika) ile yaklaşık okuma süresi. */
export const okumaSuresi = (yazi: BlogYazisi) => {
  const metin = [
    yazi.ozet,
    ...yazi.bolumler.flatMap((b) => [b.baslik ?? "", ...b.paragraflar, ...(b.liste ?? [])]),
  ].join(" ");
  const kelime = metin.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(kelime / 200));
};

/**
 * "2026-09-15" → "15 Eylül 2026" / "15 September 2026".
 * Saat dilimi UTC sabit: sunucu ve tarayıcı aynı günü yazsın.
 */
export const tarihBicimle = (iso: string, yerel: string) =>
  new Intl.DateTimeFormat(yerel, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`)
  );

/** Ara başlıktan sayfa içi bağlantı kimliği üretir ("Tam açılım neden önemli?" → "tam-acilim-neden-onemli"). */
export const baslikKimligi = (baslik: string) =>
  baslik
    .toLocaleLowerCase("tr")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/û/g, "u")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
