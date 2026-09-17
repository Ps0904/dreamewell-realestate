# Dreamwell Ventures — Frontend

Premium farm real-estate and protein supply frontend for **Dreamwell Ventures**.

## Modules

1. **Home** — Landing experience (farm portfolio, protein supply, featured farm)
2. **Marketing** — Properties, product listings, campaigns, customer enquiries
3. **Inventory** — Stock tracking across eggs, poultry, meat, and live birds

Frontend only. Mock data. No backend required for this phase.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Deploy

## Project structure

```
frontend/
  src/
    app/
      page.tsx              # Home
      marketing/page.tsx    # Marketing
      inventory/page.tsx    # Inventory
    components/             # Reusable UI
    data/mock.ts            # Mock business data
```

## Backend later

Designed to connect to a Django REST API later. Replace mock fetches in `src/data/mock.ts` with API calls when ready.
