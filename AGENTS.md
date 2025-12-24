# Repository Guidelines

## Project Structure & Module Organization
- `index.html` and `src/main.tsx` bootstrap the Vite app; `src/App.tsx` wires routing and providers.
- Route-level screens live in `src/pages` (e.g., `Index.tsx`, `ZineReadPage.tsx`).
- Reusable UI lives in `src/components`, with shadcn primitives in `src/components/ui` plus `layout`/`blocks`/shared components.
- App data and utilities are organized under `src/data`, `src/hooks`, `src/contexts`, `src/lib`, and `src/types`.
- Static assets go in `public/`; production output is generated in `dist/`.

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server with HMR.
- `npm run build`: production build to `dist/`.
- `npm run build:dev`: dev-mode build (useful for debugging build-only issues).
- `npm run preview`: serve the production build locally.
- `npm run lint`: run ESLint across the repo.
- `npm run typecheck`: run TypeScript checks for app + node configs.

## Coding Style & Naming Conventions
- TypeScript + React with 2-space indentation, semicolons, and double quotes (match existing files).
- Components use PascalCase filenames (e.g., `ZineCard.tsx`); hooks use `useX` naming.
- Prefer the `@/` alias for imports from `src/` (configured in `tsconfig.json`).
- ESLint is configured in `eslint.config.js`; pre-commit runs `npm run typecheck` and `npx lint-staged`.

## Content Authoring Notes
- Zine content lives in `src/data/zines`; new entries should be added to `allZines`.
- Keep `slug` values unique and `page_number` values sequential so reader navigation stays stable.
- Types for content live in `src/types` (see `src/types/zine.ts`).

## Testing Guidelines
- No test framework is currently configured. Rely on `npm run typecheck` and `npm run lint` for baseline validation.
- If you introduce automated tests, add a script in `package.json` and document the location and naming pattern.

## Commit & Pull Request Guidelines
- Recent commits are short and descriptive, sometimes prefixed with a scope like `ci:` or `template:`. Follow that style when it fits.
- For PRs, include a brief summary, list the commands you ran, and add screenshots for UI changes. Link related issues when available.

## Deployment & Configuration Notes
- GitHub Pages deploys on pushes to `main` via `.github/workflows/deploy.yml` and builds with `VITE_BASE_URL=/zine-weaver/`.
- If the repo name or Pages base path changes, update the workflow and any base URL usage.

## Agent-Specific Instructions
- `CLAUDE.md` and `GEMINI.md` both reference this file. Keep it current when project conventions change.
