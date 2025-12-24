# Configuration Directory

This directory contains JSON configuration files that control all customizable aspects of the zine-weaver platform.

## Configuration Files

### theme.json
Controls all visual aspects including:
- Color palette (dark and light modes)
- Typography (fonts and Google Fonts integration)
- Spacing and layout
- Shadows and visual effects
- Gradients and animations

### site.json
Controls site content and structure:
- Site metadata (title, author, languages)
- Branding (symbol, logo text)
- Hero section content
- About section
- Footer content
- Upcoming/draft zines

### content.json
UI translations and labels:
- Button labels
- Navigation text
- Status indicators
- All user-facing interface text

## Quick Start

1. Edit any JSON file to customize your site
2. Save changes
3. Refresh your browser (no rebuild needed in dev mode!)
4. See changes immediately

## Documentation

See `/CUSTOMIZATION.md` in the project root for complete customization guide with examples.

## Format

All configuration files use standard JSON format:
- Colors: HSL format `"H S% L%"` (e.g., `"38 72% 60%"`)
- Translations: Objects with language codes (e.g., `{"en": "Text", "pt": "Texto"}`)
- Fonts: CSS font-family strings

## Validation

The TypeScript types for these configurations are defined in `src/types/config.ts`.

Run `npm run typecheck` to validate your changes are compatible with the app.
