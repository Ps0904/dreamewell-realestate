# Dreamwell Ventures

Premium farm land & protein supply frontend.

## Live site

https://ps0904.github.io/dreamewell-realestate/

## Local development

```bash
cd frontend
npm install
npm run dev
```

Open http://127.0.0.1:3000

## Static build (GitHub Pages)

```bash
cd frontend
GITHUB_PAGES=true npm run build
```

Output is in `frontend/out/` (includes `index.html`).

## Deploy

Push to `main`. GitHub Actions builds the site and publishes the static files to the **repository root** so GitHub Pages can serve them with:

**Settings → Pages → Source → Deploy from a branch → `main` / `/(root)`**

Do not leave Pages pointed at a source that only has the README with no `index.html`.
