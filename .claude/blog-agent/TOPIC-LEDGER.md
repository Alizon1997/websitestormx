# Topic Ledger — autonomous blog routine

The routine reads this to (a) avoid repeating topics and (b) rotate across service themes. It appends a
log line after every run. **Always also re-scan the live `blog/` + `en/blog/` folders** — this ledger is
a convenience, the filesystem is the source of truth for dedup.

## Theme rotation (round-robin — pick the next, then move the pointer)
> ROTATION POINTER: 2  ← advance after each published post (wraps around)
> NOTE (2026-09-15): theme 2 (AI voice agent) is now saturated — 4 dedicated live posts already
> cover its example angles (centralino, segreteria telefonica, lead qualification, state-of-the-art
> overview). Next run should treat theme 2 as done and move to theme 3, unless a genuinely new
> angle/keyword surfaces. This run instead used theme 4 (n8n vs Make.com — see run log) since 4 had
> a clear, uncovered, high-confidence angle; pointer left at 2 below since that post is still an
> unmerged `[review needed]` PR, not a confirmed publish.

1. **Outbound / cold email** — e.g. deliverability & warming dei domini, cold email a norma GDPR in Italia, ICP B2B come si definisce.
2. **AI voice agent** — e.g. centralino / segreteria telefonica AI per studi e cliniche, quanto costa un agente vocale AI, voice AI per qualificare i lead.
3. **AI automation** — e.g. automazioni AI per il customer service, AI nei processi di vendita B2B, ridurre i costi operativi con l'AI.
4. **Make / Zapier / integrazioni** — e.g. n8n vs Make, automatizzare il CRM (Pipedrive), collegare e-commerce + fatturazione + CRM.
5. **Custom software (Claude Code)** — e.g. gestionale su misura vs software a pacchetto, app AI-native per PMI, dashboard interne su misura.
6. **Lead gen / pipeline** — e.g. appuntamenti qualificati B2B, LinkedIn outreach B2B, lead scoring per PMI.
7. **Export / internazionalizzazione** (punto di forza Storm X) — e.g. trovare buyer esteri B2B, export manager frazionato, vendere all'estero senza rete commerciale locale.

Each candidate above is a *direction*, not a final title — validate the exact keyword with Semrush at run
time (volume + difficulty + intent) and confirm it isn't already owned by an existing post.

## Already covered (do NOT duplicate — re-verify against the live folders)
> This list was stale as of 2026-09-15 (filesystem had 22 IT posts vs ~10 listed here) — always
> re-scan `blog/*` + `en/blog/*` directly, this list is a convenience only. Refreshed below.
- `blog/lead-generation-cos-e/` — lead generation B2B (cos'è / come funziona)
- `blog/agenzia-lead-generation-b2b/` — come scegliere un'agenzia di lead gen B2B
- `blog/outbound-vs-inbound-marketing/` — **outbound marketing** + outbound vs inbound (owns these terms)
- `blog/come-automatizzare-business-con-ai/` — automatizzare il business con l'AI
- `blog/agenti-vocali-ai-per-aziende/` — agenti vocali AI (stato dell'arte)
- `blog/agente-vocale-ai-qualificare-lead/` — agente vocale AI per qualificare i lead
- `blog/centralino-ai-per-aziende/` — centralino AI (costi, integrazione)
- `blog/segreteria-telefonica-ai-studi-professionali/` — segreteria telefonica AI per studi professionali
- `blog/ai-processi-vendita-b2b/` — AI nei processi di vendita B2B
- `blog/automatizzare-assistenza-clienti-ai/` — automatizzare l'assistenza clienti con l'AI
- `blog/make-com-vs-zapier-confronto/` — Make.com vs Zapier
- `blog/n8n-vs-make/` — n8n vs Make.com (PR #33, `[review needed]` as of 2026-09-15, not yet merged)
- `blog/integrare-crm-fatturazione-automatica/` — integrare CRM e fatturazione
- `blog/software-su-misura-pmi/` — software su misura vs a pacchetto per PMI
- `blog/appointment-setting-b2b/` — appointment setting B2B
- `blog/linkedin-outreach-b2b/` — LinkedIn outreach B2B
- `blog/cold-email-b2b/` — cold email B2B
- `blog/trovare-clienti-esteri-b2b/` — trovare clienti esteri B2B
- `blog/tanti-contatti-pochi-appuntamenti/` — follow-up / collo di bottiglia appuntamenti
- `blog/case-holistic-unity/`, `blog/caso-studio-abeec/`, `blog/caso-studio-reebok/`, `blog/caso-studio-profood/` — case study
- EN: `en/blog/what-is-lead-generation/`, `en/blog/b2b-lead-generation-agency/`, `en/blog/outbound-vs-inbound-marketing/`

## Run log (append one line per run: date · slug · keyword · sources · status)
<!-- e.g. 2026-06-17 · agenti-vocali-ai-cliniche · "centralino ai cliniche" (90/mo, KD 22) · Circleback+Semrush · published -->
2026-06-14 · cold-email-b2b · "cold email" (110/mo IT, CPC €2.20, low comp) · Semrush phrase_these+phrase_related+Circleback (domain-warming ops pattern) · published
2026-09-13 · (none) · (none — keyword research not run) · n/a · skipped: keyword-research tools unavailable this run (Semrush requires OAuth re-auth, non-interactive session cannot complete it; Ubersuggest-SEO MCP server failed to connect). Per hard rule "Skip > junk", did not publish without validated search volume/difficulty. Rotation pointer left unchanged at 2 (AI voice agent) for the next run.
2026-09-15 · n8n-vs-make · "n8n vs Make.com" / "n8n vs Make" (comparison, informational→commercial intent; volume/KD NOT verified live — Semrush OAuth unavailable again, Ubersuggest-SEO MCP still failing to connect) · Circleback (internal team calls re: migrating our own high-volume automations from Make to self-hosted n8n, anonymised) + independent confidence signals (Make.com's own official make-vs-n8n comparison landing page; 8+ independent 2026 comparison articles found via WebSearch; n8n pricing/plan facts verified live via WebFetch against make.com/pricing + n8n.io/pricing) · needs-review: PR #33 (https://github.com/Alizon1997/websitestormx/pull/33) opened, NOT auto-merged — every other gate passed (dedup vs full live blog/ scan, build, schema, truth/sourcing, confidentiality, claims) but keyword volume/difficulty couldn't be confirmed with live Semrush/Ubersuggest data this run, so per the fail-safe rule this stops at review instead of merging. Also flagged in the PR: no cover image generated (FAL.AI account locked/TOP_UP required), card + og:image use the og-image.png placeholder pending a real poster cover. Rotation pointer left unchanged at 2 pending PR outcome — see rotation-pointer note above (theme 2 is saturated; next confirmed-published post should target theme 3 unless this PR merges, in which case treat theme 4 as consumed and move to theme 5).
