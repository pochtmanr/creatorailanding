"use client";

import { useTranslations } from "next-intl";
import { AccordionItem } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

const faqKeys = [
  "pricing",
  "quality",
  "formats",
  "aiModels",
  "commercial",
  "languages",
  "apiAccess",
  "refund",
];

export function FAQ() {
  const t = useTranslations("faq");

  const left = faqKeys.slice(0, 4);
  const right = faqKeys.slice(4);

  return (
    <section className="py-32 bg-surface px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-on-surface/50 max-w-xl mx-auto">{t("subtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          <div>
            {left.map((key, i) => (
              <Reveal key={key} delay={i * 50}>
                <AccordionItem question={t(`${key}Q`)} answer={t(`${key}A`)} />
              </Reveal>
            ))}
          </div>
          <div>
            {right.map((key, i) => (
              <Reveal key={key} delay={(i + 4) * 50}>
                <AccordionItem question={t(`${key}Q`)} answer={t(`${key}A`)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
