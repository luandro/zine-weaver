import { Speaker, speakers } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import React from 'react';

interface ConversationBlockProps {
  speaker: Speaker;
  speech: React.ReactNode;
  context?: React.ReactNode;
  id: string;
}

export function ConversationBlock({ speaker: speakerType, speech, context, id }: ConversationBlockProps) {
  const { t } = useLanguage();
  const speakerConfig = speakers[speakerType];
  const labelId = `speaker-label-${id}`;

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

  if (speakerType === "narrator") {
    return (
      <div 
        role="group" 
        aria-labelledby={labelId} 
        className={cn("py-6", containerClasses.narrator)}
      >
        <span id={labelId} className="sr-only">
          {t({ en: "Narrator", pt: "Narrador" })}
        </span>
        {context && (
          <div className="text-sm text-muted-foreground mb-3 italic">{context}</div>
        )}
        <div className={cn("text-lg", textClasses.narrator)}>
          <span className="sr-only">
            {t({ en: "Narrator:", pt: "Narrador:" })}
          </span>
          {speech}
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      {context && (
        <div className="text-sm text-muted-foreground mb-4 italic">{context}</div>
      )}
      
      <div 
        role="group" 
        aria-labelledby={labelId} 
        className={cn("relative", containerClasses[speakerType])}
      >
        {/* Speaker indicator */}
        <div className="flex items-center gap-3 mb-3">
          {speakerType === "human" ? (
            <span className="symbol-human" aria-hidden="true">○</span>
          ) : (
            <span className="symbol-blackbox" aria-hidden="true">■</span>
          )}
          <span id={labelId} className={cn(
            "text-xs tracking-[0.2em] uppercase",
            speakerType === "human" ? "text-human" : "text-muted-foreground"
          )}>
            <span className="sr-only">{t({ en: "Speaker: ", pt: "Palestrante: " })}</span>
            {t(speakerConfig.display_name)}
          </span>
        </div>

        {/* Speech content */}
        <div className={cn("text-base md:text-lg leading-relaxed", textClasses[speakerType])}>
          <span className="sr-only">
            {t(speakerConfig.display_name)}:
          </span>
          {speech}
        </div>
      </div>
    </div>
  );
}
