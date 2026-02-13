# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dutch School Nairobi website - a bilingual (Dutch/English) static website built with Next.js 16 and deployed to Azure Static Web Apps.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build static export to /out directory
npm run lint     # Run ESLint
```

## Architecture

### Internationalization (next-intl)

- **Default locale:** Dutch (`nl`)
- **Supported locales:** `nl`, `en`
- **URL structure:** `/nl/...` and `/en/...` (locale prefix always shown)
- **Translation files:** `messages/nl.json` and `messages/en.json`
- **Configuration:** `src/i18n/routing.ts` defines locales, `src/i18n/request.ts` loads messages

### Routing Structure

```
src/app/
├── layout.tsx              # Root layout (html/body tags)
├── page.tsx                # Root redirect to /nl/
└── [locale]/
    ├── layout.tsx          # Locale layout with Header/Footer + NextIntlClientProvider
    ├── page.tsx            # Homepage
    ├── about/page.tsx
    ├── programs/page.tsx
    ├── enrollment/page.tsx
    └── contact/page.tsx
```

### Key Patterns

- **Static export:** Site is exported as static HTML (`output: 'export'` in next.config.ts)
- **Client components:** Components using hooks (useState, useTranslations) must have `'use client'` directive
- **Server components:** Page components use `setRequestLocale(locale)` for static generation
- **Navigation:** Use `Link` from `@/i18n/navigation` instead of `next/link` for locale-aware routing

### Styling

- Tailwind CSS v4 with CSS-based configuration in `src/app/globals.css`
- Custom color variables: `--primary-green`, `--secondary` (orange), `--accent` (blue)
- Icons from `lucide-react`

### Deployment

- Deployed to Azure Static Web Apps (Free tier)
- GitHub Actions workflow in `.github/workflows/ci-cd.yml`
- Azure config in `staticwebapp.config.json` (handles redirects and headers)
- Infrastructure-as-code in `infra/main.bicep`

## Adding Content

To update text content, edit the translation files:
- `messages/nl.json` - Dutch content
- `messages/en.json` - English content

Both files must have identical keys structure.
