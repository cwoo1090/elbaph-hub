# Chulwoo April 2026 Talk Outline

Audience: Elbaph members at the 3rd meetup on 2026-04-25.

Title: Karpathy LLM Wiki와 USB Companion

One-sentence thesis: 한 달 동안 두 트랙을 동시에 굴렸다 — 지식을 컴파일하는 LLM Wiki 운영, 그리고 멀티세션 시대를 위한 USB-Clawd 후속 데스크 가젯 설계.

Deck: `index.html` (22 slides, 1280×720, paper-textured single-file deck)

## Track 1 — Karpathy LLM Wiki: 실제로 써보기 (slides 1–15)

1. Title — 두 트랙 소개 + chips
2. Thesis — LLM Wiki는 검색 도구가 아니라 지식 컴파일 워크플로우
3. Original — Karpathy의 4월 4일 Gist와 raw/wiki/schema 구조
4. Architecture — 3 layer (raw → wiki → answer) + ingest/query/lint
5. Community Timeline — Apr 4 원본 → v2 → critical essays → implementations
6. LLM Wiki v2 — confidence, supersession, forgetting, memory tier
7. Graph & Search — index 너머 BM25 + vector + graph
8. Implementation Map — Pratiyush, obsidian-local, atomicmemory, graphifyy
9. Critical Takes — lossy compile, lint blind spot, PKM 오해, schema drift
10. Synthesis-Time Decision — 어떤 지식을 언제 합성할지
11. Schema First — 진짜 제품은 wiki가 아니라 AGENTS.md
12. My Vault — robot-hardware-wiki 구조와 통계
13. Study Loop — raw → summary → concepts → guide
14. Obsidian Graph — 실제 vault graph view
15. What Changed — 반복 질문 감소, 용어 연결, 공백 발견, 원문 유지

## Track 2 — USB Companion: 멀티세션 데스크 가젯 (slides 16–22)

16. Track 2 Pivot — Ben James의 USB-Clawd (1.3M views, Apr 6) 컨텍스트
17. Product Concept — 한 줄 + 3가지 진화 (1→3마리, LED 눈, 양방향)
18. Core Functions — Eye animation, solenoid pop, head press, auto mapping, "3 is enough"
19. Use Flow — USB 꽂기 → 세션 할당 → 입력 요청 → 머리 누름 → 완료까지 timeline
20. Design Variations — 5축 + 6 후보 grid (`assets/clawd-variations-grid.png`)
21. Top 3 Candidates — Apple Sidecar / Floating Trio / Cute Hub
22. Ask From Elbaph — 방향 선택, "3 is enough" 룰, 빠진 기능, 가격대/구매 의향

## Closing

23. References — 두 트랙의 출처 모음 (Karpathy Gist, Ben James 트윗 등)

## Assets

- `assets/lecture-03-current-control-loop.png` — slide 13 (study loop)
- `assets/clawd-trio-orange.png` — slide 16 hero
- `assets/clawd-trio-copper.png` — backup hero (alternate finish)
- `assets/clawd-variations-grid.png` — slide 20 hero (6 candidates)
