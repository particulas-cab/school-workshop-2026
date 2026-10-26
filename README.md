# School & Workshop on Advanced Aspects of QFT — Bariloche 2026

Conference website for the Simons-Balseiro School and Workshop on Advanced Aspects of QFT, hosted at the Instituto Balseiro / Centro Atómico Bariloche, May 18–27, 2026.

**Live site:** <https://particulascab-workshop.github.io/school-workshop-2026/>

## Structure

```
index.html                            ← single-page site (no build step required)
README.md
Alexander-Zamolodchikov-700x467.jpeg  ← speaker photos
fewster.jpg
gomis.jpg
hollands.jpg
shifman.jpg
srednicki.jpg
```

## GitHub Pages deployment

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under *Source*, select **Deploy from a branch** → `main` → `/ (root)`.
4. Save. Your site will be live at `https://<your-org>.github.io/school-workshop-2026/`.

## What to fill in before launch

| Section | What to update | Status |
|---|---|---|
| **Speakers** | Replace the "To be announced" cards with real names, affiliations, and photos. | ✅ Done (6 speakers listed) |
| **Registration fees** | Fill in the TBA cells in the fee table. | ⬜ Pending |
| **Key dates** | Fill in the deadline rows in the Registration section. | ⬜ Pending |
| **Register Now** | Replace `href="#"` on the button with the Google Form URL. | ✅ Done |
| **Social program** | Edit the placeholder paragraph when events are confirmed. | ⬜ Pending |
| **Map** | The iframe already targets Instituto Balseiro; verify the embed URL is loading correctly. | ✅ Done |

## Sponsors

This event is supported by the **Simons Foundation**, **CONICET**, and the **Instituto Balseiro**.

## Organizing Committee

- H. Casini
- M. Huerta
- J. Magán
- G. Torroba

## Contact

- **Email:** [particulas.cab@gmail.com](mailto:particulas.cab@gmail.com)
- **Research group:** <https://sites.google.com/view/particulasycampos-cabib/home>

## Offline use

The site works offline after the first online visit.

- Google Fonts were vendored into `assets/vendor/fonts/` (latin subset, woff2, `fonts.css`); the original `<link>` is kept as a comment in `index.html`.
- `sw.js` precaches all pages, images and fonts and falls back to the cache when the network is unavailable (network-first when online). Bump `CACHE_VERSION` in `sw.js` when adding files.
- The embedded Google Map and external links cannot work offline; a text fallback is shown instead.

To test: serve with `python3 -m http.server`, open http://localhost:8000, reload once, then in DevTools → Network select **Offline** (or Application → Service Workers → Offline) and reload; all pages should still render with fonts.
