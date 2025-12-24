# Zine Weaver

Zine Weaver is a specialized Vite + React platform for publishing and reading serialized digital zines. Its primary showcase is the collection **"Conversations with a Black Box"**, featuring visual stories that explore memory, consciousness, and the intersection of human and machine intelligence.

## 🚀 Key Features

- **Digital Zine Reader**: A responsive, immersive reading experience designed for visual storytelling.
- **JSON-Driven Content**: Author zines using simple JSON files without touching source code.
- **Multi-language Support**: Native support for English (EN) and Portuguese (PT) across all content.
- **Automated Syncing**: A custom script automatically discovers, validates, and registers new zines.
- **Offline Ready**: Automatic prefetching of zine assets for a resilient offline experience.
- **Themed Layout Blocks**: Specialized rendering components for covers, scenes, dialogues, timelines, and more.
- **Modern UI/UX**: Built with shadcn/ui, Tailwind CSS, and custom atmospheric styling (including curved floating scrollbars).

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Routing**: React Router 6
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: TanStack Query
- **Utilities**: ESLint, PostCSS, Husky (pre-commit hooks)

## 📁 Project Structure

- `public/zines/`: Source JSON files for all zines.
- `public/assets/zines/`: Image and media assets referenced by zines.
- `scripts/`: Automation scripts (e.g., `sync-zines.mjs`).
- `src/components/blocks/`: Individual layout block renderers (Cover, Scene, Dialogue, etc.).
- `src/components/layout/`: Core UI components (Navigation, ZineReader, LanguageSwitcher).
- `src/data/zines/`: The auto-generated registry of zines (generated from `public/zines`).
- `src/pages/`: Route-level screens (Index, ZineReadPage).
- `src/types/`: TypeScript definitions for the zine schema and application state.

## 📖 Authoring Zines

Adding content to Zine Weaver is designed to be developer-friendly:

1.  **Create Content**: Place a new `.json` file in `public/zines/`.
2.  **Add Assets**: Put any images in `public/assets/zines/`.
3.  **Sync**: Run `npm run dev` or `npm run sync-zines`.

For a deep dive into the JSON schema and block types, see [ZINES.md](./ZINES.md).

## ⚡ Scripts

- `npm run dev`: Start the dev server (automatically runs `sync-zines`).
- `npm run build`: Production build (automatically runs `sync-zines`).
- `npm run sync-zines`: Manually regenerate the zine registry from JSON files.
- `npm run typecheck`: Run TypeScript validation across the codebase.
- `npm run lint`: Run ESLint checks.
- `npm run preview`: Preview the production build locally.

## 🌐 Deployment

The project is configured for **GitHub Pages** deployment via GitHub Actions (`.github/workflows/deploy.yml`).

- Pushing to the `main` branch triggers an automatic build and deploy.
- The base URL is configured via `VITE_BASE_URL` in the workflow.

## 🤝 Contributing

When adding new features:
1.  **UI/UX**: Mimic the existing "floating card" and atmospheric aesthetic.
2.  **Typography**: Use the established `font-display` and `font-mono` classes.
3.  **Code Quality**: Ensure `npm run typecheck` passes before committing.