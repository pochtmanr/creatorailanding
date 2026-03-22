"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 2000;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="text-3xl md:text-4xl font-headline font-bold text-on-surface">{count.toLocaleString()}{suffix}</span>;
}

const metrics = [
  { key: "creators", target: 10000, suffix: "+", icon: "users" },
  { key: "videos", target: 200000, suffix: "+", icon: "play" },
  { key: "languages", target: 20, suffix: "+", icon: "globe" },
];

const icons: Record<string, React.ReactNode> = {
  users: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  play: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
  ),
  globe: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
};

export function TrustBar() {
  const t = useTranslations("trust");

  return (
    <section className="py-16 px-4 sm:px-8 bg-surface relative z-40">
      <div className="max-w-7xl mx-auto">
        <div className="glass-panel rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            {metrics.map((m) => (
              <div key={m.key} className="flex flex-col items-center gap-2">
                <div className="text-primary/60 mb-1">{icons[m.icon]}</div>
                <AnimatedNumber target={m.target} suffix={m.suffix} />
                <span className="text-on-surface/50 text-sm">{t(m.key)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Marquee */}
        <div className="mt-8 overflow-hidden relative">
          <div className="flex w-[200%] animate-marquee">
            {[0, 1].map((setIdx) => (
              <div key={setIdx} className="flex-1 flex items-center justify-around" aria-hidden={setIdx > 0 ? "true" : undefined}>
                {/* TikTok */}
                <svg className="h-6 text-on-surface/20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                {/* YouTube */}
                <svg className="h-6 text-on-surface/20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                {/* Instagram */}
                <svg className="h-6 text-on-surface/20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                {/* Snapchat */}
                <svg className="h-6 text-on-surface/20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.921-.278.12-.073.261-.117.405-.117a.81.81 0 01.426.138c.345.22.429.568.349.864a1.212 1.212 0 01-.849.81c-.108.038-.249.072-.416.119-.377.1-.855.224-1.041.454-.148.184-.15.482-.06.831.27.89.75 1.79 1.27 2.49.35.47.753.878 1.17 1.2.17.13.32.23.44.3.23.13.37.26.43.43l.01.04c.09.291.006.648-.3.978-.62.663-1.62.903-2.393 1.073-.133.03-.255.055-.362.08-.11.025-.194.061-.273.111-.12.075-.193.194-.257.381-.065.189-.082.383-.1.539-.01.063-.016.123-.024.178-.02.12-.04.22-.07.3-.052.118-.11.19-.19.26-.15.12-.37.18-.68.21-.24.03-.511.03-.79.03-.312 0-.59-.018-.866-.038l-.1-.006c-.243-.016-.463-.03-.68-.03-.248 0-.454.03-.646.09-.5.174-.886.562-1.263.94-.42.42-.89.77-1.395.95-.32.11-.65.17-.98.17s-.66-.06-.98-.17c-.5-.18-.973-.53-1.395-.95-.376-.378-.762-.766-1.263-.94-.192-.06-.398-.09-.646-.09-.217 0-.437.014-.68.03l-.1.006c-.276.02-.554.038-.866.038-.28 0-.55 0-.79-.03-.31-.03-.53-.09-.68-.21-.08-.07-.138-.142-.19-.26-.03-.08-.05-.18-.07-.3-.008-.055-.014-.115-.024-.178-.018-.156-.035-.35-.1-.539-.064-.187-.137-.306-.257-.381-.079-.05-.163-.086-.273-.111-.107-.025-.229-.05-.362-.08-.773-.17-1.773-.41-2.393-1.073-.306-.33-.39-.687-.3-.978l.01-.04c.06-.17.2-.3.43-.43.12-.07.27-.17.44-.3.417-.322.82-.73 1.17-1.2.52-.7 1-1.6 1.27-2.49.09-.349.088-.647-.06-.831-.186-.23-.664-.354-1.041-.454-.167-.047-.308-.081-.416-.119a1.212 1.212 0 01-.849-.81c-.08-.296.004-.644.349-.864a.81.81 0 01.426-.138c.144 0 .285.044.405.117.262.158.62.294.921.278.198 0 .326-.045.401-.09-.008-.165-.018-.33-.03-.51l-.003-.06c-.104-1.628-.23-3.654.3-4.847C7.86 1.069 11.216.793 12.206.793z"/></svg>
                {/* X/Twitter */}
                <svg className="h-5 text-on-surface/20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
