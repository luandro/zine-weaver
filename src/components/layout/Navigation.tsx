import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { cn } from '@/lib/utils';

interface NavigationProps {
  showBackButton?: boolean;
}

export function Navigation({ showBackButton = false }: NavigationProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

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
          <span className={cn(
            "font-display text-sm tracking-wide text-foreground/80",
            "md:opacity-0 md:group-hover:opacity-100 transition-opacity",
            isHome && "md:opacity-100"
          )}>
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
