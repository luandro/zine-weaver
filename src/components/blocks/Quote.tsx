import { QuoteBlock } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface QuoteProps {
  block: QuoteBlock;
}

export function Quote({ block }: QuoteProps) {
  const { t } = useLanguage();

  const styleClasses = {
    centered: "quote-centered py-12",
    pullquote: "quote-pullquote py-8",
    handwritten: "text-2xl md:text-3xl font-display italic text-center py-10 opacity-80",
  };

  return (
    <blockquote className={cn("relative", styleClasses[block.style])}>
      {/* Decorative quote marks for centered style */}
      {block.style === "centered" && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-primary/20 font-display select-none">
          "
        </span>
      )}

      <p className="text-foreground relative z-10">
        {t(block.quote_text)}
      </p>

      {block.attribution && (
        <footer className="mt-4 text-sm text-muted-foreground">
          — {t(block.attribution)}
        </footer>
      )}
    </blockquote>
  );
}
