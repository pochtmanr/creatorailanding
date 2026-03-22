# Landing — Claude Code Instructions

This is the CreatorAI marketing site. See root `CLAUDE.md` for project-wide rules.

## Key Rules

- Server Components only. No `'use client'` unless strictly required for interactivity (e.g., form state, animations requiring useEffect).
- Next.js 16: all request APIs are async (`await cookies()`, `await headers()`).
- Tailwind CSS v4 with custom theme tokens in `globals.css`. Use the token names (e.g., `bg-surface`, `text-on-surface`, `text-primary-container`), not raw hex values.
- Fonts: `font-sans` = Inter, `font-headline` = Space Grotesk. Set via CSS variables in layout.tsx.
- Dark mode is the default and only theme.

## File Locations

| What | Where |
|------|-------|
| Root layout | `src/app/layout.tsx` |
| Home page | `src/app/page.tsx` |
| Design tokens | `src/app/globals.css` |
| Next.js config | `next.config.ts` |

@AGENTS.md
