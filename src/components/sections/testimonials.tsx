import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

const testimonials = [
  { key: "sarah", gradient: "from-primary-container/30 to-tertiary-container/30" },
  { key: "david", gradient: "from-tertiary-container/30 to-primary-container/30" },
  { key: "maya", gradient: "from-primary/30 to-primary-container/30" },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-primary-container" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export async function Testimonials() {
  const t = await getTranslations("testimonials");

  return (
    <section className="py-32 bg-surface-container-low px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-on-surface/50 max-w-xl mx-auto">{t("subtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <Reveal key={item.key} delay={i * 100}>
              <div className="glass-panel rounded-3xl p-8 relative overflow-hidden h-full">
                {/* Quote mark */}
                <div className="absolute top-4 end-6 text-6xl font-serif text-primary-container/10 leading-none">&ldquo;</div>

                <div className="flex items-center gap-4 mb-6">
                  {/* Avatar placeholder */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient}`} />
                  <div>
                    <div className="font-headline font-bold text-on-surface text-sm">{t(`${item.key}Name`)}</div>
                    <div className="text-on-surface/40 text-xs">{t(`${item.key}Role`)}</div>
                  </div>
                </div>

                <StarRating />

                <p className="mt-4 text-on-surface/60 text-sm leading-relaxed italic">
                  &ldquo;{t(`${item.key}Quote`)}&rdquo;
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
