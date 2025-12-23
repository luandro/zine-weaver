import { Block } from '@/types/zine';
import { Cover } from './Cover';
import { Scene } from './Scene';
import { Dialogue } from './Dialogue';
import { PromptBlock } from './PromptBlock';
import { Timeline } from './Timeline';
import { Quote } from './Quote';
import { Questions } from './Questions';
import { Transition } from './Transition';
import { SeriesList } from './SeriesList';
import { Colophon } from './Colophon';

interface BlockRendererProps {
  block: Block;
}

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'cover':
      return <Cover block={block} />;
    case 'scene':
      return <Scene block={block} />;
    case 'dialogue':
      return <Dialogue block={block} />;
    case 'prompt_block':
      return <PromptBlock block={block} />;
    case 'timeline':
      return <Timeline block={block} />;
    case 'quote':
      return <Quote block={block} />;
    case 'questions':
      return <Questions block={block} />;
    case 'transition':
      return <Transition block={block} />;
    case 'series_list':
      return <SeriesList block={block} />;
    case 'colophon':
      return <Colophon block={block} />;
    case 'visual_data':
      // Placeholder for visual data - would need specific implementation
      return (
        <div className="py-8 text-center text-muted-foreground">
          [Visual Data: {block.visualization_type}]
        </div>
      );
    default:
      return null;
  }
}
