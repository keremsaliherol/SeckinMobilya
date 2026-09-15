/**
 * Geliştirme doğrulaması: bir sayfayı arka planda Edge ile açar, verilen
 * kaydırma noktalarına gidip ekran görüntüsü alır.
 *
 * Neden var: uygulamanın tarayıcı paneli kaydırma sonrası görüntü alamıyor,
 * `msedge --screenshot` ise kaydıramıyor. Kaydırmaya bağlı bölümler (hero,
 * süreç videosu, 3D dolap, proje şeridi) ancak böyle doğrulanabiliyor.
 * Siteye dahil değildir; build'e girmez.
 *
 * Önkoşul: dev sunucusu açık (http://localhost:3000). Windows + Edge.
 *
 * Kullanım (Git Bash'te "/" yolları bozulmasın diye MSYS_NO_PATHCONV=1):
 *   MSYS_NO_PATHCONV=1 node scripts/sayfa-goruntusu.mjs --yol / --noktalar 0,900,1800
 *   MSYS_NO_PATHCONV=1 node scripts/sayfa-goruntusu.mjs --yol /iletisim/ --mobil
 *   MSYS_NO_PATHCONV=1 node scripts/sayfa-goruntusu.mjs --yol / --azhareket
 *
 * Seçenekler:
 *   --yol /projelerimiz/   sayfa yolu (varsayılan "/")
 *   --noktalar 0,500       kaydırma konumları, px (varsayılan "0")
 *   --genislik 1440 --yukseklik 900   (mobilde 390×844)
 *   --mobil                mobil cihaz öykünmesi
 *   --azhareket            prefers-reduced-motion: reduce
 *   --cikti klasör         görüntülerin yazılacağı klasör (varsayılan: işletim sistemi geçici klasörü)
 *   --bekle 7000           sayfa açıldıktan sonra bekleme, ms
 *
 * Açılış perdesi (Intro) sessionStorage ile atlanır. WebGL (3D dolap) için
 * SwiftShader açıktır. Her görüntü için sayfa yüksekliği ve konum yazdırılır.
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const arg = (ad, varsayilan) => {
  const i = process.argv.indexOf(`--${ad}`);
  if (i < 0) return varsayilan;
  const deger = process.argv[i + 1];
  return deger === undefined || deger.startsWith("--") ? true : deger;
};

const mobil = Boolean(arg("mobil", false));
const yol = arg("yol", "/");
const genislik = Number(arg("genislik", mobil ? 390 : 1440));
const yukseklik = Number(arg("yukseklik", mobil ? 844 : 900));
const noktalar = String(arg("noktalar", "0")).split(",").map(Number);
const cikti = arg("cikti", join(tmpdir(), "seckin-goruntuler"));
const bekleme = Number(arg("bekle", 7000));
const azHareket = Boolean(arg("azhareket", false));
const EDGE = process.env.EDGE_PATH ?? "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

mkdirSync(cikti, { recursive: true });
const profil = join(tmpdir(), `seckin-edge-${process.pid}`);
const port = 9300 + Math.floor(Math.random() * 600);
const edge = spawn(
  EDGE,
  [
    "--headless=new",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--hide-scrollbars",
    "--no-first-run",
    `--user-data-dir=${profil}`,
    `--remote-debugging-port=${port}`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
let ws;
let sira = 0;
const bekleyen = new Map();
const komut = (method, params = {}) =>
  new Promise((coz, reddet) => {
    const id = ++sira;
    bekleyen.set(id, { coz, reddet });
    ws.send(JSON.stringify({ id, method, params }));
  });
const calistir = async (ifade) =>
  (await komut("Runtime.evaluate", { expression: ifade, returnByValue: true, awaitPromise: true })).result.value;

try {
  let hedef;
  for (let d = 0; d < 40 && !hedef; d++) {
    await bekle(250);
    try {
      hedef = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page");
    } catch {
      /* Edge henüz hazır değil */
    }
  }
  if (!hedef) throw new Error("Edge'e bağlanılamadı");

  ws = new WebSocket(hedef.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (m) => {
    const v = JSON.parse(m.data);
    if (v.id && bekleyen.has(v.id)) {
      const b = bekleyen.get(v.id);
      bekleyen.delete(v.id);
      if (v.error) b.reddet(new Error(v.error.message));
      else b.coz(v.result);
    }
  };

  await komut("Page.enable");
  if (azHareket)
    await komut("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await komut("Emulation.setDeviceMetricsOverride", { width: genislik, height: yukseklik, deviceScaleFactor: 1, mobile: mobil });
  if (mobil) await komut("Emulation.setTouchEmulationEnabled", { enabled: true });
  await komut("Page.addScriptToEvaluateOnNewDocument", {
    source: "try{sessionStorage.setItem('seckin-intro','1')}catch(e){}",
  });
  await komut("Page.navigate", { url: `http://localhost:3000${yol}` });
  await bekle(bekleme);

  const onek = `${yol.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "ana"}-${mobil ? "mobil" : "masaustu"}${azHareket ? "-az" : ""}`;
  for (const y of noktalar) {
    await calistir(`window.scrollTo(0, ${y})`);
    await bekle(1800);
    const durum = await calistir("JSON.stringify({ y: Math.round(scrollY), sayfaYuksekligi: document.documentElement.scrollHeight })");
    const { data } = await komut("Page.captureScreenshot", { format: "jpeg", quality: 80 });
    const dosya = join(cikti, `${onek}-${y}.jpg`);
    writeFileSync(dosya, Buffer.from(data, "base64"));
    console.log(dosya, durum);
  }
} catch (hata) {
  console.error("HATA:", hata.message);
  process.exitCode = 1;
} finally {
  try {
    ws?.close();
  } catch {
    /* zaten kapalı */
  }
  edge.kill();
}
