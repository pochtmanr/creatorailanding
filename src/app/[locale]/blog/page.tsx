import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Reveal } from "@/components/ui/reveal";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tag?: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const baseUrl = "https://creatorai.art";

  return {
    title: t("indexTitle"),
    description: t("indexDescription"),
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: Object.fromEntries([
        ...routing.locales.map((loc) => [loc, `${baseUrl}/${loc}/blog`]),
        ["x-default", `${baseUrl}/en/blog`],
      ]),
    },
  };
}

async function getBlogPosts(locale: string, tagSlug?: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { posts: [], tags: [] };

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);

    // Fetch tags
    const { data: tagsRaw } = await supabase
      .from("blog_tags")
      .select("slug, blog_tag_translations(locale, name)");

    const tags = (tagsRaw || []).map((tag: any) => ({
      slug: tag.slug,
      name: tag.blog_tag_translations?.find((t: any) => t.locale === locale)?.name || tag.slug,
    }));

    // Fetch posts
    const { data: postsRaw } = await supabase
      .from("blog_posts")
      .select(`
        slug,
        image_url,
        published_at,
        blog_post_translations(locale, title, excerpt, image_alt),
        blog_post_tags(blog_tags(slug, blog_tag_translations(locale, name)))
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    let posts = (postsRaw || [])
      .map((post: any) => {
        const translation =
          post.blog_post_translations?.find((t: any) => t.locale === locale) ||
          post.blog_post_translations?.find((t: any) => t.locale === "en");
        if (!translation) return null;

        const postTags = (post.blog_post_tags || []).map((pt: any) => ({
          slug: pt.blog_tags.slug,
          name: pt.blog_tags.blog_tag_translations?.find((t: any) => t.locale === locale)?.name || pt.blog_tags.slug,
        }));

        return {
          slug: post.slug,
          title: translation.title,
          excerpt: translation.excerpt,
          imageUrl: post.image_url,
          publishedAt: post.published_at,
          tags: postTags,
        };
      })
      .filter(Boolean);

    if (tagSlug) {
      posts = posts.filter((p: any) => p.tags.some((t: any) => t.slug === tagSlug));
    }

    return { posts, tags };
  } catch {
    return { posts: [], tags: [] };
  }
}

export default async function BlogIndexPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { tag: tagSlug } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const { posts, tags } = await getBlogPosts(locale, tagSlug);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="text-on-surface/50 max-w-xl mx-auto">{t("subtitle")}</p>
          </Reveal>

          {/* Tag Filter */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-12">
              <a
                href={`/${locale}/blog`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !tagSlug ? "bg-primary-container text-on-primary-container" : "glass-panel text-on-surface/60 hover:text-on-surface"
                }`}
              >
                {t("allPosts")}
              </a>
              {tags.map((tag: any) => (
                <a
                  key={tag.slug}
                  href={`/${locale}/blog?tag=${tag.slug}`}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    tagSlug === tag.slug ? "bg-primary-container text-on-primary-container" : "glass-panel text-on-surface/60 hover:text-on-surface"
                  }`}
                >
                  {tag.name}
                </a>
              ))}
            </div>
          )}

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any, i: number) => (
                <Reveal key={post.slug} delay={i * 60}>
                  <a
                    href={`/${locale}/blog/${post.slug}`}
                    className="block glass-panel rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform h-full"
                  >
                    {post.imageUrl && (
                      <div className="aspect-video bg-surface-container-high overflow-hidden">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      {post.publishedAt && (
                        <time className="text-xs text-on-surface/40 mb-2 block">
                          {new Date(post.publishedAt).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" })}
                        </time>
                      )}
                      <h2 className="font-headline font-bold text-on-surface mb-2 line-clamp-2">{post.title}</h2>
                      <p className="text-on-surface/50 text-sm line-clamp-3">{post.excerpt}</p>
                      {post.tags.length > 0 && (
                        <div className="flex gap-1.5 mt-3 flex-wrap">
                          {post.tags.map((tag: any) => (
                            <span key={tag.slug} className="text-xs px-2 py-0.5 rounded-full bg-primary-container/10 text-primary-container">
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-xl font-headline font-bold text-on-surface/60 mb-2">{t("noPosts")}</h3>
              <p className="text-on-surface/40">{t("noPostsDescription")}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
