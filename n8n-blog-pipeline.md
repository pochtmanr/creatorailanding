# CreatorAI n8n Blog Pipeline — Full Specification

## Overview

Replicate Doppler's 3-workflow editorial pipeline for CreatorAI, deployed on the Netherlands VPS (188.137.176.29). The pipeline automatically discovers relevant articles from curated sources, rewrites them as original content using AI, translates to Hebrew, and publishes to the CreatorAI blog.

## Architecture (3 Workflows)

```
Workflow 1: Topic Discovery (Schedule: every 6 hours)
  → Fetch RSS feeds from allowlist
  → Filter articles from last 24h
  → Send to OpenAI to pick best topic
  → Extract OG image from source article
  → Trigger Workflow 2

Workflow 2: Content Generation (Webhook)
  → Route by template type (quick-take vs analysis)
  → Build prompt with topic + research
  → Call OpenAI to generate article
  → Parse response, add source links
  → Trigger Workflow 3

Workflow 3: Publish & Distribute (Webhook)
  → Upload featured image to Supabase Storage (re-upload, no hotlinking)
  → POST to CreatorAI blog API (auto-translates to Hebrew)
  → Format Telegram message
  → Post to Telegram channel (future)
  → Return results
```

## Source Allowlist (AI / Creator / Video Content)

```javascript
const RSS_FEEDS = [
  // AI & Machine Learning
  { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml' },
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/' },
  { name: 'MIT Tech Review AI', url: 'https://www.technologyreview.com/feed/' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
  { name: 'Ars Technica AI', url: 'https://feeds.arstechnica.com/arstechnica/technology-lab' },

  // Video & Creator Economy
  { name: 'PetaPixel', url: 'https://petapixel.com/feed/' },
  { name: 'No Film School', url: 'https://nofilmschool.com/rss.xml' },
  { name: 'Digital Trends', url: 'https://www.digitaltrends.com/feed/' },
  { name: 'Engadget', url: 'https://www.engadget.com/rss.xml' },

  // AI Tools & Startups
  { name: 'Product Hunt', url: 'https://www.producthunt.com/feed' },
  { name: 'Hacker News Best', url: 'https://hnrss.org/best?q=AI+video+generation' },
  { name: 'OpenAI Blog', url: 'https://openai.com/blog/rss.xml' },
  { name: 'Stability AI', url: 'https://stability.ai/blog/feed' },
  { name: 'Runway Blog', url: 'https://runwayml.com/blog/rss.xml' },
];
```

## Environment Variables (Netherlands VPS n8n)

```env
# AI
OPENAI_API_KEY=<from existing n8n or new key>

# CreatorAI Blog API
CREATORAI_BLOG_API_URL=https://creatorai.art/api/blog/create
CREATORAI_BLOG_API_KEY=<set in Vercel env as BLOG_API_KEY>

# Supabase (for image upload)
SUPABASE_URL=https://uhpuqiptxcjluwsetoev.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<from Vercel env>

# Telegram (future)
# CREATORAI_TELEGRAM_BOT_TOKEN=<when channel is set up>
# CREATORAI_TELEGRAM_CHANNEL_ID=<when channel is set up>
```

## Workflow 1: CreatorAI Editorial — Topic Discovery

### Trigger
- **Schedule**: Every 6 hours (0 */6 * * *)

### Node 1: Preflight Check (Code)
```javascript
// Check if we already posted today (max 2 posts/day)
const today = new Date().toISOString().split('T')[0];
const existingKey = `creatorai_posts_${today}`;
const count = $getWorkflowStaticData('global')[existingKey] || 0;

if (count >= 2) {
  return [{ json: { skip: true, reason: 'Already posted 2 articles today' } }];
}

return [{ json: { skip: false, postsToday: count } }];
```

### Node 2: Should Continue? (IF)
- Condition: `{{ $json.skip }}` equals `false`

### Node 3: Fetch RSS Feeds (Code)
Same pattern as Doppler — fetch all RSS feeds, parse items, filter to last 24h, deduplicate by URL. Use `MAX_PER_FEED = 10`.

### Node 4: Has Articles? (IF)
- Condition: `{{ $json.articles.length }}` greater than `0`

