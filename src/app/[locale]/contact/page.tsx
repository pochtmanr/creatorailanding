import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/sections/contact-form";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const baseUrl = "https://creatorai.art";

  return {
    title: t("hero.title"),
    description: t("hero.description"),
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: Object.fromEntries([
        ...routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/contact`]),
        ["x-default", `${baseUrl}/en/contact`],
      ]),
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <Navbar />

      <section className="relative pt-32 pb-24 px-4 sm:px-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-20 start-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 end-1/3 w-[400px] h-[400px] bg-tertiary-container/10 rounded-full blur-[150px] pointer-events-none" />

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

      <ContactForm />

      <Footer />
    </>
  );
}
