"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ThemeToggle } from "./theme-toggle";
import { DownloadButtons } from "@/components/ui/download-buttons";

function MobileDownloadButton() {
  return <DownloadButtons size="sm" />;
}

const localeNames: Record<string, string> = {
  en: "English",
  he: "עברית",
};

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setIsOpen(false);
    setLangOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  const switchLocale = useCallback(
    (newLocale: string) => {
      router.replace(pathname, { locale: newLocale });
      close();
    },
    [router, pathname, close]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  const overlay = (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-200 ease-out ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/60" onClick={close} aria-hidden="true" />

      <div
        className={`relative mx-4 mt-[max(1rem,env(safe-area-inset-top))] bg-surface/95 backdrop-blur-md rounded-2xl shadow-lg shadow-primary/10 border border-on-surface/10 transition-[transform,opacity] duration-200 ease-out ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-on-surface/10">
          <span className="text-base font-bold text-on-surface font-headline tracking-tight">
            CreatorAI
          </span>
          <button
            ref={closeButtonRef}
            onClick={close}
            className="p-2 -me-2 text-on-surface/60 hover:text-on-surface transition-colors rounded-full"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="px-2 py-2 space-y-0.5">
          <Link href="/#features" onClick={close} className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-on-surface/70 hover:text-on-surface hover:bg-surface-container/50 transition-colors">
            {t("features")}
          </Link>
          <Link href="/#pricing" onClick={close} className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-on-surface/70 hover:text-on-surface hover:bg-surface-container/50 transition-colors">
            {t("pricing")}
          </Link>
          <Link href="/blog" onClick={close} className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-on-surface/70 hover:text-on-surface hover:bg-surface-container/50 transition-colors">
            {t("blog")}
          </Link>
          <Link href="/api" onClick={close} className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-on-surface/70 hover:text-on-surface hover:bg-surface-container/50 transition-colors">
            {t("api")}
          </Link>
          <div className="flex justify-center mx-2 mt-2">
            <MobileDownloadButton />
          </div>
        </div>

        {/* Language + Theme */}
        <div className="px-2 py-2 border-t border-on-surface/10">
          <button
            onClick={() => setLangOpen((prev) => !prev)}
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container/50 transition-colors"
            aria-expanded={langOpen}
          >
            <span>{localeNames[locale] || locale}</span>
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className={`grid transition-[grid-template-rows] duration-[180ms] ease-out ${langOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="overflow-hidden">
              <div className="grid grid-cols-2 gap-1 mt-1 px-1 pb-1">
                {routing.locales.map((loc) => {
                  const isActive = locale === loc;
                  return (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-primary-container/15 text-primary-container ring-1 ring-primary-container/20"
                          : "text-on-surface/60 hover:text-on-surface hover:bg-surface-container/50"
                      }`}
                    >
                      <span className="font-medium">{localeNames[loc] || loc}</span>
                      {isActive && (
                        <svg className="w-3.5 h-3.5 ms-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-sm font-medium text-on-surface/60">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        ref={hamburgerRef}
        onClick={() => setIsOpen(true)}
        className="p-2 -me-2 text-on-surface hover:text-on-surface/70 transition-colors"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
          <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
}
