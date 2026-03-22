import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/config";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/ui/reveal";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  const baseUrl = getBaseUrl();

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: Object.fromEntries([
        ...routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/about`]),
        ["x-default", `${baseUrl}/en/about`],
      ]),
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url: `${baseUrl}/${locale}/about`,
      siteName: "CreatorAI",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "CreatorAI" }],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const values = [
    { key: "innovation" as const, icon: LightbulbIcon },
    { key: "accessibility" as const, icon: GlobeIcon },
    { key: "creatorFirst" as const, icon: HeartIcon },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 sm:px-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-20 start-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 end-1/4 w-[400px] h-[400px] bg-tertiary-container/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <Reveal>
            <p className="text-primary-container text-sm font-sans tracking-[0.2em] uppercase mb-4">
              {t("hero.label")}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-on-surface tracking-tighter mb-6">
              {t("hero.title")}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-2xl text-lg text-on-surface/60 font-sans">
              {t("hero.description")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="glass-panel rounded-[2rem] p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-6">
                {t("mission.title")}
              </h2>
              <p className="text-on-surface/60 font-sans text-lg leading-relaxed max-w-3xl">
                {t("mission.description")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-6">
                {t("story.title")}
              </h2>
              <p className="text-on-surface/60 font-sans text-lg leading-relaxed mb-4">
                {t("story.paragraph1")}
              </p>
              <p className="text-on-surface/60 font-sans text-lg leading-relaxed">
                {t("story.paragraph2")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="glass-panel rounded-[2rem] p-8 md:p-12 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center shrink-0">
                  <CalendarIcon />
                </div>
                <div>
                  <p className="text-sm text-on-surface/60 font-sans">{t("story.founded")}</p>
                  <p className="text-on-surface font-headline font-bold">2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-tertiary/20 flex items-center justify-center shrink-0">
                  <MapPinIcon />
                </div>
                <div>
                  <p className="text-sm text-on-surface/60 font-sans">{t("story.location")}</p>
                  <p className="text-on-surface font-headline font-bold">Dortmund, Germany</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center shrink-0">
                  <BuildingIcon />
                </div>
                <div>
                  <p className="text-sm text-on-surface/60 font-sans">{t("story.company")}</p>
                  <p className="text-on-surface font-headline font-bold">TheHolyLabs</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-4">
              {t("team.title")}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-on-surface/60 font-sans text-lg max-w-2xl mx-auto mb-12">
              {t("team.description")}
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-6">
            {(["engineering", "design", "product"] as const).map((role, i) => (
              <Reveal key={role} delay={150 + i * 100}>
                <div className="glass-panel rounded-[2rem] p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-container-high flex items-center justify-center">
                    <span className="text-2xl" role="img" aria-hidden="true">
                      {role === "engineering" ? "⚙️" : role === "design" ? "🎨" : "📋"}
                    </span>
                  </div>
                  <h3 className="text-lg font-headline font-bold text-on-surface mb-2">
                    {t(`team.roles.${role}.title`)}
                  </h3>
                  <p className="text-on-surface/60 font-sans text-sm">
                    {t(`team.roles.${role}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-on-surface text-center mb-12">
              {t("values.title")}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({ key, icon: Icon }, i) => (
              <Reveal key={key} delay={100 + i * 100}>
                <div className="glass-panel rounded-[2rem] p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-lg font-headline font-bold text-on-surface mb-2">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="text-on-surface/60 font-sans text-sm leading-relaxed">
                    {t(`values.${key}.description`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

/* ── Inline SVG Icons ─────────────────────────────────────────────────────── */

function LightbulbIcon() {
  return (
    <svg className="w-6 h-6 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5.002 5.002 0 117.072 0l.146.146A3 3 0 0116.5 21h-9a3 3 0 01-1.182-5.758l.146-.146z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-6 h-6 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 014 9 15 15 0 01-4 9 15 15 0 01-4-9 15 15 0 014-9z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-6 h-6 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-6 h-6 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-6 h-6 text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg className="w-6 h-6 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}
