# Publishing Checklist — Storm X Digital blog

Exact, repo-specific steps to ship a post. Routing fact that drives everything: `vercel.json` uses
`cleanUrls: true` + **`trailingSlash: false`** with **no rewrites**. Pages are served WITHOUT a
trailing slash → **all asset/link paths must be ABSOLUTE** (`/assets/…`, `/services/…`, `/blog/…`).
Relative paths resolve against the parent dir and 404. This has bitten the site before.

---

## A. Create the article file(s)

1. **IT article** → `blog/<slug>/index.html`. Start from `.claude/blog-agent/TEMPLATE-it.html`,
   replace every `{{PLACEHOLDER}}`, fill the body following `SEO-PLAYBOOK.md`.
2. **EN twin** (if doing both) → `en/blog/<en-slug>/index.html` from `TEMPLATE-en.html`. The EN slug
   is the English translation of the topic (e.g. IT `lead-generation-cos-e` ↔ EN `what-is-lead-generation`).
3. Confirm in each file:
   - `lang` attribute (`it` / `en`) and JSON-LD `inLanguage` (`it-IT` / `en-US`).
   - **lemlist `<script>` present in `<head>`** (mandatory, not consent-gated).
   - Global `site-header` nav present (IT labels vs EN labels) with **absolute** hrefs; mark
     `ARTICOLI`/`DISPATCHES` as `active`.
   - canonical + 3× hreflang (`it`, `en`, `x-default`→IT). If the EN twin doesn't exist yet, point
     `hreflang="en"` at the IT URL and fix it when the twin ships.
   - `datePublished`/`dateModified` = today; `article:published_time` matches.

## B. Add the card to the blog index — `blog.html`

Insert a new `<article class="case-card">` as the **first** child of `<div class="case-grid …">`
(newest on top). Pattern (note the IT index card link keeps the trailing slash, e.g. `/blog/<slug>/`):

```html
<article class="case-card">
  <div class="cover"><img src="assets/images/blog/<slug>.png" alt="<SHORT UPPER LABEL>" loading="lazy"></div>
  <div class="body">
    <div class="meta"><span><CATEGORY> · <N> MIN</span><span><YYYY.MM.DD></span></div>
    <h3 class="headline"><Article headline></h3>
    <p class="desc"><1–2 sentence teaser, with the keyword></p>
    <a href="blog/<slug>/" class="read">→ LEGGI L'ARTICOLO</a>
  </div>
</article>
```

- `blog.html` is the flat file served at `/blog`; its internal links are **relative** to root
  (`assets/…`, `blog/<slug>/`) — that is correct *for this one file only* because it lives at the root.
  Inside the article pages, paths stay absolute.
- **Cover image — match the house poster style first:** existing covers are flat, full-bleed
  **typographic posters** on warm off-white (`#F8F7F4`): big near-black Space Grotesk headline, ONE
  electric-orange (`#FF5500`) accent word, a small mono caption (reference:
  `assets/images/blog/outbound-vs-inbound-marketing.png`). Brand consistency comes first. In order:
  1. **Build it to the template** — a flat SVG/HTML poster using Space Grotesk and the exact palette,
     then rasterize to PNG. This is the only reliable way to match the house style pixel-for-pixel.
  2. **FAL.AI is a fallback for non-poster imagery only.** Recraft/FLUX do **not** reliably produce
     this flat poster look — they insert scenes/mockups (walls, billboards, people) and can garble
     text. If you do use FAL: read the key from the `FAL_KEY` env var (**never hardcode or commit
     it**; ask the user if unset), `POST https://fal.run/fal-ai/recraft-v3` with
     `Authorization: Key $FAL_KEY` and body `{"image_size":"landscape_16_9","style":"digital_illustration",
     "colors":[{"r":255,"g":85,"b":0},{"r":15,"g":15,"b":15},{"r":248,"g":247,"b":244}]}`, prompt for a
     flat purely-typographic design (forbid "wall, billboard, people, photo, mockup, illustrations"),
     convert WebP/SVG→PNG with Pillow (`Image.open(x).convert('RGB').save(...,'PNG')`; avoid
     `vector_illustration`, which returns SVG), and **verify by Reading the image** — regenerate if it's
     off-brand or the text is garbled.
  Save to `assets/images/blog/<slug>.png` (16:9) and point the card + the article's
  `og:image`/`twitter`/JSON-LD `image` at it. If there's no good cover yet, use the
  `assets/images/og-image.png` placeholder + a "⚠ cover needed" PR note; never ship a card pointing at
  a non-existent file.

## C. Add to `sitemap.xml`

Add a `<url>` in the right section. Include hreflang alternates when an EN twin exists.

```xml
<url><loc>https://www.stormxdigital.com/blog/<slug>/</loc><lastmod><YYYY-MM-DD></lastmod><changefreq>monthly</changefreq><priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="it" href="https://www.stormxdigital.com/blog/<slug>/"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://www.stormxdigital.com/en/blog/<en-slug>/"/>
</url>
```
Add the matching EN `<url>` under the "Blog articles EN" section if you built the twin.

## D. (Optional) llms.txt

If the post is a cornerstone/pillar piece, add a one-line entry under `## Articoli (per approfondire)`
in `llms.txt`. Skip for minor posts.

## E. Validate locally before committing

- `git grep -nE '"(\.\./|case-study\.css)' blog/<slug>/index.html` → should return **nothing**
  (no stray relative paths).
- Confirm the lemlist script line is present in each new file.
- Open the files and eyeball: nav renders, no `{{PLACEHOLDER}}` left, JSON-LD blocks are valid JSON
  (no trailing commas, no template comments left inside the JSON).
- Optional: `python3 -c "import json,sys; ..."` to lint each JSON-LD block, or paste into a validator.

## F. Commit, push, open a PR (NEVER auto-merge)

1. Work on the development branch (currently `claude/wizardly-tesla-k9c2u3`); create it if missing.
2. Commit with a clear message, e.g. `Add blog article: "<headline>" (/blog/<slug>/)`.
3. `git push -u origin <branch>` (retry with backoff on network errors).
4. **Open a PR for review.** Put in the PR body: target primary keyword + volume/difficulty, the
   secondary keywords, the FAQ/PAA targeted, internal links added, any `{{VERIFY}}` stats needing the
   user's confirmation, the "cover image needed" flag, and (if applicable) which Circleback call themes
   inspired it + a note that it's anonymised.
5. **Wait for the user to approve and merge.** Vercel auto-deploys `main` on merge. Do not merge
   yourself unless the user explicitly says so.

## Reconciliation note (from CLAUDE.md)
This dev branch can diverge from a reconstructed `main`. If reconciling, merge `main` with `-X theirs`
(production is the source of truth), then re-apply only the new post so the PR diff is just the new files.
