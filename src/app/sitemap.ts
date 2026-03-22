import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/config";
import { createClient } from "@/lib/supabase/client";

const locales = ["en", "he"];

function buildAlternates(baseUrl: string, path: string) {
  return {
    languages: Object.fromEntries([
      ...locales.map((locale) => [locale, `${baseUrl}/${locale}${path}`]),
      ["x-default", `${baseUrl}/en${path}`],
    ]),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  // Static pages
  const staticPages = ["", "/about", "/privacy", "/terms", "/contact", "/api", "/blog"];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}/en${page}`,
    lastModified: new Date(),
    changeFrequency:
      page === ""
        ? ("weekly" as const)
        : page === "/blog"
          ? ("daily" as const)
          : ("monthly" as const),
    priority:
      page === "" ? 1 : page === "/blog" ? 0.9 : page === "/about" ? 0.7 : 0.5,
    alternates: buildAlternates(baseUrl, page),
  }));

  // Blog posts from Supabase
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient();
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, published_at")
      .eq("status", "published")
      .returns<{ slug: string; published_at: string | null }[]>();

    if (posts) {
      blogEntries = posts.map((post) => ({
        url: `${baseUrl}/en/blog/${post.slug}`,
        lastModified: post.published_at ? new Date(post.published_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        alternates: buildAlternates(baseUrl, `/blog/${post.slug}`),
      }));
    }
  } catch {
    // If Supabase is unavailable, sitemap still works with static pages
  }

  return [...staticEntries, ...blogEntries];
}
