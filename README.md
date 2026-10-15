# Nguyen Huyen Minh Nhat - Portfolio

Personal portfolio for frontend opportunities, collaboration, and future postgraduate study. Built with HTML, CSS, and vanilla JavaScript. No framework, backend, database, API keys, or package dependencies are required.

## Run locally

Use Node.js 22.x. From the repository root:

```bash
npm run dev
```

Open http://localhost:5173. Edit files in `public/` and refresh the browser.

```bash
npm run build
npm run preview
```

The build writes `dist/`, resolves site metadata, and generates `sitemap.xml` and `robots.txt`. Generated output is not committed.

## Deploy on Vercel

Import `NhatNguyen2407/Portfolio` as a new project. Use these settings:

| Setting | Value |
| --- | --- |
| Production branch | main |
| Root Directory | Repository root, `.` |
| Framework Preset | Other |
| Build Command | `node scripts/build.mjs` |
| Output Directory | `dist` |
| Install Command | Skip, no dependencies |
| Node.js | 22.x |

`vercel.json` includes the build settings, clean URLs, trailing slashes, and response headers. No secrets are required. Git integration can automatically deploy later commits to `main`.

The build uses `SITE_URL`, then `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL` for canonical links and the sitemap. The local fallback is `http://localhost:5173`. If you add a custom domain, set `SITE_URL` to its HTTPS origin and redeploy. Preview deployments emit a noindex directive.

## Source structure

| Path | Purpose |
| --- | --- |
| `public/index.html` | Homepage, project cards, profile, education, downloads, contact |
| `public/404.html` | Not-found page |
| `public/work/dioxyzine-frog/` | E-commerce project overview |
| `public/work/sigma-security/` | COS30049 team contribution |
| `public/work/data-exploration/` | KNIME data exploration and interactive chart |
| `public/work/digi-capitale/` | Residential services contribution |
| `public/work/virtual-os/` | React desktop gift project |
| `public/work/anniversary-gift/` | Interactive storytelling gift project |
| `public/assets/style.css` | Base layout, components, case studies, responsive rules |
| `public/assets/moon.css` | Midnight-blue theme, carousel, illustrations, compact spacing |
| `public/assets/typography.css` | Kajiro headings, Manrope body text, hover scaling |
| `public/assets/site.js` | Navigation, filters, carousel, copy email, chart controls |
| `public/assets/brand-counts.csv` | Data for the interactive academic chart |
| `public/assets/documents/` | Local-only documents; omitted from public source pending explicit approval |
| `public/assets/` | Local fonts, licenses, images, favicon, and social preview |
| `scripts/build.mjs` | Dependency-free static build |
| `scripts/serve.mjs` | Local development and preview server |
| `FONT_SETUP.md` | Font provenance and usage notes |
| `vercel.json` | Hosting configuration |

## Editing

- Update personal details and project cards in `public/index.html`.
- Update project narratives in each `public/work/<slug>/index.html`.
- Keep stylesheet order: `style.css`, `moon.css`, then `typography.css`.
- New carousel cards need `class="project"` and `data-project-type="software"` or `"data"`. Keep the initial count and project sequence in sync; JavaScript calculates filtered counts.
- Link `Visit website` only to a confirmed deployment. Gifts currently link to source and case studies.
- Buttons scale slightly on hover without changing color. Reduced-motion preferences disable scaling.
- Use the plain hyphen `-` in new website copy. Keep existing document downloads unchanged unless editing those documents is separately requested.
- Do not edit `dist/`. The build replaces it.

## Content and assets

The six project overviews distinguish personal work, team contributions, and academic exercises. Dioxyzine Frog payments are described as PayPal Sandbox. Academic chart counts are records, not sales. Gifts illustrations contain neutral content rather than private messages or photographs.

Project sources:

- https://github.com/NhatNguyen2407/Project
- https://github.com/NhatNguyen2407/Swinburne
- https://github.com/MaiChiLe113/digi-capitale
- https://github.com/NhatNguyen2407/Gifts

Kajiro was supplied by the owner. Manrope is the active body font. Advercase Demo is not included. Font licenses and provenance are documented in `FONT_SETUP.md` and the asset license files. Keep third-party assets under their own terms; the repository does not grant a blanket license to photographs, documents, project logos, or fonts.

## Verification and release status

The static build, JavaScript syntax, local file links, project count, and unchanged document downloads were checked during preparation. Browser-level visual QA is still pending. Repository: https://github.com/NhatNguyen2407/Portfolio. Target Vercel project: `web_portfolio` in `bibii-s-projects`. Deployment status must be checked in Vercel; a successful source upload alone does not verify a live release.


Personal document binaries are currently excluded from the public repository pending explicit publication approval. Document cards open an email request instead of linking to missing files.
