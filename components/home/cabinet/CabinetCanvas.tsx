"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Html, RoundedBox } from "@react-three/drei";
import { MeshStandardMaterial, type Group } from "three";
import type { MotionValue } from "framer-motion";
import type { Asama } from "@/data/cabinetParts";
import { acilmaMiktari } from "./zamanlama";

/*
 * Kodla modellenmiş alt dolap modülü. Birim: metre.
 * Görünüm marka sahibinin gönderdiği gerçek üründen (assets-kaynak/dolap.jpeg):
 * şampanya tonunda parlak akrilik kapaklar, kulpsuz siyah gola kanalları,
 * solda iki çekmece, sağda çift kapak.
 *
 * 120 cm genişlik × 80 cm gövde × 56 cm derinlik, 12 cm ayak.
 * Panel kalınlıkları gerçek ölçüde: gövde 18 mm, arkalık 8 mm.
 */
const W = 1.2;
const H = 0.8;
const D = 0.56;
const T = 0.018;
const B = 0.008;
/** Ön paneller arası boşluk */
const ARA = 0.003;
/** Gola kanalı yüksekliği */
const GOLA = 0.035;
const AYAK = 0.12;

/** Çekmece bölmesi ile kapak bölmesini ayıran orta dikmenin ekseni */
const X_DIKME = -W / 2 + 0.5;
const SOL_GENISLIK = X_DIKME - T / 2 - (-W / 2 + T);
const X_SOL = (-W / 2 + T + X_DIKME - T / 2) / 2;
const SAG_GENISLIK = W / 2 - T - (X_DIKME + T / 2);
const X_SAG = (X_DIKME + T / 2 + W / 2 - T) / 2;

const Z_ON = D / 2 + T / 2;
const Z_GOLA = D / 2 - 0.025;
/** Önlerin üst kenarı: üstte gola kanalı kadar boşluk kalır */
const ON_UST = H / 2 - T - GOLA;
const ON_ALT = -H / 2 + ARA;

// Sol bölme: üstte kısa, altta uzun çekmece; aralarında gola kanalı
const CEKMECE_ON_GENISLIK = 0.5 - 1.5 * ARA;
const X_CEKMECE_ON = (-W / 2 + ARA + X_DIKME - ARA / 2) / 2;
const UST_CEKMECE_Y = 0.29;
const ORTA_GOLA_UST = ON_UST - UST_CEKMECE_Y;
const ALT_CEKMECE_UST = ORTA_GOLA_UST - GOLA;
const cekmeceler = [
  { y: ON_UST - UST_CEKMECE_Y / 2, h: UST_CEKMECE_Y },
  { y: (ALT_CEKMECE_UST + ON_ALT) / 2, h: ALT_CEKMECE_UST - ON_ALT },
];

// Sağ bölme: çift kapak
const KAPAK_SOL = X_DIKME + ARA / 2;
const KAPAK_SAG = W / 2 - ARA;
const KAPAK_GENISLIK = (KAPAK_SAG - KAPAK_SOL - ARA) / 2;
const KAPAK_Y = (ON_UST + ON_ALT) / 2;
const KAPAK_H = ON_UST - ON_ALT;

type V3 = [number, number, number];
type MalzemeAdi =
  | "govde"
  | "on"
  | "gola"
  | "arkalik"
  | "cekmece"
  | "tandem"
  | "metal"
  | "plastik"
  | "kavela";

type Parca = {
  asama: Asama;
  konum: V3;
  /** Tam açıldığında konuma eklenen ötelenme */
  acilma: V3;
  malzeme: MalzemeAdi;
  kutu?: V3;
  silindir?: { r: number; h: number; eksen: "x" | "y" };
  /** Listedeki numara ve parçaya göre işaret konumu */
  isaret?: { no: number; konum: V3 };
  /** Kapalıyken başka parçanın içinde kalan (kavela gibi) parçalar */
  kapaliykenGizli?: boolean;
};

