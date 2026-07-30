# Transformation Casebook

Use this as a practical guide to converting raw meetup material into Elbaph-style articles.

## Available Local Source Pairs

### Meetup 3 Taekyu: humanoid vs task-specific robot

Sources:

- `meetups/2026-04-meetup-3/presentations/03-taekyu/transcript.md`
- `meetups/2026-04-meetup-3/presentations/03-taekyu/blog.md`
- Final site article: `apps/site/content/articles/meetup-3/taekyu.md`

Transformation lesson:

- The transcript starts as a loose discussion prompt, but the final article becomes a focused question: `40kg 포탄을 나르는 로봇은 humanoid여야 할까`.
- The final article does not preserve the transcript's casual meta talk about "자료를 준비 못했다" or "토론 주제를 던져보자".
- It extracts the durable argument:
  - general humanoid is attractive but not yet actually general
  - real industrial tasks are specific
  - procurement and maintenance risk shape adoption
  - special-purpose vehicles are a useful analogy
  - LLM generality does not transfer cleanly to robots because physical constraints matter
- Q&A/discussion energy becomes section logic, not meeting narrative.

### Meetup 2 Younghoon: AI chip specs

Sources:

- Final article: `apps/site/content/articles/meetup-2/younghoon.md`
- Meetup workspace article: `meetups/2026-03-meetup-2/presentations/04-younghoon/article.md`

Transformation lesson:

- The article is not a chip glossary. It establishes the lens first: AI performance is increasingly constrained by how models run in physical infrastructure.
- Technical details are organized as axes:
  - compute
  - memory bandwidth
  - memory size
  - multi-GPU systems
  - software ecosystem
  - inference economics
- It explains each axis with a simple analogy and then states why it changes strategic judgment.
- The conclusion does not recap all specs. It reframes the question from "what is the fastest chip" to "where does the bottleneck sit for this workload".

### Meetup 3 Yechan: surgical data and seed round path

Sources:

- `meetups/2026-04-meetup-3/presentations/01-yechan/transcript.md`
- `meetups/2026-04-meetup-3/presentations/01-yechan/blog.md`
- Final site article: `apps/site/content/articles/meetup-3/yechan.md`

Transformation lesson:

- Raw topic includes fundraising, valuation, lead investor choice, and company positioning.
- Final article chooses one public-facing frame: surgical data infrastructure.
- It starts with an unsolved domain fact: surgical skill data is not well structured.
- It then connects fundraising to strategy:
  - data layer before full surgical robot
  - hardware company vs software/data company
  - valuation as next-round difficulty
  - global validation evidence
  - seed round sells path, not distant future
- Private tactical details are abstracted into generally useful founder lessons.

### Meetup 3 Chulwoo: LLM Wiki and study path

Sources:

- `meetups/2026-04-meetup-3/presentations/04-chulwoo/transcript.md`
- `meetups/2026-04-meetup-3/presentations/04-chulwoo/blog.md`
- Final site article: `apps/site/content/articles/meetup-3/chulwoo.md`

Transformation lesson:

- Transcript includes casual remarks and tool demos.
- Final article turns the demo into a broader learning-interface thesis.
- The article keeps concrete artifacts: raw data, unknown people's questions, study path, diagrams.
- It avoids tool-demo chronology and instead asks what changes when learning starts from raw material rather than pre-organized notes.

### Meetup 2 Chulwoo: side project and product insight

Sources:

- Final article: `apps/site/content/articles/meetup-2/chulwoo.md`
- Meetup workspace article: `meetups/2026-03-meetup-2/presentations/01-chulwoo/article.md`

Transformation lesson:

- Starts from a personal project but quickly moves to product judgment.
- It keeps concrete evidence such as users, paid usage, advertising, and retention.
- It avoids a project diary shape. The article's thesis is that making is no longer the bottleneck; perspective and taste matter more.

### Meetup 2 Taekyu: Korean robotics strategy

Sources:

- Final article: `apps/site/content/articles/meetup-2/taekyu.md`
- Meetup workspace article: `meetups/2026-03-meetup-2/presentations/03-taekyu/article.md`

Transformation lesson:

