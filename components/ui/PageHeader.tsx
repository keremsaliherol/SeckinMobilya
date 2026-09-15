import type { ReactNode } from "react";

/**
 * İç sayfaların ortak başlığı.
 *
 * Başlık bir ya da iki satır: ikinci satır italik ve logo kahvesi — ana
 * sayfadaki "Tasarımdan montaja, *tek elden.*" diliyle aynı. Solda başlık,
 * sağda açıklama; altta ince bir çizgiyle içerikten ayrılır.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: readonly string[];
  description?: string;
  /** Açıklamanın altına eklenecek butonlar vb. */
  children?: ReactNode;
}) {
  return (
    <section className="pb-14 pt-32 lg:pb-20 lg:pt-44">
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-16">
          <div className="baslik-belir lg:col-span-8">
            <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
            <h1 className="font-heading text-[clamp(2.75rem,6.6vw,6.25rem)] leading-[0.96] tracking-[-0.015em] text-foreground">
              <span className="block">{title[0]}</span>
              {title[1] && <span className="block italic text-brand">{title[1]}</span>}
            </h1>
          </div>
          {(description || children) && (
            <div className="baslik-belir baslik-belir-gecikmeli lg:col-span-4 lg:pb-2">
              {description && (
                <p className="max-w-[40ch] text-lg leading-relaxed text-muted">{description}</p>
              )}
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
