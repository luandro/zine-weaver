import { useLanguage, useUITranslations } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const { language, setLanguage, toggleLanguage } = useLanguage();
  const t = useUITranslations();

  if (variant === 'compact') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className={cn(
          "px-3 h-9 text-xs font-mono uppercase tracking-wider",
          "border border-border rounded-sm min-w-[3rem]",
          "hover:border-primary/50 hover:text-primary transition-colors",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
          className
        )}
        aria-label={t.switchLanguage[language]}
      >
        <span className="sr-only">
          {t.currentLanguage[language]}
        </span>
        <span aria-hidden="true">
          {language === 'en' ? 'PT' : 'EN'}
        </span>
      </Button>
    );
  }

  return (
    <div 
      className={cn("flex items-center gap-1 p-1 bg-secondary/50 rounded-sm", className)}
      role="group"
      aria-label={t.language[language]}
    >
      <Button
        variant={language === 'en' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 h-8 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
          language === 'en' ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
        aria-label={t.english[language]}
        aria-pressed={language === 'en'}
      >
        {t.english[language]}
      </Button>
      <Button
        variant={language === 'pt' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('pt')}
        className={cn(
          "px-3 h-8 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
          language === 'pt' ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
        )}
        aria-label={t.portuguese[language]}
        aria-pressed={language === 'pt'}
      >
        {t.portuguese[language]}
      </Button>
    </div>
  );
}
