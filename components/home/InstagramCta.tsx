"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Play } from "lucide-react";
import { FadeInUp } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";
import { contact, whatsappLink } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";

/**
 * Instagram + iletişim bandı: telefon çerçevesinde beton odadan bitmiş mutfağa
 * dönüşen video (kaynak assets-kaynak/bos-odadan-mutfaga.mp4, 720×1280, sessiz).
 *
 * Video yalnızca ekrandayken oynar, ekrandan çıkınca durur (pil ve veri).
 * `preload="none"`: sayfa açılışında video indirilmez, önce kapak görseli
 * görünür. Hareket azaltma tercihinde otomatik oynatılmaz; denetimler açık
 * olur, ziyaretçi isterse kendisi başlatır.
 */
export default function InstagramCta() {
  const { t } = useLang();
  const ig = t.home.instagram;
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Tarayıcı otomatik oynatmayı engellediyse (ör. iPhone Düşük Güç Modu) oynat düğmesi görünür */
  const [dokunmaGerekli, setDokunmaGerekli] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([giris]) => {
        if (giris.isIntersecting) {
          // Otomatik oynatma engellenirse kapak görseli ve oynat düğmesi kalır.
          video.play().then(
            () => setDokunmaGerekli(false),
            () => setDokunmaGerekli(true)
          );
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink text-on-ink">
      <div className="mx-auto grid max-w-[88rem] items-center gap-16 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:py-32">
        <FadeInUp className="lg:col-span-6">
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-accent transition-colors hover:text-on-ink"
          >
            <InstagramIcon size={14} />
            {ig.eyebrow}
          </a>
          <h2 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]">
            <span className="block">{ig.title[0]}</span>
            <span className="block italic text-accent">{ig.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-on-ink/75">{ig.desc}</p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-full bg-on-ink px-6 text-sm font-medium text-ink transition-colors hover:bg-accent-light active:scale-[0.98]"
            >
              <InstagramIcon size={17} />
              {ig.follow}
            </a>
            <a
              href={whatsappLink(t.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-on-ink/30 px-6 text-sm font-medium transition-colors hover:border-on-ink hover:bg-on-ink hover:text-ink active:scale-[0.98]"
            >
              <WhatsAppIcon size={17} />
              {ig.whatsapp}
            </a>
          </div>

          <p className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-on-ink/15 pt-6 text-sm text-on-ink/70">
            {ig.visit}
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex items-center gap-2 font-medium tabular-nums text-on-ink transition-colors hover:text-accent"
            >
              <Phone size={14} strokeWidth={1.75} />
              {contact.phoneDisplay}
            </a>
          </p>
        </FadeInUp>

        <FadeInUp delay={0.15} className="relative mx-auto lg:col-span-5 lg:col-start-8">
          {/* Arkada logodaki kapsülün çizgisi */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 aspect-[400/772] h-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/35"
          />
          {/* Telefon çerçevesi */}
          <div className="relative w-[min(17.5rem,68vw)] -rotate-[4deg] rounded-[2.6rem] bg-shade p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[2.1rem] bg-shade">
              <video
                ref={videoRef}
                src="/video/bos-odadan-mutfaga.mp4"
                poster="/video/bos-odadan-mutfaga-poster.webp"
                muted
                loop
                playsInline
                // Tarayıcının video üstüne koyduğu "resim içinde resim" düğmesi telefon görüntüsünü bozuyordu
                disablePictureInPicture
                disableRemotePlayback
                preload="none"
                aria-label={ig.videoLabel}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-shade"
              />
              {dokunmaGerekli && (
                <button
                  type="button"
                  onClick={() => {
                    videoRef.current?.play().then(
                      () => setDokunmaGerekli(false),
                      () => {}
                    );
                  }}
                  aria-label={ig.play}
                  className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-[0_12px_30px_-10px_rgba(31,23,17,0.6)] transition-transform active:scale-95"
                >
                  <Play size={24} className="ml-1" fill="currentColor" />
                </button>
              )}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