- Uses national industrial strategy as the main frame.
- Repeats a strong contrast across the article:
  - don't imitate China on low-cost manufacturing
  - don't imitate the US on general platforms
  - find Korea's deeper advantages in accumulated know-how and security-sensitive markets
- Good example of turning a technical talk into a strategic essay.

### Meetup 4 Taekyu: sim2real modeling

Sources:

- `meetups/2026-05-meetup-4/presentations/03-taekyu/transcript.md`
- `meetups/2026-05-meetup-4/presentations/03-taekyu/materials/slides.pdf`
- Draft article: `meetups/2026-05-meetup-4/presentations/03-taekyu/article.md`

Transformation lesson:

- The talk had many hard robotics terms: `policy`, `domain randomization`, `MOR`, `ground truth`, `IMU`, `Kalman filter`, `URDF`, `latency`, `backlash`, `calibration`.
- The article kept these terms because they are part of the real technical argument.
- The readable version explained central terms at first use in one sentence or a short parenthetical:
  - `policy` as a control function that maps observation to action
  - `MOR` as the motor's speed-torque operating region
  - `ground truth` as actual reference truth
  - `calibration` as measuring the real robot and correcting the simulation model
- No separate glossary or footnotes were added. The explanations stayed inside the argument so the piece still read like an article, not lecture notes.
- Minor one-off terms were simplified or left to context instead of defining every English word.

### Meetup 5 Seungbin: contact-implicit trajectory optimization

Sources:

- `meetups/2026-06-meetup-5/presentations/01-seungbin/transcript.md`
- `meetups/2026-06-meetup-5/presentations/01-seungbin/materials/slides.pptx`
- Draft article: `meetups/2026-06-meetup-5/presentations/01-seungbin/article.md`

Transformation lesson:

- The first draft opened directly with a concrete manipulation scenario: `로봇이 물체를 밀어야 한다고 해보자.`
- That was technically valid but felt abrupt because the reader did not yet know why contact was the central problem.
- The stronger version added a narrative ramp:
  - start from the familiar robotics-control frame: motor, sensor, algorithm
  - move to the physical-world constraint: robots must touch the world to do work
  - name the overlooked problem: contact changes dynamics
  - ask the central question: can the optimizer find when and where to make contact?
- The article's section arc became clearer:
  - `접촉이 생기면 다른 문제가 된다`
  - `걷는 로봇에서는 사람이 순서를 정할 수 있었다`
  - `어려운 결정을 optimizer에게 넘긴다`
  - `Relaxation은 문제를 풀 수 있게 만들지만 대가가 있다`
  - `현실적 위치는 motion retargeting에 더 가깝다`
- Key lesson: a concrete opening is not automatically good. If it feels like a cold technical jump, first establish the common frame and then narrow into the scenario or question.

### Meetup 2 Jaehwan: autoresearch

Sources:

- Final article: `apps/site/content/articles/meetup-2/jaehwan.md`
- Meetup workspace article: `meetups/2026-03-meetup-2/presentations/02-jaehwan/article.md`

Transformation lesson:

- The article frames autoresearch as loop design, not magic researcher replacement.
- It preserves domain specificity: trading strategy research, reality gap, automated loop boundaries.
- It names the level of current capability with a memorable but bounded phrase: `IQ 115짜리 동료`.

## Seungjun May Meetup Case

Sources:

- Transcript: `meetups/2026-05-meetup-4/presentations/01-seungjun/transcript.md`
- Slides: `meetups/2026-05-meetup-4/presentations/01-seungjun/materials/slides.pptx`
- Draft article: `meetups/2026-05-meetup-4/presentations/01-seungjun/article.md`
- User-supplied writing samples in the originating thread:
  - Bay series essays
  - startup mental-sport essay
  - "기존의 창업 공식이 사라졌다"
  - Homo agere essay

Core source material:

- Medical aging vs biological aging:
  - medical/functional aging asks whether daily life is possible
  - biological aging asks about cellular/molecular damage
  - the gap between engineering-like medicine and physics-like biology creates confusion
- Hallmarks of aging:
  - categories are useful but not mutually exclusive
  - cellular senescence, inflammation, mitochondria, epigenetic changes, gene expression, and immune state are entangled
