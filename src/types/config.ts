import { LocalizedString } from "./zine";

// Theme Configuration Types
export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
  human: string;
  humanGlow: string;
  blackbox: string;
  blackboxAccent: string;
  narrator: string;
  earthGreen: string;
  industrialRed: string;
  timelineBar: string;
  moodPeaceful: string;
  moodContemplative: string;
  moodUrgent: string;
  moodMysterious: string;
  moodHopeful: string;
  moodDark: string;
  moodTransitional: string;
  moodRevelatory: string;
  sidebarBackground: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}

export interface LightThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  ring: string;
  human: string;
  blackbox: string;
  blackboxAccent: string;
  narrator: string;
}

export interface HighContrastColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  ring: string;
  human: string;
  blackbox: string;
  blackboxAccent: string;
  narrator: string;
}

export interface Typography {
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  googleFonts: string[];
}

export interface Spacing {
  pageMargin: string;
  blockGap: string;
  radius: string;
}

export interface Shadows {
  glow: string;
  card: string;
  elevated: string;
}

export interface GradientAnimation {
  shift: string;
  pulse: string;
}

export interface AnimatedGradient {
  layers: string[];
  backgroundSize: string;
  animation: GradientAnimation;
}

export interface Gradients {
  hero: string;
  fade: string;
  vignette: string;
  warm: string;
  heroAnimated: AnimatedGradient;
}

export interface ThemeConfig {
  colors: {
    dark: ThemeColors;
    light: LightThemeColors;
    highContrast?: HighContrastColors;
  };
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
  gradients: Gradients;
}

// Site Configuration Types
export interface SiteMetadata {
  title: string;
  description: string;
  author: string;
  year: string;
  defaultLanguage: string;
  supportedLanguages: string[];
}

export interface Branding {
  symbol: string;
  logoText: LocalizedString;
  seriesLabel: LocalizedString;
}

export interface HeroSection {
  title: LocalizedString;
  subtitle: LocalizedString;
  scrollLabel: LocalizedString;
}

export interface AboutSection {
  title: LocalizedString;
  text: LocalizedString;
}

export interface Sections {
  allZinesTitle: LocalizedString;
}

export interface Footer {
  copyright: LocalizedString;
  license: LocalizedString;
}

export interface UpcomingZineMetadata {
  title: LocalizedString;
  subtitle: LocalizedString;
  series_title: LocalizedString;
  issue_number: number;
  created_at: string;
  updated_at: string;
  languages: string[];
  status: string;
}

export interface UpcomingZine {
  id: string;
  slug: string;
  metadata: UpcomingZineMetadata;
  pages: unknown[];
}

export interface SiteConfig {
  metadata: SiteMetadata;
  branding: Branding;
  hero: HeroSection;
  about: AboutSection;
  sections: Sections;
  footer: Footer;
  upcomingZines: UpcomingZine[];
}

// Content Configuration Types
export interface UITranslations {
  [key: string]: LocalizedString;
}

export interface ContentConfig {
  ui: UITranslations;
}

// Configuration Loading State
export interface ConfigState {
  theme: ThemeConfig | null;
  site: SiteConfig | null;
  content: ContentConfig | null;
  loading: boolean;
  error: Error | null;
}
