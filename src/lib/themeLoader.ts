import type { ThemeConfig } from "@/types/config";

/**
 * Apply theme configuration to CSS custom properties
 */
export function applyThemeConfig(theme: ThemeConfig): void {
  const root = document.documentElement;

  // Apply dark mode colors (default)
  Object.entries(theme.colors.dark).forEach(([key, value]) => {
    const cssVarName = `--${camelToKebab(key)}`;
    root.style.setProperty(cssVarName, value);
  });

  // Apply typography
  root.style.setProperty("--font-display", theme.typography.fontDisplay);
  root.style.setProperty("--font-body", theme.typography.fontBody);
  root.style.setProperty("--font-mono", theme.typography.fontMono);

  // Load Google Fonts if specified
  if (theme.typography.googleFonts && theme.typography.googleFonts.length > 0) {
    loadGoogleFonts(theme.typography.googleFonts);
  }

  // Apply spacing
  root.style.setProperty("--page-margin", theme.spacing.pageMargin);
  root.style.setProperty("--block-gap", theme.spacing.blockGap);
  root.style.setProperty("--radius", theme.spacing.radius);

  // Apply shadows
  root.style.setProperty("--shadow-glow", theme.shadows.glow);
  root.style.setProperty("--shadow-card", theme.shadows.card);
  root.style.setProperty("--shadow-elevated", theme.shadows.elevated);

  // Apply gradients
  root.style.setProperty("--gradient-hero", theme.gradients.hero);
  root.style.setProperty("--gradient-fade", theme.gradients.fade);
  root.style.setProperty("--gradient-vignette", theme.gradients.vignette);
  root.style.setProperty("--gradient-warm", theme.gradients.warm);
}

/**
 * Convert camelCase to kebab-case for CSS variable names
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Load Google Fonts dynamically
 */
function loadGoogleFonts(fonts: string[]): void {
  // Check if fonts are already loaded
  const existingLink = document.querySelector('link[data-google-fonts]');
  if (existingLink) {
    existingLink.remove();
  }

  // Create new font link
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.setAttribute("data-google-fonts", "true");

  const fontParams = fonts.join("&family=");
  link.href = `https://fonts.googleapis.com/css2?family=${fontParams}&display=swap`;

  document.head.appendChild(link);
}

/**
 * Create a CSS style element for light mode overrides
 */
export function createLightModeStyles(theme: ThemeConfig): void {
  // Remove existing light mode styles if any
  const existingStyle = document.querySelector('style[data-light-mode]');
  if (existingStyle) {
    existingStyle.remove();
  }

  // Create CSS for light mode
  const lightModeCSS = `.light {
${Object.entries(theme.colors.light)
  .map(([key, value]) => `  --${camelToKebab(key)}: ${value};`)
  .join("\n")}
}`;

  const style = document.createElement("style");
  style.setAttribute("data-light-mode", "true");
  style.textContent = lightModeCSS;
  document.head.appendChild(style);
}

/**
 * Initialize theme from configuration
 */
export function initializeTheme(theme: ThemeConfig): void {
  applyThemeConfig(theme);
  createLightModeStyles(theme);
}
