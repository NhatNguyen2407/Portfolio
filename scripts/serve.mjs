import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('../', import.meta.url));
const root = resolve(project, process.argv[2] || 'public');
const port = Number(process.env.PORT || 5173);
const origin = `http://localhost:${port}`;
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.png': 'image/png', '.woff': 'font/woff',
  '.csv': 'text/csv; charset=utf-8', '.pdf': 'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml'
};

createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      return response.end();
    }
    const pathname = decodeURIComponent(new URL(request.url, origin).pathname);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403);
      return response.end('Forbidden');
    }
    let status = 200;
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      await stat(file);
    } catch {
      status = 404;
      file = resolve(root, '404.html');
    }
    let body = await readFile(file);
    if (extname(file) === '.html') body = Buffer.from(body.toString().replaceAll('__SITE_ORIGIN__', origin));
    response.writeHead(status, {
      'Content-Type': mime[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff'
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(400);
    response.end('Unable to serve this request. Run npm run build before npm run preview.');
  }
}).listen(port, '127.0.0.1', () => console.log(`Portfolio: ${origin}`));