### Node 5: Build Prompt (Code)
```javascript
const articles = $input.first().json.articles;

// Select template type based on content depth
const templateType = articles.length > 3 ? 'analysis' : 'quick-take';

const articleList = articles.map((a, i) =>
  `${i+1}. [${a.source}] "${a.title}" — ${a.description}`
).join('\n');

const systemPrompt = `You are an editorial assistant for CreatorAI, an AI video generation platform blog.
Pick the SINGLE most interesting article that relates to AI video generation, AI creativity tools, or the creator economy.

RULES:
- Pick articles about: AI video/image generation, creator tools, AI startups, video editing AI, deepfakes regulation, AI art, content creation trends
- AVOID: generic tech news, politics, cryptocurrency, pure hardware reviews
- Return JSON: {"chosen_index": N, "topic": "...", "summary": "...", "key_quotes": [], "chosen_url": "...", "reason": "..."}
- If nothing is relevant, return {"chosen_index": -1, "topic": "", "reason": "No relevant topics"}`;

return [{ json: { systemPrompt, userPrompt: articleList, templateType } }];
```

### Node 6: OpenAI Select (HTTP Request)
- POST to `https://api.openai.com/v1/chat/completions`
- Model: `gpt-4o-mini`
- Headers: `Authorization: Bearer {{ $env.OPENAI_API_KEY }}`

### Node 7: Process Selection + OG Image (Code)
Same pattern as Doppler:
1. Parse OpenAI JSON response
2. Fetch source article HTML
3. Extract OG image from `<meta property="og:image">`
4. Validate image URL with HEAD request
5. Return `{ topic, summary, imageUrl, sourceUrl, templateType }`

### Node 8: Has Valid Topic? (IF)
- Condition: `{{ $json.skip }}` not equals `true`

### Node 9: Call Content Gen (HTTP Request)
- POST to Workflow 2 webhook URL
- Body: `{ topic, summary, key_quotes, imageUrl, sourceUrl, templateType }`

### Node 10: Call Publish (HTTP Request)
- POST to Workflow 3 webhook URL
- Body: content generation result + imageUrl

---

## Workflow 2: CreatorAI Editorial — Content Generation

### Trigger
- **Webhook**: POST `/webhook/creatorai-content-gen`

### Node 1: Auth Check (Code)
Validate internal webhook token.

### Node 2: Template Router (Switch)
- Route on `{{ $json.templateType }}`
  - `quick-take` → Quick-Take Prompt
  - `analysis` → Analysis Prompt

### Node 3a: Quick-Take Prompt (Code)
```javascript
const data = $input.first().json;

return [{
  json: {
    systemPrompt: `You are a professional tech journalist writing for CreatorAI's blog about AI-powered video creation and the creator economy.

FORMAT: 280-420 words, markdown with ## headers
TONE: Professional, informative, exciting — like The Verge or TechCrunch
STRUCTURE: Compelling headline, 2-3 focused paragraphs, key implications for creators

MANDATORY RULES:
- NEVER include citation markers like [1], [2]
- NEVER include word counts
- NEVER include a "Sources" section
- NEVER fabricate quotes
- Only cover events that actually happened based on the research provided
- End with: "Ready to create your next masterpiece? Try CreatorAI today."

TOPIC SCOPE: AI video generation, creator tools, AI image/art, content creation trends, AI startups in creative space.

Return valid JSON: {"title": "...", "content": "...", "excerpt": "...", "meta_description": "...", "tags": ["..."]}`,
    userPrompt: "Write about: " + data.topic + "\n\nResearch:\n" + (data.summary || ""),
    templateType: "quick-take"
  }
}];
```

### Node 3b: Analysis Prompt (Code)
Same structure but 560-840 words, deeper analysis format.

### Node 4: Generate Content (HTTP Request)
- POST to OpenAI API, model: `gpt-4o-mini`

### Node 5: Parse Content (Code)
Parse JSON from OpenAI response, validate fields.

### Node 6: Add Source Links (Code)
Append source attribution links to content.

### Node 7: Respond to Webhook
Return parsed content to caller.

---

## Workflow 3: CreatorAI Editorial — Publish & Distribute

### Trigger
- **Webhook**: POST `/webhook/creatorai-publish`

### Node 1: Auth Check (Code)

