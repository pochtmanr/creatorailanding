"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";

export function ApiWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useTranslations("apiPage");
  const locale = useLocale();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, source: "api-page" }),
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
    >
      <input
        className="w-full sm:w-80 px-6 py-4 bg-surface-container-highest border-none rounded-full focus:ring-2 focus:ring-primary-container text-on-surface placeholder:text-on-surface/30 outline-none"
        placeholder={t("waitlistPlaceholder")}
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
          ? t("waitlistSuccess")
          : status === "loading"
            ? "..."
            : t("waitlistCta")}
      </Button>
    </form>
  );
}
