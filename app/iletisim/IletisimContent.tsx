"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight, Check, ChevronDown, MapPin, Phone } from "lucide-react";
import { FadeInUp } from "@/components/ui/animations";
import PageHeader from "@/components/ui/PageHeader";
import { Monogram } from "@/components/ui/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { useLang } from "@/contexts/LanguageContext";
import { contact, address, mapEmbedUrl, whatsappLink } from "@/lib/site";

const BOS_FORM = { name: "", phone: "", email: "", service: "", message: "" };

const alanSinifi =
  "w-full border-0 border-b border-foreground/20 bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted/70 transition-colors focus:border-brand focus:outline-none";
const etiketSinifi = "block text-[11px] font-medium uppercase tracking-[0.2em] text-muted";

export default function IletisimContent() {
  const { p } = useLang();
  const pg = p.iletisim;
  const k = pg.card;

  const [form, setForm] = useState(BOS_FORM);
  const [gonderildi, setGonderildi] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const degistir = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((onceki) => ({ ...onceki, [e.target.name]: e.target.value }));

  /** Form sunucuya gitmez: mesaj WhatsApp'ta hazır yazılmış olarak açılır. */
  const gonder = (e: FormEvent) => {
    e.preventDefault();
    const govde = [
      pg.whatsappIntro,
      "",
      `${pg.form.name}: ${form.name}`,
      `${pg.form.phone}: ${form.phone}`,
      form.email ? `${pg.form.email}: ${form.email}` : null,
      form.service ? `${pg.form.service}: ${form.service}` : null,
      "",
      `${pg.form.message}: ${form.message}`,
    ]
      .filter((satir) => satir !== null)
      .join("\n");

    const url = whatsappLink(govde);
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setGonderildi(true);
  };

  const sifirla = () => {
    setForm(BOS_FORM);
    setWhatsappUrl("");
    setGonderildi(false);
  };

  const zorunlu = (
    <span className="text-brand" aria-hidden="true">
      {" "}*
    </span>
  );

  const kartBaglantisi =
    "flex h-14 items-center justify-between gap-4 rounded-full border border-on-ink/25 px-6 text-sm font-medium transition-colors hover:border-on-ink hover:bg-on-ink hover:text-ink active:scale-[0.99]";

  return (
    <>
      <PageHeader eyebrow={pg.badge} title={pg.title} description={pg.subtitle} />

      <section className="pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-[88rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-start lg:gap-8 lg:px-12">
          {/* İletişim kartı: kapsül tepeli, tek dokunuşla arama / yazma */}
          <FadeInUp className="lg:col-span-5">
            <div className="rounded-t-[999px] bg-ink px-6 pb-10 pt-16 text-on-ink sm:px-10 lg:pt-20">
              <div className="flex flex-col items-center text-center">
                <Monogram className="h-24 text-accent" />
                <p className="mt-6 text-[13px] uppercase tracking-[0.3em]">Seçkin Mimarlık</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-on-ink/65">{k.tagline}</p>
              </div>

              <ul className="mt-10 flex flex-col gap-3">
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex h-14 items-center justify-between gap-4 rounded-full bg-on-ink px-6 text-sm font-medium text-ink transition-colors hover:bg-accent-light active:scale-[0.99]"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Phone size={17} strokeWidth={1.75} />
                      {k.call}
                    </span>
                    <span className="tabular-nums">{contact.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a href={whatsappLink(p.iletisim.whatsappIntro)} target="_blank" rel="noopener noreferrer" className={kartBaglantisi}>
                    <span className="inline-flex items-center gap-3">
                      <WhatsAppIcon size={17} />
                      {k.whatsapp}
                    </span>
                    <ArrowUpRight size={16} />
                  </a>
                </li>
                <li>
                  <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className={kartBaglantisi}>
                    <span className="inline-flex items-center gap-3">
                      <InstagramIcon size={17} />
                      {k.instagram}
                    </span>
                    <span className="text-on-ink/70">{contact.instagramHandle}</span>
                  </a>
                </li>
                <li>
                  <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className={kartBaglantisi}>
                    <span className="inline-flex items-center gap-3">
                      <MapPin size={17} strokeWidth={1.75} />
                      {k.directions}
                    </span>
                    <ArrowUpRight size={16} />
                  </a>
                </li>
              </ul>

              <dl className="mt-10 grid gap-5 border-t border-on-ink/15 pt-8 text-sm">
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-on-ink/60">{k.secondPhone}</dt>
                  <dd className="mt-1">
                    <a href={`tel:${contact.phoneAlt}`} className="tabular-nums transition-colors hover:text-accent">
                      {contact.phoneAltDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-on-ink/60">{pg.addressLabel}</dt>
                  <dd className="mt-1 leading-relaxed text-on-ink/85">
                    {address.full}
                    <span className="mt-1 block text-on-ink/60">{k.serviceArea}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </FadeInUp>

          {/* Teklif formu */}
          <FadeInUp delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            {gonderildi ? (
              <div className="flex flex-col items-start bg-surface px-6 py-12 sm:px-10" role="status">
                <span className="mb-6 inline-flex size-12 items-center justify-center rounded-full bg-primary text-on-ink">
                  <Check size={22} />
                </span>
                <h2 className="font-heading text-[clamp(2rem,3.2vw,3rem)] leading-[1.05] text-foreground">
                  {pg.success.heading}
                </h2>
                <p className="mt-4 max-w-[44ch] text-lg leading-relaxed text-muted">{pg.success.text}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2.5 rounded-full bg-primary px-6 text-sm font-medium text-on-ink transition-colors hover:bg-primary-light"
                  >
                    <WhatsAppIcon size={17} />
                    {pg.success.link}
                  </a>
                  <button
                    type="button"
                    onClick={sifirla}
                    className="inline-flex h-12 items-center rounded-full border border-foreground/20 px-6 text-sm font-medium text-foreground transition-colors hover:border-primary"
                  >
                    {pg.success.again}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={gonder} className="flex flex-col gap-8">
                <div>
                  <h2 className="font-heading text-[clamp(2rem,3.2vw,3rem)] leading-none text-foreground">
                    {pg.form.heading}
                  </h2>
                  <p className="mt-4 max-w-[48ch] leading-relaxed text-muted">{pg.form.desc}</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="form-name" className={etiketSinifi}>
                      {pg.form.name}
                      {zorunlu}
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      required
                      value={form.name}
                      onChange={degistir}
                      placeholder={pg.form.namePlaceholder}
                      className={alanSinifi}
                    />
                  </div>
                  <div>
                    <label htmlFor="form-phone" className={etiketSinifi}>
                      {pg.form.phone}
                      {zorunlu}
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                      value={form.phone}
                      onChange={degistir}
                      placeholder={pg.form.phonePlaceholder}
                      className={`${alanSinifi} tabular-nums`}
                    />
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="form-email" className={etiketSinifi}>
                      {pg.form.email}
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={degistir}
                      placeholder={pg.form.emailPlaceholder}
                      className={alanSinifi}
                    />
                  </div>
                  <div>
                    <label htmlFor="form-service" className={etiketSinifi}>
                      {pg.form.service}
                    </label>
                    <div className="relative">
                      <select
                        id="form-service"
                        name="service"
                        value={form.service}
                        onChange={degistir}
                        className={`${alanSinifi} appearance-none pr-8 ${form.service ? "" : "text-muted/80"}`}
                      >
                        <option value="">{pg.form.servicePlaceholder}</option>
                        {pg.form.services.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-muted"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="form-message" className={etiketSinifi}>
                    {pg.form.message}
                    {zorunlu}
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={degistir}
                    placeholder={pg.form.messagePlaceholder}
                    className={`${alanSinifi} resize-none`}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-xs text-muted">
                    <span className="text-brand">*</span> {pg.form.required}
                  </p>
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center gap-2.5 rounded-full bg-primary px-7 text-sm font-medium text-on-ink transition-colors hover:bg-primary-light active:scale-[0.98]"
                  >
                    <WhatsAppIcon size={17} />
                    {pg.form.submit}
                  </button>
                </div>
              </form>
            )}
          </FadeInUp>
        </div>
      </section>

      {/* Harita */}
      <section className="pb-24 lg:pb-36">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-12">
          <div className="mb-8 flex flex-col gap-5 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-muted">{pg.addressLabel}</p>
              <p className="font-heading text-[clamp(1.75rem,2.6vw,2.5rem)] leading-tight text-foreground">
                {address.street}
                <br />
                {address.postalCode} {address.district} / {address.city}
              </p>
            </div>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 shrink-0 items-center gap-2 self-start rounded-full border border-foreground/20 px-6 text-sm font-medium text-foreground transition-colors hover:border-primary sm:self-auto"
            >
              <MapPin size={16} strokeWidth={1.75} />
              {k.directions}
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="h-[22rem] overflow-hidden bg-surface lg:h-[28rem]">
            <iframe
              src={mapEmbedUrl}
              title={pg.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              /* Haritanın canlı renkleri bej paletle çatışmasın diye hafifçe soldurulur */
              className="h-full w-full border-0 [filter:grayscale(0.35)_sepia(0.12)]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
