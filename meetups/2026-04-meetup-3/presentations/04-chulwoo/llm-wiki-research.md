# LLM Wiki: Research Notes (April 2026)

> **Source disclaimer.** This document is the synthesis underlying slides 1–15 of `materials/index.html`, prepared for the 2026-04-25 Elbaph 3rd meetup. The research was originally captured during a Codex session in the lead-up to the talk; this file restructures and expands that captured content into a longer reference. **All dates, version numbers, repo names, and stat figures here come from the slide content as recorded — they have not been re-verified against the live web for this document.** Treat as working notes, not a primary citation. The full URL list is in §11.

---

## TL;DR

Andrej Karpathy posted a Gist in early April 2026 proposing **LLM Wiki**: a workflow where an LLM continuously *compiles* knowledge into a maintained markdown vault rather than re-synthesizing it on every query (the RAG default). Within three weeks the idea spawned a small ecosystem — a v2 spec adding lifecycle controls (confidence, supersession, forgetting, memory tiers), critical essays distinguishing it from RAG and from PKM, and at least five public implementations spanning local Obsidian vaults, npm CLIs, MCP servers, and graph-first multimodal compilers.

The recurring claim across the ecosystem: **the schema is the actual product**. The wiki is just the output. The compile-time, ingest policy, citation rules, and supersession behavior — encoded in a project-level `AGENTS.md` / `CLAUDE.md` — are what determine whether the resulting vault stays trustworthy or rots.

---

## 1. The original idea — Karpathy's Gist

**Posted:** Apr 4, 2026 (per slide; not re-verified)
**Form:** A single GitHub Gist, not a framework or library — designed to be copied verbatim into an agent's operating instructions (Codex, Claude Code, etc.).
**Reception:** ~5,000+ stars/forks within weeks (per slide).
**URL:** https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

### What it actually proposed

The Gist defined a folder convention plus a small set of operating rules. Roughly:

```
raw/
  articles/
  papers/
  screenshots/

wiki/
  index.md
  log.md
  entities/
  concepts/
  syntheses/

schema/
  AGENTS.md
  CLAUDE.md
```

Three roles, strictly separated:

- **`raw/`** — the source of truth. The LLM reads from this layer but never modifies it. Articles, papers, screenshots, transcripts, datasheets.
- **`wiki/`** — the maintained knowledge layer. Markdown files representing entities, concepts, syntheses, and comparisons. The LLM owns this layer and rewrites it as new sources arrive.
- **`schema/`** — the operating contract. `AGENTS.md` / `CLAUDE.md` instruct the LLM on how to ingest, when to create vs. update pages, how to cite, what to lint.

### Why this framing matters

The shift is in **when synthesis happens**:

- **RAG default:** synthesis is lazy. Every query re-fetches chunks, re-stuffs the context, re-synthesizes the answer. The good thinking dies in the chat log.
- **LLM Wiki:** synthesis is eager. Sources are read once, normalized into wiki pages on ingest, and the *next* query starts from already-compiled material. Good answers are written back into the wiki as durable artifacts.

That single flip cascades into different cost profiles, different accuracy failure modes, and a different maintenance burden — which is why the rest of the ecosystem fixates on the schema, the lifecycle, and the lint loop rather than the markdown layout itself.

---

## 2. Three-layer architecture

```
raw/  →  wiki/  →  answers
```

| Layer | Owner | What lives here | What does NOT |
|---|---|---|---|
| `raw/` | Human (or scraper) | PDFs, screenshots, transcripts, papers, logs | Anything the LLM rewrote |
| `wiki/` | LLM | Entities, concepts, syntheses, comparisons | Original sources verbatim |
| Answers | LLM (per query) | Tables, diffs, slides, summaries | Anything that should have been a wiki page |

**Key invariant:** if an answer turned out to be useful, the wiki should grow to absorb it. If the same question comes back, the next answer starts from a richer wiki, not from raw chunks again.

---

## 3. Operational loops — ingest, query, lint

The Gist defined three core loops the LLM is expected to run:

