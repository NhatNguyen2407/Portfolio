import { cp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'dist');
const host = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL
  || process.env.VERCEL_URL || 'http://localhost:5173';
const url = new URL(host.includes('://') ? host : `https://${host}`);
if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
  throw new Error('SITE_URL must be an HTTP(S) website origin without credentials.');
}
const origin = url.origin;
const preview = process.env.VERCEL_ENV === 'preview';
const routes = [];

await rm(output, { recursive: true, force: true });
await cp(join(root, 'public'), output, { recursive: true });

async function prepare(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await prepare(path);
    else if (entry.name.endsWith('.html')) {
      let html = (await readFile(path, 'utf8')).replaceAll('__SITE_ORIGIN__', origin);
      if (preview && entry.name !== '404.html') {
        html = html.replace('</head>', '<meta name="robots" content="noindex"></head>');
      }
      await writeFile(path, html);
      if (entry.name === 'index.html') {
        routes.push(dirname(path).slice(output.length).replaceAll('\\', '/') + '/');
      }
    }
  }
}

await prepare(output);
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
  + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  + routes.sort().map(route => `  <url><loc>${origin}${route}</loc></url>`).join('\n')
  + '\n</urlset>\n';
await writeFile(join(output, 'sitemap.xml'), sitemap);
await writeFile(join(output, 'robots.txt'), preview
  ? 'User-agent: *\nDisallow: /\n'
  : `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Built ${routes.length} pages + 404 and assets in dist/ (${origin}).`);
