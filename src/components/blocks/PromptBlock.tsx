import { PromptBlock as PromptBlockType } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';

interface PromptBlockProps {
  block: PromptBlockType;
}

export function PromptBlock({ block }: PromptBlockProps) {
  const { t } = useLanguage();

  return (
    <div className="py-6">
      {block.context && (
        <p className="text-muted-foreground italic mb-4 text-sm">
          {t(block.context)}
        </p>
      )}
      
      <div className="prompt-input relative">
        {/* Fake cursor effect */}
        <span className="text-primary mr-2">›</span>
        <span className="text-foreground/90">{t(block.prompt_text)}</span>
        <span className="inline-block w-2 h-4 bg-primary/60 ml-1 animate-pulse" />
      </div>
    </div>
  );
}
