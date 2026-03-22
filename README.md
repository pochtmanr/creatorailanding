# CreatorAI Landing

Marketing website for the CreatorAI video generation platform.

## Stack

- Next.js 16 (App Router, Server Components)
- React 19
- Tailwind CSS v4
- TypeScript (strict)

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

Deployed to Vercel. Push to `main` triggers production deploy.

## Structure

```
src/app/
├── layout.tsx      Root layout (fonts, metadata)
├── page.tsx        Home page (hero, features, pricing, CTA)
├── globals.css     Tailwind config + design tokens
└── favicon.ico
```

## Design System

Uses Material Design 3 color tokens defined in `globals.css`:
- Dark theme by default
- Custom animations: gradient-flow, drift, pulse-glow, reveal
- Glass panel effects
- Fonts: Inter (body), Space Grotesk (headlines)
