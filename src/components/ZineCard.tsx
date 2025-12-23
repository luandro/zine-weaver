import { Link } from 'react-router-dom';
import { Zine } from '@/types/zine';
import { useLanguage, uiTranslations } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ZineCardProps {
  zine: Zine;
  className?: string;
}

export function ZineCard({ zine, className }: ZineCardProps) {
  const { t } = useLanguage();
  const isPublished = zine.metadata.status === 'published';

  return (
    <article className={cn("zine-card group", className)}>
      <Link 
        to={isPublished ? `/read/${zine.slug}` : '#'}
        className={cn(
          "block",
          !isPublished && "pointer-events-none"
        )}
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
            <div className="absolute top-4 right-4 px-3 py-1 bg-muted/80 backdrop-blur-sm rounded-full">
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
          <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
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
      </Link>
    </article>
  );
}
