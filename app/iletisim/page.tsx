"use client";

import { useState } from "react";
import { Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { FadeInUp, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem } from "@/components/ui/animations";
import { useLang } from "@/contexts/LanguageContext";

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
const contactHrefs = ["tel:+905335209778", "https://instagram.com/seckinmobilyainsaat", null];
const contactLines = [
  ["0533 520 97 78", "0541 723 85 51"],
  ["@seckinmobilyainsaat"],
];

export default function IletisimPage() {
  const { p } = useLang();
  const pg = p.iletisim;

  const contactInfo = [...pg.contactLabels].map((title, i) => ({
    icon: contactIcons[i],
    title,
    lines: i === 2 ? [...pg.workingHours] : contactLines[i],
    href: contactHrefs[i] ?? null,
  }));

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                className="bg-primary text-white font-semibold px-8 py-3.5 rounded hover:bg-primary-dark transition-colors"
              >
                {pg.cta1}
              </a>
              <a
                href="tel:+905335209778"
                className="flex items-center gap-2 border border-primary text-primary font-semibold px-8 py-3.5 rounded hover:bg-primary hover:text-white transition-colors"
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
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-primary" />
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
                    <div className="bg-surface rounded-xl p-5 border border-border">
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
                <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-surface rounded-2xl border border-border">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={32} className="text-accent" />
                  </div>
                  <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                    {pg.success.heading}
                  </h2>
                  <p className="text-muted text-base max-w-sm">
                    {pg.success.text}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-surface rounded-2xl border border-border p-8 flex flex-col gap-5"
                >
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    {pg.form.heading}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {pg.form.name} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder={pg.form.namePlaceholder}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {pg.form.phone} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={pg.form.phonePlaceholder}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {pg.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={pg.form.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {pg.form.service}
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
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
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {pg.form.message} <span className="text-primary">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder={pg.form.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-white font-semibold py-3.5 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
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
          <div className="overflow-hidden rounded-2xl border border-border h-80">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.666523843219!2d28.97663!3d41.01384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzQ5LjgiTiAyOMKwNTgnMzUuOSJF!5e0!3m2!1str!2str!4v1618213241234!5m2!1str!2str"
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
