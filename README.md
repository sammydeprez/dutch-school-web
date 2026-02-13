<p align="center">
  <img src="public/logo.png" alt="Dutch School Nairobi" width="200">
</p>

<h1 align="center">Dutch School Nairobi</h1>

<p align="center">
  Bilingual Dutch-English education in the heart of Nairobi since 1971
</p>

<p align="center">
  <a href="https://brave-meadow-005dea503.4.azurestaticapps.net">View Live Site</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#development">Development</a>
</p>

---

## About

The official website for Dutch School Nairobi (Netherlands School Society), offering bilingual Dutch and English education for children ages 1½-18 in Kenya. Recognized by the Dutch Education Abroad Foundation (Stichting NOB).

## Features

- 🌍 **Bilingual** - Full Dutch and English language support
- 📱 **Responsive** - Mobile-first design
- ⚡ **Fast** - Static site generation for optimal performance
- 🔍 **SEO Optimized** - Schema.org structured data, meta tags, sitemap, hreflang
- 🤖 **AI Search Ready** - FAQ schema, question-based content for ChatGPT/Perplexity
- 🔒 **Secure** - CSP, XSS protection, and security headers
- ♿ **Accessible** - WCAG compliant with proper focus states

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **i18n:** [next-intl](https://next-intl-docs.vercel.app/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting:** [Azure Static Web Apps](https://azure.microsoft.com/en-us/products/app-service/static)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Project Structure

```
├── messages/           # Translation files (nl.json, en.json)
├── public/             # Static assets, sitemap.xml, robots.txt
├── src/
│   ├── app/            # Next.js App Router pages
│   │   └── [locale]/   # Locale-specific routes
│   ├── components/     # React components
│   │   └── ui/         # Reusable UI components (PageHero, PageCTA, etc.)
│   └── i18n/           # Internationalization config
├── infra/              # Azure Bicep templates
└── .github/workflows/  # CI/CD pipeline
```

## Deployment

The site automatically deploys to Azure Static Web Apps on push to `main` via GitHub Actions.

## License

© 2025 Dutch School Nairobi. All rights reserved.
