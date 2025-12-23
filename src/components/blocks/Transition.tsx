import { TransitionBlock } from '@/types/zine';
import { cn } from '@/lib/utils';

interface TransitionProps {
  block: TransitionBlock;
}

export function Transition({ block }: TransitionProps) {
  const pauseStyles = {
    scene_break: "py-12",
    time_passing: "py-16",
    mood_shift: "py-20",
  };

  return (
    <div className={cn("flex items-center justify-center", pauseStyles[block.pause_type])}>
      {block.symbol ? (
        <span className="text-2xl text-muted-foreground tracking-[1em] select-none">
          {block.symbol}
        </span>
      ) : (
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-border" />
          <span className="w-2 h-2 rounded-full bg-primary/40" />
          <span className="w-8 h-px bg-border" />
        </div>
      )}
    </div>
  );
}
