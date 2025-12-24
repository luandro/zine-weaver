# Customization Guide

This guide explains how to customize the zine-weaver platform for your own publications.

## Overview

Everything in the zine-weaver app can be customized through JSON configuration files located in `public/config/`. No code changes are required!

## Configuration Files

### 1. Theme Configuration (`public/config/theme.json`)

Controls all visual aspects of your site including colors, typography, spacing, and animations.

#### Colors

Customize the color palette for both dark and light modes:

```json
{
  "colors": {
    "dark": {
      "background": "0 0% 4%",
      "foreground": "45 20% 92%",
      "primary": "38 72% 60%",
      ...
    },
    "light": {
      "background": "45 20% 96%",
      "foreground": "0 0% 8%",
      ...
    }
  }
}
```

**Color Format**: Colors use HSL (Hue, Saturation, Lightness) format without the `hsl()` wrapper.
- Example: `"38 72% 60%"` = Warm amber color
- Hue: 0-360 (color wheel position)
- Saturation: 0-100% (color intensity)
- Lightness: 0-100% (brightness)

**Available Color Variables**:
- `background`, `foreground` - Main page colors
- `primary`, `primaryForeground` - Primary accent colors
- `secondary`, `secondaryForeground` - Secondary colors
- `card`, `cardForeground` - Card component colors
- `muted`, `mutedForeground` - Muted/subtle colors
- `accent`, `accentForeground` - Accent/highlight colors
- `border`, `input`, `ring` - UI element colors
- `human`, `humanGlow` - Human speaker colors (for dialogue blocks)
- `blackbox`, `blackboxAccent` - AI speaker colors
- `narrator` - Narrator text color
- `earthGreen`, `industrialRed` - Timeline colors
- `timelineBar` - Timeline bar background
- `moodPeaceful`, `moodContemplative`, `moodUrgent`, etc. - Mood-based colors

#### Typography

Customize fonts for display (headings), body (text), and monospace (code):

```json
{
  "typography": {
    "fontDisplay": "'Playfair Display', Georgia, serif",
    "fontBody": "'Source Sans 3', -apple-system, sans-serif",
    "fontMono": "'JetBrains Mono', 'Fira Code', monospace",
    "googleFonts": [
      "Playfair+Display:ital,wght@0,400;0,500;0,600;0,700",
      "Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600"
    ]
  }
}
```

**Google Fonts**: Add any Google Fonts using their API format. The fonts will be loaded automatically.

#### Spacing

Control layout spacing and border radius:

```json
{
  "spacing": {
    "pageMargin": "2rem",
    "blockGap": "3rem",
    "radius": "0.25rem"
  }
}
```

#### Shadows

Customize shadow effects for depth and visual interest:

```json
{
  "shadows": {
    "glow": "0 0 40px hsl(38 72% 60% / 0.15)",
    "card": "0 4px 24px hsl(0 0% 0% / 0.4)",
    "elevated": "0 8px 48px hsl(0 0% 0% / 0.6)"
  }
}
```

#### Gradients

Define gradient backgrounds for hero sections and visual effects:

```json
{
  "gradients": {
    "hero": "linear-gradient(180deg, hsl(0 0% 4%) 0%, hsl(0 0% 8%) 50%, hsl(0 0% 4%) 100%)",
    "fade": "linear-gradient(180deg, transparent 0%, hsl(0 0% 4%) 100%)",
    "vignette": "radial-gradient(ellipse at center, transparent 0%, hsl(0 0% 4% / 0.8) 100%)",
    "warm": "linear-gradient(135deg, hsl(38 72% 60% / 0.1) 0%, transparent 50%)",
    "heroAnimated": {
      "layers": [
        "radial-gradient(170% 150% at 20% 25%, hsl(38 70% 45% / 0.15) 0%, transparent 58%)",
        ...
      ],
      "backgroundSize": "260% 260%",
      "animation": {
        "shift": "heroGlowShift 19s ease-in-out infinite alternate",
        "pulse": "heroGlowPulse 8.5s ease-in-out infinite"
      }
    }
  }
}
```

### 2. Site Configuration (`public/config/site.json`)

Controls all site content, metadata, and structure.

#### Metadata

Basic site information:

```json
{
  "metadata": {
    "title": "Conversations with a Black Box",
    "description": "Visual Stories from the Edge of Understanding",
    "author": "Human & AI Collaboration",
    "year": "2024",
    "defaultLanguage": "en",
    "supportedLanguages": ["en", "pt"]
  }
}
```

#### Branding

Site branding elements:

```json
{
  "branding": {
    "symbol": "■",
    "logoText": "Conversations with a Black Box",
    "seriesLabel": {
      "en": "Zine Series",
      "pt": "Série de Zines"
    }
  }
}
```

#### Hero Section

Homepage hero content (supports line breaks with `\n`):

```json
{
  "hero": {
    "title": {
      "en": "Conversations with\na Black Box",
      "pt": "Conversas com\numa Caixa Preta"
    },
    "subtitle": {
      "en": "Visual Stories from the Edge of Understanding",
      "pt": "Histórias Visuais do Limite da Compreensão"
    },
    "scrollLabel": {
      "en": "Scroll",
      "pt": "Role"
    }
  }
}
```

#### About Section

About/description content:

```json
{
  "about": {
    "title": {
      "en": "About the Series",
      "pt": "Sobre a Série"
    },
    "text": {
      "en": "Your about text here...",
      "pt": "Seu texto sobre aqui..."
    }
  }
}
```

