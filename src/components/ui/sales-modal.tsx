"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "200+"];

type SalesModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SalesModal({ open, onClose }: SalesModalProps) {
  const t = useTranslations("pricing.salesModal");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company_name: companyName,
          company_size: companySize || undefined,
          message,
          locale,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 m-0 h-full w-full max-h-full max-w-full bg-transparent backdrop:bg-black/60 backdrop:backdrop-blur-sm open:flex open:items-center open:justify-center"
    >
      <div className="glass-panel rounded-[2rem] p-8 sm:p-10 w-[90vw] max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-headline font-bold text-on-surface">
            {t("title")}
          </h3>
          <button
            onClick={onClose}
            className="text-on-surface/40 hover:text-on-surface transition-colors p-1"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-container/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-on-surface font-headline font-bold text-lg">{t("success")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="sales-email" className="block text-sm font-medium text-on-surface/70 mb-1.5">
                {t("email")} <span className="text-error">*</span>
              </label>
              <input
                id="sales-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-surface-container-high/50 border border-outline-variant/30 px-4 py-3 text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
                placeholder="you@company.com"
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="sales-company" className="block text-sm font-medium text-on-surface/70 mb-1.5">
                {t("company")}
              </label>
              <input
                id="sales-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-xl bg-surface-container-high/50 border border-outline-variant/30 px-4 py-3 text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all"
              />
            </div>

            {/* Company Size */}
            <div>
              <label htmlFor="sales-size" className="block text-sm font-medium text-on-surface/70 mb-1.5">
                {t("size")}
              </label>
              <select
                id="sales-size"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full rounded-xl bg-surface-container-high/50 border border-outline-variant/30 px-4 py-3 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all appearance-none"
              >
                <option value="">—</option>
                {COMPANY_SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="sales-message" className="block text-sm font-medium text-on-surface/70 mb-1.5">
                {t("message")}
              </label>
              <textarea
                id="sales-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full rounded-xl bg-surface-container-high/50 border border-outline-variant/30 px-4 py-3 text-on-surface placeholder:text-on-surface/30 focus:outline-none focus:ring-2 focus:ring-primary-container/50 transition-all resize-none"
                placeholder={t("messagePlaceholder")}
              />
            </div>

            {status === "error" && (
              <p className="text-error text-sm">{t("error")}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary-container text-on-primary-container rounded-full py-3.5 font-headline font-bold text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {status === "loading" ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t("submit")}
                </span>
              ) : (
                t("submit")
              )}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
