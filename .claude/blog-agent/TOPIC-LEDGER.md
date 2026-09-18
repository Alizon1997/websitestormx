# Topic Ledger — autonomous blog routine

The routine reads this to (a) avoid repeating topics and (b) rotate across service themes. It appends a
log line after every run. **Always also re-scan the live `blog/` + `en/blog/` folders** — this ledger is
a convenience, the filesystem is the source of truth for dedup.

## Theme rotation (round-robin — pick the next, then move the pointer)
> ROTATION POINTER: 2  ← advance after each published post (wraps around)

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
- `blog/lead-generation-cos-e/` — lead generation B2B (cos'è / come funziona)
- `blog/agenzia-lead-generation-b2b/` — come scegliere un'agenzia di lead gen B2B
- `blog/outbound-vs-inbound-marketing/` — **outbound marketing** + outbound vs inbound (owns these terms)
- `blog/come-automatizzare-business-con-ai/` — automatizzare il business con l'AI
- `blog/agenti-vocali-ai-per-aziende/` — agenti vocali AI (stato dell'arte)
- `blog/make-com-vs-zapier-confronto/` — Make.com vs Zapier
- `blog/tanti-contatti-pochi-appuntamenti/` — follow-up / collo di bottiglia appuntamenti
- `blog/case-holistic-unity/`, `blog/caso-studio-abeec/`, `blog/caso-studio-reebok/`, `blog/caso-studio-profood/` — case study
- EN: `en/blog/what-is-lead-generation/`, `en/blog/b2b-lead-generation-agency/`, `en/blog/outbound-vs-inbound-marketing/`

## Run log (append one line per run: date · slug · keyword · sources · status)
<!-- e.g. 2026-06-17 · agenti-vocali-ai-cliniche · "centralino ai cliniche" (90/mo, KD 22) · Circleback+Semrush · published -->
2026-06-14 · cold-email-b2b · "cold email" (110/mo IT, CPC €2.20, low comp) · Semrush phrase_these+phrase_related+Circleback (domain-warming ops pattern) · published
2026-09-13 · (none) · (none — keyword research not run) · n/a · skipped: keyword-research tools unavailable this run (Semrush requires OAuth re-auth, non-interactive session cannot complete it; Ubersuggest-SEO MCP server failed to connect). Per hard rule "Skip > junk", did not publish without validated search volume/difficulty. Rotation pointer left unchanged at 2 (AI voice agent) for the next run.
2026-09-16 · (none) · (none — keyword research not run) · n/a · skipped: same blocker as 2026-09-13 — Semrush still requires OAuth re-auth (non-interactive session can't complete it) and the Ubersuggest-SEO MCP server still fails to connect. This is now the persistent state since PR #11 (2026-07-01): 11 open `[review needed]` PRs (#11,12,13,15,18,21,22,24,25,29,32,33) sit unmerged/unreviewed, several duplicating the same "n8n vs Make.com" draft (#18,24,29,32,33). Not opening another draft PR into that pile this run — flagged to the human via notification instead. Rotation pointer left unchanged at 2 (AI voice agent). **Next run: if Semrush/Ubersuggest are still down, stop drafting new "review needed" posts and just log the skip until a human re-authenticates Semrush or clears the backlog.**
2026-09-17 · (none) · (none — keyword research not run) · n/a · skipped: same blocker persists — Semrush still requires OAuth re-auth (non-interactive session can't complete it) and the Ubersuggest-SEO MCP server still fails to connect (404, CLIENT_HTTP_NOT_IMPLEMENTED). Per the note left on 2026-09-16, did not draft another "review needed" post. The backlog is now 11 open unmerged `[review needed]` PRs (#11,12,13,15,18,21,22,24,25,29,32,33), oldest from 2026-07-01. Rotation pointer left unchanged at 2 (AI voice agent). **Still blocked on a human re-authenticating Semrush (or fixing Ubersuggest-SEO) and clearing/closing the PR backlog — logging skip-only until that happens.**
2026-09-18 · (none) · (none — keyword research not run) · n/a · skipped: same blocker persists a 3rd+ consecutive run — Semrush still requires OAuth re-auth (non-interactive session can't complete it) and the Ubersuggest-SEO MCP server still fails to connect (404, CLIENT_HTTP_NOT_IMPLEMENTED). Per the standing note, did not draft another "review needed" post. The backlog is unchanged at 12 open unmerged `[review needed]` PRs (#11,12,13,15,18,21,22,24,25,29,32,33), oldest from 2026-07-01 (~11 weeks). Rotation pointer left unchanged at 2 (AI voice agent). Flagged to the human via notification this run. **Still blocked on a human re-authenticating Semrush (or fixing Ubersuggest-SEO) and clearing/closing the PR backlog — logging skip-only until that happens.**
