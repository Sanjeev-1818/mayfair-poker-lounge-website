const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const root = __dirname;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

http.createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end();
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://preview').pathname);
  } catch {
    res.writeHead(400);
    return res.end('Bad request');
  }

  const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
  // Only expose the website, never repository metadata or server files.
  const allowed = /^[a-z0-9-]+\.html$/.test(relative)
    || relative === 'robots.txt'
    || relative === 'sitemap.xml'
    || /^assets\/[a-zA-Z0-9_-]+\.(css|js|png|jpg)$/.test(relative);
  try {
    if (!allowed) throw Object.assign(new Error('Not found'), { code: 'ENOENT' });
    const data = await fs.readFile(path.join(root, relative));
    res.writeHead(200, {
      'Content-Type': types[path.extname(relative)],
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  } catch (error) {
    if (error.code !== 'ENOENT') console.error(error);
    const status = error.code === 'ENOENT' ? 404 : 500;
    res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
    const body = status === 404
      ? await fs.readFile(path.join(root, '404.html')).catch(() => 'Not found')
      : 'Internal server error';
    res.end(req.method === 'HEAD' ? undefined : body);
  }
}).listen(5000, '0.0.0.0', () => {
  console.log('Mayfair website listening on port 5000');
});