- Biological clocks:
  - epigenetic clocks are attractive because they compress biological age
  - gold standard is missing because very long human trials are impossible
  - proxy metrics can make intervention interpretation ambiguous
- Interventions:
  - strongest current interventions are boring: exercise, nutrition, sleep, infection prevention, vaccines, muscle
  - caloric restriction, rapamycin, metformin, NAD+ precursors, senolytics, partial reprogramming are interesting but not routine anti-aging therapy for healthy adults
- Immune profiling:
  - "immune strength" is too flat
  - immune profile is multi-layered: cells, cytokines, repertoire, transcriptome, epigenome, response to perturbation
  - naive T cells decrease, exhausted T cells and chronic inflammation increase
  - immune age is promising but not a settled clinical truth
- Virtual biology:
  - biology is moving onto semiconductors
  - wet lab work is slow and expensive
  - early virtual cell models hand-wired pathways/submodels
  - recent direction is single-cell foundation models and biological multimodal LLMs
  - scGPT treats cell gene-expression vectors as language-like input
  - DNA encoder + LLM can reason from sequence/variant to disease mechanism
- Virtual cell caveat:
  - full phenotype prediction may not be possible yet
  - the task may not even be well-defined
  - practical near-term value is narrowing the search space, not producing final truth
  - candidate reduction such as 1,000,000 to 10,000 is meaningful
  - Noetik, Recursion, Arc Institute, CZI are relevant industrial signals

Failed drafting approaches from this case:

- Starting with "요즘 longevity라는 단어를 정말 많이 듣는다" was too generic.
- Switching to "승준님을 모셨다" was wrong because the article is authored by Seungjun.
- Writing "처음에는 ... 생각했다", "질문들이 좋았다", "정리해보고 싶었다" invented unverifiable inner states.
- Making the article revolve around "밋업에서 / 발표에서는 / 질의에서는" made it feel like a meeting summary.
- Using `입니다/습니다` violated the requested Seungjun style.
- The heading `노화는 표보다 그래프에 가깝다` was ambiguous because general readers may think of a line chart; the actual point was that aging hallmarks are not mutually exclusive.

Successful final direction:

- Start topic-first:
  - `오래 사는 법은 많다.`
  - contrast "healthy habits are known" vs "slowing aging is not yet known"
- Main thesis:
  - longevity is not a list of tips for living longer
  - it is an attempt to turn biology into a computable/intervenable problem
- Keep speaker style:
  - plain declarative endings
  - first-person stance: `나는 ...라고 생각한다`
  - caveats: `솔직히 아직 모르겠다`
  - concise claims with concrete examples
- Keep Q&A-derived insights, but not Q&A framing:
  - caloric restriction becomes an example of animal-to-human messiness
  - virtual cell method question becomes pathway-based vs foundation-model-based history
  - phenotype prediction question becomes the core risk of virtual cell
  - practical-use question becomes "candidate narrowing"
- Final article section arc:
  - `의학과 생물학은 노화를 다르게 본다`
  - `노화의 원인들은 서로 독립적이지 않다`
  - `가장 확실한 답은 아직 재미없다`
  - `면역력이라는 말은 너무 납작하다`
  - `생물학도 반도체 위로 올라가고 있다`
  - `정답을 맞히는 도구보다 질문을 줄이는 도구`
  - `longevity의 다음 장`

## General Transformation Algorithm

1. Ignore transcript order at first.
2. Extract the article's one-sentence thesis.
3. Choose an opening ramp that a reader can understand without knowing the meetup: familiar frame -> overlooked tension -> central question.
4. Design the section arc before drafting; make section titles reveal 기승전결 when skimmed.
5. Group source material into 4-7 arguments.
6. Move Q&A insights into the relevant argument group.
7. Remove meeting meta, preparation meta, and casual banter.
8. Draft in the speaker's voice.
9. Audit for unsupported inner states, polite endings, summary-like phrases, abrupt openings, and label-like section headings.
10. Compare the first 20 lines and section titles against existing Elbaph articles.
11. Revise until it reads as a standalone essay.
