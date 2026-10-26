# Current production architecture — 25 October 2026

Italian is the primary language at `/`; English is the alternate at `/en`. There are 106 canonical pages, with 27 blog articles and 8 case studies per language. `public/` is the deployed static source; `routes.json` holds Vercel Build Output routing.

- Keep visible navigation, page-specific IT/EN switches, canonical URLs, reciprocal hreflang and sitemap aligned.
- Retain Space Grotesk titles, Instrument Serif italic accents, Inter body/UI, and the cream/ink/orange identity.
- Preserve all articles and case studies. Previous English-only root paths redirect to /en counterparts when they do not overlap Italian canonical paths.
- Keep B2B and Amazon services distinct. Illustrative rankings are not verified placement; pipeline is not revenue. Preserve timeframes on case results.
- Run `npm run build`. Preserve `api/bridge.mjs`, existing production environment settings and the signed same-origin backend for contact, booking, CAPTCHA and events.
- Keep private dashboard redirects, Google verification and IndexNow ownership files. Statistics require opt-in. Never publish a local-preview config, Python preview server or preview noindex metadata.
- Client and founder videos retain authentic Italian audio. Do not imply English audio.
- Submit IndexNow only after verifying production. The existing Search Console property is verified; sitemap.xml was resubmitted on 26 October 2026. The last-read and indexed counts can lag; confirm current status before reporting. Indexing and rankings are determined by search engines.
