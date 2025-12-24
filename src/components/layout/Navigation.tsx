import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

interface NavigationProps {
  showBackButton?: boolean;
}

type TitleAnimationState = "hidden" | "typing" | "shown" | "erasing";

export function Navigation({ showBackButton = false }: NavigationProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [showScrollTitle, setShowScrollTitle] = useState(!isHome);
  const [titleState, setTitleState] = useState<TitleAnimationState>(
    isHome ? "hidden" : "shown"
  );

  // Combined effect for scroll observation and title state management
  useEffect(() => {
    // Non-home pages: always show title
    if (!isHome) {
      setShowScrollTitle(true);
      setTitleState("shown");
      return;
    }

    // Home page: observe hero section for scroll-based visibility
    const hero = document.getElementById("hero-section");
    if (!hero) {
      setShowScrollTitle(true);
      setTitleState("shown");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldShow = !entry.isIntersecting;
        setShowScrollTitle(shouldShow);

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Home link */}
        <Link
          to="/"
          className={cn(
            "group flex items-center gap-3 transition-opacity hover:opacity-80",
            isHome && "pointer-events-none"
          )}
        >
          <span className="text-primary text-xl">■</span>
          <span
            onAnimationEnd={() => {
              setTitleState((prev) => {
                if (prev === "typing") return "shown";
                if (prev === "erasing") return "hidden";
                return prev;
              });
            }}
            className={cn(
              "font-display text-sm tracking-wide text-foreground/80",
              "typewriter-text",
              titleState === "typing" && "typewriter-enter",
              titleState === "erasing" && "typewriter-exit",
              titleState === "hidden" && "typewriter-hidden"
            )}
          >
            Conversations with a Black Box
          </span>
        </Link>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher variant="compact" />
        </div>
      </div>
    </header>
  );
}
