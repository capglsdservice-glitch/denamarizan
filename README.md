# Dena Marizan — personal brand site

Next.js (App Router) · TypeScript · Tailwind CSS 3 · Motion · Lucide.

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Replace placeholders (all central)
- `lib/assets.ts` — set `src` for each image (put files in `public/images/`) and add real `postUrl`s for gallery items.
- `lib/site.ts` — domain, contact email, copy for nav/stats.
- `components/About.tsx` — `copy` object: Dena's own story.
- `components/Services.tsx` — `offers`: real programs (none invented).
- `app/privacy/page.tsx` — real privacy policy.
- Newsletter: set `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` (see `.env.example`); it receives POST JSON `{ firstName, email }`. Unset, the form validates but honestly says nothing was saved.
- OG image: add to `metadata.openGraph.images` in `app/layout.tsx`.
