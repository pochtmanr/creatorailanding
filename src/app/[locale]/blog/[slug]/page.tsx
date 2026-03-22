import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/config";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/ui/reveal";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { BlogPostJsonLd } from "@/components/seo/blog-json-ld";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

async function getPost(locale: string, slug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);

    const { data } = await supabase
      .from("blog_posts")
      .select(`
        slug,
        image_url,
        published_at,
        author_name,
        blog_post_translations(locale, title, content, excerpt, image_alt, meta_title, meta_description, og_title, og_description)
      `)
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (!data) return null;

    const translation =
      data.blog_post_translations?.find((t: any) => t.locale === locale) ||
      data.blog_post_translations?.find((t: any) => t.locale === "en");

    if (!translation) return null;

    return {
      slug: data.slug,
      imageUrl: data.image_url,
      publishedAt: data.published_at,
      authorName: data.author_name,
      title: translation.title,
      content: translation.content,
      excerpt: translation.excerpt,
      imageAlt: translation.image_alt,
      metaTitle: translation.meta_title,
      metaDescription: translation.meta_description,
      ogTitle: translation.og_title,
      ogDescription: translation.og_description,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(locale, slug);
  if (!post) return {};

  const baseUrl = getBaseUrl();
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${slug}`,
      languages: Object.fromEntries([
        ...routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/blog/${slug}`]),
        ["x-default", `${baseUrl}/en/blog/${slug}`],
      ]),
    },
    openGraph: {
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.excerpt,
      url: `${baseUrl}/${locale}/blog/${slug}`,
      siteName: "CreatorAI",
      type: "article",
      images: post.imageUrl ? [{ url: post.imageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.ogTitle || post.title,
      description: post.ogDescription || post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt || ""}
        imageUrl={post.imageUrl}
        authorName={post.authorName || "CreatorAI Team"}
        publishedAt={post.publishedAt}
        slug={slug}
        locale={locale}
      />
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-8">
        <article className="max-w-3xl mx-auto">
          <Reveal>
            {post.publishedAt && (
              <time className="text-sm text-on-surface/40 mb-4 block">
                {new Date(post.publishedAt).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
            <h1 className="text-3xl md:text-5xl font-headline font-bold tracking-tight mb-6">
              {post.title}
            </h1>
            {post.authorName && (
              <p className="text-on-surface/50 text-sm mb-8">By {post.authorName}</p>
            )}
          </Reveal>

          {post.imageUrl && (
            <Reveal delay={100}>
              <div className="rounded-2xl overflow-hidden mb-10">
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt || post.title}
                  className="w-full h-auto"
                />
              </div>
            </Reveal>
          )}

          <Reveal delay={150}>
            <div
              className="prose prose-invert prose-orange max-w-none
                prose-headings:font-headline prose-headings:tracking-tight
                prose-a:text-primary-container prose-a:no-underline hover:prose-a:underline
                prose-strong:text-on-surface
                prose-p:text-on-surface/70 prose-p:leading-relaxed
                prose-li:text-on-surface/70
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{
                __html: post.content
                  .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                  .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                  .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
                  .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
                  .replace(/^- (.*$)/gm, '<li>$1</li>')
                  .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')
                  .replace(/^(?!<[hul])(.*\S.*)$/gm, '<p>$1</p>')
                  .replace(/---/g, '<hr />')
              }}
            />
          </Reveal>

          <Reveal delay={200} className="mt-12 pt-8 border-t border-on-surface/10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-container hover:text-primary transition-colors font-headline font-bold"
            >
              <svg className="w-4 h-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t("allPosts")}
            </Link>
          </Reveal>
        </article>
      </main>
      <Footer />
    </>
  );
}