### 3.1 Ingest
When a new source lands in `raw/`:
1. Read it.
2. Identify which existing wiki pages it touches.
3. Update 10–15 related pages — add citations, refine claims, mark contradictions.
4. Create new entity/concept pages only when the source introduces a genuinely new node.

### 3.2 Query
When the user asks a question:
1. Open `index.md` and traverse to relevant pages.
2. Answer from those pages, citing back to the wiki and through to `raw/` where needed.
3. If the answer required real reasoning, write the synthesis back into `wiki/syntheses/`.

### 3.3 Lint
Periodic maintenance pass:
1. Find contradictions between pages.
2. Flag stale claims (no source confirmation in N days).
3. Find orphan pages (no inbound links).
4. Find broken citations.
5. Surface candidates for merging or splitting.

The lint pass is what separates a *living* wiki from a one-shot summary dump. Most failure modes (see §7) come from skipping it.

---

## 4. LLM Wiki v2 — adding lifecycle

**Author:** rohitg00 (per slide)
**Period:** Apr 8–12, 2026 (per slide)
**URL:** https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2

The v1 Gist answered "how do you compile knowledge?" v2 answered the harder follow-up: **"how do you keep compiled knowledge from rotting?"** Four additions, all about lifecycle:

### 4.1 Confidence
Every claim carries a score reflecting:
- How many sources support it
- How recently those sources were checked
- Whether the LLM or a human last touched it

A claim with a single 6-month-old source and no human review should not look the same as one corroborated by three sources confirmed last week.

### 4.2 Supersession
When new info contradicts an old claim, the old claim is **not deleted**. It's marked stale and linked to the superseding claim. This preserves the audit trail — useful for reasoning about *why* the wiki used to say X, and for debugging hallucinations introduced by overconfident rewrites.

### 4.3 Forgetting
Not all information is held with equal weight forever. Pages decay in priority based on access patterns and re-confirmation frequency. Cold pages drift toward archive; hot pages stay first-class.

### 4.4 Memory tiers
Borrowed (loosely) from cognitive science:
- **Working memory** — the active context window for the current task
- **Episodic memory** — recent conversations, raw observations
- **Semantic memory** — compiled wiki pages
- **Procedural memory** — schema rules, repeated patterns, preferred lint behaviors

Observations flow from episodic → semantic over time, getting compressed at each step.

> The pull quote from the slides: *"v1이 '지식을 컴파일하자'였다면, v2는 '컴파일된 지식을 어떻게 신뢰할 것인가'에 답한다."*
> Translation: if v1 was "let's compile knowledge," v2 is "how do we trust compiled knowledge."

---

## 5. The schema-first argument

**Source:** "The Schema Is The Product" — cozypet (per slide)
**URL:** https://cozypet.github.io/llm-wiki-schema/

Core claim: people show off their wikis, but **the wiki is the output, not the product**. The product is the schema — the operating spec the LLM follows when it ingests, writes, and lints.

A weak schema means the LLM re-invents its own conventions every session: new tag names, new file naming, new frontmatter fields, new citation styles. The vault drifts and stops being navigable.

### Schema checklist (paraphrased from the post)

- Entity types and relationship types defined explicitly
- Per-source ingest policy (papers, datasheets, meeting notes, experiment logs)
- Rules for create-new-page vs. update-existing-page
- Frontmatter for citation, confidence, provenance
- Numbers, dates, and legal text must be verified against `raw/`
- Conflict, supersession, and stale claim handling rules
- Lint cadence and the auto-fix scope

The practical implication: **the most important file in your vault is not `index.md`, it's `AGENTS.md` / `schema.md`**. Improvements there compound; improvements to individual pages don't.

---

## 6. Synthesis-time decision — when this is and isn't a RAG replacement

**Source:** "LLM Wiki Is Not a RAG Replacement" — Ranjan Kumar (per slide)
**URL:** https://ranjankumar.in/llm-wiki-synthesis-time-decision-rag-agentic-memory

The framing question is not *"LLM Wiki vs. RAG"*. It's: **for this kind of knowledge, when do you want synthesis to happen — at ingest time, or at query time?**

