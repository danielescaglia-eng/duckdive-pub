# Duck Dive Pub — pub.duckdive.surf

Sito del Duck Dive Pub, Via Cavallotti 9, Varese. Statico, zero dipendenze e zero build,
servito da GitHub Pages sulla root del branch `main`.

## File

- `index.html` — la pagina (markup + meta + JSON-LD `BarOrPub`)
- `styles.css` — design system: token, blocchi menu, responsive, reduced-motion
- `site.js` — contenuti modificabili (orari, cocktail, birre, etichette) + logica "aperto ora"
- `assets/lockup.png` — logo con mascotte
- `assets/og.jpg` — card 1200×630 per le anteprime social
- `menu/` — menu completo in 7 lingue, raggiungibile da `/menu`
- `CNAME` — dominio custom
- `.nojekyll` — disabilita Jekyll, serve i file as-is

## Modificare gli orari

Stanno **solo** nell'array `HOURS` in cima a `site.js`: da lì escono sia la tabella
sia il chip "Aperto ora" in alto a destra (che gestisce anche le chiusure dopo la
mezzanotte). Se li cambi, aggiorna anche `openingHoursSpecification` nel JSON-LD
di `index.html`, che è quello che legge Google.

## Deploy

Vedi [DEPLOY.md](DEPLOY.md). In breve: ogni push su `main` rideploya in 30-60 secondi.
