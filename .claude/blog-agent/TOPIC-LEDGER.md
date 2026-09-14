# Topic Ledger — autonomous blog routine

The routine reads this to (a) avoid repeating topics and (b) rotate across service themes. It appends a
log line after every run. **Always also re-scan the live `blog/` + `en/blog/` folders** — this ledger is
a convenience, the filesystem is the source of truth for dedup.

## Theme rotation (round-robin — pick the next, then move the pointer)
> ROTATION POINTER: 5  ← advance after each published post (wraps around)

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
> Refreshed 2026-09-14 by full re-scan of `blog/*` and `en/blog/*` — the list below was stale (missing
> ~13 published posts) before this update. Re-scan the filesystem every run regardless; this is a cache.
- `blog/lead-generation-cos-e/` — lead generation B2B (cos'è / come funziona)
- `blog/agenzia-lead-generation-b2b/` — come scegliere un'agenzia di lead gen B2B
- `blog/outbound-vs-inbound-marketing/` — **outbound marketing** + outbound vs inbound (owns these terms)
- `blog/cold-email-b2b/` — cold email B2B (deliverability, GDPR, warming)
- `blog/come-automatizzare-business-con-ai/` — automatizzare il business con l'AI (quadro generale)
- `blog/agenti-vocali-ai-per-aziende/` — agenti vocali AI (stato dell'arte 2026)
- `blog/centralino-ai-per-aziende/` — centralino AI per aziende (costi, integrazione)
- `blog/segreteria-telefonica-ai-studi-professionali/` — segreteria telefonica AI per studi professionali (quanto costa)
- `blog/agente-vocale-ai-qualificare-lead/` — agente vocale AI per qualificare i lead
- `blog/ai-processi-vendita-b2b/` — AI nei processi di vendita B2B
- `blog/automatizzare-assistenza-clienti-ai/` — automatizzare l'assistenza clienti con l'AI
- `blog/make-com-vs-zapier-confronto/` — Make.com vs Zapier
- `blog/n8n-vs-make/` — n8n vs Make.com (self-hosting, GDPR, prezzi)
- `blog/integrare-crm-fatturazione-automatica/` — integrare CRM e fatturazione senza sviluppatori
- `blog/software-su-misura-pmi/` — software su misura vs a pacchetto per PMI
- `blog/appointment-setting-b2b/` — appointment setting B2B (pricing, show rate)
- `blog/linkedin-outreach-b2b/` — LinkedIn outreach B2B
- `blog/tanti-contatti-pochi-appuntamenti/` — follow-up / collo di bottiglia appuntamenti
- `blog/trovare-clienti-esteri-b2b/` — trovare clienti/buyer esteri B2B
- `blog/case-holistic-unity/`, `blog/caso-studio-abeec/`, `blog/caso-studio-reebok/`, `blog/caso-studio-profood/` — case study
- EN: `en/blog/what-is-lead-generation/`, `en/blog/b2b-lead-generation-agency/`, `en/blog/outbound-vs-inbound-marketing/`

## Rotation themes already saturated (obvious sub-topics taken — need a genuinely new angle, not a rewrite)
- **Theme 2 (AI voice agent):** general overview, centralino, segreteria telefonica (+ cost angle), lead
  qualification are all covered. A remaining gap: a vertical-specific angle (e.g. cliniche/studi medici)
  IF it has real distinct search volume — check for cannibalisation with `segreteria-telefonica-ai-studi-professionali`
  before writing.
- **Theme 3 (AI automation):** general automation, sales-process AI, customer-service AI all covered
  (each already has its own "quanto costa" + "errori comuni" section). "Ridurre i costi operativi con
  l'AI" would cannibalize `come-automatizzare-business-con-ai` — skip unless a sharply different angle
  appears (e.g. a specific vertical or function not yet covered).

## Run log (append one line per run: date · slug · keyword · sources · status)
<!-- e.g. 2026-06-17 · agenti-vocali-ai-cliniche · "centralino ai cliniche" (90/mo, KD 22) · Circleback+Semrush · published -->
2026-06-14 · cold-email-b2b · "cold email" (110/mo IT, CPC €2.20, low comp) · Semrush phrase_these+phrase_related+Circleback (domain-warming ops pattern) · published
2026-09-13 · (none) · (none — keyword research not run) · n/a · skipped: keyword-research tools unavailable this run (Semrush requires OAuth re-auth, non-interactive session cannot complete it; Ubersuggest-SEO MCP server failed to connect). Per hard rule "Skip > junk", did not publish without validated search volume/difficulty. Rotation pointer left unchanged at 2 (AI voice agent) for the next run.
2026-09-14 · n8n-vs-make · "n8n vs Make.com" · manual/web validation only (Semrush OAuth unavailable non-interactively; Ubersuggest-SEO MCP failed to connect — both flagged to the site owner) + official pricing pages (make.com/pricing, n8n.io/pricing) + qualitative SERP check (multiple IT/EN competitor comparisons already rank incl. Make's own official n8n-comparison page, confirming real demand; no fabricated volume/KD numbers) · needs-review (PR open, unmerged — see PR for gate status). Theme rotation note: pointer was at 2 (AI voice agent) but re-scanning `blog/*` found theme 2's candidate angles (centralino, segreteria telefonica + cost, lead qualification) already published, and theme 3 (AI automation) likewise saturated (general/sales/customer-service AI all covered) — see "Rotation themes already saturated" above. Per the dedup gate ("if the best keyword is already owned... pick the next theme"), moved to theme 4 (Make/Zapier/integrazioni) and validated "n8n vs Make" as a clean, unclaimed topic (`git grep -i n8n` on `blog/`+`services/` returned no text mentions before this post). Pointer advanced to 5 (Custom software / Claude Code) for the next run.