| Use case | Better default | Rule |
|---|---|---|
| Architectural / design / glossary / repeated decisions | **LLM Wiki** (ingest-time synthesis) | Asked often, stable, reusable |
| Contracts, regulations, monetary amounts, dates, spec limits | **Raw + RAG** (query-time synthesis) | Don't answer without exact span citation |
| Personal reflection, judgment, half-formed hypotheses | **Human-authored**, LLM maintains around it | LLM links, diffs, surfaces contradictions — does not rewrite |

The litmus question becomes: **"Is this knowledge I want to compile, or knowledge I want to look up fresh every time?"**

The wrong default has real costs:
- Over-compile contracts → confidently wrong on numbers
- Under-compile design notes → re-do the same synthesis every meeting
- Let LLM rewrite personal reflections → you lose the texture that made them yours

---

## 7. Critical takes / failure modes

The community got specific quickly about how this breaks. Six failure modes worth tracking:

### 7.1 Lossy compile
Ingest summarizes a source and drops the numbers, conditions, or exceptions in the original. The wiki page reads cleanly but is silently incorrect. Especially common with tables and qualified claims ("X is true *unless* Y").

### 7.2 Lint blind spot
The lint pass checks consistency *within the wiki* but doesn't compare back to `raw/`. So two wiki pages can agree with each other while both diverging from the source. Lint that only enforces internal coherence is worse than no lint, because it generates false confidence.

### 7.3 "Not always PKM"
When the LLM does most of the writing, the result is closer to a **research index of external knowledge** than a personal knowledge management system. That's fine — but if you mistake one for the other, you'll be confused why your wiki doesn't sound like you.

### 7.4 Team scale
Multi-agent and multi-human writing requires explicit rules for attribution, conflict resolution, and ownership. Without them, two agents will silently overwrite each other's edits and the latest writer wins regardless of correctness.

### 7.5 Stale graph
The codebase / design / system the wiki documents moves on, but the wiki doesn't. Now you have **two sources of truth**, and the second one (the wiki) is the more confident-sounding one. This is the classic documentation rot problem, with extra teeth because the LLM keeps reading the stale wiki on every query.

### 7.6 Schema drift
A weak `AGENTS.md` lets the LLM invent its own conventions per session. Frontmatter fields, tag names, file paths, status values all accumulate variants. Eventually navigation breaks because nothing matches anything.

> Headline takeaway: don't mistake the wiki for the source of truth. Maintain a chain of custody back to `raw/`.

---

## 8. Search and graph at scale

**Source:** v2 update + multiple essays
**Slide:** "Graph & Search"

`index.md` works as a navigation layer when you have ~30–50 pages. Beyond that, three search modes complement each other:

| Mode | What it's good at |
|---|---|
| **BM25** | Exact term lookup, code identifiers, named entities |
| **Vector / embedding** | Semantically adjacent material (same idea, different words) |
| **Graph traversal** | Dependency, causation, supersession, alternative-implementation chains |

The v2 implementations tend to combine all three — a hybrid retrieval step that runs BM25 + vector + a few hops of graph traversal, then fuses with reciprocal rank fusion (RRF). The graph hop is what lets a query about "how does X fail" reliably surface "what causes X" pages even when neither shares vocabulary with the question.

In Obsidian-based vaults, the **graph view** itself doubles as a navigation tool: hubs surface naturally, and orphan nodes (concepts you imported but never linked back) jump out visually as candidates for the next study session.

---

## 9. Community implementations

A snapshot — these projects move quickly, and the descriptions reflect what was visible to the slide research, not necessarily current state. Verify before depending.

### 9.1 Pratiyush/llm-wiki
**URL:** https://github.com/Pratiyush/llm-wiki
**What it optimizes:** Converts session history from Codex / Claude Code / Cursor / Gemini into a static wiki.
**Notable outputs:** AI-consumable exports — `llms.txt`, JSON-LD, per-page txt/json, MCP tool surface.
**Why it matters:** Standardizes how an agent can re-consume its own past work — closes the loop where session history would otherwise vanish.

