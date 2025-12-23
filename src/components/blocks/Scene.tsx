import { SceneBlock } from '@/types/zine';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface SceneProps {
  block: SceneBlock;
}

export function Scene({ block }: SceneProps) {
  const { t } = useLanguage();

  const layoutClasses = {
    full_bleed: "min-h-[60vh] flex items-center justify-center text-center px-8",
    split_horizontal: "grid md:grid-cols-2 gap-8 items-center",
    split_vertical: "flex flex-col gap-8",
    text_over_image: "relative min-h-[50vh] flex items-end p-8",
    image_over_text: "flex flex-col gap-6",
    sidebar: "grid md:grid-cols-[1fr,2fr] gap-8",
    centered: "max-w-2xl mx-auto text-center px-8 py-12",
  };

  return (
    <div className={cn("relative", layoutClasses[block.layout], `mood-${block.mood}`)}>
      {/* Background gradient based on mood */}
      <div 
        className={cn(
          "absolute inset-0 opacity-20 pointer-events-none",
          block.mood === "dark" && "bg-gradient-to-b from-transparent to-background",
          block.mood === "hopeful" && "gradient-warm",
          block.mood === "mysterious" && "bg-gradient-to-br from-mood-mysterious/10 to-transparent"
        )}
      />

      {/* Image placeholder - would render actual image in production */}
      {block.layout !== "centered" && (
        <div className="relative aspect-video md:aspect-[4/3] bg-secondary rounded overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
            <div className="text-center p-4">
              <p className="text-xs uppercase tracking-wider mb-2">Image</p>
              <p className="italic text-xs opacity-70">{t(block.image.description)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Narrative text */}
      <div className={cn(
        "relative z-10",
        block.layout === "text_over_image" && "text-foreground bg-gradient-to-t from-background via-background/80 to-transparent p-8 -m-8 mt-0"
      )}>
        <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
          {t(block.narrative)}
        </p>
      </div>
    </div>
  );
}
