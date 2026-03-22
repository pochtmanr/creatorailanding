import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const baseUrl = "https://creatorai.art";

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy`,
      languages: Object.fromEntries([
        ...routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/privacy`]),
        ["x-default", `${baseUrl}/en/privacy`],
      ]),
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "privacy" });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <Link
              href="/"
              className="text-sm text-on-surface/50 hover:text-primary transition-colors"
            >
              {t("backHome")}
            </Link>
          </nav>

          {/* Page header */}
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight text-on-surface mb-4">
              {t("title")}
            </h1>
            <p className="text-sm text-on-surface/40">
              {t("lastUpdated")}
            </p>
          </header>

          {/* Content */}
          <div className="space-y-12 text-on-surface/60 leading-relaxed">
            {/* Intro */}
            <section>
              <p>{t("intro")}</p>
            </section>

            {/* Section 1: Data We Collect */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("dataCollectTitle")}
              </h2>
              <p className="mb-4">{t("dataCollectIntro")}</p>
              <ul className="list-disc list-inside space-y-2 ps-4">
                <li>{t("dataCollectItem1")}</li>
                <li>{t("dataCollectItem2")}</li>
                <li>{t("dataCollectItem3")}</li>
                <li>{t("dataCollectItem4")}</li>
                <li>{t("dataCollectItem5")}</li>
              </ul>
            </section>

            {/* Section 2: How We Use Data */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("dataUseTitle")}
              </h2>
              <p className="mb-4">{t("dataUseIntro")}</p>
              <ul className="list-disc list-inside space-y-2 ps-4">
                <li>{t("dataUseItem1")}</li>
                <li>{t("dataUseItem2")}</li>
                <li>{t("dataUseItem3")}</li>
                <li>{t("dataUseItem4")}</li>
                <li>{t("dataUseItem5")}</li>
              </ul>
            </section>

            {/* Section 3: Third Parties */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("thirdPartiesTitle")}
              </h2>
              <p className="mb-4">{t("thirdPartiesIntro")}</p>
              <ul className="list-disc list-inside space-y-2 ps-4">
                <li>{t("thirdPartiesItem1")}</li>
                <li>{t("thirdPartiesItem2")}</li>
                <li>{t("thirdPartiesItem3")}</li>
                <li>{t("thirdPartiesItem4")}</li>
              </ul>
            </section>

            {/* Section 4: Cookies */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("cookiesTitle")}
              </h2>
              <p>{t("cookiesContent")}</p>
            </section>

            {/* Section 5: Data Retention */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("retentionTitle")}
              </h2>
              <p>{t("retentionContent")}</p>
            </section>

            {/* Section 6: Your Rights (GDPR) */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("rightsTitle")}
              </h2>
              <p className="mb-4">{t("rightsIntro")}</p>
              <ul className="list-disc list-inside space-y-2 ps-4">
                <li>{t("rightsItem1")}</li>
                <li>{t("rightsItem2")}</li>
                <li>{t("rightsItem3")}</li>
                <li>{t("rightsItem4")}</li>
                <li>{t("rightsItem5")}</li>
                <li>{t("rightsItem6")}</li>
              </ul>
              <p className="mt-4">{t("rightsOutro")}</p>
            </section>

            {/* Section 7: Contact */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("contactTitle")}
              </h2>
              <p className="mb-2">{t("contactContent")}</p>
              <p>
                <a
                  href="mailto:support@creatorai.art"
                  className="text-primary hover:text-primary-container transition-colors underline underline-offset-4"
                >
                  support@creatorai.art
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
