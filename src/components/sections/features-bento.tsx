import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";

const features = [
  { key: "aiScript", featured: true },
  { key: "voiceClone", featured: true },
  { key: "styleTransfer", featured: false },
  { key: "autoEdit", featured: false },
  { key: "musicSync", featured: false },
  { key: "multiExport", featured: false },
];

const featureIcons: Record<string, React.ReactNode> = {
  aiScript: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  voiceClone: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
    </svg>
  ),
  styleTransfer: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  autoEdit: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-8.625 0l.394-3.543a2.25 2.25 0 01.655-1.328l10.5-10.5a2.25 2.25 0 013.182 0l1.06 1.06a2.25 2.25 0 010 3.182l-10.5 10.5a2.25 2.25 0 01-1.328.655l-3.543.394z" />
    </svg>
  ),
  musicSync: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  ),
  multiExport: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
    </svg>
  ),
};

export async function FeaturesBento() {
  const t = await getTranslations("features");

  return (
    <section id="features" className="py-32 bg-surface-container-low px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">
            {t("title")}
          </h2>
          <p className="text-on-surface/50 max-w-xl mx-auto">{t("subtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal
              key={f.key}
              delay={i * 80}
              className={f.featured ? "md:col-span-1 lg:col-span-1" : ""}
            >
              <div
                className={`group relative p-8 rounded-3xl transition-all duration-300 hover:scale-[1.02] h-full ${
                  f.featured
                    ? "bg-gradient-to-br from-primary-container/15 to-surface-container border border-primary-container/20"
                    : "glass-panel"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary-container/20 transition-colors">
                  {featureIcons[f.key]}
                </div>
                <h3 className="text-xl font-headline font-bold mb-3 text-on-surface">
                  {t(`${f.key}Title`)}
                </h3>
                <p className="text-on-surface/50 text-sm leading-relaxed">
                  {t(`${f.key}Desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
