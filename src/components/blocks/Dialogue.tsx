import { DialogueBlock, speakers } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface DialogueProps {
  block: DialogueBlock;
}

export function Dialogue({ block }: DialogueProps) {
  const { t } = useLanguage();
  const speaker = speakers[block.speaker];

  const containerClasses = {
    human: "dialogue-human",
    black_box: "dialogue-blackbox",
    narrator: "dialogue-narrator",
  };

  const textClasses = {
    human: "text-foreground",
    black_box: "text-foreground font-mono",
    narrator: "text-narrator italic",
  };

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

  if (block.speaker === "narrator") {
    return (
      <div className={cn("py-6", containerClasses.narrator)}>
        {block.context && (
          <p className="text-sm text-muted-foreground mb-3">{t(block.context)}</p>
        )}
        <div className={cn("text-lg", textClasses.narrator)}>
          {renderText(t(block.speech))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      {block.context && (
        <p className="text-sm text-muted-foreground mb-4 italic">{t(block.context)}</p>
      )}
      
      <div className={cn("relative", containerClasses[block.speaker])}>
        {/* Speaker indicator */}
        <div className="flex items-center gap-3 mb-3">
          {block.speaker === "human" ? (
            <span className="symbol-human" aria-label="Human">○</span>
          ) : (
            <span className="symbol-blackbox" aria-label="Black Box">■</span>
          )}
          <span className={cn(
            "text-xs tracking-[0.2em] uppercase",
            block.speaker === "human" ? "text-human" : "text-muted-foreground"
          )}>
            {t(speaker.display_name)}
          </span>
        </div>

        {/* Speech content */}
        <div className={cn("text-base md:text-lg leading-relaxed", textClasses[block.speaker])}>
          {renderText(t(block.speech))}
        </div>
      </div>
    </div>
  );
}
