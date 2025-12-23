import { SeriesListBlock } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface SeriesListProps {
  block: SeriesListBlock;
}

export function SeriesList({ block }: SeriesListProps) {
  const { t } = useLanguage();

  const statusLabels = {
    current: { en: "You are here", pt: "Você está aqui" },
    available: { en: "Available", pt: "Disponível" },
    upcoming: { en: "Coming soon", pt: "Em breve" },
  };

  return (
    <div className="py-8">
      <h3 className="font-display text-xl text-muted-foreground mb-6 text-center">
        {t(block.series_title)}
      </h3>

      <div className="space-y-4 max-w-md mx-auto">
        {block.zines.map((zine) => (
          <div
            key={zine.number}
            className={cn(
              "relative p-4 rounded-sm border transition-all duration-200",
              zine.status === "current" 
                ? "border-primary bg-primary/5 shadow-glow" 
                : zine.status === "available"
                  ? "border-border hover:border-primary/50 cursor-pointer"
                  : "border-border/50 opacity-50"
            )}
          >
            <div className="flex items-start gap-4">
              {/* Issue number */}
              <span className={cn(
                "font-mono text-sm",
                zine.status === "current" ? "text-primary" : "text-muted-foreground"
              )}>
                #{String(zine.number).padStart(2, '0')}
              </span>

              {/* Title and subtitle */}
              <div className="flex-1 min-w-0">
                <h4 className={cn(
                  "font-display text-base truncate",
                  zine.status === "upcoming" ? "text-muted-foreground" : "text-foreground"
                )}>
                  {t(zine.title)}
                </h4>
                <p className="text-sm text-muted-foreground truncate">
                  {t(zine.subtitle)}
                </p>
              </div>

              {/* Status badge */}
              <span className={cn(
                "text-[10px] uppercase tracking-wider px-2 py-1 rounded-full whitespace-nowrap",
                zine.status === "current" 
                  ? "bg-primary/20 text-primary" 
                  : zine.status === "available"
                    ? "bg-accent/20 text-accent"
                    : "bg-muted text-muted-foreground"
              )}>
                {t(statusLabels[zine.status])}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
