import {readFile, writeFile, readdir} from 'node:fs/promises';
import {resolve, relative, extname} from 'node:path';

const root = resolve(import.meta.dirname, '..');
const client = resolve(root, 'dist/client');
let html = await readFile(resolve(client, 'index.html'), 'utf8');
const scriptTag = html.match(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/);
const styleTag = html.match(/<link\b[^>]*\bhref="([^"]+\.css)"[^>]*>/);
if (!scriptTag || !styleTag) throw new Error('Expected one Vite entry script and stylesheet.');
let js = await readFile(resolve(client, scriptTag[1].replace(/^\//,'')), 'utf8');
let css = await readFile(resolve(client, styleTag[1].replace(/^\//,'')), 'utf8');
const mime = {'.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
async function embed(directory) {
  for (const entry of await readdir(directory, {withFileTypes:true})) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) { await embed(path); continue; }
    const url = '/' + relative(resolve(root,'public'),path).split('\\').join('/');
    if (!js.includes(url) && !css.includes(url)) continue;
    const type = mime[extname(path)];
    if (!type) throw new Error(`Unsupported embedded asset: ${url}`);
    const data = `data:${type};base64,${(await readFile(path)).toString('base64')}`;
    js = js.replaceAll(url,data);
    css = css.replaceAll(url,data);
  }
}
await embed(resolve(root,'public'));
html = html.replace(scriptTag[0],()=>`<script type="module">${js.replace(/<\/script/gi,'<\\/script')}</script>`);
html = html.replace(styleTag[0],()=>`<style>${css}</style>`);
const output = resolve(root,'The-Web-A-Living-History.html');
await writeFile(output,html);
console.log(`Exported self-contained HTML (${Buffer.byteLength(html)} bytes).`);
