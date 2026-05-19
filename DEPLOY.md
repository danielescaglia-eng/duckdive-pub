# Deploy — pub.duckdive.surf

Hosting su **GitHub Pages**, dominio personalizzato `pub.duckdive.surf` via GoDaddy.

---

## 1 · Repo

Repo: `github.com/danielescaglia-eng/duckdive-pub` (public)

GitHub Pages serve la **root del branch `main`**. Ogni push su `main` rideploya in 30-60 sec.

---

## 2 · Abilitare GitHub Pages (prima volta)

Su GitHub → Repo → **Settings → Pages**:

- **Source**: Deploy from a branch
- **Branch**: `main` · folder: `/ (root)`
- **Custom domain**: `pub.duckdive.surf`
- ✅ **Enforce HTTPS** (abilitalo dopo che il certificato è stato emesso)

> Il file `CNAME` nel repo contiene già `pub.duckdive.surf`, quindi GitHub leggerà il dominio in automatico.

---

## 3 · DNS su GoDaddy

GoDaddy → **My Products → duckdive.surf → DNS → Manage Zones**.

Aggiungi questo record:

| Type  | Name  | Value                          | TTL    |
| ----- | ----- | ------------------------------ | ------ |
| CNAME | `pub` | `danielescaglia-eng.github.io.` | 1 ora  |

> Nota: su GoDaddy il campo `Name` va **senza** il dominio finale (`pub`, non `pub.duckdive.surf`). Il punto finale dopo `.github.io` è opzionale (alcune UI lo accettano, altre lo aggiungono).

Propagazione DNS: 5-30 min. Verifica:
```bash
dig pub.duckdive.surf CNAME +short
# atteso: danielescaglia-eng.github.io.
```

---

## 4 · HTTPS (Let's Encrypt automatico)

Quando GitHub vede che il DNS punta correttamente, emette automaticamente un certificato Let's Encrypt (5-15 min).

In **Settings → Pages** vedrai:
- ✅ "Your site is published at https://pub.duckdive.surf"
- Spunta "Enforce HTTPS"

---

## 5 · Aggiornare la landing

```bash
# nella cartella locale del repo duckdive-pub
git add .
git commit -m "update landing"
git push origin main
```

GitHub Pages rideploya da solo.

---

## 6 · Asset da avere nel repo

- ✅ `index.html`
- ✅ `wanted.png`
- ⬜ `manifesto.jpg` (se manca → sezione "Non un pub. Un covo." resta nera)
- ✅ `CNAME`
- ✅ `.nojekyll`

---

## Troubleshooting

**404 dopo il deploy**
- Verifica che `index.html` sia nella root del branch `main`
- In Settings → Pages, "Source" deve essere `main` `/ (root)`

**Custom domain non verifica**
- Aspetta 30 min la propagazione DNS
- `dig pub.duckdive.surf CNAME +short` deve restituire `danielescaglia-eng.github.io.`
- Su GitHub clicca "Remove" sul dominio e ri-aggiungilo

**HTTPS non disponibile**
- Il certificato Let's Encrypt parte automatico DOPO che il DNS è verificato e propagato. Aspetta 15 min, poi ricarica Settings → Pages.

**"Enforce HTTPS" disabilitato**
- È disabilitato finché il certificato non è pronto. Aspetta e ricarica.
