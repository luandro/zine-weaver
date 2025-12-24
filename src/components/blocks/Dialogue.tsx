import { DialogueBlock } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';
import { ConversationBlock } from './ConversationBlock';

interface DialogueProps {
  block: DialogueBlock;
}

export function Dialogue({ block }: DialogueProps) {
  const { t } = useLanguage();

  // Render markdown-like formatting (basic: *italic*, **bold**)
  const renderText = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => (
      <p key={i} className={i > 0 ? 'mt-4' : ''}>
        {paragraph.split('\n').map((line, j) => (
          <span key={j}>
            {j > 0 && <br />}
            {line}
          </span>
        ))}
      </p>
    ));
  };

  return (
    <ConversationBlock
      id={block.id}
      speaker={block.speaker}
      context={block.context ? t(block.context) : undefined}
      speech={renderText(t(block.speech))}
    />
  );
}
