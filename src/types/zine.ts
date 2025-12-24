// Localized string for multi-language support
export interface LocalizedString {
  en: string;
  pt: string;
  [key: string]: string;
}

// Image specification for AI generation or sourcing
export interface ImageSpec {
  description: LocalizedString;
  alt_text: LocalizedString;
  suggested_style: string;
  asset_path?: string;
}

// Mood types for atmospheric styling
export type Mood = 
  | "peaceful" 
  | "contemplative" 
  | "urgent" 
  | "mysterious" 
  | "hopeful" 
  | "dark" 
  | "transitional" 
  | "revelatory";

// Layout types for scene blocks
export type Layout = 
  | "full_bleed" 
  | "split_horizontal" 
  | "split_vertical" 
  | "text_over_image" 
  | "image_over_text" 
  | "sidebar" 
  | "centered";

// Speaker types for dialogue
export type Speaker = "human" | "black_box" | "narrator";

// Quote styles
export type QuoteStyle = "centered" | "handwritten" | "pullquote";

// Pause types for transitions
export type PauseType = "scene_break" | "time_passing" | "mood_shift";

// Visualization types
export type VisualizationType = 
  | "timeline" 
  | "comparison" 
  | "scale" 
  | "map" 
  | "diagram" 
  | "icons";

// Block type definitions
export interface CoverBlock {
  type: "cover";
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  series_title: LocalizedString;
  issue_number: number;
  issue_label: LocalizedString;
  image: ImageSpec;
  mood: Mood;
}

export interface SceneBlock {
  type: "scene";
  id: string;
  image: ImageSpec;
  narrative?: LocalizedString;
  mood: Mood;
  layout: Layout;
}

export interface DialogueBlock {
  type: "dialogue";
  id: string;
  speaker: Speaker;
  speech: LocalizedString;
  context?: LocalizedString;
}

export interface PromptBlock {
  type: "prompt_block";
  id: string;
  prompt_text: LocalizedString;
  context?: LocalizedString;
}

export interface TimelineSegment {
  label: LocalizedString;
  sublabel: LocalizedString;
  proportion: number;
  color: string;
  visual_style: string;
}

export interface TimelineBlock {
  type: "timeline";
  id: string;
  segments: TimelineSegment[];
  caption: LocalizedString;
}

export interface QuoteBlock {
  type: "quote";
  id: string;
  quote_text: LocalizedString;
  attribution?: LocalizedString;
  style: QuoteStyle;
}

export interface QuestionsBlock {
  type: "questions";
  id: string;
  intro_text?: LocalizedString;
  questions: LocalizedString[];
}

export interface TransitionBlock {
  type: "transition";
  id: string;
  symbol?: string;
  pause_type: PauseType;
}

export interface ZineListItem {
  number: number;
  title: LocalizedString;
  subtitle: LocalizedString;
  status: "current" | "upcoming" | "available";
}

export interface SeriesListBlock {
  type: "series_list";
  id: string;
  series_title: LocalizedString;
  current_issue: number;
  zines: ZineListItem[];
}

export interface ColophonBlock {
  type: "colophon";
  id: string;
  permissions: LocalizedString;
  credits?: LocalizedString;
  call_to_action: LocalizedString;
}

export interface VisualDataBlock {
  type: "visual_data";
  id: string;
  visualization_type: VisualizationType;
  data: unknown;
  caption: LocalizedString;
  source?: LocalizedString;
}

// Union type for all blocks
export type Block = 
  | CoverBlock 
  | SceneBlock 
  | DialogueBlock 
  | PromptBlock 
  | TimelineBlock 
  | QuoteBlock 
  | QuestionsBlock 
  | TransitionBlock 
  | SeriesListBlock 
  | ColophonBlock 
  | VisualDataBlock;

// Page container
export interface Page {
  page_number: number;
  page_type: "cover" | "content" | "back_cover";
  page_title?: LocalizedString;
  blocks: Block[];
}

// Complete zine structure
export interface Zine {
  id: string;
  slug: string;
  metadata: {
    title: LocalizedString;
    subtitle: LocalizedString;
    series_title: LocalizedString;
    issue_number: number;
    created_at: string;
    updated_at: string;
    languages: string[];
    status: "draft" | "published";
    summary?: LocalizedString;
  };
  pages: Page[];
}

// Speaker configuration
export interface SpeakerConfig {
  id: Speaker;
  symbol: string | null;
  display_name: LocalizedString;
}

export const speakers: Record<Speaker, SpeakerConfig> = {
  human: {
    id: "human",
    symbol: "○",
    display_name: { en: "THE HUMAN", pt: "O HUMANO" },
  },
  black_box: {
    id: "black_box",
    symbol: "■",
    display_name: { en: "THE BLACK BOX", pt: "A CAIXA PRETA" },
  },
  narrator: {
    id: "narrator",
    symbol: null,
    display_name: { en: "", pt: "" },
  },
};

// Language type
export type Language = "en" | "pt";
