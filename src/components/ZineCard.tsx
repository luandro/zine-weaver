import { Link } from 'react-router-dom';
import { Zine } from '@/types/zine';
import { useLanguage, useUITranslations } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface ZineCardProps {
  zine: Zine;
  className?: string;
}

export function ZineCard({ zine, className }: ZineCardProps) {
  const { t } = useLanguage();
  const uiTranslations = useUITranslations();
  const isPublished = zine.metadata.status === 'published';

  const CardContent = (
    <article 
      className={cn(
        "zine-card group transition-all duration-300", 
        !isPublished && "opacity-60 grayscale cursor-not-allowed",
        className
      )}
      aria-disabled={!isPublished ? "true" : undefined}
    >
      {/* Cover image area */}
      <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
        {/* Placeholder with issue number */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <span className="font-mono text-6xl text-primary/20 mb-4">
            {String(zine.metadata.issue_number).padStart(2, '0')}
          </span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {t(uiTranslations.issue)} {zine.metadata.issue_number}
          </span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Status badge */}
        {!isPublished && (
          <div 
            className="absolute top-4 right-4 px-3 py-1 bg-muted/80 backdrop-blur-sm rounded-full"
            role="status"
            aria-label={t(uiTranslations.comingSoon)}
          >
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              {t(uiTranslations.comingSoon)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Series title */}
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary">
          {t(zine.metadata.series_title)}
        </p>

        {/* Title */}
        <h3 className={cn(
          "font-display text-lg text-foreground transition-colors leading-tight",
          isPublished && "group-hover:text-primary"
        )}>
          {t(zine.metadata.title)}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {t(zine.metadata.subtitle)}
        </p>

        {/* Read button */}
        {isPublished && (
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all duration-200">
              {t(uiTranslations.readNow)}
              <span className="text-lg">→</span>
            </span>
          </div>
        )}
      </div>
    </article>
  );

  if (!isPublished) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{CardContent}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t(uiTranslations.comingSoonTooltip)}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Link 
      to={`/read/${zine.slug}`}
      className="block focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-sm transition-all"
    >
      {CardContent}
    </Link>
  );
}
