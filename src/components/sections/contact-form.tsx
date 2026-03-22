"use client";

import { useState, type FormEvent } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "@/components/ui/reveal";

const RATE_LIMIT_WINDOW = 60_000;
const MAX_SUBMISSIONS = 3;

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "rate-limited">("idle");
  const [submissions, setSubmissions] = useState<number[]>([]);

  function isClientRateLimited(): boolean {
    const now = Date.now();
    const recent = submissions.filter((ts) => now - ts < RATE_LIMIT_WINDOW);
    return recent.length >= MAX_SUBMISSIONS;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    if (isClientRateLimited()) {
      setStatus("rate-limited");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company_name: name || undefined,
          message: subject ? `[${subject}] ${message}` : message,
          source: "contact-page",
          locale,
        }),
      });

      if (res.status === 429) {
        setStatus("rate-limited");
        return;
      }

      if (!res.ok) throw new Error("Failed");

      setSubmissions((prev) => [...prev, Date.now()]);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Contact Form — 2 columns */}
        <div className="md:col-span-2">
          <Reveal>
            <div className="glass-panel rounded-[2rem] p-8 md:p-12">
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-8">
                {t("form.title")}
              </h2>

              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-container/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-on-surface font-headline font-bold text-lg">
                    {t("form.success")}
                  </p>
                  <p className="text-on-surface/60 font-sans text-sm mt-2">
                    {t("form.successDescription")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-on-surface/70 mb-1.5">
                      {t("form.name")}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-surface-container-high/50 border border-outline-variant/30 px-4 py-3 text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                      placeholder={t("form.namePlaceholder")}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-on-surface/70 mb-1.5">
                      {t("form.email")} <span className="text-error">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl bg-surface-container-high/50 border border-outline-variant/30 px-4 py-3 text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-on-surface/70 mb-1.5">
                      {t("form.subject")}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl bg-surface-container-high/50 border border-outline-variant/30 px-4 py-3 text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                      placeholder={t("form.subjectPlaceholder")}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-on-surface/70 mb-1.5">
                      {t("form.message")}
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full rounded-xl bg-surface-container-high/50 border border-outline-variant/30 px-4 py-3 text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all resize-none"
                      placeholder={t("form.messagePlaceholder")}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-error text-sm" role="alert">{t("form.error")}</p>
                  )}

                  {status === "rate-limited" && (
                    <p className="text-error text-sm" role="alert">{t("form.rateLimited")}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-primary-container text-on-primary-container rounded-full py-3.5 font-headline font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {status === "loading" ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {t("form.submit")}
                      </span>
                    ) : (
                      t("form.submit")
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Info Sidebar */}
        <div className="md:col-span-1">
          <Reveal delay={150}>
            <div className="glass-panel rounded-[2rem] p-8 h-full flex flex-col gap-8">
              <div>
                <h3 className="text-lg font-headline font-bold text-on-surface mb-4">
                  {t("info.title")}
                </h3>
                <p className="text-on-surface/60 font-sans text-sm leading-relaxed">
                  {t("info.description")}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-on-surface/60 font-sans">{t("info.emailLabel")}</p>
                  <a
                    href="mailto:support@creatorai.art"
                    className="text-primary-container font-sans text-sm hover:underline"
                  >
                    support@creatorai.art
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-tertiary/20 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-on-surface/60 font-sans">{t("info.responseLabel")}</p>
                  <p className="text-on-surface font-sans text-sm font-medium">
                    {t("info.responseTime")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