/** Renkler gerçek ürün fotoğrafından ölçüldü (kapak #A48364, gola #110C0A). */
const MALZEMELER: Record<MalzemeAdi, ConstructorParameters<typeof MeshStandardMaterial>[0]> = {
  govde: { color: "#DDD3C5", roughness: 0.72 },
  on: { color: "#A8937E", roughness: 0.16, metalness: 0.08 },
  gola: { color: "#15110F", roughness: 0.38, metalness: 0.5 },
  arkalik: { color: "#EADFCF", roughness: 0.9 },
  cekmece: { color: "#ECE5DB", roughness: 0.72 },
  tandem: { color: "#5B5651", roughness: 0.4, metalness: 0.45 },
  metal: { color: "#BDB7AE", roughness: 0.35, metalness: 0.35 },
  plastik: { color: "#2A211B", roughness: 0.6 },
  kavela: { color: "#C9A46E", roughness: 0.8 },
};

function parcalariKur(): Parca[] {
  const p: Parca[] = [];

  // ── Aşama 3: gövde ve bağlantılar ───────────────────────────
  p.push({ asama: 3, kutu: [T, H, D], konum: [-W / 2 + T / 2, 0, 0], acilma: [-0.42, 0, 0], malzeme: "govde", isaret: { no: 9, konum: [-0.02, 0.33, -0.15] } });
  p.push({ asama: 3, kutu: [T, H, D], konum: [W / 2 - T / 2, 0, 0], acilma: [0.42, 0, 0], malzeme: "govde" });
  p.push({ asama: 3, kutu: [W - 2 * T, T, D - B], konum: [0, H / 2 - T / 2, B / 2], acilma: [0, 0.3, 0], malzeme: "govde" });
  p.push({ asama: 3, kutu: [W - 2 * T, T, D - B], konum: [0, -H / 2 + T / 2, B / 2], acilma: [0, -0.1, 0], malzeme: "govde" });
  p.push({ asama: 3, kutu: [T, H - 2 * T, D - B], konum: [X_DIKME, 0, B / 2], acilma: [0, 0, 0], malzeme: "govde" });

  // Kavelalar: kapalıyken yan panel ile tabla arasına gömülü, açılınca ortada
  for (const sx of [-1, 1])
    for (const sy of [-1, 1])
      for (const sz of [-1, 1])
        p.push({
          asama: 3,
          silindir: { r: 0.0045, h: 0.034, eksen: "x" },
          konum: [sx * (W / 2 - T), sy * (H / 2 - T / 2), sz * 0.17 + B / 2],
          acilma: [sx * 0.21, sy > 0 ? 0.15 : -0.05, 0],
          malzeme: "kavela",
          kapaliykenGizli: true,
          isaret: sx > 0 && sy > 0 && sz > 0 ? { no: 10, konum: [0, 0.035, 0] } : undefined,
        });

  // ── Aşama 2: arkalık, ayaklar, baza ─────────────────────────
  p.push({ asama: 2, kutu: [W - 0.004, H - 0.004, B], konum: [0, 0, -D / 2 + B / 2], acilma: [0, 0.04, -0.5], malzeme: "arkalik", isaret: { no: 7, konum: [0.46, 0.3, 0] } });
  for (const sx of [-1, 1])
    for (const sz of [-1, 1])
      p.push({
        asama: 2,
        silindir: { r: 0.018, h: AYAK, eksen: "y" },
        konum: [sx * (W / 2 - 0.08), -H / 2 - AYAK / 2, sz * (D / 2 - 0.1)],
        acilma: [0, -0.2, 0],
        malzeme: "plastik",
        isaret: sx > 0 && sz > 0 ? { no: 8, konum: [0.045, -0.02, 0] } : undefined,
      });
  // Baza: fotoğraftaki gibi geriden, kapaklarla aynı renkte
  p.push({ asama: 2, kutu: [W - 0.01, AYAK - 0.012, T], konum: [0, -H / 2 - AYAK / 2, D / 2 - 0.07], acilma: [0, -0.2, 0.26], malzeme: "on" });

  // ── Aşama 1: raf, çekmece kutuları ve rayları ───────────────
  // Raf kapakların arkasında görünmez kalmasın diye kapakların üstüne doğru çıkar.
  p.push({ asama: 1, kutu: [SAG_GENISLIK - 0.004, T, D - B - 0.03], konum: [X_SAG, 0, B / 2 - 0.015], acilma: [0, 0.55, 0.56], malzeme: "govde", isaret: { no: 6, konum: [0.16, 0.03, 0.12] } });

  const kg = SOL_GENISLIK - 0.03;
  const kd = D - B - 0.07;
  const kz = D / 2 - kd / 2 - 0.012;
  cekmeceler.forEach((c, i) => {
    const ky = c.h - (i === 0 ? 0.1 : 0.12);
    const y = c.y - 0.01;
    const ac: V3 = [0, 0, 0.38];
    // Tandem çekmece: metal yanlar, MDF arkalık ve taban
    p.push({ asama: 1, kutu: [0.014, ky, kd], konum: [X_SOL - kg / 2 + 0.007, y, kz], acilma: ac, malzeme: "tandem", isaret: i === 0 ? { no: 5, konum: [0, ky / 2 + 0.03, 0.12] } : undefined });
    p.push({ asama: 1, kutu: [0.014, ky, kd], konum: [X_SOL + kg / 2 - 0.007, y, kz], acilma: ac, malzeme: "tandem" });
    p.push({ asama: 1, kutu: [kg, ky, 0.014], konum: [X_SOL, y, kz - kd / 2 + 0.007], acilma: ac, malzeme: "cekmece" });
    p.push({ asama: 1, kutu: [kg, 0.016, kd], konum: [X_SOL, y - ky / 2 + 0.008, kz], acilma: ac, malzeme: "cekmece" });
    // Tandem ray: çekmecenin altında, gizli
    for (const s of [-1, 1])
      p.push({ asama: 1, kutu: [0.014, 0.014, kd - 0.02], konum: [X_SOL + s * (kg / 2 - 0.03), y - ky / 2 - 0.008, kz], acilma: [s * 0.04, -0.03, 0.2], malzeme: "metal" });
  });

  // ── Aşama 0: kapaklar, çekmece önleri, gola kulplar, menteşeler ──
  p.push({ asama: 0, kutu: [CEKMECE_ON_GENISLIK, UST_CEKMECE_Y, T], konum: [X_CEKMECE_ON, cekmeceler[0].y, Z_ON], acilma: [0, 0, 0.56], malzeme: "on" });
  p.push({ asama: 0, kutu: [CEKMECE_ON_GENISLIK, cekmeceler[1].h, T], konum: [X_CEKMECE_ON, cekmeceler[1].y, Z_ON], acilma: [0, 0, 0.56], malzeme: "on", isaret: { no: 2, konum: [0.1, -0.08, 0.012] } });
  p.push({ asama: 0, kutu: [KAPAK_GENISLIK, KAPAK_H, T], konum: [KAPAK_SOL + KAPAK_GENISLIK / 2, KAPAK_Y, Z_ON], acilma: [0, 0, 0.56], malzeme: "on", isaret: { no: 1, konum: [-0.05, -0.15, 0.012] } });
  p.push({ asama: 0, kutu: [KAPAK_GENISLIK, KAPAK_H, T], konum: [KAPAK_SAG - KAPAK_GENISLIK / 2, KAPAK_Y, Z_ON], acilma: [0, 0, 0.56], malzeme: "on" });

  // Gola kanalları: üstte boydan boya, solda iki çekmece arasında
  p.push({ asama: 0, kutu: [W - 2 * T, GOLA, 0.05], konum: [0, H / 2 - T - GOLA / 2, Z_GOLA], acilma: [0, 0, 0.3], malzeme: "gola", isaret: { no: 3, konum: [0.28, 0.035, 0.03] } });
  p.push({ asama: 0, kutu: [SOL_GENISLIK, GOLA, 0.05], konum: [X_SOL, ORTA_GOLA_UST - GOLA / 2, Z_GOLA], acilma: [0, 0, 0.3], malzeme: "gola" });

  // Menteşeler: sol kapak orta dikmeye, sağ kapak yan panele takılı
  for (const x of [X_DIKME + T / 2 + 0.015, W / 2 - T - 0.015])
    for (const sy of [-1, 1])
      p.push({ asama: 0, kutu: [0.03, 0.06, 0.022], konum: [x, KAPAK_Y + sy * 0.26, D / 2 - 0.02], acilma: [0, 0, 0.34], malzeme: "metal", isaret: x > 0 && sy > 0 ? { no: 4, konum: [0, 0.055, 0] } : undefined });

  return p;
}

