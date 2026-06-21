# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Stack

- Next.js 16 (App Router), React 19, TypeScript 5, Tailwind v4
- velite 0.4.0 — MDX content pipeline (outputs to `.velite/`)
- Deployed on Vercel

## Commands

- `npm run dev` — runs `velite --watch & next dev` concurrently
- `npm run build` — runs `velite build && next build` (velite must run first)
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`

## velite Gotchas

- `s.path()` returns `"posts/hello-world"` format — use `slugify()` in `src/lib/posts.ts` to convert to URL slug
- MDX body rendering: pass `body.code` with JSX runtime via `arguments[0]`
- `.velite/` is auto-generated — never edit manually; path alias is `@/.velite`
- Running `next build` without `velite build` first will fail (missing `.velite/`)

## Tailwind v4

No `tailwind.config` file — configuration is done directly in CSS (`src/app/globals.css`).

## Code Style

- Prettier with `prettier-plugin-tailwindcss` (default config)
- ESLint: `next/core-web-vitals` + `next/typescript`
- TypeScript strict mode; path alias `@/*` → `src/*`

## Conventions

- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)
- MDX post files: `YYYY-MM-DD-kebab-case.mdx` under `content/posts/` (date prefix is stripped from URL slug automatically)
