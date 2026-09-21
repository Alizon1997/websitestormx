# Topic Ledger — autonomous blog routine

The routine reads this to (a) avoid repeating topics and (b) rotate across service themes. It appends a
log line after every run. **Always also re-scan the live `blog/` + `en/blog/` folders** — this ledger is
a convenience, the filesystem is the source of truth for dedup.

## Theme rotation (round-robin — pick the next, then move the pointer)
> ROTATION POINTER: 3  ← advance after each published post (wraps around)
> **2026-09-21 note:** this list is now heavily saturated on `main` — themes 1-7 *all* already have at
> least one live post, and themes 2, 3 and 6 have 3-5 each (see "Already covered" below, which was
> rebuilt from the actual filesystem this run, not carried over from a stale prior version). Mechanically
> advancing the pointer is losing usefulness as a dedup/rotation aid; a human should refresh this list
> with genuinely uncovered sub-angles per theme next time it's touched. Until then, treat the pointer as
> a rough steer only — the real dedup gate is always the live re-scan of `blog/*` + `en/blog/*`.

1. **Outbound / cold email** — e.g. deliverability & warming dei domini. ~~cold email a norma GDPR in Italia~~ (covered: `blog/cold-email-b2b/`). ~~ICP B2B come si definisce~~ (covered 2026-09-21: `blog/icp-b2b-come-definirlo/`).
2. **AI voice agent** — heavily covered: `blog/agenti-vocali-ai-per-aziende/`, `blog/agente-vocale-ai-qualificare-lead/`, `blog/centralino-ai-per-aziende/`, `blog/segreteria-telefonica-ai-studi-professionali/`. Remaining gap, if any: voice AI per settori verticali specifici non ancora trattati (es. hospitality, real estate).
3. **AI automation** — covered: `blog/come-automatizzare-business-con-ai/`, `blog/ai-processi-vendita-b2b/`, `blog/automatizzare-assistenza-clienti-ai/`. Remaining gap: automazioni AI per un reparto specifico non ancora trattato (es. HR, logistica).
4. **Make / Zapier / integrazioni** — covered: `blog/make-com-vs-zapier-confronto/`, `blog/integrare-crm-fatturazione-automatica/`. Remaining gap: n8n vs Make (ledger history shows multiple stale duplicate PR drafts for this — check open PRs before attempting again).
5. **Custom software (Claude Code)** — covered: `blog/software-su-misura-pmi/`. Remaining gap: app AI-native per PMI, dashboard interne su misura (more specific angle than the existing "quando conviene" post).
6. **Lead gen / pipeline** — covered: `blog/lead-generation-cos-e/`, `blog/agenzia-lead-generation-b2b/`, `blog/appointment-setting-b2b/`, `blog/linkedin-outreach-b2b/`, `blog/tanti-contatti-pochi-appuntamenti/`, and now `blog/icp-b2b-come-definirlo/` (added 2026-09-21). Remaining gap: lead scoring per PMI.
7. **Export / internazionalizzazione** — covered: `blog/trovare-clienti-esteri-b2b/`. Remaining gap: export manager frazionato as its own dedicated angle.

Each candidate above is a *direction*, not a final title — validate the exact keyword with Semrush at run
time (volume + difficulty + intent) and confirm it isn't already owned by an existing post.

