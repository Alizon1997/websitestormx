# Storm X Digital — SEO Blog Playbook

The methodology the `seo-blog-writer` agent follows to research, structure, and optimize every post.
Read this together with `PUBLISHING-CHECKLIST.md` and the two HTML templates in this folder.

---

## 0. Business context (who we rank for)

**Storm X Digital** builds multichannel outbound systems (Email + LinkedIn + WhatsApp + Phone)
for **B2B SMEs** that want predictable sales pipeline without hiring salespeople. HQ in Italy
(Bisceglie, BA); operating in Italy, UK, France, Spain, Germany, UAE.

We sell, and therefore want to rank for, these themes:

| Service (money page) | IT URL | Core topics / intents |
|---|---|---|
| Multichannel outbound (CORE) | `/services/outbound-sales` | outbound B2B, cold email, lead gen outsourcing, appointment setting |
| AI voice agent / receptionist | `/services/agenti-vocali-ai` | voice AI, AI receptionist, inbound call automation |
| AI automation | `/services/automatizzazioni-ai` | AI for sales/ops, workflow automation, cost reduction |
| Connected software (Make.com) | `/services/make-automazioni` | Make.com, Zapier, CRM/email/calendar integrations |
| Custom software (Claude Code) | `/services/claude-code` | internal tools, AI-native apps, custom integrations |
| Lead generation B2B | `/services/lead-generation-b2b` | lead generation, MQL/SQL, CPL, pipeline |

**Markets/languages:** Italian (primary, `stormxdigital.com`) and English (`/en/`, for international
B2B). Most buyers search in Italian; international buyers in English. Each strong post should ideally
get both an IT version and an EN twin (see hreflang in the templates).

**Every post must ladder up to a money page.** A post earns its place only if it (a) targets a
keyword a real buyer would search and (b) can link naturally to one or more `/services/*` pages.

---

## 1. Brand voice (non-negotiable — this is how we win trust, i.e. EEAT)

Study `blog.html` and any existing `/blog/*` post. The voice is:

- **"Note dal field" / dispatches from the field.** First-person operator who builds and ships these
  systems daily. NOT a content-marketing intern.
- **Anti-hype.** No "10 trucchi che ti svolteranno la vita", no "in questo articolo scoprirai…".
  The editorial rule, literally on the blog index: *"Pubblichiamo solo quello che vorremmo aver letto
  tre anni fa."*
- **Concrete and numeric.** Real ranges, real trade-offs, real failure modes. "Dove uno fa schifo e
  l'altro brilla." Tables of CPL/CAC, time-to-result, conversion rates.
- **Honest about downsides.** Tell people when NOT to buy / NOT to outsource. This is what makes the
  pro-recommendations credible.
- **Italian register:** confident, direct, "tu" form, occasional dry humour. Mix of Italian + accepted
  English jargon (lead, pipeline, outbound, nurturing) exactly as a Bisceglie B2B operator would speak.
- **EN register:** same attitude, idiomatic business English (not translated-from-Italian English).

### Truthfulness guardrails (critical)
- **Never fabricate Storm X performance numbers.** Only cite Storm-X-specific results that already
  exist on the site / in `llms.txt` (e.g. Isolcore: 97 lead, pipeline >€1M, +218% ricavi; Profood:
  €345K+ ordini; Reliance Medical: €4.5M pipeline; Reebok: €2,5M pipeline; Abeec: €40K/mese). If you
  want a new stat, mark it `{{VERIFY: …}}` and ask the user — do not invent it.
- Industry-wide ranges (CPL by channel, sales-cycle lengths, etc.) are fine if presented as general
  benchmarks, consistent with how existing posts do it. Don't dress a benchmark up as proprietary data.
