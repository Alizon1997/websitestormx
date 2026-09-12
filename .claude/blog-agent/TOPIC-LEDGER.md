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
_Refreshed 2026-09-12 from a live scan of `blog/` + `en/blog/` on `main` (this list had drifted well behind
the filesystem — several runs published without updating it). Filesystem remains the source of truth._
- `blog/lead-generation-cos-e/` — lead generation B2B (cos'è / come funziona)
- `blog/agenzia-lead-generation-b2b/` — come scegliere un'agenzia di lead gen B2B
- `blog/outbound-vs-inbound-marketing/` — **outbound marketing** + outbound vs inbound (owns these terms)
- `blog/cold-email-b2b/` — cold email B2B (guida operativa)
- `blog/appointment-setting-b2b/` — appointment setting B2B
- `blog/come-automatizzare-business-con-ai/` — automatizzare il business con l'AI
- `blog/automatizzare-assistenza-clienti-ai/` — automatizzare l'assistenza clienti con l'AI
- `blog/ai-processi-vendita-b2b/` — AI nei processi di vendita B2B (guida 2026)
- `blog/agenti-vocali-ai-per-aziende/` — agenti vocali AI (stato dell'arte)
- `blog/centralino-ai-per-aziende/` — centralino AI per aziende
- `blog/segreteria-telefonica-ai-studi-professionali/` — segreteria telefonica AI per studi professionali
- `blog/agente-vocale-ai-qualificare-lead/` — agente vocale AI per qualificare i lead
- `blog/make-com-vs-zapier-confronto/` — Make.com vs Zapier
- `blog/integrare-crm-fatturazione-automatica/` — integrare CRM e fatturazione senza sviluppatori
- `blog/software-su-misura-pmi/` — software su misura per PMI
- `blog/linkedin-outreach-b2b/` — LinkedIn outreach B2B
- `blog/tanti-contatti-pochi-appuntamenti/` — follow-up / collo di bottiglia appuntamenti
- `blog/trovare-clienti-esteri-b2b/` — trovare clienti esteri B2B
- `blog/case-holistic-unity/`, `blog/caso-studio-abeec/`, `blog/caso-studio-reebok/`, `blog/caso-studio-profood/` — case study
- EN: `en/blog/what-is-lead-generation/`, `en/blog/b2b-lead-generation-agency/`, `en/blog/outbound-vs-inbound-marketing/`

Coverage note: every theme in the rotation below now has 2+ posts (voice AI has 4: general state-of-the-art,
centralino, segreteria telefonica for cliniche/studi, qualificazione lead). Future picks need a genuinely
undifferentiated angle + a validated keyword, not just "next theme in rotation" — check hard before writing.

## Run log (append one line per run: date · slug · keyword · sources · status)
<!-- e.g. 2026-06-17 · agenti-vocali-ai-cliniche · "centralino ai cliniche" (90/mo, KD 22) · Circleback+Semrush · published -->
2026-06-14 · cold-email-b2b · "cold email" (110/mo IT, CPC €2.20, low comp) · Semrush phrase_these+phrase_related+Circleback (domain-warming ops pattern) · published
2026-09-12 · (none) · — · — · skipped: Semrush and Ubersuggest MCP both unavailable this run (Semrush needs
  OAuth not available in a non-interactive session; Ubersuggest-SEO failed to connect). Cannot validate real
  keyword volume/difficulty, a mandatory gate (SEO-PLAYBOOK.md §2, AUTONOMOUS-ROUTINE.md Step 7). Per the
  "skip > junk" hard rule, skipped rather than guessing or publishing unvalidated. Rotation pointer left at 2
  (no theme was consumed). Retry once keyword tools are connected.
