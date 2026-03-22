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
  const t = await getTranslations({ locale, namespace: "terms" });
  const baseUrl = "https://creatorai.art";

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${baseUrl}/${locale}/terms`,
      languages: Object.fromEntries([
        ...routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/terms`]),
        ["x-default", `${baseUrl}/en/terms`],
      ]),
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "terms" });

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
            {/* Section 1: Acceptance */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("acceptanceTitle")}
              </h2>
              <p>{t("acceptanceContent")}</p>
            </section>

            {/* Section 2: Account Registration */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("accountTitle")}
              </h2>
              <p>{t("accountContent")}</p>
            </section>

            {/* Section 3: Subscriptions & Billing */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("billingTitle")}
              </h2>
              <p className="mb-4">{t("billingContent1")}</p>
              <p>{t("billingContent2")}</p>
            </section>

            {/* Section 4: AI-Generated Content Ownership */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("contentOwnershipTitle")}
              </h2>
              <p className="mb-4">{t("contentOwnershipContent1")}</p>
              <p>{t("contentOwnershipContent2")}</p>
            </section>

            {/* Section 5: Acceptable Use */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("acceptableUseTitle")}
              </h2>
              <p className="mb-4">{t("acceptableUseIntro")}</p>
              <ul className="list-disc list-inside space-y-2 ps-4">
                <li>{t("acceptableUseItem1")}</li>
                <li>{t("acceptableUseItem2")}</li>
                <li>{t("acceptableUseItem3")}</li>
                <li>{t("acceptableUseItem4")}</li>
                <li>{t("acceptableUseItem5")}</li>
              </ul>
            </section>

            {/* Section 6: Intellectual Property */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("ipTitle")}
              </h2>
              <p>{t("ipContent")}</p>
            </section>

            {/* Section 7: Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("liabilityTitle")}
              </h2>
              <p>{t("liabilityContent")}</p>
            </section>

            {/* Section 8: Termination */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("terminationTitle")}
              </h2>
              <p>{t("terminationContent")}</p>
            </section>

            {/* Section 9: Governing Law */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("governingLawTitle")}
              </h2>
              <p>{t("governingLawContent")}</p>
            </section>

            {/* Section 10: Changes to Terms */}
            <section>
              <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
                {t("changesTitle")}
              </h2>
              <p>{t("changesContent")}</p>
            </section>

            {/* Section 11: Contact */}
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
