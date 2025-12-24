# Zine Weaver

Zine Weaver is a Vite + React site for publishing a serialized zine collection ("Conversations with a Black Box"). It renders issue metadata and page blocks from structured TypeScript data and presents a reading view with language toggling and themed layout blocks.

## Tech Stack
- Vite, React 18, TypeScript
- React Router for routing
- Tailwind CSS + shadcn/ui components
- TanStack Query for data/client state

## Quick Start
```sh
npm install
npm run dev
```
Open the local URL printed by Vite (typically `http://localhost:5173`).

## Scripts
- `npm run dev`: start the dev server with HMR.
- `npm run build`: production build to `dist/`.
- `npm run build:dev`: development-mode build.
- `npm run preview`: preview the production build locally.
- `npm run lint`: run ESLint.
- `npm run typecheck`: run TypeScript checks for app + node configs.

## Project Structure
- `src/pages`: route-level screens (`Index.tsx`, `ZineReadPage.tsx`).
- `src/components`: shared UI, with shadcn primitives in `src/components/ui`.
- `src/data/zines`: zine content data (currently `sample-zine.ts`).
- `src/types`: domain types (see `src/types/zine.ts`).
- `public/`: static assets; `dist/` is build output.

## Adding or Editing Zines
Detailed documentation on how to structure and add new zines can be found in [ZINES.md](./ZINES.md).

- New zines should be added as separate files in `src/data/zines/`.
- Register them in `src/data/zines/index.ts` (exporting them via `allZines`).
- Each `Zine` includes metadata, languages, and a `pages` array with `blocks`.
- Keep slugs unique, and ensure `page_number` is sequential for reader navigation.

## Deployment (GitHub Pages)
- Deploys on pushes to `main` via `.github/workflows/deploy.yml`.
- The workflow sets `VITE_BASE_URL=/zine-weaver/` for the site base path.
- If the repo name changes, update the base URL in the workflow.

## Configuration Notes
- Routing uses `import.meta.env.BASE_URL` in `src/App.tsx` for the basename.
- Tailwind styles are defined in `src/index.css` and configured in `tailwind.config.ts`.
