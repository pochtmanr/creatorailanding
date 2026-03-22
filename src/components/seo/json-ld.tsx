import { getBaseUrl } from "@/lib/config";

interface LocaleProps {
  locale: string;
}

export function OrganizationSchema({ locale }: LocaleProps) {
  const baseUrl = getBaseUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CreatorAI",
    url: `${baseUrl}/${locale}`,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/logo.png`,
    description:
      locale === "he"
        ? "פלטפורמת יצירת וידאו מונעת בינה מלאכותית. הפכו טקסט לתוכן קולנועי תוך שניות."
        : "AI-powered video generation platform. Turn text prompts into cinematic content in seconds.",
    sameAs: [
      "https://apps.apple.com/app/creatorai/id6744185933",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationSchema({ locale }: LocaleProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CreatorAI",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "iOS, Android",
    description:
      locale === "he"
        ? "פלטפורמת יצירת וידאו מונעת AI. צרו סרטונים קולנועיים מטקסט בלבד — ללא מצלמה, ללא צוות."
        : "AI-powered video generation platform. Create cinematic videos from text prompts — no camera, no crew.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      locale === "he" ? "טקסט לוידאו" : "Text to video",
      locale === "he" ? "שיבוט קול AI" : "AI voice cloning",
      locale === "he" ? "סגנונות קולנועיים" : "Cinematic styles",
      locale === "he" ? "עריכה מונעת AI" : "AI-powered editing",
      locale === "he" ? "יצוא ב-4K" : "4K export",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema({ locale }: LocaleProps) {
  const baseUrl = getBaseUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CreatorAI",
    url: `${baseUrl}/${locale}`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url?: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
