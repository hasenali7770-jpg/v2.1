"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { Locale, isLocale, t } from "@/lib/i18n";
import { useParams } from "next/navigation";

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = (isLocale(params.locale) ? params.locale : "ar") as Locale;
  const tr = t(locale);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <Container className="py-10">
      {/* FIXED: Using contact.title instead of contactTitle */}
      <h1 className="text-2xl font-semibold text-ink dark:text-night-text">{tr.contact.title}</h1>
      {/* FIXED: Using contact.subtitle instead of contactNote */}
      <p className="mt-2 text-sm leading-7 text-muted dark:text-night-muted">{tr.contact.subtitle}</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Contact Form */}
        <div className="rounded-3xl border border-stroke bg-white p-7 shadow-soft dark:border-night-stroke dark:bg-night-surface">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-ink dark:text-night-text">
                {tr.contact.form.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-2xl border border-stroke bg-sand-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand dark:border-night-stroke dark:bg-brand/10 dark:text-night-text"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-ink dark:text-night-text">
                {tr.contact.form.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-2xl border border-stroke bg-sand-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand dark:border-night-stroke dark:bg-brand/10 dark:text-night-text"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-ink dark:text-night-text">
                {tr.contact.form.phone}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 w-full rounded-2xl border border-stroke bg-sand-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand dark:border-night-stroke dark:bg-brand/10 dark:text-night-text"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-ink dark:text-night-text">
                {tr.contact.form.subject}
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-2xl border border-stroke bg-sand-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand dark:border-night-stroke dark:bg-brand/10 dark:text-night-text"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-ink dark:text-night-text">
                {tr.contact.form.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="mt-1 w-full rounded-2xl border border-stroke bg-sand-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand dark:border-night-stroke dark:bg-brand/10 dark:text-night-text"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full rounded-2xl py-3 font-bold text-white transition ${
                status === "loading"
                  ? "bg-muted cursor-not-allowed"
                  : "bg-brand hover:opacity-90"
              }`}
            >
              {status === "loading" ? tr.contact.form.sending : tr.contact.form.send}
            </button>

            {status === "success" && (
              <div className="rounded-xl bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                {tr.contact.form.success}
              </div>
            )}

            {status === "error" && (
              <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                {tr.contact.form.error}
              </div>
            )}
          </form>
        </div>

        {/* Contact Information */}
        <div className="rounded-3xl border border-stroke bg-white p-7 shadow-soft dark:border-night-stroke dark:bg-night-surface">
          <h2 className="text-xl font-semibold text-ink dark:text-night-text">{tr.contact.info.title}</h2>
          
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm font-medium text-muted dark:text-night-muted">Email</p>
              <a href={`mailto:${tr.contact.info.email}`} className="text-brand hover:underline">
                {tr.contact.info.email}
              </a>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted dark:text-night-muted">Phone</p>
              <a href={`tel:${tr.contact.info.phone}`} className="text-brand hover:underline">
                {tr.contact.info.phone}
              </a>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted dark:text-night-muted">Address</p>
              <p className="text-ink dark:text-night-text">{tr.contact.info.address}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted dark:text-night-muted">Hours</p>
              <p className="text-ink dark:text-night-text">{tr.contact.info.hours}</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-ink dark:text-night-text">{tr.contact.social.title}</h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href="#" className="rounded-full bg-brand/10 p-3 text-brand hover:bg-brand hover:text-white transition">
                <span className="sr-only">Facebook</span>
                FB
              </a>
              <a href="#" className="rounded-full bg-brand/10 p-3 text-brand hover:bg-brand hover:text-white transition">
                <span className="sr-only">Instagram</span>
                IG
              </a>
              <a href="#" className="rounded-full bg-brand/10 p-3 text-brand hover:bg-brand hover:text-white transition">
                <span className="sr-only">Twitter</span>
                TW
              </a>
              <a href="#" className="rounded-full bg-brand/10 p-3 text-brand hover:bg-brand hover:text-white transition">
                <span className="sr-only">YouTube</span>
                YT
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
