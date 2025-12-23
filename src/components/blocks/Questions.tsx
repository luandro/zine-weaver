import { QuestionsBlock } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';

interface QuestionsProps {
  block: QuestionsBlock;
}

export function Questions({ block }: QuestionsProps) {
  const { t } = useLanguage();

  return (
    <div className="py-8 px-4 md:px-8 bg-secondary/30 rounded-sm border border-border/50">
      {block.intro_text && (
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-6">
          {t(block.intro_text)}
        </p>
      )}

      <ul className="space-y-4">
        {block.questions.map((question, i) => (
          <li 
            key={i}
            className="flex items-start gap-4 text-lg text-foreground/90 font-light"
          >
            <span className="text-primary/60 font-mono text-sm mt-1">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="italic">{t(question)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
