import { TimelineBlock } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface TimelineProps {
  block: TimelineBlock;
}

export function Timeline({ block }: TimelineProps) {
  const { t } = useLanguage();

  const getSegmentColor = (color: string) => {
    const colorMap: Record<string, string> = {
      earth: 'bg-earth',
      industrial: 'bg-industrial',
      primary: 'bg-primary',
      muted: 'bg-muted',
    };
    return colorMap[color] || 'bg-muted';
  };

  const getSegmentStyle = (style: string) => {
    const styleMap: Record<string, string> = {
      solid: '',
      gradient: 'bg-gradient-to-r from-primary/80 to-primary',
      faded: 'opacity-40',
      striped: 'bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.1)_4px,rgba(255,255,255,0.1)_8px)]',
    };
    return styleMap[style] || '';
  };

  return (
    <div className="py-8">
      {/* Timeline bar */}
      <div className="relative h-20 md:h-24 bg-timeline-bar rounded overflow-hidden flex">
        {block.segments.map((segment, i) => (
          <div
            key={i}
            className={cn(
              "timeline-segment transition-all duration-300 hover:brightness-110",
              getSegmentColor(segment.color),
              getSegmentStyle(segment.visual_style)
            )}
            style={{ width: `${segment.proportion * 100}%` }}
          >
            <span className="font-medium text-foreground text-xs md:text-sm truncate">
              {t(segment.label)}
            </span>
            <span className="text-foreground/60 text-[10px] md:text-xs truncate">
              {t(segment.sublabel)}
            </span>
          </div>
        ))}
      </div>

      {/* Caption */}
      <p className="mt-4 text-sm text-muted-foreground italic text-center">
        {t(block.caption)}
      </p>
    </div>
  );
}