- No competitor defamation. Compare on facts (price, latency, features), never invent flaws.
- **Cite the source — always.** Every external fact or statistic must name its source in-line: a study
  ("Gartner 2024"), a named report, or a clearly-labelled first-party source ("dai nostri dati di
  campagna", "caso Profood: open rate 34,6%"). Marcello's rule: a fact without a named source doesn't
  get published — sourcing is what builds credibility (E-E-A-T). Prefer real first-party numbers (case
  studies, Lemlist campaign stats) over generic benchmarks, and link the case study when you cite it.

---

## 2. Keyword research workflow (Semrush + Ubersuggest)

> Semrush MCP is two-step per toolkit: discovery tool (e.g. `keyword_research`) → `get_report_schema`
> → `execute_report`. Default `database`/locale: **`it`** for Italian posts, **`us`** or **`uk`** for
> English. Use `display_limit` 30–50 for exploration. Ubersuggest needs a `locId` (Italy ≈ 2380, US
> ≈ 2840, UK ≈ 2826) and `language` (`it`/`en`) — confirm with its location tools if unsure.

**Step A — Seed & expand.** Start from the topic (or, if topic-discovery mode, from the service
themes above). Pull related keywords, questions, and "also rank for" terms:
- Semrush `keyword_research` → reports for related keywords, questions, keyword overview.
- Ubersuggest `keyword_suggestions` / `google_suggestions` / `keyword_overview` for volume + difficulty.

**Step B — Pick ONE primary keyword.** Choose for **intent + winnability**, not raw volume:
- Prefer **B2B commercial / informational-with-buying-intent** terms (e.g. "agenzia lead generation
  b2b", "agenti vocali ai per aziende") over generic high-volume B2C terms.
- Winnability: favour keyword difficulty roughly ≤ 40–50 given the site's current authority. Check
  what already ranks (`serp_analysis` / Semrush SERP features) — if page 1 is all DR80 giants and we
  have nothing differentiated to add, pick a longer-tail variant.
- Avoid cannibalisation: check we don't already target it. Pull our own ranked keywords/pages
  (`mcp__Ubersuggest_SEO__domain_keywords` / `page_keywords`, or Semrush `organic_research`,
  `url_research`) for `stormxdigital.com`. If a post already owns the term, improve that post instead.

**Step C — Build the keyword set.**
- 1 **primary** (goes in title, H1, URL slug, meta description, first 100 words, one H2).
- 4–8 **secondary / semantic** keywords (one per H2/H3, woven naturally).
- A list of **People-Also-Ask questions** → these become the FAQ section (+ FAQPage schema).

**Step D — Competitive gap (for topic discovery).** To find what to write next:
- Semrush **Keyword Gap** (in `organic_research`) between `stormxdigital.com` and 2–3 competitors,
  or Ubersuggest `competitors` + `domain_keywords` on a competitor → keywords they rank for and we
  don't, filtered to our service themes. Surface the top 5–10 opportunities to the user with
  volume/difficulty/intent before writing.

**Always record** the chosen primary keyword, its volume + difficulty, the secondary set, and the
PAA questions in the PR description so decisions are auditable.

---

## 3. On-page SEO checklist (apply to every article)

- **URL slug:** short, hyphenated, contains the primary keyword. IT → `/blog/<slug>`; EN → its own
  English slug under `/en/blog/<en-slug>`. Never change a published slug (breaks links + rankings).
- **Title tag (`<title>`):** ≤ ~60 chars before `· Storm X Digital`; primary keyword near the front.
- **Meta description:** 140–160 chars, primary keyword + a concrete promise/number. Written to earn
  the click, not to keyword-stuff.
- **H1:** exactly one; contains the primary keyword; uses the `<em>` accent on the punchy word (matches
  the house style, e.g. *"…come funziona <em>davvero</em> nel 2026"*).
- **Heading hierarchy:** H2 for sections, H3 for sub-points. One secondary keyword per H2 where natural.
- **First 100 words:** state the primary keyword, ideally phrased as the user's search question.
- **TL;DR blockquote** up top (answer-first → wins featured snippets and satisfies impatient buyers).
- **Internal links:** 2–4 to `/services/*` money pages (exact-ish anchor text) + 1–3 to sibling
  `/blog/*` posts (topic cluster). Use absolute paths.
- **External links:** only to authoritative sources, sparingly. Not required.
- **Tables / lists:** at least one comparison table or structured list (snippet bait + matches house
  style). Keep numbers honest (see §1 guardrails).
- **FAQ section** mapped 1:1 to **FAQPage** JSON-LD (templates include the block).
- **Article + (optional) FAQPage JSON-LD** filled in completely; `datePublished` = today.
- **Length:** match intent. Pillar/informational guides 1,800–3,000 words (existing ones are
  10–14 min reads); narrower how-tos 1,000–1,600. Read-time minutes ≈ words ÷ 220.
- **Cover image:** the blog.html card needs `/assets/images/blog/<slug>.png` (16:9). Generate it
  with **FAL.AI Recraft V3** in the brand palette (off-white `#F8F7F4`, near-black `#0F0F0F`,
  orange `#FF5500`), convert to PNG, and point the card + the article's `og:image` at it. Full
  procedure (and the FAL_KEY / no-hardcoded-key rule) in `PUBLISHING-CHECKLIST.md` §B.
- **Accessibility/perf:** `alt` text on images; `loading="lazy"` on the card cover; no inline JS beyond
  the existing mobile-menu toggle.

---

## 4. Sourcing topics (Circleback calls, Lemlist, email, own research)

Pull topic ideas from real signals, not just imagination. Good sources, richest first:
- **Circleback prospect calls** (`mcp__Circleback__Search*` / `ReadMeetings` / `GetTranscriptsForMeetings`)
  — recurring questions/objections across calls = exactly what buyers Google.
- **Lemlist campaigns** (`mcp__lemlist__get_campaigns` / `get_campaign_sequences` / reply & call data) —
  the angles that get replies and the questions leads actually ask are strong topic + keyword seeds, and a
  source of real first-party stats to cite (open/reply rates).
- **Email** (`mcp__Gmail__search_threads` / `mcp__Circleback__SearchEmails`) — recurring prospect/customer
  questions in the inbox.
- **Your own research** — Semrush/Ubersuggest keyword gaps, SERP analysis, and the web.

All of the above are **confidential / first-party** — treat them as a source of *recurring questions,
objections, and pain points*, never as quotable material. Always validate a candidate topic against real
search demand (§2) before writing, and when you cite a number from them, name the source (§1).

**Workflow:**
1. `mcp__Circleback__SearchMeetings` / `SearchTranscripts` over recent calls (filter by date and, if
   useful, tags via `ListTags`). Look across calls for **patterns** — the same objection or question
   asked by multiple prospects is gold (it's also what people Google).
2. `ReadMeetings` / `GetTranscriptsForMeetings` on the 2–4 most relevant to extract the real language
   buyers use (their words → great keyword seeds and H2 phrasing).
3. Convert the pattern into a **search-intent topic**, then validate it with the §2 keyword workflow.
   (A pain point only becomes a post if real search volume backs it.)

**Anonymisation (hard rules):**
- No company names, person names, sectors specific enough to identify, deal sizes, or any detail that
  could fingerprint a prospect. Generalise ("a logistics SME we spoke with" → "many ops-heavy SMEs").
- Never paste transcript quotes. Paraphrase the *question*, not the *conversation*.
- When in doubt, ask the user before publishing. The PR description must state which call themes
  inspired the post so the user can sanity-check the anonymisation at review time.

---

## 5. Quality gate before opening the PR

Run this self-review; fix anything that fails:
- [ ] Primary keyword in: title, H1, slug, meta, first 100 words, ≥1 H2. Not stuffed elsewhere.
- [ ] Reads like a Storm X operator wrote it (voice §1), not like generic AI content.
- [ ] Every Storm-X number is real/cited or marked `{{VERIFY}}`. No invented proprietary stats.
- [ ] All paths absolute; lemlist tag present; global nav present; footer present.
- [ ] hreflang correct; canonical correct; JSON-LD valid (Article + FAQPage if FAQ exists).
- [ ] 2–4 internal links to services + sibling posts; anchors read naturally.
- [ ] blog.html card added (top of `.case-grid`) + sitemap `<url>` added + (EN twin wired if built).
- [ ] If a call inspired it: anonymisation passes; inspiration noted in PR description.
- [ ] Open as a PR for review. NEVER merge to `main` without explicit user approval.
