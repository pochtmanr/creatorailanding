"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const APP_STORE_URL = "https://apps.apple.com/app/creatorai-ai-video-generator/id6504890498";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.theholylabs.creator";

type Platform = "ios" | "android" | "unknown";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "unknown";
}

type DownloadButtonsProps = {
  size?: "sm" | "lg";
  className?: string;
};

export function DownloadButtons({ size = "lg", className = "" }: DownloadButtonsProps) {
  const [platform, setPlatform] = useState<Platform>("unknown");
  const t = useTranslations("download");

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const buttonSize = size === "sm" ? "sm" : "lg";
  const iconSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  const appStoreButton = (
    <Button
      variant="primary"
      size={buttonSize}
      href={APP_STORE_URL}
      external
      iconLeft={
        <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      }
      className={size === "lg" ? "w-full sm:w-auto shadow-2xl shadow-primary/20" : ""}
    >
      {t("appStore")}
    </Button>
  );

  const googlePlayButton = (
    <Button
      variant="secondary"
      size={buttonSize}
      href={GOOGLE_PLAY_URL}
      external
      iconLeft={
        <svg className={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.38l2.5 1.449c.5.29.5.99 0 1.28l-2.5 1.449-2.625-2.625 2.625-2.553zM5.864 3.458L16.8 9.79l-2.302 2.302-8.634-8.634z" />
        </svg>
      }
      className={size === "lg" ? "w-full sm:w-auto" : ""}
    >
      {t("googlePlay")}
    </Button>
  );

  const isMobile = platform === "ios" || platform === "android";

  if (isMobile) {
    const isPrimary = platform === "ios";
    return (
      <div className={`flex flex-col items-center gap-3 md:flex-row md:gap-6 ${className}`}>
        {/* Both on md+ */}
        <div className="hidden md:contents">
          {appStoreButton}
          {googlePlayButton}
        </div>
        {/* Mobile: primary + small link */}
        <div className="flex flex-col items-center gap-2 md:hidden">
          {isPrimary ? appStoreButton : googlePlayButton}
          <a
            href={isPrimary ? GOOGLE_PLAY_URL : APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-on-surface/50 hover:text-on-surface/70 transition-colors underline underline-offset-2"
          >
            {isPrimary ? t("alsoOnAndroid") : t("alsoOnIos")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`contents ${className}`}>
      {appStoreButton}
      {googlePlayButton}
    </div>
  );
}
