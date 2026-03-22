import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { TrustBar } from "@/components/sections/trust-bar";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FeaturesBento } from "@/components/sections/features-bento";
import { UseCases } from "@/components/sections/use-cases";
import { Pricing } from "@/components/sections/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTAFinal } from "@/components/sections/cta-final";
import { HomeBlogSection } from "@/components/sections/home-blog-section";
import { Button } from "@/components/ui/button";
import { DownloadButtons } from "@/components/ui/download-buttons";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />

      {/* Hero Section — kept mostly as-is, only CTA buttons upgraded */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface to-surface z-10" />
          {/* Dark mode hero */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover scale-110 opacity-40 brightness-50 hidden dark:block"
            src="/hero-bg.jpg"
            alt=""
            aria-hidden="true"
          />
          {/* Light mode hero */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover scale-125 opacity-50 brightness-90 blur-[3px] block dark:hidden"
            src="/hero-light.jpg"
            alt=""
            aria-hidden="true"
          />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-[120px] drift-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary-container/10 rounded-full blur-[150px] drift-fast" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-sans tracking-[0.2em] mb-8 reveal-up"
            style={{ animationDelay: "0.1s" }}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z" />
            </svg>
            NEXT-GEN ENGINE v4.0
          </div>

          <h1
            className="text-6xl md:text-8xl font-headline font-bold tracking-tighter mb-8 reveal-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="hero-gradient-text">Create Viral AI Videos</span>
            <br />
            <span className="relative">
              in Seconds
              <div className="absolute -inset-4 bg-primary-container/20 blur-3xl -z-10 rounded-full" />
            </span>
          </h1>

          <p
            className="max-w-2xl mx-auto text-lg md:text-xl text-on-surface/60 mb-12 reveal-up"
            style={{ animationDelay: "0.3s" }}
          >
            Turn text prompts into hyper-realistic cinematic experiences. No
            cameras, no crew, just pure imagination engineered for the Obsidian
            Canvas.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal-up"
            style={{ animationDelay: "0.4s" }}
          >
            <DownloadButtons size="lg" />
          </div>
        </div>

        {/* Floating UI Elements */}
        <div className="absolute inset-0 pointer-events-none z-30 hidden lg:block">
          <div className="absolute top-1/3 left-10 glass-panel p-4 rounded-xl drift-slow pulse-glow" style={{ animationDelay: "1s" }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-full h-full object-cover" src="/render-preview.jpg" alt="AI render preview" />
              </div>
              <div>
                <div className="text-[10px] text-primary/80 tracking-widest">RENDERING</div>
                <div className="text-xs font-bold font-headline">Cinematic_Vol01.mp4</div>
                <div className="w-32 h-1 bg-surface-container-highest mt-2 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary-container" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-1/4 right-20 glass-panel p-5 rounded-2xl drift-fast pulse-glow" style={{ animationDelay: "2s" }}>
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25M9 4L6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5" />
              </svg>
              <span className="text-sm font-headline font-bold">Prompt Intelligence</span>
            </div>
            <div className="text-xs text-on-surface/50 italic">
              &quot;Cyberpunk street with rain reflections, neon orange lighting, 8k...&quot;
            </div>
          </div>

          <div className="absolute top-1/4 right-32 glass-panel p-3 rounded-full drift-slow opacity-60">
            <div className="flex items-center gap-2 px-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] tracking-tighter uppercase">Live Model Synthesis</span>
            </div>
          </div>
        </div>
      </header>

      <TrustBar />

      {/* Wave: surface → surface-container-low */}
      <div className="h-16 bg-surface relative overflow-hidden">
        <svg className="absolute bottom-0 w-full" fill="none" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 80L48 72C96 64 192 48 288 42.7C384 37.3 480 42.7 576 48C672 53.3 768 58.7 864 56C960 53.3 1056 42.7 1152 37.3C1248 32 1344 32 1392 32L1440 32V80H0Z" className="fill-surface-container-low" />
        </svg>
      </div>

      <ProductShowcase />

      {/* Wave: surface-container-low → surface */}
      <div className="h-16 bg-surface-container-low relative overflow-hidden">
        <svg className="absolute bottom-0 w-full" fill="none" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 80L60 74.7C120 69.3 240 58.7 360 50.7C480 42.7 600 37.3 720 37.3C840 37.3 960 42.7 1080 48C1200 53.3 1320 58.7 1380 61.3L1440 64V80H0Z" className="fill-surface" />
        </svg>
      </div>

      <HowItWorks />

      {/* Wave: surface → surface-container-low */}
      <div className="h-16 bg-surface relative overflow-hidden">
        <svg className="absolute bottom-0 w-full" fill="none" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 80L60 72C120 64 240 48 360 42.7C480 37.3 600 48 720 53.3C840 58.7 960 53.3 1080 45.3C1200 37.3 1320 26.7 1380 21.3L1440 16V80H0Z" className="fill-surface-container-low" />
        </svg>
      </div>

      <FeaturesBento />

      {/* Wave: surface-container-low → surface */}
      <div className="h-16 bg-surface-container-low relative overflow-hidden">
        <svg className="absolute bottom-0 w-full" fill="none" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 80L48 74.7C96 69.3 192 58.7 288 53.3C384 48 480 48 576 50.7C672 53.3 768 58.7 864 58.7C960 58.7 1056 53.3 1152 48C1248 42.7 1344 37.3 1392 34.7L1440 32V80H0Z" className="fill-surface" />
        </svg>
      </div>

      <UseCases />

      {/* Wave: surface → surface-container-low */}
      <div className="h-16 bg-surface relative overflow-hidden">
        <svg className="absolute bottom-0 w-full" fill="none" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 80L60 74.7C120 69.3 240 58.7 360 50.7C480 42.7 600 37.3 720 37.3C840 37.3 960 42.7 1080 48C1200 53.3 1320 58.7 1380 61.3L1440 64V80H0Z" className="fill-surface-container-low" />
        </svg>
      </div>

      <Pricing />
      <Testimonials />

      {/* Wave: surface-container-low → surface */}
      <div className="h-16 bg-surface-container-low relative overflow-hidden">
        <svg className="absolute bottom-0 w-full" fill="none" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 80L48 72C96 64 192 48 288 42.7C384 37.3 480 42.7 576 48C672 53.3 768 58.7 864 56C960 53.3 1056 42.7 1152 37.3C1248 32 1344 32 1392 32L1440 32V80H0Z" className="fill-surface" />
        </svg>
      </div>

      <FAQ />
      <HomeBlogSection locale={locale} />
      <CTAFinal />
      <Footer />
    </>
  );
}
