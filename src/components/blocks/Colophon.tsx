import { ColophonBlock } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';

interface ColophonProps {
  block: ColophonBlock;
}

export function Colophon({ block }: ColophonProps) {
  const { t } = useLanguage();

  return (
    <div className="py-12 border-t border-border/50 mt-8">
      <div className="max-w-lg mx-auto text-center space-y-6">
        {/* Call to action */}
        <p className="font-display text-lg text-foreground/80 italic">
          {t(block.call_to_action)}
        </p>

        <div className="flex items-center justify-center gap-4">
          <span className="w-8 h-px bg-border" />
          <span className="text-primary">■</span>
          <span className="w-8 h-px bg-border" />
        </div>

        {/* Credits */}
        {block.credits && (
          <p className="text-sm text-muted-foreground">
            {t(block.credits)}
          </p>
        )}

        {/* Permissions */}
        <p className="text-xs text-muted-foreground/70 leading-relaxed">
          {t(block.permissions)}
        </p>
      </div>
    </div>
  );
}
