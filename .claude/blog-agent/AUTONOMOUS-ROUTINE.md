# Autonomous SEO Blog Routine — Storm X Digital

A scheduled, hands-off run that produces **one** SEO-optimized post per run and **publishes it**.
- **Cadence:** twice a week (e.g. Tue & Fri 09:00 Europe/Rome).
- **Mode:** FULL AUTO-PUBLISH — merge to `main` (Vercel auto-deploys) **only when every safety gate
  passes**. If anything is uncertain → **FAIL SAFE**: open a PR titled `[review needed] …` and do NOT
  merge. **Skipping is allowed and preferred over publishing a weak/risky post.**

> This routine runs with no human in the loop, so the gates in Step 6 are mandatory and non-negotiable.

## How a run is triggered
A scheduled Claude Code (web) session runs this single instruction:

> Esegui la routine autonoma di blogging descritta in `.claude/blog-agent/AUTONOMOUS-ROUTINE.md`.

(Enable the schedule in the Claude Code web UI — see "Enabling the schedule" at the bottom.)

## Read first (every run)
`SEO-PLAYBOOK.md`, `PUBLISHING-CHECKLIST.md`, the IT/EN templates, repo `CLAUDE.md`, and this file.
Then read `TOPIC-LEDGER.md` — what's already been published and the theme rotation/backlog.

## Step-by-step (exactly one post)
1. **Sync to production.** `git fetch origin main`; create a fresh branch off the latest `main`
   (`auto/blog-YYYYMMDD-<slug>`). Production is the source of truth.
2. **Inventory existing content (hard dedup base).** List every `blog/*` and `en/blog/*` slug and each
   post's `<title>`/H1/H2s. This is the "already covered" set — the #1 guard against the "this is
   already on the website" failure.
3. **Pick the topic (rotate, never repeat).**
   - Take the next theme from the rotation in `TOPIC-LEDGER.md` (round-robin across the service themes).
   - Find a real keyword for it with Semrush (`keyword_research` → `phrase_related`/`phrase_questions`/
     `phrase_kdi`, database `it`; `us`/`uk` for EN). Validate **volume + difficulty + intent**; prefer
     KD ≲ 40 and a term a real B2B buyer searches. Check we don't already rank for it.
   - Enrich the angle from **Circleback calls / Lemlist replies / email** (recurring questions),
     anonymized. Optionally do your own web research.
   - **DEDUP GATE:** if the best keyword is already owned by an existing post (slug/title/H2 overlap),
     do **not** create a competing page. Pick the next theme, or — if the existing page just needs a
     refresh — switch to "optimize the existing post" mode (like we did for Outbound vs Inbound).
     Never ship a near-duplicate.
4. **Write** per `SEO-PLAYBOOK.md`: house voice, answer-first TL;DR, on-page SEO, 2–4 internal links to
   `/services/*` + sibling posts, FAQ mirrored into FAQPage schema, **every fact sourced** (named study
   or first-party + linked case). Assemble files from the templates (absolute paths, lemlist tag, global
   nav, Article + FAQPage JSON-LD, today's date).
5. **Cover image.** Build to the house poster template (flat, Space Grotesk, off-white `#F8F7F4`,
   one orange `#FF5500` accent word, mono caption). If a clean on-brand cover isn't achievable this run,
   use the `assets/images/og-image.png` placeholder rather than ship a broken/off-brand image.
6. **Wire the site:** add the `blog.html` card (top of `.case-grid`), the `sitemap.xml` `<url>` (+
   hreflang if an EN twin exists).
7. **SAFETY GATES — all must pass to auto-publish.** Run them; if ANY fails, do not merge → open a PR
   `[review needed] <reason>` and stop.
   - [ ] **Dedup:** not a duplicate/cannibal of an existing post.
   - [ ] **Keyword:** real search volume, intent fits, not already owned by us.
   - [ ] **Build:** `git grep -nE '"(\.\./|case-study\.css)'` on the new file returns nothing; lemlist
         tag present; global nav + footer present; no leftover `{{…}}`.
   - [ ] **Schema:** both JSON-LD blocks parse (Article + FAQPage).
   - [ ] **Truth:** every hard number is sourced or clearly first-party; **no fabricated Storm X stats**;
         no unverifiable proprietary claim. If a needed number can't be sourced, omit it.
   - [ ] **Confidentiality:** nothing from a call/email/Lemlist that could identify a prospect (no names,
         sectors, deal sizes, identifying detail).
   - [ ] **Claims:** no pricing/guarantee beyond what's already public on the site, unless framed as a
         general market benchmark.
8. **Publish.** Commit, push, open the PR. If **all** gates passed → **squash-merge to `main`** (Vercel
   deploys). If any gate failed → leave the `[review needed]` PR open, unmerged.
9. **Verify + log.** Fetch the live URL to confirm the deploy. Append one line to `TOPIC-LEDGER.md`
   (date · slug · keyword · sources · `published`/`needs-review`/`skipped:<reason>`) and commit it.
   Advance the rotation pointer.
10. **Stop.** Exactly one post (or one clean skip) per run. Never bulk-publish.

## Hard rules (no human gate, so these are absolute)
- **Skip > junk.** If you can't find a non-duplicate, well-sourced topic that clears every gate, commit
  nothing this run and log `skipped: <reason>`. A missed slot is harmless; a bad live post is not.
- One post per run. Never touch unrelated files. Don't rewrite existing posts except in explicit
  "optimize" mode (and then only the targeted page).
- Keep `main` deployable: always branch from the latest `main`; if it moved mid-run, re-sync.
- Respect the editorial rule: "pubblichiamo solo quello che vorremmo aver letto" — quality over volume.

## Enabling the schedule (one-time, Claude Code web UI)
Claude Code on the web runs this on a schedule via an environment **trigger** — this can't be created
from inside a session, you flip it on once in the web UI:
1. Open this environment/repo in Claude Code on the web → **Schedules / Triggers**.
2. Add a **scheduled trigger**, twice a week (e.g. Tue & Fri 09:00 Europe/Rome).
3. Set its prompt to the single line under "How a run is triggered" above.
Docs: https://code.claude.com/docs/en/claude-code-on-the-web

To switch off auto-publish later, change Step 7/8 to "always open a PR, never merge" — one-line edit.
