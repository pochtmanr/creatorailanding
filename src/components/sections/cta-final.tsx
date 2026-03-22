"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CTAFinal() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useTranslations("cta");
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, source: "newsletter" }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="cta" className="py-24 px-4 sm:px-8 bg-surface">
      <Reveal>
        <div className="max-w-5xl mx-auto glass-panel p-12 md:p-16 rounded-[3rem] text-center relative overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute -top-20 -start-20 w-64 h-64 bg-primary-container/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -end-20 w-64 h-64 bg-tertiary-container/20 blur-[100px] rounded-full" />

          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-8 relative z-10">
            {t("title")}
          </h2>
          <p className="text-on-surface/60 mb-10 max-w-lg mx-auto relative z-10">
            {t("subtitle")}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
          >
            <input
              className="w-full sm:w-80 px-6 py-4 bg-surface-container-highest border-none rounded-full focus:ring-2 focus:ring-primary-container text-on-surface placeholder:text-on-surface/30 outline-none"
              placeholder={t("placeholder")}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading" || status === "success"}
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className={status === "success" ? "bg-green-600" : ""}
              disabled={status === "loading" || status === "success"}
            >
              {status === "success"
                ? t("success")
                : status === "loading"
                  ? "..."
                  : t("cta")}
            </Button>
          </form>

          {status === "error" && (
            <p className="text-error text-sm mt-4 relative z-10">{t("error")}</p>
          )}

          <p className="text-on-surface/40 text-sm mt-6 relative z-10">{t("note")}</p>
        </div>
      </Reveal>
    </section>
  );
}
