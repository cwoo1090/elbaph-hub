# Elbaph Article Style

## Core Standard

Elbaph meetup articles are polished essays, not transcript summaries.

The article should feel like the speaker is turning the talk's best idea into a public blog post. The transcript and materials are sources, not the shape of the final piece.

## Existing Article Patterns

Use these local articles as style references:

- `apps/site/content/articles/meetup-3/taekyu.md`
  - Opens with a concrete scenario: `40kg짜리 포탄을 계속 옮겨야 한다고 해보자.`
  - Builds one central question: humanoid vs task-specific robot.
  - Uses Q&A-like issues only as article logic, not as meeting recap.
  - Sections move from promise, market gap, analogy, LLM comparison, criteria, structure.
- `apps/site/content/articles/meetup-2/younghoon.md`
  - Opens with a broad but concrete industry problem.
  - Explains technical axes one by one: compute, bandwidth, memory, systems, ecosystem.
  - Uses analogies sparingly and explicitly.
  - Ends by changing the reader's frame: "좋은 칩" depends on workload and bottleneck.
- `apps/site/content/articles/meetup-3/yechan.md`
  - Opens with the domain's missing data.
  - Turns a startup/fundraising discussion into a strategic article about path, evidence, and valuation.
  - Keeps first-person sparing and focused on stance, not private feelings.
- `apps/site/content/articles/meetup-2/chulwoo.md`
  - Starts from a concrete personal project, then turns it into a general product insight.
  - Uses `내가 보기에`, `나는 요즘` only when it helps establish a thesis.
- `apps/site/content/articles/meetup-2/taekyu.md`
  - Uses a national/industry question as the hook.
  - Repeats a core contrast across sections: 미국/중국 vs 한국, 범용 vs 특화, 넓음 vs 깊음.

## Opening Hooks

Good openings:

- concrete scenario: "40kg짜리 포탄을 계속 옮겨야 한다고 해보자."
- domain puzzle: "수술실에는 아직 구조화되지 않은 데이터가 많다."
- industry frame: "요즘 AI를 이야기할 때 반도체와 칩 이야기를 피하기는 어렵다."
- concise contrast: "오래 사는 법은 많다. ... 그런데 노화를 늦추는 법은 아직 잘 모른다."

When a concrete scenario feels abrupt, use a gentle narrowing pattern:

```text
broader domain frame readers already know
common way people think about the domain
the overlooked problem beneath that frame
one sharp question that names the article's tension
```

Example pattern:

```text
로봇 제어를 생각하면 보통 먼저 떠오르는 것은 모터, 센서, 알고리즘이다.
...
그런데 로봇이 실제 세계에서 일을 하기 시작하면 더 근본적인 질문이 앞에 놓인다.
로봇은 언제 세상에 닿아야 하는가.
```

Weak openings:

- "5월 엘바프 밋업에서 ..."
- "발표에서는 ..."
- "질의에서는 ..."
- "처음에는 ... 생각했다" when not directly supported
- "이 글은 발표 자료를 요약한 것이 아니라 ..." because it tells instead of demonstrating
- abrupt cold opens that assume the reader already knows why the scenario matters

## Body Structure

Prefer a small number of strong argumentative sections:

```text
Opening hook
central question / tension
## why the common frame is wrong/incomplete
## technical axis 1
## technical axis 2
## what changes because of this
## market/product/research implication
## conclusion
```

For technical research articles, a useful 기승전결 arc is:

```text
common frame -> overlooked hard problem -> old workaround -> new approach -> why it is not enough yet -> realistic use case
```

Good section titles are claims, not labels:

- `모두가 general을 말하지만, 아직도 현장은 specific하다`
- `NVIDIA의 진짜 해자는 하드웨어만으로 설명되지 않는다`
- `seed round에서 팔아야 하는 것은 미래가 아니라 path다`
- `노화의 원인들은 서로 독립적이지 않다`
- `정답을 맞히는 도구보다 질문을 줄이는 도구`
- `접촉이 생기면 다른 문제가 된다`
- `걷는 로봇에서는 사람이 순서를 정할 수 있었다`
- `어려운 결정을 optimizer에게 넘긴다`

Weak section titles are vague labels:

- `발표 내용`
- `Q&A`
- `결론`
- `기술 설명`
- metaphors that can be misread, such as `표보다 그래프` when readers may think of a line chart

## Voice

Default Korean style:

- short paragraphs
- plain declarative endings
- direct assertions
- selective English technical terms where the community naturally uses them
- difficult terms explained at first use when they are central to the argument
- concrete examples before abstract explanation
- no excessive politeness in article body

Use first person only for stance:

- Good: `나는 이 분야를 볼 때 가장 먼저 구분해야 하는 것이 있다고 생각한다.`
- Good: `솔직히 아직 모르겠다.`
- Risky: `처음에는 내가 연구하고 있는 분야를 조금 소개하는 정도면 되겠다고 생각했다.` unless directly sourced.

## Q&A Integration

Q&A can be very valuable, but it should rarely appear as "someone asked".

Convert:

```text
질문: virtual cell은 데이터 기반인가요, pathway 기반인가요?
```

Into:

```text
virtual cell에는 두 흐름이 있었다. 초기에는 인간이 아는 pathway와 submodel을 직접 연결하는 방식에 가까웠고, 최근에는 foundation model 쪽으로 이동했다.
```

Convert:

```text
질문: 이게 당장 어디에 쓸 수 있나요?
답: 후보군을 줄이는 데 쓴다.
```

Into:

```text
현실적인 답은 후보군을 줄이는 일이다. virtual cell이 단번에 정답을 내는 것은 어렵다. 하지만 약물 후보를 100만 개에서 1만 개로 줄일 수 있다면 이야기가 달라진다.
```

Mention Q&A explicitly only when the user requests a meetup recap or when the exchange itself is the story.

## Technical Terms

Elbaph articles can use hard terms, but the article should carry the reader through them.

Prefer inline first-use explanations over footnotes or a separate glossary. A separate glossary makes the article feel like lecture notes; inline explanations keep the essay readable.

Good patterns:

- `policy는 로봇이 보고 있는 값(observation)을 받아 다음 행동(action)을 내는 제어 함수에 가깝다.`
- `ground truth, 즉 실제 참값`
- `calibration은 실제 로봇을 계측해서 simulation model을 현실에 맞게 보정하는 일이다.`

Use parentheses only when the explanation is short. If the explanation needs a full sentence, give it its own sentence after the term appears.

If a term appears only once and does not matter to the core thesis, replace it with plain Korean or leave it out. Do not add explanatory bulk for every English word.

## Speaker Style Matching

When the user supplies speaker samples:

1. Identify sentence endings, paragraph length, level of first-person use, preferred rhetorical moves, and favorite contrasts.
2. Match those traits without copying phrases mechanically.
3. Do not force another speaker's style onto the article.

Seungjun-specific lesson from May meetup:

- Use plain declarative endings: `했다`, `같다`, `아니다`, `생각한다`.
- Avoid polite endings: `입니다`, `습니다`, `합니다`.
- Avoid writing about Seungjun in third person; the article is authored by Seungjun.
- Use first person for stance, not unverifiable inner life.
- A strong article opening for this topic is topic-first, not meetup-first.

## Technical Accuracy

Do not overclaim.

- Separate animal-model evidence from human clinical evidence.
- Separate a proxy metric from a validated clinical endpoint.
- Mark uncertainty when the transcript does.
- Do not turn "candidate narrowing" into "solves drug discovery".
- Do not turn "interesting industrial signal" into "proven market winner".

If adding external current facts not present in materials, verify them before use.
