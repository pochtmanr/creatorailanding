import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/ui/reveal";
import { ApiWaitlistForm } from "@/components/sections/api-waitlist-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "apiPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const featureKeys = [
  "textToVideo",
  "voiceCloning",
  "styleTransfer",
  "batch",
  "webhooks",
  "analytics",
] as const;

const featureIcons: Record<string, React.ReactNode> = {
  textToVideo: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  voiceCloning: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
    </svg>
  ),
  styleTransfer: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
    </svg>
  ),
  batch: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0L12 17.25 6.43 14.25m11.142 0-5.572 3-5.571-3m11.142 0L21.75 16.5 12 21.75 2.25 16.5l4.179-2.25" />
    </svg>
  ),
  webhooks: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  ),
  analytics: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  ),
};

export default async function ApiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("apiPage");

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20 bg-surface">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-tertiary-container/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 end-1/4 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-tertiary/20 bg-tertiary/5 text-tertiary text-xs font-sans tracking-[0.2em] mb-8 reveal-up"
            style={{ animationDelay: "0.1s" }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {t("badge")}
          </div>

          <h1
            className="text-5xl md:text-7xl font-headline font-bold tracking-tighter mb-8 reveal-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("title")}
          </h1>

          <p
            className="max-w-2xl mx-auto text-lg md:text-xl text-on-surface/60 mb-12 reveal-up"
            style={{ animationDelay: "0.3s" }}
          >
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Planned Features — Bento Grid */}
      <section className="py-32 bg-surface-container-low px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">
              {t("featuresTitle")}
            </h2>
            <p className="text-on-surface/50 max-w-xl mx-auto">
              {t("featuresSubtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureKeys.map((key, i) => (
              <Reveal key={key} delay={i * 80}>
                <div className="group relative p-8 rounded-3xl glass-panel transition-all duration-300 hover:scale-[1.02] h-full">
                  <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary-container/20 transition-colors">
                    {featureIcons[key]}
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-3 text-on-surface">
                    {t(`${key}Title`)}
                  </h3>
                  <p className="text-on-surface/50 text-sm leading-relaxed">
                    {t(`${key}Desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section className="py-32 bg-surface px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">
              {t("codePreviewTitle")}
            </h2>
            <p className="text-on-surface/50 max-w-xl mx-auto">
              {t("codePreviewSubtitle")}
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-surface-container-lowest rounded-2xl border border-on-surface/10 overflow-hidden">
              {/* Tab bar */}
              <div className="flex items-center gap-3 px-6 py-3 border-b border-on-surface/10 bg-surface-container-low/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-error/40" />
                  <div className="w-3 h-3 rounded-full bg-primary-fixed-dim/40" />
                  <div className="w-3 h-3 rounded-full bg-tertiary/40" />
                </div>
                <span className="text-xs text-on-surface/30 font-mono">generate-video.js</span>
              </div>

              {/* Code — request */}
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <pre className="text-on-surface/80">
                  <code>{`const response = await fetch("https://api.creatorai.art/v1/generate", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    prompt: "A cinematic drone shot over neon-lit Tokyo at night",
    style: "cyberpunk",
    duration: 15,
    resolution: "1080p",
    aspect_ratio: "9:16",
    webhook_url: "https://your-app.com/api/callback",
  }),
});

const { job_id, status, estimated_seconds } = await response.json();`}</code>
                </pre>
              </div>

              {/* Divider */}
              <div className="border-t border-on-surface/10" />

              {/* Code — response */}
              <div className="flex items-center gap-3 px-6 py-3 border-b border-on-surface/10 bg-surface-container-low/50">
                <span className="text-xs text-on-surface/30 font-mono">response.json</span>
              </div>
              <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                <pre className="text-on-surface/60">
                  <code>{`{
  "job_id": "gen_a1b2c3d4e5f6",
  "status": "processing",
  "estimated_seconds": 45,
  "video_url": null,
  "webhook_url": "https://your-app.com/api/callback"
}`}</code>
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-32 bg-surface-container-low px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Reveal className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">
              {t("pricingTitle")}
            </h2>
            <p className="text-on-surface/50 max-w-xl mx-auto">
              {t("pricingSubtitle")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["Free", "Pro", "Enterprise"] as const).map((tier, i) => {
              const key = tier.toLowerCase() as "free" | "pro" | "enterprise";
              const isMiddle = i === 1;
              return (
                <Reveal key={tier} delay={i * 100}>
                  <div
                    className={`relative p-8 rounded-3xl text-center h-full ${
                      isMiddle
                        ? "bg-gradient-to-br from-primary-container/15 to-surface-container border border-primary-container/20"
                        : "glass-panel"
                    }`}
                  >
                    <h3 className="text-2xl font-headline font-bold mb-2">
                      {t(`pricing${tier}`)}
                    </h3>
                    <p className="text-primary text-lg font-bold mb-4">
                      {t(`pricing${tier}Desc`)}
                    </p>
                    <p className="text-on-surface/40 text-sm">
                      {t(`pricing${tier}Features`)}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="py-32 px-4 sm:px-8 bg-surface">
        <Reveal>
          <div className="max-w-5xl mx-auto glass-panel p-12 md:p-16 rounded-[3rem] text-center relative overflow-hidden">
            <div className="absolute -top-20 -start-20 w-64 h-64 bg-tertiary-container/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-20 -end-20 w-64 h-64 bg-primary-container/20 blur-[100px] rounded-full" />

            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-8 relative z-10">
              {t("waitlistTitle")}
            </h2>
            <p className="text-on-surface/60 mb-10 max-w-lg mx-auto relative z-10">
              {t("waitlistSubtitle")}
            </p>

            <ApiWaitlistForm />

            <p className="text-on-surface/40 text-sm mt-6 relative z-10">
              {t("waitlistNote")}
            </p>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
