import fs from 'node:fs';
import path from 'node:path';

export const prerender = false;

export async function GET({ url }) {
  if (!import.meta.env.DEV) return new Response('Interdit', { status: 403 });
  const slug = (url.searchParams.get('slug') || '').replace(/[^a-z0-9-]/gi, '-');
  if (!slug) return new Response('Slug manquant', { status: 400 });
  const file = path.resolve('src/content/docs/pages-wiki', slug + '.md');
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `---\ntitle: ${slug}\n---\n\n`);
  }
  return Response.redirect('npp:///' + file.replace(/\\/g, '/'));
}