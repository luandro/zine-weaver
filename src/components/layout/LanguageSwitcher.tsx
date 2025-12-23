import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  if (variant === 'compact') {
    return (
      <button
        onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
        className={cn(
          "px-3 py-1.5 text-xs font-mono uppercase tracking-wider",
          "border border-border rounded-sm",
          "hover:border-primary/50 hover:text-primary transition-colors",
          className
        )}
        aria-label={`Switch to ${language === 'en' ? 'Portuguese' : 'English'}`}
      >
        {language === 'en' ? 'PT' : 'EN'}
      </button>
    );
  }

  return (
    <div className={cn("flex items-center gap-1 p-1 bg-secondary/50 rounded-sm", className)}>
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200",
          language === 'en' 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to English"
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('pt')}
        className={cn(
          "px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200",
          language === 'pt' 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to Portuguese"
        aria-pressed={language === 'pt'}
      >
        PT
      </button>
    </div>
  );
}