### 9.2 obsidian-llm-wiki-local (kytmanov)
**URL:** https://github.com/kytmanov/obsidian-llm-wiki-local
**What it optimizes:** Local-first Obsidian vault running on Ollama (no external API).
**Notable features:** Review queue, rejection feedback loop, selective recompile, git safety guards.
**Why it matters:** For users whose source material can't leave the machine — medical, legal, internal-IP — this removes the API dependency without giving up the wiki workflow.

### 9.3 NiharShrotri/llm-wiki
**URL:** https://github.com/NiharShrotri/llm-wiki
**Note:** Listed in references but not deeply characterized in the slide content. Worth fetching to see what variation it represents — possibly another reference implementation of the v1 Gist.

### 9.4 atomicmemory/llm-wiki-compiler
**URL:** https://github.com/atomicmemory/llm-wiki-compiler
**What it optimizes:** npm CLI plus an MCP server.
**Notable features:** Source attribution, confidence scoring, contradicted-page detection, review-candidate queues.
**Why it matters:** Exposes the compile pipeline as something an agent can call directly, rather than having the agent reinvent the loop in-context.

### 9.5 graphifyy
**URL:** https://pypi.org/project/graphifyy/
**What it optimizes:** Graph-first, multimodal folder compiler.
**Notable inputs:** Code AST, papers, images, videos, with confidence-tagged edges.
**Why it matters:** Designed for mixed-format study corpora — lectures + transcripts + PDFs + diagrams together. This is the closest analog to my robot-hardware-wiki use case (§10).

### 9.6 llmwiki.lol
**URL:** https://llmwiki.lol/
**What it is:** Pattern explainer — not a tool, more a conceptual landing page describing the pattern. Useful as a sharable explainer link.

### Direction of the variations

The implementations are pulling in five distinguishable directions:

1. **Wiki-only** (the v1 Gist as-is)
2. **Graph-first** (graphifyy)
3. **MCP / agent-callable pipeline** (atomicmemory, Pratiyush)
4. **Local-first / privacy** (obsidian-llm-wiki-local)
5. **Review / provenance / governance** (atomicmemory's contradicted-page logic, kytmanov's review queue)

The original Gist is the seed. The variations are the operating layer on top of it.

---

## 10. My own vault — robot-hardware-wiki

**Path:** `/Users/ahnchulwoo/robot-hardware-wiki`
**Topic:** 송태규 lecture series on robot actuators (motor control, drivers, current loops)
**Stats** (per slide, captured Apr 25, 2026):

- 38 compiled wiki pages in `index.md`
- 24 canonical concept pages (`wiki/concepts/`)
- 9 source-level lecture and reference summaries (`wiki/summaries/`)
- 31 derived visual assets extracted from lectures (`wiki/assets/`)

### Layout

```
robot-hardware-wiki/
├── raw/          # lecture notes, transcripts, PDFs, references
├── wiki/
│   ├── concepts/   # motor-current-control, motor-constant, ...
│   ├── summaries/  # lecture-03-motor-driver, ...
│   ├── guides/     # lecture-03-study-path, ...
│   └── assets/     # extracted lecture figures
├── index.md
├── log.md
└── AGENTS.md / schema.md
```

### How a single lecture gets sliced

Each lecture lives in three layers simultaneously:

1. **`raw/`** — original lecture notes, ClovaNote transcript, slide PDF, homework
2. **`wiki/summaries/lecture-NN-*.md`** — the lecture's central question and flow
3. **`wiki/concepts/*.md`** — reusable concept pages that get linked from many lectures (`motor-current-control`, `space-vector-pwm`, `spmsm-dq-voltage-equations`, etc.)
4. **`wiki/guides/lecture-NN-study-path.md`** — recommended reading order through that lecture's concepts

A worked example chain (Lecture 3, Motor Driver):
> inverter → SVPWM → current sensing → current control → nonidealities

This is what makes it feel different from "summarize this lecture in one document": the next time I ask a question, the answer doesn't start from the transcript — it starts from a graph of concept pages that already know about each other.

