"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SalesModal } from "@/components/ui/sales-modal";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={`w-4 h-4 shrink-0 ${className ?? ""}`} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

const plans = [
  {
    key: "explorer",
    monthly: 0,
    yearly: 0,
    features: ["5gen", "720p", "community"],
    variant: "secondary" as const,
    highlight: false,
  },
  {
    key: "director",
    monthly: 49,
    yearly: 39,
    features: ["unlimited", "4k", "beta", "priority"],
    variant: "primary" as const,
    highlight: true,
  },
  {
    key: "studio",
    monthly: 199,
    yearly: 159,
    features: ["team", "finetune", "api"],
    variant: "secondary" as const,
    highlight: false,
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const t = useTranslations("pricing");

  return (
    <section id="pricing" className="py-32 bg-surface-container-low px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <Reveal>
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">
                {t("title")}
              </h2>
              <p className="text-on-surface/50">{t("subtitle")}</p>
            </div>
          </Reveal>

          {/* Monthly / Yearly toggle */}
          <div className="flex p-1 bg-surface-container-highest rounded-full">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full font-headline font-bold text-sm transition-all ${
                !isYearly
                  ? "bg-primary-container text-on-primary-container"
                  : "text-on-surface/50"
              }`}
            >
              {t("monthly")}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full font-headline font-bold text-sm transition-all ${
                isYearly
                  ? "bg-primary-container text-on-primary-container"
                  : "text-on-surface/50"
              }`}
            >
              {t("yearly")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const price = isYearly ? plan.yearly : plan.monthly;
            const showSavings = isYearly && plan.monthly > 0;
            const showNoCreditCard = !isYearly && plan.key === "explorer";
            const showSpacer = !showSavings && plan.key !== "explorer";

            return (
              <Reveal key={plan.key} delay={i * 100}>
                <div
                  className={`p-10 rounded-[2.5rem] flex flex-col h-full ${
                    plan.highlight
                      ? "bg-primary-container/10 border-2 border-primary-container relative overflow-hidden"
                      : "glass-panel"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute top-0 end-0 bg-primary-container text-on-primary-container px-6 py-2 rounded-bl-2xl text-[10px] font-bold tracking-[0.2em] uppercase">
                      {t("popular")}
                    </div>
                  )}

                  <h4 className="text-lg font-headline font-bold mb-2">
                    {t(`${plan.key}Name`)}
                  </h4>

                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl font-bold font-headline">${price}</span>
                    <span className="text-on-surface/40 text-sm uppercase tracking-widest">
                      /{t("perMonth")}
                    </span>
                  </div>

                  {showSavings && (
                    <p className="text-primary-container text-xs mb-6">
                      {t("savePercent", {
                        percent: Math.round((1 - plan.yearly / plan.monthly) * 100),
                      })}
                    </p>
                  )}

                  {showNoCreditCard && (
                    <p className="text-on-surface/40 text-xs mb-6">{t("noCreditCard")}</p>
                  )}

                  {showSpacer && <div className="mb-6" />}

                  <ul className="space-y-4 mb-12 flex-grow">
                    {plan.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-center gap-3 text-sm ${
                          plan.highlight
                            ? "text-on-surface font-semibold"
                            : "text-on-surface/70"
                        }`}
                      >
                        <CheckIcon
                          className={
                            plan.highlight ? "text-primary-container" : "text-primary"
                          }
                        />
                        {t(`feature_${f}`)}
                      </li>
                    ))}
                  </ul>

                  {plan.key === "studio" ? (
                    <Button
                      variant={plan.variant}
                      size="lg"
                      className="w-full"
                      onClick={() => setSalesOpen(true)}
                    >
                      {t(`${plan.key}Cta`)}
                    </Button>
                  ) : (
                    <Button variant={plan.variant} size="lg" className="w-full">
                      {t(`${plan.key}Cta`)}
                    </Button>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <SalesModal open={salesOpen} onClose={() => setSalesOpen(false)} />
    </section>
  );
}