## Already covered (do NOT duplicate — re-verify against the live folders)
Rebuilt from a direct `git ls-tree` of `main` on 2026-09-21 — the previous version of this list was
stale (missing ~14 live posts). **Always re-scan `blog/*` + `en/blog/*` directly; do not trust this list
alone.**
- `blog/agente-vocale-ai-qualificare-lead/` — agente vocale AI per qualificare i lead
- `blog/agenti-vocali-ai-per-aziende/` — agenti vocali AI (stato dell'arte)
- `blog/agenzia-lead-generation-b2b/` — come scegliere un'agenzia di lead gen B2B
- `blog/ai-processi-vendita-b2b/` — AI nei processi di vendita B2B
- `blog/appointment-setting-b2b/` — appointment setting B2B (cos'è, pricing, show rate)
- `blog/automatizzare-assistenza-clienti-ai/` — automatizzare l'assistenza clienti con l'AI
- `blog/case-holistic-unity/`, `blog/caso-studio-abeec/`, `blog/caso-studio-reebok/`, `blog/caso-studio-profood/` — case study
- `blog/centralino-ai-per-aziende/` — centralino AI per aziende
- `blog/cold-email-b2b/` — cold email B2B (**owns the GDPR/legittimo interesse angle** via a dedicated H2+FAQ — don't write a separate GDPR post)
- `blog/come-automatizzare-business-con-ai/` — automatizzare il business con l'AI
- `blog/icp-b2b-come-definirlo/` — **ICP B2B: cos'è e come definirlo** (added 2026-09-21, needs-review PR #39)
- `blog/integrare-crm-fatturazione-automatica/` — integrare CRM e fatturazione
- `blog/lead-generation-cos-e/` — lead generation B2B (cos'è / come funziona)
- `blog/linkedin-outreach-b2b/` — LinkedIn outreach B2B
- `blog/make-com-vs-zapier-confronto/` — Make.com vs Zapier
- `blog/outbound-vs-inbound-marketing/` — **outbound marketing** + outbound vs inbound (owns these terms)
- `blog/segreteria-telefonica-ai-studi-professionali/` — segreteria telefonica AI per studi professionali
- `blog/software-su-misura-pmi/` — software su misura per PMI
- `blog/tanti-contatti-pochi-appuntamenti/` — follow-up / collo di bottiglia appuntamenti
- `blog/trovare-clienti-esteri-b2b/` — trovare clienti esteri B2B
- EN: `en/blog/what-is-lead-generation/`, `en/blog/b2b-lead-generation-agency/`, `en/blog/outbound-vs-inbound-marketing/`

## Run log (append one line per run: date · slug · keyword · sources · status)
<!-- e.g. 2026-06-17 · agenti-vocali-ai-cliniche · "centralino ai cliniche" (90/mo, KD 22) · Circleback+Semrush · published -->
2026-06-14 · cold-email-b2b · "cold email" (110/mo IT, CPC €2.20, low comp) · Semrush phrase_these+phrase_related+Circleback (domain-warming ops pattern) · published
2026-09-13 · (none) · (none — keyword research not run) · n/a · skipped: keyword-research tools unavailable this run (Semrush requires OAuth re-auth, non-interactive session cannot complete it; Ubersuggest-SEO MCP server failed to connect). Per hard rule "Skip > junk", did not publish without validated search volume/difficulty. Rotation pointer left unchanged at 2 (AI voice agent) for the next run.
2026-09-16 · (none) · (none — keyword research not run) · n/a · skipped: same blocker as 2026-09-13 — Semrush still requires OAuth re-auth (non-interactive session can't complete it) and the Ubersuggest-SEO MCP server still fails to connect. This is now the persistent state since PR #11 (2026-07-01): 11 open `[review needed]` PRs (#11,12,13,15,18,21,22,24,25,29,32,33) sit unmerged/unreviewed, several duplicating the same "n8n vs Make.com" draft (#18,24,29,32,33). Not opening another draft PR into that pile this run — flagged to the human via notification instead. Rotation pointer left unchanged at 2 (AI voice agent). **Next run: if Semrush/Ubersuggest are still down, stop drafting new "review needed" posts and just log the skip until a human re-authenticates Semrush or clears the backlog.**
2026-09-17 · (none) · (none — keyword research not run) · n/a · skipped: same blocker persists — Semrush still requires OAuth re-auth (non-interactive session can't complete it) and the Ubersuggest-SEO MCP server still fails to connect (404, CLIENT_HTTP_NOT_IMPLEMENTED). Per the note left on 2026-09-16, did not draft another "review needed" post. The backlog is now 11 open unmerged `[review needed]` PRs (#11,12,13,15,18,21,22,24,25,29,32,33), oldest from 2026-07-01. Rotation pointer left unchanged at 2 (AI voice agent). **Still blocked on a human re-authenticating Semrush (or fixing Ubersuggest-SEO) and clearing/closing the PR backlog — logging skip-only until that happens.**
2026-09-18 · (none) · (none — keyword research not run) · n/a · skipped: same blocker persists a 3rd+ consecutive run — Semrush still requires OAuth re-auth (non-interactive session can't complete it) and the Ubersuggest-SEO MCP server still fails to connect (404, CLIENT_HTTP_NOT_IMPLEMENTED). Per the standing note, did not draft another "review needed" post. The backlog is unchanged at 12 open unmerged `[review needed]` PRs (#11,12,13,15,18,21,22,24,25,29,32,33), oldest from 2026-07-01 (~11 weeks). Rotation pointer left unchanged at 2 (AI voice agent). Flagged to the human via notification this run. **Still blocked on a human re-authenticating Semrush (or fixing Ubersuggest-SEO) and clearing/closing the PR backlog — logging skip-only until that happens.**
2026-09-19 · agenti-vocali-ai-per-aziende (refresh, not new) · "agenti vocali AI per aziende" (no live volume/KD — reused an already-owned keyword) · WebSearch+WebFetch(ISTAT)+reuse of existing site figures · needs-review: same blocker (Semrush OAuth, Ubersuggest 404) — instead of a new post, did a low-risk "optimize existing post" refresh of the thinnest AI-voice-agent page (796→~1,915 words, added TL;DR/comparison table/FAQ+FAQPage/sourced ISTAT stat/internal links), opened as PR #37, **not merged** (keyword-volume gate still unmet with real data). Rotation pointer left unchanged at 2 (refresh, no advance). Backlog grew to 13 open unmerged `[review needed]`-style PRs (#11,12,13,15,18,21,22,24,25,29,32,33,37).
2026-09-20 · (none) · (none — keyword research not run) · n/a · skipped: 6th consecutive run blocked on the same root cause — Semrush still requires OAuth re-auth (non-interactive session can't complete it) and the Ubersuggest-SEO MCP server still fails to connect (404, CLIENT_HTTP_NOT_IMPLEMENTED). Per the standing note (and to avoid adding to an already-neglected queue), did not open another PR (new post or refresh) this run — logged a plain skip instead. Backlog remains **13 open unmerged PRs** (#11,12,13,15,18,21,22,24,25,29,32,33,37), oldest (#11) now ~11.5 weeks old; notably #21 ("Come trovare clienti esteri B2B") explicitly says in its own body that it passed every gate and was meant to be squash-merged automatically, yet was never merged — worth a look, since it may be safe to merge as-is. Rotation pointer left unchanged at 2 (AI voice agent). Flagged to the human via notification this run. **Still blocked on a human re-authenticating Semrush (or fixing Ubersuggest-SEO) and triaging/clearing the PR backlog — logging skip-only until that happens.**
2026-09-21 · icp-b2b-come-definirlo · "ICP B2B" / "ideal customer profile b2b come definirlo" (no live Semrush volume/KD — same blocker persists 7th consecutive run) · WebSearch SERP inspection (only small/mid agency blogs on page 1, no DR80 giants) + Circleback (recurring "ICP confusion" pattern across onboarding/discovery calls, anonymised) · needs-review: **first genuinely new post attempted since the Semrush/Ubersuggest outage began** — rather than logging another plain skip, did full qualitative keyword validation (SERP + Circleback) per the fail-safe path, since re-scanning `main` directly found the topic list here was stale (main actually has ~22 live posts, not the ~7 previously listed — rebuilt the "Already covered" list above from the real filesystem). Wrote a new IT-only post targeting "ICP B2B" (not previously owned by any post; considered "cold email GDPR" too but that's already owned by `blog/cold-email-b2b/`'s dedicated H2+FAQ, skipped to avoid cannibalization). All gates passed except the quantitative keyword-volume one (Semrush/Ubersuggest down) — opened as **PR #39**, NOT auto-merged, NOT squash-merged, left for human review. Rotation pointer advanced 2→3 (theme 2 skipped this run as already heavily saturated — see rotation-list note above). Backlog is now **14 open unmerged `[review needed]`-style PRs** (#11,12,13,15,18,21,22,24,25,29,32,33,37,39) — still recommend a human triage/clear pass; #21 in particular reportedly passed every gate and was never merged.
