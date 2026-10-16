# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dutch School Nairobi website - a bilingual (Dutch/English) static website built with Next.js 16 and deployed to Firebase Hosting on GCP (project `dutchschoolke`).

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
├── layout.tsx              # Root layout (passes children only)
├── page.tsx                # Root redirect to /nl/
└── [locale]/
    ├── layout.tsx          # Locale layout with html/body, Header/Footer, NextIntlClientProvider
    ├── page.tsx            # Homepage
    ├── about/page.tsx
    ├── programs/page.tsx
    ├── enrollment/page.tsx
    └── contact/
        ├── layout.tsx      # Contact page metadata
        └── page.tsx
```

### Reusable Components

```
src/components/
├── ui/
│   ├── PageHero.tsx        # Consistent page headers
│   ├── PageCTA.tsx         # Call-to-action sections
│   ├── FeatureCard.tsx     # Feature cards with color variants
│   └── index.ts            # Barrel export
├── Header.tsx
├── Footer.tsx
└── LanguageSwitcher.tsx
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

### SEO & Structured Data

- **Schema.org JSON-LD** on all pages (EducationalOrganization, FAQPage, AboutPage, etc.)
- **FAQ Schema** on homepage and enrollment page for rich search results
- **Sitemap** at `public/sitemap.xml` with hreflang alternates
- **robots.txt** at `public/robots.txt` allowing AI crawlers (GPTBot, PerplexityBot, etc.)
- **Metadata** via `generateMetadata()` in page/layout files with OpenGraph and Twitter cards

### Deployment

- Deployed to Firebase Hosting (free tier); `/api/**` is rewritten to the Cloud Run function `dutch-school-api` in `us-central1`
- GitHub Actions workflow in `.github/workflows/ci-cd.yml`, signing in with Workload Identity Federation
- Hosting config in `firebase.json` (the `/` → `/nl/` redirect, the `/api` rewrite and security headers)
- Security headers: CSP, X-Frame-Options, X-XSS-Protection, Permissions-Policy
- `api/index.js` routes requests to the handlers in `api/handlers/`, which take a Web-standard `Request` and return `{ status, jsonBody }`
- One-time project setup in `infra/gcp-setup.sh`; see README § Deployment

## Adding Content

To update text content, edit the translation files:
- `messages/nl.json` - Dutch content
- `messages/en.json` - English content

Both files must have identical keys structure.
