"use client";

import { useState } from "react";
import { Phone, MapPin, Send, CheckCircle, ArrowRight } from "lucide-react";
import { FadeInUp, FadeInRight, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";
import { contact, address, mapEmbedUrl } from "@/lib/site";

function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

const contactIcons = [Phone, InstagramIcon, MapPin];
const contactHrefs = [`tel:${contact.phone}`, contact.instagram, null];
const contactLines = [
  [contact.phoneDisplay, contact.phoneAltDisplay],
  [contact.instagramHandle],
];

export default function IletisimContent() {
  const { p } = useLang();
  const pg = p.iletisim;

  const contactInfo = [...pg.contactLabels].map((title, i) => ({
    icon: contactIcons[i],
    title,
    lines: i === 2 ? [...pg.workingHours] : contactLines[i],
    href: contactHrefs[i] ?? null,
  }));

  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = [
      pg.whatsappIntro,
      "",
      `${pg.form.name}: ${form.name}`,
      `${pg.form.phone}: ${form.phone}`,
      form.email ? `${pg.form.email}: ${form.email}` : null,
      form.service ? `${pg.form.service}: ${form.service}` : null,
      "",
      `${pg.form.message}: ${form.message}`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const url = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(body)}`;
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm({ name: "", phone: "", email: "", service: "", message: "" });
    setWhatsappUrl("");
    setSubmitted(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <section className="pt-36 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInUp>
            <span className="text-xs font-medium tracking-widest uppercase text-primary mb-4 block">
              {pg.badge}
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight max-w-3xl">
              {pg.title}
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-xl mb-10">
              {pg.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#form"
                className="bg-primary text-background font-semibold px-8 py-3.5 hover:bg-primary-light transition-colors"
              >
                {pg.cta1}
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-2 border border-border text-foreground font-medium px-8 py-3.5 hover:border-primary hover:text-primary transition-colors"
              >
                <Phone size={16} />
                {pg.cta2}
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section id="form" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            <StaggerContainer className="lg:col-span-2 flex flex-col gap-6">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 pt-0.5">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground mb-1">
                        {item.title}
                      </div>
                      {item.lines.map((line, j) => (
                        <div key={j} className="text-sm text-muted">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                );

                return (
                  <StaggerItem key={i}>
                    <div className="bg-surface p-6 border border-border hover:border-primary/40 transition-colors">
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="hover:opacity-80 transition-opacity"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            <FadeInRight className="lg:col-span-3">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-surface border border-border">
                  <div className="mb-6">
                    <CheckCircle size={36} className="text-primary" strokeWidth={1.25} />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                    {pg.success.heading}
                  </h2>
                  <p className="text-muted text-base max-w-sm mb-8">
                    {pg.success.text}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary text-background font-semibold px-8 py-3.5 hover:bg-primary-light transition-colors"
                    >
                      {pg.success.link}
                    </a>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="border border-border text-foreground font-medium px-8 py-3.5 hover:border-primary hover:text-primary transition-colors"
                    >
                      {pg.success.again}
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-surface border border-border p-8 flex flex-col gap-5"
                >
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    {pg.form.heading}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="form-name" className="block text-sm font-medium text-foreground mb-2">
                        {pg.form.name} <span className="text-primary">*</span>
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={pg.form.namePlaceholder}
                        className="w-full px-4 py-3 border border-border bg-background text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="form-phone" className="block text-sm font-medium text-foreground mb-2">
                        {pg.form.phone} <span className="text-primary">*</span>
                      </label>
                      <input
                        id="form-phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={pg.form.phonePlaceholder}
                        className="w-full px-4 py-3 border border-border bg-background text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="form-email" className="block text-sm font-medium text-foreground mb-2">
                      {pg.form.email}
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={pg.form.emailPlaceholder}
                      className="w-full px-4 py-3 border border-border bg-background text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="form-service" className="block text-sm font-medium text-foreground mb-2">
                      {pg.form.service}
                    </label>
                    <select
                      id="form-service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border bg-background text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="">{pg.form.servicePlaceholder}</option>
                      {[...pg.form.services].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="form-message" className="block text-sm font-medium text-foreground mb-2">
                      {pg.form.message} <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={pg.form.messagePlaceholder}
                      className="w-full px-4 py-3 border border-border bg-background text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-background font-semibold py-3.5 hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
                  >
                    {pg.form.submit} <Send size={16} />
                  </button>
                </form>
              )}
            </FadeInRight>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {pg.addressLabel}
                </div>
                <p className="text-sm text-muted leading-relaxed">{address.full}</p>
              </div>
            </div>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all shrink-0"
            >
              {pg.directions} <ArrowRight size={14} />
            </a>
          </div>
          <div className="overflow-hidden border border-border h-80">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Seçkin Mobilya & İnşaat Konum"
            />
          </div>
        </div>
      </section>
    </>
  );
}
