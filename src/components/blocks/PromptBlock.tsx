import { PromptBlock as PromptBlockType } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';
import { ConversationBlock } from './ConversationBlock';

interface PromptBlockProps {
  block: PromptBlockType;
}

export function PromptBlock({ block }: PromptBlockProps) {
  const { t } = useLanguage();

  return (
    <ConversationBlock
      id={block.id}
      speaker="black_box"
      context={block.context ? t(block.context) : undefined}
      speech={
        <div className="prompt-input relative">
          {/* Fake cursor effect */}
          <span className="text-primary mr-2" aria-hidden="true">›</span>
          <span className="text-foreground/90">{t(block.prompt_text)}</span>
          <span className="inline-block w-2 h-4 bg-primary/60 ml-1 animate-pulse" aria-hidden="true" />
        </div>
      }
    />
  );
}
