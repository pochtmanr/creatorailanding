import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  publishedAt: string | null;
}

async function getLatestPosts(locale: string): Promise<BlogPost[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);

    const { data } = await supabase
      .from("blog_posts")
      .select(`
        slug,
        image_url,
        published_at,
        blog_post_translations (
          locale,
          title,
          excerpt
        )
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3);

    if (!data) return [];

    return data
      .map((post: any) => {
        const translation =
          post.blog_post_translations?.find((t: any) => t.locale === locale) ||
          post.blog_post_translations?.find((t: any) => t.locale === "en");
        if (!translation) return null;
        return {
          slug: post.slug,
          title: translation.title,
          excerpt: translation.excerpt,
          imageUrl: post.image_url,
          publishedAt: post.published_at,
        };
      })
      .filter((p: any): p is BlogPost => p !== null);
  } catch {
    return [];
  }
}

export async function HomeBlogSection({ locale }: { locale: string }) {
  const t = await getTranslations("blog");
  const posts = await getLatestPosts(locale);

  if (posts.length === 0) return null;

  return (
    <section className="py-24 bg-surface px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">
            {t("latestPosts")}
          </h2>
          <p className="text-on-surface/50 max-w-xl mx-auto">{t("latestPostsSubtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <a
                href={`/${locale}/blog/${post.slug}`}
                className="block glass-panel rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 h-full"
              >
                {post.imageUrl && (
                  <div className="aspect-video bg-surface-container-high overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.publishedAt && (
                    <time className="text-xs text-on-surface/40 mb-2 block">
                      {new Date(post.publishedAt).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  )}
                  <h3 className="font-headline font-bold text-on-surface mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-on-surface/50 text-sm line-clamp-3">{post.excerpt}</p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center" delay={200}>
          <Button
            href={`/${locale}/blog`}
            variant="secondary"
            size="md"
            iconRight={
              <svg className="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            }
          >
            {t("viewAllPosts")}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
