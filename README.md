<p align="center">
  <img src="public/logo.png" alt="Dutch School Nairobi" width="200">
</p>

<h1 align="center">Dutch School Nairobi</h1>

<p align="center">
  Bilingual Dutch-English education in the heart of Nairobi since 1971
</p>

<p align="center">
  <a href="https://dutchschool.ke">View Live Site</a> •
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
- **Hosting:** [Firebase Hosting](https://firebase.google.com/docs/hosting) + a [Cloud Run function](https://cloud.google.com/run/docs/functions) for `/api` (GCP project `dutchschoolke`)

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
├── api/                # The /api Cloud Run function (contact form, change requests)
├── infra/              # One-time GCP project setup (gcp-setup.sh)
└── .github/workflows/  # CI/CD pipeline
```

## Deployment

Every push to `main` deploys via GitHub Actions (`.github/workflows/ci-cd.yml`):
the static export in `out/` goes to Firebase Hosting, and `api/` goes to the
Cloud Run function `dutch-school-api` in `us-central1`. Firebase Hosting
forwards `/api/**` to that function (`firebase.json`), so the site calls its API
on the same origin. Everything stays inside GCP's free tier at this traffic.

GitHub Actions signs in to GCP with Workload Identity Federation, so there are
no service-account keys. The API's tokens (`MAILERSEND_API_TOKEN`,
`GH_ISSUES_PAT`) stay GitHub secrets; the workflow copies them into Secret
Manager when they change.

### First-time setup

1. Run `./infra/gcp-setup.sh` as a project Owner, signed in to `gcloud` and `gh`.
   It enables the APIs, creates the service accounts and Workload Identity
   Federation, and sets the `GCP_WIF_PROVIDER` and `GCP_DEPLOY_SA` repo secrets.
2. Run the CI/CD workflow once, then let Firebase Hosting call the API by
   making it publicly invocable. It is the site's public contact-form endpoint,
   as it was on Azure:
   `gcloud run services add-iam-policy-binding dutch-school-api --region us-central1 --project dutchschoolke --member allUsers --role roles/run.invoker`
3. Add `dutchschool.ke` and `www.dutchschool.ke` as custom domains in the
   Firebase console (Hosting → Add custom domain) and update DNS as it shows.

To run the API locally: `npm install --prefix api && npm start --prefix api`
(port 8080; set `MAILERSEND_API_TOKEN` and `GITHUB_TOKEN` to exercise it fully).

## License

© 2025 Dutch School Nairobi. All rights reserved.
