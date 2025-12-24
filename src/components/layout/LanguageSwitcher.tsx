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
          "border border-border rounded-sm min-w-[3rem]",
          "hover:border-primary/50 hover:text-primary transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        aria-label={language === 'en' ? 'Mudar para Português' : 'Switch to English'}
        aria-pressed={false}
      >
        <span className="sr-only">
          {language === 'en' ? 'Current language: English' : 'Idioma atual: Português'}
        </span>
        <span aria-hidden="true">
          {language === 'en' ? 'PT' : 'EN'}
        </span>
      </button>
    );
  }

  return (
    <div 
      className={cn("flex items-center gap-1 p-1 bg-secondary/50 rounded-sm", className)}
      role="group"
      aria-label={language === 'en' ? 'Language Selection' : 'Seleção de Idioma'}
    >
      <button
        onClick={() => setLanguage('en')}
        className={cn(
          "px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          language === 'en' 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="English"
        aria-pressed={language === 'en'}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('pt')}
        className={cn(
          "px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          language === 'pt' 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Português"
        aria-pressed={language === 'pt'}
      >
        Português
      </button>
    </div>
  );
}