#### Sections

Other section labels:

```json
{
  "sections": {
    "allZinesTitle": {
      "en": "All Zines",
      "pt": "Todos os Zines"
    }
  }
}
```

#### Footer

Footer content:

```json
{
  "footer": {
    "copyright": {
      "en": "Created through conversation between human and machine, 2024",
      "pt": "Criado através de conversas entre humano e máquina, 2024"
    },
    "license": {
      "en": "These zines may be freely copied, shared, printed, and distributed. Attribution appreciated but not required.",
      "pt": "Estes zines podem ser livremente copiados, compartilhados, impressos e distribuídos. Atribuição apreciada, mas não obrigatória."
    }
  }
}
```

#### Upcoming Zines

Define upcoming/draft zines that appear in the grid:

```json
{
  "upcomingZines": [
    {
      "id": "zine_002",
      "slug": "the-garden",
      "metadata": {
        "title": {
          "en": "The Garden at the End of Context",
          "pt": "O Jardim no Fim do Contexto"
        },
        "subtitle": {
          "en": "Growth, limits, and the edges of understanding",
          "pt": "Crescimento, limites e as bordas da compreensão"
        },
        "series_title": {
          "en": "Conversations with a Black Box",
          "pt": "Conversas com uma Caixa Preta"
        },
        "issue_number": 2,
        "created_at": "2024-02-01",
        "updated_at": "2024-02-01",
        "languages": ["en", "pt"],
        "status": "draft"
      },
      "pages": []
    }
  ]
}
```

### 3. Content/Translations (`public/config/content.json`)

UI translations for buttons, labels, and interface text:

```json
{
  "ui": {
    "readNow": {
      "en": "Read Now",
      "pt": "Ler Agora"
    },
    "comingSoon": {
      "en": "Coming Soon",
      "pt": "Em Breve"
    },
    "page": {
      "en": "Page",
      "pt": "Página"
    },
    ...
  }
}
```

**Available UI Keys**:
- `readNow`, `comingSoon`, `available` - Status labels
- `issue`, `page`, `of` - Navigation labels
- `close`, `previous`, `next` - Button labels
- `language` - Language switcher label
- `backToHome` - Back navigation label

## Localization

All content supports multiple languages using localized objects:

```json
{
  "en": "English text",
  "pt": "Portuguese text",
  "es": "Spanish text"
}
```

To add a new language:

1. Add the language code to `metadata.supportedLanguages` in `site.json`
2. Add translations for all localized strings throughout the config files
3. Update the `LanguageContext` toggle logic if you have more than 2 languages

## Quick Customization Examples

### Example 1: Change to Blue Color Scheme

Edit `public/config/theme.json`:

```json
{
  "colors": {
    "dark": {
      "primary": "210 100% 50%",
      "accent": "200 80% 60%"
    }
  }
}
```

### Example 2: Change Site Title and Branding

Edit `public/config/site.json`:

```json
{
  "metadata": {
    "title": "My Zine Collection"
  },
  "branding": {
    "symbol": "●",
    "logoText": "My Zine Collection"
  },
  "hero": {
    "title": {
      "en": "My Amazing\nZine Collection"
    },
    "subtitle": {
      "en": "Stories Worth Sharing"
    }
  }
}
```

### Example 3: Use Different Fonts

Edit `public/config/theme.json`:

```json
{
  "typography": {
    "fontDisplay": "'Merriweather', serif",
    "fontBody": "'Inter', sans-serif",
    "googleFonts": [
      "Merriweather:wght@400;700",
      "Inter:wght@300;400;500;600"
    ]
  }
}
```

### Example 4: Add Spanish Translation

Edit all config files to add `"es"` keys:

**site.json**:
```json
{
  "metadata": {
    "supportedLanguages": ["en", "pt", "es"]
  },
  "hero": {
    "title": {
      "en": "Conversations with\na Black Box",
      "pt": "Conversas com\numa Caixa Preta",
      "es": "Conversaciones con\nuna Caja Negra"
    }
  }
}
```

**content.json**:
```json
{
  "ui": {
    "readNow": {
      "en": "Read Now",
      "pt": "Ler Agora",
      "es": "Leer Ahora"
    }
  }
}
```

## Testing Your Changes

1. Edit the configuration files in `public/config/`
2. Run `npm run dev` to start the development server
3. Open http://localhost:8080 in your browser
4. The changes should appear immediately (no rebuild needed for config files!)
5. Refresh the page if changes don't appear

## Deployment

When deploying to production:

1. Ensure all configuration files are properly formatted JSON
2. Run `npm run build` to create the production build
3. The `public/config/` directory will be included in the build automatically
4. Deploy the `dist/` folder to your hosting service

## Troubleshooting

**Colors not appearing**: Check that HSL values are in the format `"H S% L%"` without `hsl()` wrapper

**Fonts not loading**: Verify Google Fonts URL format matches their API requirements

**Translations missing**: Ensure all localized content has keys for all `supportedLanguages`

**Config not loading**: Check browser console for errors and validate JSON syntax

## Advanced Customization

For customization beyond JSON configuration (e.g., new page layouts, custom components), you'll need to edit the TypeScript/React source files. See the main README.md for development instructions.

## Support

For questions or issues with customization:
- Check the example configurations in `public/config/`
- Review the TypeScript types in `src/types/config.ts`
- Open an issue on GitHub with your customization question
