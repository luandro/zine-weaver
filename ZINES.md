# Zine Authoring Guide

Zine Weaver uses a structured JSON approach to define content. Zines are stored as JSON files, making it easy to add content without modifying the source code.

## Where Zines Live
- **Content**: `public/zines/` (JSON files)
- **Assets**: `public/assets/zines/` (Images, etc.)

## Adding a New Zine
1. Create a new JSON file in `public/zines/` (e.g., `my-new-zine.json`).
2. Follow the structure below.
3. Run `npm run sync-zines` (or just start the dev server with `npm run dev`).

The `sync-zines` script automatically scans `public/zines/`, validates the files, and registers them in the application.

## Multi-language Support
All text fields use the `LocalizedString` format:
```json
{
  "en": "Hello",
  "pt": "Olá"
}
```

## Image Assets
When referencing images in your JSON, use the path relative to the `public` folder:
```json
"image": {
  "description": { "en": "...", "pt": "..." },
  "alt_text": { "en": "...", "pt": "..." },
  "suggested_style": "atmospheric",
  "asset_path": "/assets/zines/my-image.jpg"
}
```

## Structure of a Zine
(Refer to `src/types/zine.ts` for full Type definitions if needed)

### Metadata
- `id`: Unique ID (e.g., `zine_002`).
- `slug`: URL name (e.g., `my-zine`).
- `metadata`: Title, subtitle, issue number, etc.

### Pages & Blocks
Each page contains an array of blocks like `cover`, `scene`, `dialogue`, `prompt_block`, `quote`, etc.
