# Nguyen Huyen Minh Nhat - Portfolio

I'm Nhat, a Computer Science student at Swinburne Vietnam with a minor in Data Science. I spend most of my project time on frontend development, and I'm learning more about backend integration through my e-commerce project, Dioxyzine Frog.

This is my personal portfolio. I use it to share what I've built, explain my contributions to team projects, and introduce myself to people I might work or study with.

## What's inside

The website includes six projects:

- **Dioxyzine Frog** - my e-commerce project for custom plushies and accessories.
- **SigmaSecurity** - my frontend and UX/UI contributions to a COS30049 group project.
- **Reading the dataset** - my KNIME work for COS30045, with an interactive chart.
- **Digi-Capitale** - my contributions to a residential services platform.
- **Virtual OS** - a personal gift built as a React desktop with small apps and games.
- **Anniversary Gift** - an interactive story built with HTML, CSS, and JavaScript.

Each project page explains the scope of my work and links to its source or contribution records. My Resume, Academic CV, and Project Portfolio are also available to download from the website.

## How I put the site together

The site uses HTML, CSS, and vanilla JavaScript. It doesn't need a framework, database, or API keys. A small Node.js script builds the static files for Vercel.

I wanted the design to feel personal without getting in the way of the content: a dark blue palette, condensed headings, fine divider lines, and subtle hover scaling. Kajiro is the heading font and Manrope is the body font. More details are in [FONT_SETUP.md](FONT_SETUP.md).

## Run locally

Use Node.js 22.x. From the repository root:

```bash
npm run dev
```

Open http://localhost:5173. No dependency installation is needed. To build and preview the output:

```bash
npm run build
npm run preview
```

I edit the files in `public/`. The build copies them into `dist/`, fills in the site URL, and generates `sitemap.xml` and `robots.txt`. The `dist/` folder is generated and isn't committed.

## File structure

| Path | What it contains |
| --- | --- |
| `public/index.html` | Homepage, project carousel, profile, education, downloads, and contact |
| `public/work/` | Six individual project pages |
| `public/404.html` | Not-found page |
| `public/assets/style.css` | Base layouts and components |
| `public/assets/moon.css` | Blue theme, illustrations, carousel, and spacing |
| `public/assets/typography.css` | Fonts, heading sizes, and hover behaviour |
| `public/assets/site.js` | Menu, project filters, carousel, copy email, and chart interactions |
| `public/assets/documents/` | Resume, Academic CV, and Project Portfolio |
| `public/assets/brand-counts.csv` | Data used by the academic chart |
| `public/assets/` | Images, fonts, licenses, favicon, and social preview |
| `scripts/build.mjs` | Static build script |
| `scripts/serve.mjs` | Local development and preview server |
| `vercel.json` | Build, routing, and response-header settings |

The stylesheets load in this order: `style.css`, `moon.css`, then `typography.css`. Project cards use `data-project-type="software"` or `"data"` for filtering. When adding a project, I also update the initial project count and the next-project links.

## Deployment

This repository is connected to my Vercel project, `web_portfolio`. Updates to `main` trigger a deployment.

| Setting | Value |
| --- | --- |
| Root Directory | Repository root, `.` |
| Framework Preset | Other |
| Build Command | `node scripts/build.mjs` |
| Output Directory | `dist` |
| Install Command | Skipped - no dependencies |
| Node.js | 22.x |

The build uses `SITE_URL`, then `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL` for canonical links and the sitemap. Locally, it falls back to `http://localhost:5173`. For a custom domain, I can set `SITE_URL` to its HTTPS origin. Preview builds include a noindex directive.

## A few notes on the projects

I keep personal projects, team contributions, and coursework separate in the descriptions. Dioxyzine Frog currently uses PayPal Sandbox. The data visualisation counts dataset records, not sales. The Gifts illustrations use neutral content instead of personal photos and messages.

Related repositories:

- [My projects](https://github.com/NhatNguyen2407/Project)
- [Swinburne coursework](https://github.com/NhatNguyen2407/Swinburne)
- [Digi-Capitale](https://github.com/MaiChiLe113/digi-capitale)
- [Gifts](https://github.com/NhatNguyen2407/Gifts)

Fonts and other third-party assets retain their own licenses. Publishing this repository doesn't grant permission to reuse those assets or my personal documents.
