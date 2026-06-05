# websitestormx — notes for Claude

Production static site for **Storm X Digital** (`www.stormxdigital.com`), deployed on
Vercel from `main`. Reconstructed from production into plain static HTML — there is **no
build step**. Work on branch `claude/awesome-fermi-ltopz`, open a PR, merge to deploy.

## Site conventions (important)

- **Routing:** `vercel.json` uses `cleanUrls: true` and **`trailingSlash: false`**, and has
  **no `rewrites`**. Pages are served **without** a trailing slash (e.g. `/blog/caso-studio-abeec`).
  → **Always use ABSOLUTE asset paths** (`/blog/<slug>/…`, `/assets/…`) in any sub-page.
  Same-directory relative paths (`case-study.css`, `assets/…`) break, because the browser
  resolves them against the parent dir → 404 (unstyled page, broken images). This bit us once.
- **Blog index** is the flat file **`blog.html`** (served at `/blog`), not `blog/index.html`.
  Cards are `<article class="case-card">` with `<div class="cover"><img src="assets/images/blog/<slug>.png"></div>`,
  a `.body` (`.meta`, `.headline`, `.desc`, `.read` → `blog/<slug>/`).
- **Articles / case studies** live at `blog/<slug>/index.html`. Card covers go in
  `assets/images/blog/<slug>.(png|jpg)`.
- **Assets that exist:** logos at `/assets/logo/storm-x-primary.svg` (+ `-stacked`, `-mono`, `-mark`).
  Social image at **`/assets/images/og-image.png`**. NOTE: root `/og-image.png` and `/logo.png`
  do **not** exist on this main — use the `/assets/…` paths in `og:image` and JSON-LD.
- **Global nav:** the homepage header is `.site-header` (logo + `SERVIZI` dropdown + METODO/
  PILOT 120GG/RISULTATI/ARTICOLI + EN + PRENOTA + mobile hamburger). Its CSS lives in
  `assets/styles.css` (lines ~154–293); the mobile toggle is an inline `onclick`. **Every
  article/case-study page must carry this same nav** so the whole site is reachable from inside
  an article.

## Publishing a design-bundle case study as a blog post

Case studies come from Claude Design bundles (e.g. `Abeec Case Study.html`,
`Brands Cosmos Reebok Case Study.html`). They are self-contained (own `colors_and_type.css`
+ `case-study.css` + `assets/`). To publish one (done for `caso-studio-abeec`, `caso-studio-reebok`):

1. Create `blog/caso-studio-<x>/` with `index.html`, `colors_and_type.css`, `case-study.css`,
   and `assets/` (copy from the bundle's `case_studies/<name>/`).
2. In `index.html`: make **all** CSS/favicon/image paths absolute (`/blog/caso-studio-<x>/…`);
   add full SEO (`title`, `description`, canonical, OG/Twitter using `/assets/images/og-image.png`,
   JSON-LD `Article` + `BreadcrumbList` with publisher logo `/assets/logo/storm-x-primary.svg`).
3. **Replace the bundle's minimal header** with the global site nav (markup copied from the
   homepage, absolute hrefs: `/`, `/services/<x>`, `/blog`, `/en/`, `/#prenota`; mark
   `ARTICOLI` as `active`). In the page's `case-study.css`, replace the minimal `.site-header`
   block with the global nav CSS (ported verbatim from `assets/styles.css`; it uses the same
   design tokens, so it renders identically). Keep the case study's dark footer.
4. Add a `case-card` to `blog.html` (top of `.case-grid`) + a cover at
   `assets/images/blog/caso-studio-<x>.jpg` + a `<url>` in `sitemap.xml`.
5. Reconcile + publish: this branch can diverge from a reconstructed `main`. Merge `main` with
   `-X theirs` (keep production as source of truth), then re-apply only the case study, so the
   PR diff is **only** the new files. Open a PR → squash-merge. Vercel auto-deploys `main`.
