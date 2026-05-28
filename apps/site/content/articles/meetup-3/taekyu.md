---
slug: meetup-3-taekyu
date: 2026-04-25
title:
  ko: 40kg 포탄을 나르는 로봇은 humanoid여야 할까
  en: Should a Robot Carrying 40kg Shells Be Humanoid?
subtitle:
  ko: general humanoid의 환상과 task-specific robot의 현실
  en: The fantasy of general humanoids and the reality of task-specific robots
---

![특화 군수 로봇이 밝은 테스트베드에서 포탄을 다루는 장면](/articles/meetup-3/taekyu/01-purpose-built-logistics.png)

*무거운 payload를 반복해서 다루는 일에서는 사람 형태보다 목적에 맞게 설계된 몸체가 먼저 답이 될 수 있다.*

40kg짜리 포탄을 계속 옮겨야 한다고 해보자.

사람이 하기는 힘들다. 반복 작업이고, 무겁고, 다치기 쉽다. 군에서는 병력이 줄고 있고, 장비와 화력은 유지해야 한다. 그러면 자연스럽게 로봇을 떠올리게 된다. 사람이 하던 운반 작업을 로봇이 대신하면 되지 않을까.

그런데 여기서 질문이 생긴다.

이 로봇은 humanoid여야 할까. 아니면 포탄 운반에 특화된 이상하게 생긴 기계여야 할까.

요즘 로봇 시장을 보면 모두가 general humanoid를 말한다. 사람처럼 생겼고, 사람처럼 걷고, 사람처럼 손과 팔을 쓰며, 언젠가는 사람 대신 모든 일을 할 수 있는 로봇. 데모 영상은 멋있고, 투자자에게 설명하기도 쉽다. "사람이 하는 일을 로봇이 한다"는 문장은 강력하다.

하지만, 정말 40kg의 포탄을 옮기기 위해 general humanoid까지 필요한게 맞을까?

그렇다면 조금 더 확장해서, 지금 현대 사회의 산업 현장이 진정으로 필요로 하는 것은 general humanoid robot일까, 아니면 task-specific robot일까?

## 모두가 general을 말하지만, 아직도 현장은 specific하다

general humanoid의 약속은 매력적이다.

세상은 사람을 기준으로 설계되어 있다. 문 손잡이, 계단, 공장 라인, 도구, 선반, 차량, 창고. 사람처럼 생긴 로봇이 사람의 공간에 그대로 들어가서 사람의 일을 대신할 수 있다면, 별도의 환경 개조 없이 거대한 시장이 열린다.

하지만 이 promise에는 큰 전제가 있다.

그 로봇이 실제로 general해야 한다는 것이다. 무엇을 시켜도 80점 이상은 해야 한다. 걷고, 들고, 보고, 판단하고, 실패했을 때 회복하고, 예상 밖의 상황에서도 안전해야 한다. 그런데 지금 시장의 많은 humanoid는 "general하다"기보다 "general해지고 싶다"에 가깝다.

반대로 현장의 문제는 대개 specific하다.

포탄을 옮겨야 한다. 용접을 해야 한다. 특정 공정에서 부품을 조립해야 한다. 수술실에서 특정 instrument를 조작해야 한다. 물류창고에서 물건을 반복적으로 옮겨야 한다. 개인이 아닌 기업의 입장에서, "모든 일을 적당히 하는 로봇"보다 "내가 지금 힘들어하는 그 일 하나를 확실히 해주는 로봇"을 먼저 원한다.

공학적으로 보면 task-specific robot이 더 쉬워 보인다. 자유도를 줄일 수 있고, 환경을 제한할 수 있고, payload와 endurance를 그 task에 맞춰 설계할 수 있다. 그런데도 시장의 언어는 계속 general humanoid 쪽으로 기운다.

왜 그럴까.

![휴머노이드와 특화 운반 로봇이 같은 작업장을 공유하는 비교 장면](/articles/meetup-3/taekyu/02-general-vs-specific.png)

*general humanoid의 약속은 매력적이지만, 현장의 문제는 대개 훨씬 더 구체적인 물리 요구사항을 가진다.*

## specific한 시장은 실제로 크지만, 애매하게 작아 보인다

포탄 운반 같은 문제는 작은 문제가 아니다.

