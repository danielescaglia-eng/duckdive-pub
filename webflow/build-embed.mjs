// Genera il blocco HTML Embed per la pagina duckdive.surf/pub (Webflow).
// Prende il <body> di ../index.html, rende assoluti i percorsi verso
// pub.duckdive.surf (styles.css, site.js, assets, menu) e antepone un reset
// che neutralizza i default di Webflow (h1 38px, p margin, img inline-block…).
// Uso: node webflow/build-embed.mjs  → scrive webflow/embed.html
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://pub.duckdive.surf';
const EMBED_LIMIT = 50000; // limite caratteri HTML Embed Webflow
const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, '..', 'index.html'), 'utf8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/);
if (!bodyMatch) throw new Error('index.html: <body> non trovato');

const body = bodyMatch[1]
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/(src|href)="assets\//g, `$1="${ORIGIN}/assets/`)
  .replace(/href="menu\/"/g, `href="${ORIGIN}/menu/"`)
  .replace(/src="site\.js"/, `src="${ORIGIN}/site.js"`)
  .replace(/\n\s*\n/g, '\n')
  .trim();

const head = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bevan&family=Permanent+Marker&display=swap" rel="stylesheet">
<style>h1,h2,h3,h4,h5,h6,p,ul,ol,li,a,img,figure,blockquote,label,button,strong,em,b,small{all:revert;margin:0;padding:0;box-sizing:border-box}html,body{height:auto}</style>
<link rel="stylesheet" href="${ORIGIN}/styles.css">`;

const embed = `${head}\n${body}\n`;
if (embed.length > EMBED_LIMIT) {
  throw new Error(`embed troppo lungo: ${embed.length} > ${EMBED_LIMIT}`);
}
writeFileSync(join(here, 'embed.html'), embed);
console.log(`webflow/embed.html: ${embed.length} caratteri`);
