import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";


export async function Navbar() {
  const t = await getTranslations("nav");

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/40 backdrop-blur-xl border-b border-on-surface/10 shadow-2xl shadow-primary/5">
      <div className="flex justify-between items-center px-4 sm:px-8 py-3 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-on-surface font-headline">
          CreatorAI
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#features" className="text-on-surface/70 hover:text-on-surface transition-colors font-headline font-bold tracking-tight text-sm">
            {t("features")}
          </Link>
          <Link href="/#pricing" className="text-on-surface/70 hover:text-on-surface transition-colors font-headline font-bold tracking-tight text-sm">
            {t("pricing")}
          </Link>
          <Link href="/blog" className="text-on-surface/70 hover:text-on-surface transition-colors font-headline font-bold tracking-tight text-sm">
            {t("blog")}
          </Link>
          <Link href="/api" className="text-on-surface/70 hover:text-on-surface transition-colors font-headline font-bold tracking-tight text-sm">
            {t("api")}
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <DesktopNav />
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
