import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-low/50 border-t border-on-surface/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4" dir="ltr">
              <Logo size={28} />
              <span className="font-headline text-xl font-bold text-on-surface">
                CreatorAI
              </span>
            </Link>
            <p className="text-on-surface/50 text-sm max-w-sm mb-6">
              {t("description")}
            </p>
            {/* App Store Badge */}
            <a
              href="https://apps.apple.com/app/creatorai-ai-video-generator/id6504890498"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high/50 rounded-full hover:bg-surface-container-highest/50 transition-colors"
              dir="ltr"
            >
              <svg className="w-5 h-5 text-on-surface" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <span className="text-sm text-on-surface font-medium">App Store</span>
            </a>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-headline font-bold text-on-surface mb-4">{t("product")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#features" className="text-on-surface/50 hover:text-on-surface transition-colors text-sm">
                  {t("features")}
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-on-surface/50 hover:text-on-surface transition-colors text-sm">
                  {t("pricing")}
                </Link>
              </li>
              <li>
                <Link href="/#api" className="text-on-surface/50 hover:text-on-surface transition-colors text-sm">
                  {t("apiAccess")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-on-surface/50 hover:text-on-surface transition-colors text-sm">
                  {t("blog")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-headline font-bold text-on-surface mb-4">{t("company")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-on-surface/50 hover:text-on-surface transition-colors text-sm">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-on-surface/50 hover:text-on-surface transition-colors text-sm">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-on-surface/50 hover:text-on-surface transition-colors text-sm">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-on-surface/50 hover:text-on-surface transition-colors text-sm">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-on-surface/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-on-surface/40 text-sm">
              &copy; {currentYear} CreatorAI. {t("rights")}
            </p>

            <div className="flex items-center gap-4">
              {/* X/Twitter */}
              <a href="https://x.com/CreatorAI972" target="_blank" rel="noopener noreferrer" className="text-on-surface/40 hover:text-on-surface transition-colors" aria-label="X">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="https://www.instagram.com/creatorai.art" target="_blank" rel="noopener noreferrer" className="text-on-surface/40 hover:text-on-surface transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@creatorai.art" target="_blank" rel="noopener noreferrer" className="text-on-surface/40 hover:text-on-surface transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/holylabs/" target="_blank" rel="noopener noreferrer" className="text-on-surface/40 hover:text-on-surface transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/people/Creator-AI/61586255401318/" target="_blank" rel="noopener noreferrer" className="text-on-surface/40 hover:text-on-surface transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* Product Hunt */}
              <a href="https://www.producthunt.com/products/creator-ai-3" target="_blank" rel="noopener noreferrer" className="text-on-surface/40 hover:text-on-surface transition-colors" aria-label="Product Hunt">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.604 8.4h-3.405V12h3.405a1.8 1.8 0 001.8-1.8 1.8 1.8 0 00-1.8-1.8zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804a4.2 4.2 0 010 8.4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
