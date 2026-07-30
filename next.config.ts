import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Statik dışa aktarma: build sonunda `out/` klasörüne düz HTML/CSS/JS
   * üretilir. Site tamamen statik (sunucu API'si, server action yok), bu
   * yüzden hiçbir özellik kaybı olmadan herhangi bir statik hosting'de
   * (Cloudflare Pages) yayınlanabilir.
   */
  output: "export",

  /**
   * Her sayfa kendi klasöründe index.html olarak üretilir
   * (/hakkimizda/index.html). Statik sunucularda adresin sonundaki
   * eğik çizgi olsa da olmasa da doğru sayfa açılır.
   */
  trailingSlash: true,

  images: {
    // Statik dışa aktarmada sunucu tarafı görsel optimizasyonu çalışmaz.
    unoptimized: true,
  },

  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