const PARCALAR = parcalariKur();

function Sahne({ ilerleme }: { ilerleme: MotionValue<number> }) {
  const invalidate = useThree((s) => s.invalidate);
  const malzemeler = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(MALZEMELER).map(([ad, ayar]) => [ad, new MeshStandardMaterial(ayar)])
      ) as Record<MalzemeAdi, MeshStandardMaterial>,
    []
  );
  const grup = useRef<Group>(null);
  const parcaGruplari = useRef<(Group | null)[]>([]);
  const isaretler = useRef<(HTMLDivElement | null)[]>([]);
  const sonIlerleme = useRef(-1);

  // Sahne yalnızca kaydırma değişince çizilir (frameloop="demand")
  useEffect(() => ilerleme.on("change", () => invalidate()), [ilerleme, invalidate]);

  useFrame((state) => {
    const p = ilerleme.get();

    // Numara işaretleri (drei <Html>) konumlarını parçalar taşınmadan önce
    // hesaplayabiliyor; ilerleme değiştiyse bir kare daha çizdirilir ki
    // işaretler parçaların yeni yerine otursun.
    if (p !== sonIlerleme.current) {
      sonIlerleme.current = p;
      state.invalidate();
    }

    // Dar (dikey) ekranda dolap sığsın diye kamera geri çekilir
    const oran = state.size.width / state.size.height;
    const uzaklik = Math.max(1, (state.size.width < 768 ? 1.6 : 1.35) / oran);
    state.camera.position.set(1.85 * uzaklik, 0.92 * uzaklik, 2.75 * uzaklik);
    state.camera.lookAt(0, -0.08, 0);

    if (grup.current) grup.current.rotation.y = -0.45 + p * 0.75;

    PARCALAR.forEach((parca, i) => {
      const g = parcaGruplari.current[i];
      if (!g) return;
      const e = acilmaMiktari(parca.asama, p);
      g.position.set(
        parca.konum[0] + parca.acilma[0] * e,
        parca.konum[1] + parca.acilma[1] * e,
        parca.konum[2] + parca.acilma[2] * e
      );
      if (parca.kapaliykenGizli) g.visible = e > 0.02;
      const isaret = isaretler.current[i];
      if (isaret) isaret.style.opacity = e > 0.6 ? "1" : "0";
    });
  });

  return (
    <>
      <ambientLight intensity={0.55} color="#fff4e6" />
      <hemisphereLight args={["#fffaf2", "#bba68b", 0.75]} />
      <directionalLight position={[2.5, 4, 3]} intensity={1.9} color="#fff1dc" />
      <directionalLight position={[-3, 2, -2]} intensity={0.45} color="#e8ddd0" />

      <group ref={grup} position={[0, 0.12, 0]}>
        {PARCALAR.map((parca, i) => (
          <group
            key={i}
            ref={(el) => {
              parcaGruplari.current[i] = el;
            }}
            position={parca.konum}
          >
            {parca.kutu ? (
              <RoundedBox
                args={parca.kutu}
                radius={Math.min(0.004, Math.min(...parca.kutu) * 0.4)}
                smoothness={2}
                material={malzemeler[parca.malzeme]}
              />
            ) : parca.silindir ? (
              <mesh
                rotation={parca.silindir.eksen === "x" ? [0, 0, Math.PI / 2] : [0, 0, 0]}
                material={malzemeler[parca.malzeme]}
              >
                <cylinderGeometry args={[parca.silindir.r, parca.silindir.r, parca.silindir.h, 24]} />
              </mesh>
            ) : null}

            {parca.isaret && (
              <Html position={parca.isaret.konum} center zIndexRange={[30, 10]}>
                <div
                  ref={(el) => {
                    isaretler.current[i] = el;
                  }}
                  className="dolap-isaret"
                >
                  {parca.isaret.no}
                </div>
              </Html>
            )}
          </group>
        ))}
      </group>

      <ContactShadows position={[0, -0.76, 0]} scale={3.8} far={1.6} blur={2.6} opacity={0.3} color="#4A372A" />
    </>
  );
}

/**
 * 3D dolap tuvali. Yalnızca tarayıcıda, bölüme yaklaşınca yüklenir
 * (CabinetSection → next/dynamic, ssr: false); three.js paketi ilk açılış
 * paketine girmez.
 */
export default function CabinetCanvas({
  ilerleme,
  onHazir,
}: {
  ilerleme: MotionValue<number>;
  onHazir: () => void;
}) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      camera={{ fov: 30, near: 0.1, far: 20, position: [1.85, 0.92, 2.75] }}
      gl={{ antialias: true, alpha: true }}
      onCreated={onHazir}
    >
      <Sahne ilerleme={ilerleme} />
    </Canvas>
  );
}
