export default function Home() {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface-container-low/40 backdrop-blur-xl border-b border-on-surface/10 shadow-2xl shadow-primary/5">
        <div className="flex justify-between items-center px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-on-surface font-headline">
            CreatorAI
          </div>

          <div className="hidden md:flex items-center gap-10">
            <a
              className="text-primary-container border-b-2 border-primary-container pb-1 font-headline font-bold tracking-tight"
              href="#"
            >
              Models
            </a>
            <a
              className="text-on-surface/70 hover:text-on-surface transition-colors font-headline font-bold tracking-tight"
              href="#"
            >
              Showcase
            </a>
            <a
              className="text-on-surface/70 hover:text-on-surface transition-colors font-headline font-bold tracking-tight"
              href="#"
            >
              Pricing
            </a>
            <a
              className="text-on-surface/70 hover:text-on-surface transition-colors font-headline font-bold tracking-tight"
              href="#"
            >
              API
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-on-surface/70 hover:text-on-surface transition-colors font-headline font-bold tracking-tight">
              Login
            </button>
            <button className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-headline font-bold tracking-tight hover:brightness-110 active:scale-95 transition-all">
              Start Creating
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface to-surface z-10" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-full h-full object-cover scale-110 opacity-40 brightness-50"
            src="/hero-bg.jpg"
            alt=""
            aria-hidden="true"
          />
          {/* Animated Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-[120px] drift-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-tertiary-container/10 rounded-full blur-[150px] drift-fast" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-8 text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-sans tracking-[0.2em] mb-8 reveal-up"
            style={{ animationDelay: "0.1s" }}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
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
            <button className="w-full sm:w-auto px-10 py-5 bg-primary-container text-on-primary-container rounded-xl font-headline font-bold text-lg shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
              Launch Studio
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
            <button className="w-full sm:w-auto px-10 py-5 glass-panel text-on-surface rounded-xl font-headline font-bold text-lg hover:bg-surface-variant/50 transition-all">
              View Showcase
            </button>
          </div>
        </div>

        {/* Floating UI Elements */}
        <div className="absolute inset-0 pointer-events-none z-30 hidden lg:block">
          {/* Rendering Chip */}
          <div
            className="absolute top-1/3 left-10 glass-panel p-4 rounded-xl drift-slow pulse-glow"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover"
                  src="/render-preview.jpg"
                  alt="AI render preview"
                />
              </div>
              <div>
                <div className="text-[10px] text-primary/80 tracking-widest">
                  RENDERING
                </div>
                <div className="text-xs font-bold font-headline">
                  Cinematic_Vol01.mp4
                </div>
                <div className="w-32 h-1 bg-surface-container-highest mt-2 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary-container" />
                </div>
              </div>
            </div>
          </div>

          {/* Prompt Intelligence Chip */}
          <div
            className="absolute bottom-1/4 right-20 glass-panel p-5 rounded-2xl drift-fast pulse-glow"
            style={{ animationDelay: "2s" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <svg
                className="w-5 h-5 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25M9 4L6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5" />
              </svg>
              <span className="text-sm font-headline font-bold">
                Prompt Intelligence
              </span>
            </div>
            <div className="text-xs text-on-surface/50 italic">
              &quot;Cyberpunk street with rain reflections, neon orange lighting,
              8k...&quot;
            </div>
          </div>

          {/* Live Model Chip */}
          <div className="absolute top-1/4 right-32 glass-panel p-3 rounded-full drift-slow opacity-60">
            <div className="flex items-center gap-2 px-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] tracking-tighter uppercase">
                Live Model Synthesis
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Wave Transition */}
      <div className="h-24 bg-surface relative z-40 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          fill="none"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 76.7C480 73.3 600 86.7 720 90C840 93.3 960 86.7 1080 76.7C1200 66.7 1320 53.3 1380 46.7L1440 40V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#131313"
          />
        </svg>
      </div>

      {/* How It Works Section */}
      <section className="py-32 bg-surface relative z-40 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">
              The Obsidian Workflow
            </h2>
            <p className="text-on-surface/50 max-w-xl mx-auto">
              Three steps from imagination to viral reality. Powered by the
              world&apos;s most advanced latent diffusion models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                icon: (
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                ),
                title: "Prompt Sculpting",
                desc: "Input your vision. Our LLM-enhanced parser transforms simple sentences into complex cinematic directives.",
              },
              {
                num: "02",
                icon: (
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-2.625 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125m1.5 5.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                    />
                  </svg>
                ),
                title: "Frame Synthesis",
                desc: "Our clusters render high-fidelity temporal coherent frames, maintaining style and physics with zero ghosting.",
              },
              {
                num: "03",
                icon: (
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                ),
                title: "Viral Export",
                desc: "One-tap upscaling to 4K and instant social distribution. Optimized for TikTok, Reels, and YouTube Shorts.",
              },
            ].map((step, i) => (
              <div
                key={step.num}
                className="group relative p-10 glass-panel rounded-[2rem] hover:bg-surface-container-low transition-all duration-500 reveal-up"
                style={{ animationDelay: `${0.1 * (i + 1)}s` }}
              >
                <div className="text-6xl font-black text-primary/10 absolute top-4 right-10 group-hover:text-primary/20 transition-colors font-headline">
                  {step.num}
                </div>
                <div className="w-14 h-14 bg-primary-container/10 rounded-2xl flex items-center justify-center mb-8">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">
                  {step.title}
                </h3>
                <p className="text-on-surface/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 bg-surface-container-low px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-6">
                Designed for Creators
              </h2>
              <p className="text-on-surface/50">
                From solo artists to enterprise studios, we have a canvas for
                you.
              </p>
            </div>
            <div className="flex p-1 bg-surface-container-highest rounded-xl">
              <button className="px-6 py-2 bg-primary-container text-on-primary-container rounded-lg font-headline font-bold text-sm">
                Monthly
              </button>
              <button className="px-6 py-2 text-on-surface/50 font-headline font-bold text-sm">
                Yearly (Save 20%)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Explorer */}
            <div
              className="glass-panel p-10 rounded-[2.5rem] flex flex-col h-full reveal-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h4 className="text-lg font-headline font-bold mb-2">
                Explorer
              </h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold font-headline">$0</span>
                <span className="text-on-surface/40 text-sm uppercase tracking-widest">
                  /month
                </span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {[
                  "5 AI Generations / month",
                  "Standard Quality (720p)",
                  "Community Support",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-on-surface/70 text-sm"
                  >
                    <CheckIcon className="text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 glass-panel rounded-xl font-headline font-bold hover:bg-surface-variant transition-all">
                Get Started
              </button>
            </div>

            {/* Director (Highlight) */}
            <div
              className="bg-primary-container/10 border-2 border-primary-container p-10 rounded-[2.5rem] relative overflow-hidden flex flex-col h-full reveal-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container px-6 py-2 rounded-bl-2xl text-[10px] font-bold tracking-[0.2em] uppercase">
                Most Popular
              </div>
              <h4 className="text-lg font-headline font-bold mb-2">
                Director
              </h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold font-headline">$49</span>
                <span className="text-on-surface/40 text-sm uppercase tracking-widest">
                  /month
                </span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {[
                  "Unlimited Generations",
                  "4K Upscaling Included",
                  "Early Access to Beta Models",
                  "Priority GPU Queue",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-on-surface text-sm font-semibold"
                  >
                    <CheckIcon className="text-primary-container" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-primary-container text-on-primary-container rounded-xl font-headline font-bold shadow-xl shadow-primary-container/30 hover:brightness-110 active:scale-95 transition-all">
                Go Pro
              </button>
            </div>

            {/* Studio */}
            <div
              className="glass-panel p-10 rounded-[2.5rem] flex flex-col h-full reveal-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h4 className="text-lg font-headline font-bold mb-2">Studio</h4>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold font-headline">$199</span>
                <span className="text-on-surface/40 text-sm uppercase tracking-widest">
                  /month
                </span>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {[
                  "Team Collaboration Hub",
                  "Custom Model Fine-tuning",
                  "Dedicated API Access",
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-on-surface/70 text-sm"
                  >
                    <CheckIcon className="text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 glass-panel rounded-xl font-headline font-bold hover:bg-surface-variant transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-5xl mx-auto glass-panel p-16 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-container/20 blur-[100px] rounded-full" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-tertiary-container/20 blur-[100px] rounded-full" />

          <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight mb-8 relative z-10">
            Ready to break the algorithm?
          </h2>
          <p className="text-on-surface/60 mb-12 max-w-lg mx-auto relative z-10">
            Join 50,000+ creators who are redefining the future of digital
            content with CreatorAI.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <input
              className="w-full sm:w-80 px-6 py-4 bg-surface-container-highest border-none rounded-xl focus:ring-2 focus:ring-primary-container text-on-surface placeholder:text-on-surface/30 outline-none"
              placeholder="Enter your work email"
              type="email"
            />
            <button className="w-full sm:w-auto px-10 py-4 bg-primary-container text-on-primary-container rounded-xl font-headline font-bold shadow-lg shadow-primary-container/20 hover:scale-105 active:scale-95 transition-all">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface w-full py-12 px-8 border-t border-surface-container-low">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-lg font-bold text-on-surface font-headline">
              CreatorAI
            </div>
            <div className="text-sm uppercase tracking-widest text-on-surface/50">
              &copy; 2024 CreatorAI. Engineered for the Obsidian Canvas.
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {["Terms", "Privacy", "Twitter", "Discord", "GitHub"].map(
              (link) => (
                <a
                  key={link}
                  className="text-sm uppercase tracking-widest text-on-surface/50 hover:text-primary-container transition-colors"
                  href="#"
                >
                  {link}
                </a>
              ),
            )}
          </div>
        </div>
      </footer>
    </>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`w-4 h-4 shrink-0 ${className ?? ""}`}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}
