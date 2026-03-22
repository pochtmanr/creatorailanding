import { getBaseUrl } from "@/lib/config";

interface BlogPostJsonLdProps {
  title: string;
  description: string;
  imageUrl: string | null;
  authorName: string;
  publishedAt: string | null;
  slug: string;
  locale: string;
}

export function BlogPostJsonLd({
  title,
  description,
  imageUrl,
  authorName,
  publishedAt,
  slug,
  locale,
}: BlogPostJsonLdProps) {
  const baseUrl = getBaseUrl();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: imageUrl || `${baseUrl}/og.png`,
    datePublished: publishedAt || undefined,
    dateModified: publishedAt || undefined,
    author: {
      "@type": "Organization",
      name: authorName || "CreatorAI Team",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "CreatorAI",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/${locale}/blog/${slug}`,
    },
    inLanguage: locale === "he" ? "he-IL" : "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "he" ? "\u05d1\u05d9\u05ea" : "Home",
        item: `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "he" ? "\u05d1\u05dc\u05d5\u05d2" : "Blog",
        item: `${baseUrl}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${baseUrl}/${locale}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
