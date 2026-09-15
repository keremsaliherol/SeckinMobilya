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
 * 100 cm genişlik × 80 cm gövde yüksekliği × 56 cm derinlik, 10 cm ayak.
 * Sol bölme: kapak + raf. Sağ bölme: üç çekmece.
 * Panel kalınlıkları gerçek ölçüde: gövde 18 mm, arkalık 8 mm.
 */
const W = 1.0;
const H = 0.8;
const D = 0.56;
const T = 0.018;
const B = 0.008;
/** Ön paneller arası boşluk */
const ARA = 0.003;

const BOLME_GENISLIGI = W / 2 - T - T / 2;
const X_SOL = (-W / 2 + T - T / 2) / 2;
const X_SAG = -X_SOL;
const X_ON = (-W / 2 + ARA - ARA / 2) / 2;
const Z_ON = D / 2 + T / 2;
const ON_GENISLIGI = W / 2 - 1.5 * ARA;
const CEKMECE_ON_Y = (H - 4 * ARA) / 3;
const cekmeceY = (i: number) => H / 2 - ARA - CEKMECE_ON_Y / 2 - i * (CEKMECE_ON_Y + ARA);

type V3 = [number, number, number];
type MalzemeAdi = "govde" | "on" | "arkalik" | "cekmece" | "metal" | "pirinc" | "plastik" | "kavela";

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

const MALZEMELER: Record<MalzemeAdi, ConstructorParameters<typeof MeshStandardMaterial>[0]> = {
  govde: { color: "#D8BF9A", roughness: 0.78 },
  on: { color: "#4A372A", roughness: 0.4 },
  arkalik: { color: "#EADFCF", roughness: 0.9 },
  cekmece: { color: "#F1EADF", roughness: 0.72 },
  metal: { color: "#BDB7AE", roughness: 0.35, metalness: 0.35 },
  pirinc: { color: "#BF9763", roughness: 0.32, metalness: 0.45 },
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
  p.push({ asama: 3, kutu: [T, H - 2 * T, D - B], konum: [0, 0, B / 2], acilma: [0, 0, 0], malzeme: "govde" });

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
  p.push({ asama: 2, kutu: [W - 0.004, H - 0.004, B], konum: [0, 0, -D / 2 + B / 2], acilma: [0, 0.04, -0.5], malzeme: "arkalik", isaret: { no: 7, konum: [0.38, 0.3, 0] } });
  for (const sx of [-1, 1])
    for (const sz of [-1, 1])
      p.push({
        asama: 2,
        silindir: { r: 0.017, h: 0.1, eksen: "y" },
        konum: [sx * (W / 2 - 0.07), -H / 2 - 0.05, sz * (D / 2 - 0.09)],
        acilma: [0, -0.2, 0],
        malzeme: "plastik",
        isaret: sx > 0 && sz > 0 ? { no: 8, konum: [0.04, -0.02, 0] } : undefined,
      });
  p.push({ asama: 2, kutu: [W - 0.01, 0.085, T], konum: [0, -H / 2 - 0.052, D / 2 - 0.06], acilma: [0, -0.2, 0.26], malzeme: "on" });

  // ── Aşama 1: raf, çekmece kutuları ve rayları ───────────────
  // Raf kapağın arkasında görünmez kalmasın diye kapağın üstüne doğru çıkar.
  p.push({ asama: 1, kutu: [BOLME_GENISLIGI - 0.004, T, D - B - 0.03], konum: [X_SOL, 0.01, B / 2 - 0.015], acilma: [0, 0.55, 0.56], malzeme: "govde", isaret: { no: 6, konum: [-0.1, 0.03, 0.12] } });

  const kg = BOLME_GENISLIGI - 0.026;
  const ky = CEKMECE_ON_Y - 0.07;
  const kd = D - B - 0.07;
  const kz = D / 2 - kd / 2 - 0.012;
  for (let i = 0; i < 3; i++) {
    const y = cekmeceY(i) - 0.012;
    const ac: V3 = [0, 0, 0.38];
    p.push({ asama: 1, kutu: [0.012, ky, kd], konum: [X_SAG - kg / 2 + 0.006, y, kz], acilma: ac, malzeme: "cekmece", isaret: i === 0 ? { no: 5, konum: [0, 0.07, 0.12] } : undefined });
    p.push({ asama: 1, kutu: [0.012, ky, kd], konum: [X_SAG + kg / 2 - 0.006, y, kz], acilma: ac, malzeme: "cekmece" });
    p.push({ asama: 1, kutu: [kg, ky, 0.012], konum: [X_SAG, y, kz - kd / 2 + 0.006], acilma: ac, malzeme: "cekmece" });
    p.push({ asama: 1, kutu: [kg, 0.008, kd], konum: [X_SAG, y - ky / 2 + 0.004, kz], acilma: ac, malzeme: "cekmece" });
    for (const s of [-1, 1])
      p.push({ asama: 1, kutu: [0.012, 0.03, kd - 0.02], konum: [X_SAG + s * (kg / 2 + 0.0065), y - ky / 2 + 0.02, kz], acilma: [s * 0.05, 0, 0.2], malzeme: "metal" });
  }

  // ── Aşama 0: kapak, çekmece önleri, kulplar, menteşeler ─────
  p.push({ asama: 0, kutu: [ON_GENISLIGI, H - 2 * ARA, T], konum: [X_ON, 0, Z_ON], acilma: [0, 0, 0.56], malzeme: "on", isaret: { no: 1, konum: [-0.1, -0.16, 0.012] } });
  for (let i = 0; i < 3; i++)
    p.push({ asama: 0, kutu: [ON_GENISLIGI, CEKMECE_ON_Y, T], konum: [-X_ON, cekmeceY(i), Z_ON], acilma: [0, 0, 0.56], malzeme: "on", isaret: i === 2 ? { no: 2, konum: [0.1, -0.04, 0.012] } : undefined });
  p.push({ asama: 0, kutu: [0.014, 0.26, 0.02], konum: [-0.045, 0.12, Z_ON + T / 2 + 0.012], acilma: [0, 0, 0.74], malzeme: "pirinc", isaret: { no: 3, konum: [0.035, 0.1, 0.01] } });
  for (let i = 0; i < 3; i++)
    p.push({ asama: 0, kutu: [0.2, 0.014, 0.02], konum: [-X_ON, cekmeceY(i) + CEKMECE_ON_Y / 2 - 0.045, Z_ON + T / 2 + 0.012], acilma: [0, 0, 0.74], malzeme: "pirinc" });
  for (const sy of [-1, 1])
    p.push({ asama: 0, kutu: [0.03, 0.06, 0.022], konum: [-W / 2 + T + 0.02, sy * 0.28, D / 2 - 0.02], acilma: [0, 0, 0.34], malzeme: "metal", isaret: sy > 0 ? { no: 4, konum: [0, 0.055, 0] } : undefined });

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
    state.camera.position.set(1.7 * uzaklik, 0.85 * uzaklik, 2.5 * uzaklik);
    state.camera.lookAt(0, -0.06, 0);

    if (grup.current) grup.current.rotation.y = -0.6 + p * 0.9;

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

      <group ref={grup} position={[0, 0.1, 0]}>
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

      <ContactShadows position={[0, -0.72, 0]} scale={3.4} far={1.6} blur={2.6} opacity={0.3} color="#4A372A" />
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
      camera={{ fov: 30, near: 0.1, far: 20, position: [1.7, 0.85, 2.5] }}
      gl={{ antialias: true, alpha: true }}
      onCreated={onHazir}
    >
      <Sahne ilerleme={ilerleme} />
    </Canvas>
  );
}
