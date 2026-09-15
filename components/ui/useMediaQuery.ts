"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * CSS medya sorgusunu izler (ekran genişliği, hareket azaltma tercihi…).
 *
 * `useSyncExternalStore` ile kurulu: efekt içinde setState çağırmadan
 * tarayıcı durumuna abone olur. Sunucuda `sunucuDegeri` döner; bu yüzden
 * statik HTML bu değere göre üretilir, tarayıcıda gerçek değere geçilir.
 */
export function useMediaQuery(sorgu: string, sunucuDegeri = false) {
  const abone = useCallback(
    (bildir: () => void) => {
      const mq = window.matchMedia(sorgu);
      mq.addEventListener("change", bildir);
      return () => mq.removeEventListener("change", bildir);
    },
    [sorgu]
  );

  return useSyncExternalStore(
    abone,
    () => window.matchMedia(sorgu).matches,
    () => sunucuDegeri
  );
}
