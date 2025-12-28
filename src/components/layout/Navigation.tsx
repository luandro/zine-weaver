import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useConfig } from "@/contexts/ConfigContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface NavigationProps {
  showBackButton?: boolean;
}

type TitleAnimationState = "hidden" | "typing" | "shown" | "erasing";

export function Navigation({ showBackButton = false }: NavigationProps) {
  const { site } = useConfig();
  const { language, t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [titleState, setTitleState] = useState<TitleAnimationState>(
    isHome ? "hidden" : "shown"
  );
  const effectiveTitleState = isHome ? titleState : "shown";

  const symbol = site?.branding.symbol || "■";
  const logoText = site?.branding.logoText || { en: "Conversations with a Black Box", pt: "Conversas com uma Caixa Preta" };

  // Combined effect for scroll observation and title state management
  useEffect(() => {
    // Non-home pages: no observer needed.
    if (!isHome) {
      return;
    }

    // Home page: observe hero section for scroll-based visibility
    const hero = document.getElementById("hero-section");
    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting;

        // Update animation state based on visibility
        setTitleState((prev) => {
          if (shouldShow) {
            return prev === "shown" || prev === "typing" ? prev : "typing";
          }
          return prev === "hidden" || prev === "erasing" ? prev : "erasing";
        });
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0.1 }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, [isHome]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        {isHome ? (language === 'en' ? 'Skip to zines' : 'Pular para zines') : (language === 'en' ? 'Skip to content' : 'Pular para o conteúdo')}
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Home link */}
        <Link
          to="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-80"
          aria-current={isHome ? "page" : undefined}
          tabIndex={isHome ? -1 : undefined}
        >
          <span className="text-primary text-xl">{symbol}</span>
          <span
            onAnimationEnd={() => {
              setTitleState((prev) => {
                if (prev === "typing") return "shown";
                if (prev === "erasing") return "hidden";
                return prev;
              });
            }}
            className={cn(
              "font-display text-sm tracking-wide text-foreground/80 outline-none",
              "typewriter-text",
              effectiveTitleState === "typing" && "typewriter-enter",
              effectiveTitleState === "erasing" && "typewriter-exit",
              effectiveTitleState === "hidden" && "typewriter-hidden"
            )}
          >
            {t(logoText)}
          </span>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <LanguageSwitcher variant="compact" />
        </div>
      </div>
    </header>
    </>
  );
}
