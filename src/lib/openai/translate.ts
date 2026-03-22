import OpenAI from "openai";

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Missing OPENAI_API_KEY");
  return new OpenAI({ apiKey });
}

const LANGUAGE_NAMES: Record<string, string> = {
  he: "Hebrew",
};

const SYSTEM_PROMPT = (languageName: string) =>
  `You are a professional translator for an AI video generation platform blog. Translate the following blog post content to ${languageName}.

Rules:
- Translate ALL text including headings and bold/italic text
- Maintain all markdown formatting exactly
- Keep technical terms in English: AI, 4K, TikTok, Instagram, YouTube, API, GPU, LLM, MP4, WebM
- Keep brand names in English: CreatorAI
- Adapt cultural references naturally
- For RTL languages: ensure text reads naturally in RTL
- Return valid JSON with keys: title, excerpt, content, image_alt, meta_title, meta_description, og_title, og_description
- If a field is null in input, set it to null in output
- Return ONLY the JSON object`;

export interface TranslationInput {
  title: string;
  excerpt: string;
  content: string;
  image_alt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
}

export interface TranslationOutput extends TranslationInput {
  tokensUsed: number;
}

export async function translateContent(
  source: TranslationInput,
  targetLocale: string
): Promise<TranslationOutput> {
  const openai = getOpenAI();
  const languageName = LANGUAGE_NAMES[targetLocale] || targetLocale;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT(languageName) },
      { role: "user", content: JSON.stringify(source) },
    ],
    response_format: { type: "json_object" },
    max_completion_tokens: 16000,
  }, { timeout: 120_000 });

  const raw = response.choices[0].message.content || "{}";
  const parsed = JSON.parse(raw) as TranslationInput;

  return {
    title: parsed.title || source.title,
    excerpt: parsed.excerpt || source.excerpt,
    content: parsed.content || source.content,
    image_alt: parsed.image_alt ?? source.image_alt,
    meta_title: parsed.meta_title ?? source.meta_title,
    meta_description: parsed.meta_description ?? source.meta_description,
    og_title: parsed.og_title ?? source.og_title,
    og_description: parsed.og_description ?? source.og_description,
    tokensUsed: response.usage?.total_tokens || 0,
  };
}

export const SUPPORTED_LOCALES = Object.keys(LANGUAGE_NAMES);