군 전체가 쓰는 작업이고, 병력 감축과 직접 연결되어 있고, 잘 만들면 다른 군수 logistics에도 확장될 수 있다. 단일 공장 하나에 들어가는 custom robot보다 훨씬 큰 문제다. 그런데도 규모가 큰 방산 기업 입장에서 보면 그렇게까지 매력적이지는 않다. 이미 K9 자주포와 같은 주력 상품을 만들어 팔고 있고, 굳이 보다 사업성이 적은 로봇에 긴 시간과 큰 돈이 드는 R&D를 걸 이유가 약하다.

반대로 스타트업 입장에서는 충분히 큰 시장일 수 있다.

하지만 군이나 대형 고객 입장에서는 스타트업을 선택하기가 어렵다. 이런 장비는 1-2년 쓰고 끝나는 software가 아니다. 10년, 20년 유지보수해야 한다. 공급사가 사라지면 안 되고, 현장에서 고장나면 안 되고, 안전 책임도 져야 한다. 작은 스타트업이 기술적으로 더 좋은 답을 갖고 있어도, 고객이 느끼는 procurement risk는 크다.

그래서 이상한 공백이 생긴다.

큰 회사에게는 작고 귀찮은 시장이고, 작은 회사에게는 크지만 신뢰를 얻기 어려운 시장. 바로 이 공백 때문에 실제로 필요한 specific robot이 잘 나오지 않을 수 있다. 문제는 공학보다 incentive에 더 가까워진다.

![밝은 조달 테스트 환경 한가운데 놓인 특화 로봇 프로토타입](/articles/meetup-3/taekyu/03-procurement-gap.png)

*특화 로봇 시장에는 큰 회사에게는 작고 작은 회사에게는 위험한 이상한 공백이 생긴다.*

## 특장차 비유가 말해주는 것

이 문제를 이해하는 데 특장차 비유가 꽤 유용하다.

구급차나 냉동 탑차를 생각해보자. 한 기업이 "구급차", "냉동탑차"를 처음부터 끝까지 전부 만드는 것이 절대 아니다. 현대나 기아 같은 회사가 이미 잘 만든 van이나 truck platform이 있고, 그 위에 특수 목적에 맞게 개조하는 업체들이 붙는다. general vehicle platform이 충분히 성숙했기 때문에 이보다 낮은 기술 수준의 개조 업체들로도 task-specific vehicle이 쉽게 시장에 나올 수 있다.

그렇다면 humanoid에서도 비슷한 일이 벌어질까.

먼저 general humanoid platform이 충분히 성숙하고, 그다음에 여러 업체들이 그것을 개조해 군용, 건설용, 의료용, 공장용 task-specific robot을 만들게 될까. 아니면 반대로, 지금 당장 특정 task를 잘 푸는 robot들이 먼저 나오고, 그 축적이 나중에 generality로 이어질까.

이 질문에는 쉬운 답이 없다.

만약 humanoid platform이 자동차 platform처럼 충분히 안정화된다면, general-to-specific 경로가 자연스럽다. 기본 몸체를 사고, 손이나 tool, software, payload system만 바꿔 specific task에 맞추면 된다. 하지만 아직 general humanoid platform 자체가 충분히 안정적이지 않다면, 그 위에 특장차 산업을 만들 수 없다.

지금은 아마 그 사이 어딘가에 있다.

general humanoid의 promise는 크지만, platform은 아직 이르다. 그렇다고 모든 task-specific robot을 처음부터 완전히 새로 만드는 것도 비효율적이다. 결국 중요한 것은 "어디까지 general이어야 하고, 어디부터 specific해야 하는가"다.

![여러 작업 모듈로 확장되는 로봇 플랫폼을 보여주는 통합 워크숍](/articles/meetup-3/taekyu/04-modular-platform.png)

*플랫폼이 충분히 성숙하면 그 위에 여러 task-specific system이 올라갈 수 있다.*

## LLM의 성공 경험을 로봇에 그대로 가져올 수 있을까

요즘 많은 사람이 로봇을 LLM 이후의 다음 frontier로 본다.

LLM에서는 general model이 매우 강력했다. 특정 task마다 작은 model을 따로 만드는 것보다, 더 큰 foundation model이 나오면 많은 niche solution을 한 번에 덮어버렸다. 그래서 자연스럽게 로봇에서도 비슷한 상상을 하게 된다. 더 큰 robot foundation model이 나오면, 특정 작업용 로봇이나 vertical software는 모두 general model에 흡수되지 않을까.

하지만 로봇과 언어는 다르다.