### What changed in my study

Four observable effects (from the talk's "What Changed" slide):

1. **Repeat questions vanish** — start from a concept page, not the transcript
2. **Vocabulary connects** — SVPWM, MOR, d-q equations, current loop are mutually linked
3. **Gaps become visible** — Obsidian graph view surfaces isolated nodes and oversized hubs as next study targets
4. **Source preserved** — exact numbers and equations are still in raw slides/transcripts; the wiki is navigation, not authority

### What I'm not doing (yet)

- Confidence scoring on individual claims
- Supersession edges between updated and original concepts
- An automated lint cron
- Hybrid BM25+vector+graph retrieval (just BM25 + Obsidian backlinks today)

These are all v2 patterns I've read about but haven't installed in my vault. They become more valuable as page count grows past ~100.

---

## 11. Open questions / what I'm still figuring out

1. **Where is the right line between LLM-authored and human-authored pages?** Currently the LLM writes summaries and concepts; I write guides and `log.md`. Unclear if this split holds at scale.
2. **Is the right unit a single repo, or one repo per topic?** robot-hardware-wiki is one corpus. Mixing it with, say, an LLM-app-development wiki feels wrong, but having ten separate vaults loses the cross-domain links that often *are* the insight.
3. **Does the wiki survive without the LLM?** If I switched off agents tomorrow, would the wiki still be navigable as plain Obsidian markdown? It should, but the answer depends on how much of the structure was LLM-only convention vs. legible to a human reader.
4. **When is graph-first (graphifyy) the right starting point vs. growing into it from wiki-first?** Today I can't justify the migration cost; at 100+ pages I might wish I'd started there.
5. **What's the right contract for citations?** Linking to a wiki page is easy. Linking to a *span* in `raw/` (page 14, paragraph 2) is harder, and the difference matters for any claim involving numbers.

---

## 12. References

| Resource | Link |
|---|---|
| Karpathy, LLM Wiki original Gist | https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f |
| rohitg00, LLM Wiki v2 | https://gist.github.com/rohitg00/2067ab416f7bbe447c1977edaaa681e2 |
| The Schema Is the Product (cozypet) | https://cozypet.github.io/llm-wiki-schema/ |
| LLM Wiki Is Not a RAG Replacement (Ranjan Kumar) | https://ranjankumar.in/llm-wiki-synthesis-time-decision-rag-agentic-memory |
| Scribelet, "Two directions for a self-maintaining knowledge base" | https://scribelet.app/blog/karpathy-llm-wiki-reaction |
| Memory as Metabolism (arXiv) | https://arxiv.org/abs/2604.12034 |
| Pratiyush/llm-wiki | https://github.com/Pratiyush/llm-wiki |
| kytmanov/obsidian-llm-wiki-local | https://github.com/kytmanov/obsidian-llm-wiki-local |
| NiharShrotri/llm-wiki | https://github.com/NiharShrotri/llm-wiki |
| atomicmemory/llm-wiki-compiler | https://github.com/atomicmemory/llm-wiki-compiler |
| graphifyy (PyPI) | https://pypi.org/project/graphifyy/ |
| llmwiki.lol (pattern explainer) | https://llmwiki.lol/ |
| Local example vault | `/Users/ahnchulwoo/robot-hardware-wiki` |

---

## Appendix — Where each section lives in the deck

| Section | Slide(s) |
|---|---|
| §1 Original idea | 2 (Thesis), 3 (Original) |
| §2 Three-layer architecture | 4 (Architecture) |
| §3 Operational loops | 4 (Architecture) |
| §4 LLM Wiki v2 | 6 (V2) |
| §5 Schema-first | 11 (Schema) |
| §6 Synthesis-time decision | 10 (Synthesis Time) |
| §7 Critical takes | 9 (Critiques) |
| §8 Search & graph | 7 (Graph) |
| §9 Community implementations | 5 (Timeline), 8 (Implementation Map) |
| §10 robot-hardware-wiki | 12 (My Vault), 13 (Study Loop), 14 (Obsidian Graph), 15 (What Changed) |
