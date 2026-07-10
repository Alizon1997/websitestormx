# Topic Ledger — autonomous blog routine

The routine reads this to (a) avoid repeating topics and (b) rotate across service themes. It appends a
log line after every run. **Always also re-scan the live `blog/` + `en/blog/` folders** — this ledger is
a convenience, the filesystem is the source of truth for dedup.

## Theme rotation (round-robin — pick the next, then move the pointer)
> ROTATION POINTER: 4  ← advance after each published post (wraps around)

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
2026-06-17 · centralino-ai-per-aziende · "centralino ai per aziende" · Semrush+Circleback · published (backfilled — missing from this log at the time)
2026-07-10 · automazioni-ai-customer-service · "automazioni AI per il customer service" (keyword not volume-verified this run — Semrush unauthenticated) · web research, no Circleback signal used · needs-review (fail-safe: keyword safety gate unverifiable without Semrush; PR not opened — github MCP also unauthenticated this run, branch pushed for manual PR)