언어는 digital space 안에서 복제되고, 학습되고, 평가된다. 로봇은 F=ma의 물리 세계와 싸운다. motor, reducer, battery, heat, material, payload, balance, safety, maintenance가 모두 실제 제약으로 들어온다. 데이터도 훨씬 비싸다. 실패하면 헛소리를 내뱉는데서 끝나는게 아니라, 물건이 부서지고 사람이 다칠 수 있다.

그래서 LLM의 "더 큰 general model이 specific solution을 먹는다"는 패턴을 로봇에 그대로 적용하기는 어렵다.

물론 software는 중요하다. 자율주행처럼, robot의 reliability와 recovery 능력이 올라가면 쓸 수 있는 영역이 비선형적으로 늘어날 수 있다. 하지만 그 software가 올라탈 몸체는 여전히 물리적 한계를 가진다.

로봇에서 generality는 지능의 한계가 아니라, 몸의 한계다.

![하중 테스트 장비 앞에 놓인 로봇과 모터, 배터리, 구동계 구성](/articles/meetup-3/taekyu/05-physical-constraints.png)

*로봇의 generality는 모델 크기만의 문제가 아니라 모터, 감속기, 배터리, 열, 안전의 문제다.*

## 결국 기준은 market size, risk, endurance, procurement다

general이냐 specific이냐를 철학적으로만 물으면 답이 없다.

더 좋은 질문은 이것이다. 어떤 task에서는 specific robot이 이기고, 어떤 task에서는 general humanoid가 이길까.

여기에는 몇 가지 기준이 있다.

첫째, task의 물리적 요구가 얼마나 특수한가. 40kg payload, 반복 운반, 방열, 중심 잡기처럼 요구사항이 강하면 specific design의 이점이 커진다.

둘째, 시장이 얼마나 큰가. 너무 작은 시장은 custom robot을 만들기 어렵다. 하지만 군, 건설, 대형 제조처럼 충분히 큰 vertical이면 specific robot도 회사가 될 수 있다.

셋째, 실패의 비용이 얼마나 큰가. 의료, 군, 중장비처럼 safety와 책임이 중요한 영역에서는 adoption이 느리고 procurement가 보수적이다. 여기서는 "잘 작동한다"만큼 "오래 책임질 수 있다"가 중요하다.

넷째, 고객이 얼마나 절박한가. 사람이 부족하고, 작업이 위험하고, 기존 방식의 비용이 계속 커진다면 고객은 새로운 기술을 받아들일 가능성이 높아진다. 반대로 불편하지만 견딜 만하면 굳이 risk를 지지 않는다.

다섯째, platform이 얼마나 성숙했는가. general humanoid platform이 충분히 싸고 안정적이면 specific application은 그 위에 올라갈 수 있다. 아직 그렇지 않다면 specific system을 먼저 만드는 편이 현실적일 수 있다.

이 기준으로 보면 답은 하나가 아니다. 어떤 domain은 general humanoid가 먹을 것이고, 어떤 domain은 task-specific robot이 먹을 것이다. 집안일처럼 다양하지만 비교적 낮은 payload의 영역은 general platform이 유리할 수 있다. 반대로 의료나 군, 고하중 산업 작업처럼 요구사항이 날카로운 곳은 specific solution이 오래 살아남을 가능성이 있다.

## 진짜 문제는 기술이 아니라 구조일 수 있다

가장 답답한 지점은 여기다.

이건 공학 문제가 아니다. 구조의 문제다.

유능하고 주도적인 인재는 둔중한 큰 조직보다 스타트업같은 작은 조직에 들어간다.

그래서 기술적 혁신은 둔중한 큰 조직보다는, 가볍고 융통성있는 작은 조직에서 주로 일어난다.

하지만 작은 조직은 살아남기 위해, 투자받기 위해 지속적인 가파른 성장을 보여줘야하며, 그 과정에서 general humanoid같은 아직 이른 약속을 남발하게 된다.

결국 유능한 인재들은 진정으로 산업이 필요로 하는 공학적 문제를 풀기 위해 노력하기보다, 투자가들의 지갑을 열 만큼 매력적이고 자극적인 demo 영상을 뽑기 위해 노력할 수 밖에 없다.

로봇 산업의 진정한 Next Level은 어쩌면 더 자극적인 shorts를 뽑아내는 조직이 아니라, 진짜 풀만한 가치가 있는 공학적 문제를 풀어내는 조직에서 시작될 지 모른다.
