"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { FadeInUp } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";
import { contact, address, whatsappLink } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";

/** Açılışın hemen ardından: marka cümlesi ve kısa tanıtım. */
export default function IntroStatement() {
  const { t } = useLang();
  const i = t.home.intro;

  const baglantilar = [
    { href: contact.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: whatsappLink(t.whatsapp.message), label: "WhatsApp", Icon: WhatsAppIcon },
    {
      href: address.mapsUrl,
      label: i.map,
      Icon: ({ size }: { size?: number }) => <MapPin size={size} strokeWidth={1.75} />,
    },
  ];

  return (
    <section className="py-24 lg:py-40">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-12">
        <FadeInUp className="lg:col-span-8">
          <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">
            {i.eyebrow}
          </p>
          <h2 className="font-heading text-[clamp(2.75rem,5.2vw,5.25rem)] leading-[0.98] tracking-[-0.015em] text-foreground">
            <span className="block">{i.statement[0]}</span>
            <span className="block italic text-brand">{i.statement[1]}</span>
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.15} className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-[36ch] text-lg leading-relaxed text-muted">{i.body}</p>
          <Link
            href="/hakkimizda"
            className="mt-6 inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            {i.more} <ArrowRight size={14} />
          </Link>

          <ul className="mt-12 flex flex-wrap gap-2">
            {baglantilar.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-[13px] text-foreground/80 transition-colors hover:border-primary hover:bg-primary hover:text-on-ink"
                >
                  <Icon size={15} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </FadeInUp>
      </div>
    </section>
  );
}
