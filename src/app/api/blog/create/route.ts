import { NextResponse, NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

export async function POST(request: NextRequest) {
  // Verify API key
  const apiKey = request.headers.get("x-api-key") || request.headers.get("authorization")?.replace("Bearer ", "");
  const expectedKey = process.env.BLOG_API_KEY;
  if (!expectedKey) {
    return NextResponse.json({ error: "BLOG_API_KEY not configured" }, { status: 500 });
  }
  if (!apiKey || apiKey !== expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const {
    title,
    content,
    slug: customSlug,
    meta_description,
    featured_image,
    tags,
    auto_translate = true,
    author = "CreatorAI Team",
    excerpt,
  } = body;

  if (!title || !content) {
    return NextResponse.json({ error: "title and content are required" }, { status: 400 });
  }

  const db = createAdminClient();
  const slug = customSlug || slugify(title);

  // Check uniqueness
  const { data: existing } = await db.from("blog_posts").select("id").eq("slug", slug).single();
  if (existing) {
    return NextResponse.json({ error: `Slug "${slug}" already exists` }, { status: 409 });
  }

  // Create post
  const { data: post, error: postError } = await db
    .from("blog_posts")
    .insert({
      slug,
      author_name: author,
      status: "published",
      published_at: new Date().toISOString(),
      image_url: featured_image || null,
    })
    .select("id")
    .single();

  if (postError || !post) {
    return NextResponse.json({ error: postError?.message || "Failed to create post" }, { status: 500 });
  }

  const postExcerpt = excerpt || content.replace(/[#*_\[\]()]/g, "").slice(0, 200).trim() + "...";

  // EN translation
  const { error: transError } = await db.from("blog_post_translations").insert({
    post_id: post.id,
    locale: "en",
    title,
    excerpt: postExcerpt,
    content,
    meta_title: title.slice(0, 70),
    meta_description: meta_description?.slice(0, 160) || postExcerpt.slice(0, 160),
    og_title: title.slice(0, 70),
    og_description: meta_description?.slice(0, 200) || postExcerpt.slice(0, 200),
  });

  if (transError) {
    await db.from("blog_posts").delete().eq("id", post.id);
    return NextResponse.json({ error: transError.message }, { status: 500 });
  }

  // Tags
  if (tags && tags.length > 0) {
    for (const tagName of tags) {
      const tagSlug = slugify(tagName);
      const { data: tag } = await db
        .from("blog_tags")
        .upsert({ slug: tagSlug }, { onConflict: "slug" })
        .select("id")
        .single();
      if (tag) {
        await db.from("blog_post_tags").insert({ post_id: post.id, tag_id: tag.id });
        // EN tag translation
        await db.from("blog_tag_translations").upsert(
          { tag_id: tag.id, locale: "en", name: tagName },
          { onConflict: "tag_id,locale" }
        );
      }
    }
  }

  const baseUrl = "https://creatorai.art";
  const englishUrl = `${baseUrl}/en/blog/${slug}`;

  // Auto-translate to Hebrew if enabled
  if (auto_translate) {
    try {
      const { translateContent } = await import("@/lib/openai/translate");
      const heResult = await translateContent(
        {
          title,
          excerpt: postExcerpt,
          content,
          image_alt: null,
          meta_title: title.slice(0, 70),
          meta_description: meta_description?.slice(0, 160) || postExcerpt.slice(0, 160),
          og_title: title.slice(0, 70),
          og_description: meta_description?.slice(0, 200) || postExcerpt.slice(0, 200),
        },
        "he"
      );

      await db.from("blog_post_translations").upsert(
        {
          post_id: post.id,
          locale: "he",
          title: heResult.title?.slice(0, 255),
          excerpt: heResult.excerpt,
          content: heResult.content,
          image_alt: heResult.image_alt,
          meta_title: heResult.meta_title?.slice(0, 70),
          meta_description: heResult.meta_description?.slice(0, 160),
          og_title: heResult.og_title?.slice(0, 70),
          og_description: heResult.og_description?.slice(0, 200),
        },
        { onConflict: "post_id,locale" }
      );
    } catch (err) {
      console.error("[blog/create] Hebrew translation failed:", err);
    }
  }

  return NextResponse.json(
    {
      blog_id: post.id,
      slug,
      english_url: englishUrl,
      hebrew_url: `${baseUrl}/he/blog/${slug}`,
      status: "published",
    },
    { status: 201 }
  );
}
