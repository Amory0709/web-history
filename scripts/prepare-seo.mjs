import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chapters} from '../src/history.js';
import {site} from '../src/site.js';

const root=resolve(import.meta.dirname,'..'),client=resolve(root,'dist/client');
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
let html=await readFile(resolve(client,'index.html'),'utf8');
html=html.replace(/<title>.*?<\/title>/s,`<title>${escape(site.title)}</title>`)
 .replace(/<meta name="description"[^>]+>/,`<meta name="description" content="${escape(site.description)}" />`);
const structured={
 '@context':'https://schema.org','@graph':[
  {'@type':'WebSite','@id':site.url+'#website',url:site.url,name:'The Web — A Living History',description:site.description,inLanguage:'en'},
  {'@type':'WebPage','@id':site.url+'#webpage',url:site.url,name:site.title,description:site.description,inLanguage:'en',isPartOf:{'@id':site.url+'#website'},about:{'@type':'Thing',name:'History of the World Wide Web'}}
 ]
};
const meta=`
 <link rel="canonical" href="${site.url}" />
 <meta name="robots" content="index, follow, max-image-preview:large" />
 <meta property="og:type" content="website" />
 <meta property="og:site_name" content="The Web — A Living History" />
 <meta property="og:locale" content="en_US" />
 <meta property="og:title" content="${escape(site.title)}" />
 <meta property="og:description" content="${escape(site.description)}" />
 <meta property="og:url" content="${site.url}" />
 <meta property="og:image" content="${site.url}social-card.jpg" />
 <meta property="og:image:width" content="1200" />
 <meta property="og:image:height" content="630" />
 <meta property="og:image:alt" content="The Web: a living history, from connected documents in 1989 to WebGPU in 2023." />
 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content="${escape(site.title)}" />
 <meta name="twitter:description" content="${escape(site.description)}" />
 <meta name="twitter:image" content="${site.url}social-card.jpg" />
 <script type="application/ld+json">${JSON.stringify(structured).replaceAll('<','\\u003c')}</script>
 <style>.static-history{max-width:1040px;margin:auto;padding:64px 28px;font-family:Arial,sans-serif;line-height:1.7;color:#26344c}.static-history main{margin:0;overflow:visible}.static-history header{margin-bottom:50px}.static-history h1{font-size:clamp(35px,6vw,72px);line-height:1.12;letter-spacing:-2px}.static-history nav{display:flex;flex-wrap:wrap;gap:10px 24px;margin:25px 0}.static-history a{color:#0014dc;text-decoration:underline}.static-history section{padding:35px 0;max-width:780px}.static-history h2{font-size:30px;line-height:1.3}.static-history p{margin:16px 0}.static-history .static-date{color:#0014dc}.static-history li{margin:8px 0}</style>
`;
html=html.replace('</head>',meta+'\n</head>');
// Visible, readable HTML for all visitors before enhancement, generated from the
// same narrative/source data as React. No crawler-specific or hidden SEO copy.
const navigation=chapters.map(c=>`<a href="#${c.id}">${escape(c.year)} · ${escape(c.nav)}</a>`).join('');
const content=chapters.map(c=>`<section id="${c.id}" aria-labelledby="static-${c.id}"><p class="static-date">${escape(c.year)} · ${escape(c.nav)}</p><h2 id="static-${c.id}">${escape(c.title.replaceAll('\n',' '))}</h2><p>${escape(c.milestone)}</p><p>${escape(c.subtitle)}</p><p>${escape(c.body)}</p><p>${escape(c.detail)}</p><p>${escape(c.person)} — ${escape(c.role)}</p><ul>${c.sources.map(s=>`<li><a href="${escape(s[2])}">${escape(s[0])}</a> — ${escape(s[1])}</li>`).join('')}</ul></section>`).join('');
const readable=`<article class="static-history"><header><p>THE WEB / A LIVING HISTORY</p><h1>An interactive history of the Web.</h1><p>${escape(site.description)}</p><nav aria-label="History chapters">${navigation}</nav><noscript><p>You can read the complete history and its sources below. Enable JavaScript to explore the animated story and interactive demonstrations.</p></noscript></header><main>${content}</main></article>`;
html=html.replace('<div id="root"></div>',`<div id="root">${readable}</div>`);
await writeFile(resolve(client,'index.html'),html);
await writeFile(resolve(client,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${site.url}sitemap.xml\n`);
await writeFile(resolve(client,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.url}</loc></url></urlset>\n`);
console.log(`Prepared readable HTML, metadata, robots.txt and sitemap for ${site.url}`);
