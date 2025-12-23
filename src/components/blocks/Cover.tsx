import { CoverBlock } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';

interface CoverProps {
  block: CoverBlock;
}

export function Cover({ block }: CoverProps) {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-8 py-16 gradient-hero">
      {/* Vignette overlay */}
      <div className="absolute inset-0 gradient-vignette pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        {/* Series title */}
        <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground animate-fade-in">
          {t(block.series_title)}
        </p>

        {/* Issue label */}
        <p className="text-xs tracking-[0.2em] uppercase text-primary/70 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {t(block.issue_label)}
        </p>

        {/* Main title */}
        <h1 
          className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-tight animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          {t(block.title)}
        </h1>

        {/* Subtitle */}
        <p 
          className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          {t(block.subtitle)}
        </p>

        {/* Decorative element */}
        <div 
          className="flex items-center justify-center gap-4 pt-8 animate-fade-in"
          style={{ animationDelay: '0.6s' }}
        >
          <span className="w-12 h-px bg-border" />
          <span className="text-primary text-2xl">■</span>
          <span className="w-12 h-px bg-border" />
        </div>
      </div>

      {/* Mood indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm text-xs tracking-wide text-muted-foreground animate-fade-in mood-${block.mood}`}
        style={{ animationDelay: '0.8s' }}
      >
        {block.mood}
      </div>
    </div>
  );
}