### Node 2: Upload Image to Supabase (Code)
```javascript
// Download image from source URL and re-upload to Supabase Storage
const imageUrl = $input.first().json.imageUrl;
if (!imageUrl) return [{ json: { uploadedImageUrl: null } }];

const https = require('https');
const crypto = require('crypto');

// Download image
const imageBuffer = await new Promise((resolve) => {
  const proto = imageUrl.startsWith('https') ? https : require('http');
  proto.get(imageUrl, { headers: { 'User-Agent': 'CreatorAI Bot/1.0' } }, (res) => {
    const chunks = [];
    res.on('data', c => chunks.push(c));
    res.on('end', () => resolve(Buffer.concat(chunks)));
  }).on('error', () => resolve(null));
});

if (!imageBuffer || imageBuffer.length < 1000) {
  return [{ json: { uploadedImageUrl: null } }];
}

// Determine extension from content-type or URL
const ext = imageUrl.match(/\.(jpg|jpeg|png|webp|gif)/i)?.[1] || 'jpg';
const filename = `blog/${crypto.randomUUID()}.${ext}`;

// Upload to Supabase Storage
const supabaseUrl = $env.SUPABASE_URL;
const supabaseKey = $env.SUPABASE_SERVICE_ROLE_KEY;

const uploadResponse = await fetch(`${supabaseUrl}/storage/v1/object/blog-images/${filename}`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${supabaseKey}`,
    'Content-Type': `image/${ext === 'jpg' ? 'jpeg' : ext}`,
    'x-upsert': 'true',
  },
  body: imageBuffer,
});

if (uploadResponse.ok) {
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/blog-images/${filename}`;
  return [{ json: { uploadedImageUrl: publicUrl } }];
}

return [{ json: { uploadedImageUrl: null } }];
```

### Node 3: Publish to Blog API (HTTP Request)
- POST to `{{ $env.CREATORAI_BLOG_API_URL }}`
- Headers: `x-api-key: {{ $env.CREATORAI_BLOG_API_KEY }}`
- Body:
```json
{
  "title": "{{ $json.title }}",
  "content": "{{ $json.content }}",
  "excerpt": "{{ $json.excerpt }}",
  "meta_description": "{{ $json.meta_description }}",
  "featured_image": "{{ $json.uploadedImageUrl }}",
  "tags": "{{ $json.tags }}",
  "auto_translate": true,
  "author": "CreatorAI Team"
}
```

The blog API already handles:
- English content creation
- Auto-translation to Hebrew via OpenAI
- Tag management
- Slug generation

### Node 4: Return Results (Respond to Webhook)
Return blog post URLs.

---

## Image Handling Summary

1. **Topic Discovery** extracts OG image URL from source article HTML
2. **Publish workflow** downloads the image binary
3. Image is re-uploaded to Supabase Storage bucket `blog-images`
4. Public URL from Supabase Storage is used as `featured_image`
5. **No hotlinking** — images are always re-hosted on our Supabase

## Supabase Storage Setup Required

Create a `blog-images` storage bucket:
```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);
```

## Deployment Steps

1. SSH into Netherlands VPS: `ssh root@188.137.176.29`
2. Ensure n8n is running (check Docker)
3. Set environment variables in n8n Settings → Environment Variables
4. Create 3 workflows in n8n UI, paste the node configurations
5. Set Workflow 1 schedule trigger to every 6 hours
6. Activate all 3 workflows
7. Test: manually trigger Workflow 1, verify article appears on creatorai.art/en/blog and /he/blog

## CreatorAI Blog API Compatibility

The existing `src/app/api/blog/create/route.ts` already supports:
- `title`, `content`, `excerpt`, `meta_description` fields
- `featured_image` for image URL
- `tags` array
- `auto_translate: true` for Hebrew translation
- `author` field
- API key authentication via `x-api-key` header

No changes needed to the blog API for n8n integration.

## Key Differences from Doppler Pipeline

| Feature | Doppler | CreatorAI |
|---------|---------|-----------|
| Sources | Privacy/censorship/geopolitics RSS | AI/video/creator RSS |
| Translation | 7+ languages | English + Hebrew |
| Image handling | Referenced directly (OG URLs) | Re-uploaded to Supabase Storage |
| Telegram | Posts to RU + EN channels | Future (not set up yet) |
| n8n VPS | Germany #1 (72.61.87.54) | Netherlands (188.137.176.29) |
| Content tone | Tech journalism, privacy focus | Creator economy, AI tools focus |
| CTA line | "Stay connected with Doppler VPN" | "Try CreatorAI today" |
