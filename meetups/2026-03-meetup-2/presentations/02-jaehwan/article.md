---
slug: meetup-2-jaehwan
date: 2026-03-28
title:
  ko: autoresearch는 연구자를 대체할까
subtitle:
  ko: 아직은 아니다. 하지만 밤새 일시키기엔 이미 충분히 유용하다
---

![밤새 실험을 돌리는 autoresearch 대시보드](/articles/meetup-2/jaehwan/01-dashboard.png)

*연구의 형태는 notebook을 직접 만지는 방식에서, agent가 갱신하는 dashboard를 읽고 조정하는 방식으로 조금씩 이동하고 있다.*

요즘 AI를 쓰는 방식은 빠르게 바뀌고 있다.

예전에는 내가 직접 코드를 짜고, notebook 셀을 하나씩 실행하고, 결과를 보고, 다시 수정하는 식으로 일했다. 그런데 최근 몇 달 동안 계속 느끼는 건, 이 방식 자체가 조금씩 낡아가고 있다는 점이다. 특히 AI agent를 같이 쓰기 시작하면 더 그렇다. Jupyter notebook처럼 사람이 손으로 만지며 탐색하는 포맷은, agent가 장시간 loop를 돌며 실험하고 결과를 남기는 방식과는 잘 맞지 않는다. 내가 보기엔 앞으로는 notebook보다 agent가 계속 갱신하는 dashboard 쪽이 훨씬 자연스러운 작업 포맷이 될 가능성이 크다.

나도 요즘 점점 그렇게 일하고 있다.

코드를 직접 만지기보다, agent에게 실험을 돌리게 하고, 결과를 정리하게 하고, 그걸 web dashboard처럼 올려서 본다. 나는 그 결과를 보면서 "이 지표도 넣어봐라", "이건 좀 이상하니 다른 방식으로 잘라서 분석해봐라", "지금 PnL만 보면 재미없으니 exit quality도 같이 봐라" 같은 식으로 개입한다. 예전처럼 내가 모든 실험의 손발이 되는 게 아니라, agent가 실험을 굴리고 나는 연구의 방향을 잡는 방식으로 역할이 바뀌고 있는 셈이다.

이런 흐름 속에서 특히 흥미로웠던 게 autoresearch였다.

## autoresearch는 결국 연구 loop를 자동화하는 시도다

autoresearch의 핵심은 단순하다.

AI에게 코드를 한 번 실행하게 하는 것이 아니라, 연구 자체를 하나의 loop로 만들어 계속 돌리게 하는 것이다. 어떤 objective가 있고, 어떤 실험이 있고, 바꿔도 되는 것과 바꾸면 안 되는 것이 있다. 그 규칙을 정해주면 agent가 계속 실험하고, 결과를 기록하고, 더 나은 방향을 찾아 다음 실험으로 넘어간다. 말하자면 연구자가 하던 "생각-실험-기록-수정"의 cycle을 AI가 일정 부분 대신 돌리는 것이다.

이게 흥미로운 이유는 단순히 hyperparameter를 tuning하기 때문이 아니다. hyperparameter search 자체는 원래도 있었다. autoresearch가 재미있는 지점은, 단순 숫자 조정이 아니라 연구 전략 자체를 조금씩 바꿔가며 loop를 닫는 데 있다. 어떤 설정을 바꾸고, 어떤 방법론을 시도하고, 잘 되면 남기고 안 되면 버린다. 연구자라면 당연히 하던 일이지만, 이걸 LLM이 orchestration할 수 있다는 점이 새롭다.

![실험과 기록, 평가가 이어지는 자동 연구 루프](/articles/meetup-2/jaehwan/02-loop.png)

*autoresearch의 핵심은 한 번의 실행이 아니라, 생각-실험-기록-수정의 loop를 닫는 데 있다.*

나는 이 아이디어가 꽤 설득력 있다고 느꼈다. 특히 "AI를 하루 종일 굴려서 연구에 쓸 수 있느냐"는 질문에 대해, 적어도 부분적인 답은 이미 나와 있다고 생각한다. 잘 짠 loop 안에서는 된다. 다만 여기서 핵심은 "잘 짠 loop"라는 전제다.

## 내가 적용한 곳은 model training이 아니라 trading strategy research였다

나는 이걸 그대로 따라 하기보다, 내가 이미 하고 있던 문제에 맞게 가져와 봤다.

내가 다루는 건 시장이 얼마나 오를지 내릴지를 예측한 model의 output이고, 실제로 더 중요한 건 그 prediction을 어떻게 trading strategy로 연결하느냐는 문제다. model이 잘 맞는지보다, 그 inference 결과를 어떤 logic으로 execution하고 exit하느냐가 실제 수익에는 더 큰 영향을 줄 때가 많다.

그래서 내가 고정한 건 두 가지였다. 하나는 이미 나온 inference 결과, 즉 시장 방향에 대한 prediction. 다른 하나는 backtest engine이다.

이 두 개를 고정한 이유는 간단하다. agent가 성과를 좋게 만들기 위해 엉뚱한 곳을 건드리지 못하게 하기 위해서다. 예를 들어 backtest engine까지 바꿀 수 있게 두면, 수수료를 비현실적으로 낮추거나, evaluation 방식을 유리하게 비틀거나, 아예 내가 원하지 않는 방향으로 "꼼수 최적화"를 할 수 있다. 그건 research라기보다 metric gaming에 가깝다. 그래서 engine과 data는 고정하고, strategy logic과 parameter, 그리고 research rule만 바꿀 수 있게 두었다.

![꼼수 최적화를 막는 평가 구조와 guardrail](/articles/meetup-2/jaehwan/04-metric-gaming.png)

*loop design은 agent가 무엇을 바꿀 수 있고, 무엇은 절대 건드릴 수 없는지를 정하는 일에 가깝다.*

그 상태에서 autoresearch를 돌리면, agent는 strategy를 바꾸고, 실험을 하고, backtest를 돌리고, 결과를 정리하고, 더 나은 방향을 시도한다. 나는 그 dashboard를 보면서 다시 개입한다. 결국 이 구조는 완전 자동화라기보다, 자동 loop 위에 사람이 계속 방향을 덧씌우는 구조에 가깝다.

## 완전한 autonomous researcher는 아직 아니다

여기서 중요한 결론이 하나 나온다.

autoresearch는 재밌고, 실제로 꽤 유용하다. 하지만 아직 완전한 autonomous researcher라고 부를 수준은 아니다.

가장 큰 문제는 생각의 깊이다. agent는 loop를 잘 돈다. 많이 시도하고, log도 남기고, 결과도 정리한다. 밤새 쉬지 않고 반복할 수도 있다. 그런데 어느 순간부터는 특정한 사고 패턴 안에 갇히는 느낌이 분명히 있다. 얕은 탐색은 잘한다. hyperparameter를 만지거나, metric을 조금 바꾸거나, exit condition을 조절하는 식의 local search는 꽤 잘한다. 하지만 정말 중요한 insight, 이를테면 "지금 이 strategy가 왜 구조적으로 무너지는가", "어떤 assumption을 아예 다시 세워야 하는가", "지금까지의 search space 자체가 잘못된 것 아닌가" 같은 질문에는 아직 잘 못 들어간다.

이건 실제로 써보면 금방 느껴진다. 처음에는 그냥 loop를 닫아두면 스스로 계속 발전할 것 같지만, 어느 시점부터는 사람이 insight를 넣어주지 않으면 계속 비슷한 주변만 맴돈다. 그래서 내가 지금 가장 좋다고 느끼는 방식은 완전 자동화가 아니라, agent가 실험을 돌리고 나는 중간중간 해석과 방향을 주입하는 방식이다.

그러니까 autoresearch는 아직 "연구자를 대체한다"기보다, 연구자의 야간 근무를 대신해주는 system에 더 가깝다.

## 핵심은 model보다 loop design이다

이걸 실제로 굴리면서 더 강하게 느낀 건, 성능의 상당 부분이 model 자체보다 loop를 어떻게 설계하느냐에 달려 있다는 점이다.

무엇을 고정할 것인가. 무엇을 바꿀 수 있게 둘 것인가. 무슨 metric을 보게 할 것인가. 언제 중단하게 할 것인가. 어떤 실험은 금지할 것인가.

이런 것들이 생각보다 훨씬 중요하다. loop가 헐거우면 agent는 금방 엉뚱한 방향으로 빠진다. 너무 자유를 주면 자기가 objective를 다시 써버리거나, priority를 바꿔버리거나, 내가 막으려던 꼼수를 찾아낸다. 반대로 너무 꽉 묶으면 그냥 기계적인 search tool과 다를 바가 없어진다. 결국 중요한 건 AI의 "지능" 자체보다, 연구의 자유도와 제약을 어디에 둘 것인가를 정하는 orchestration이다.

나는 이 점이 autoresearch의 본질이라고 생각한다. 겉으로 보면 "AI가 연구한다"는 말이 인상적이지만, 실제로는 어떤 loop를 만들고 그 안에 어떤 evaluation structure를 넣느냐가 거의 전부라고 해도 과장이 아니다.

## trading에서는 특히 reality gap이 더 크게 드러난다

trading에 이걸 적용하면 또 하나의 문제가 아주 선명하게 드러난다. backtest는 어디까지나 과거 data 위의 test라는 점이다.

strategy가 backtest에서 좋아 보여도, 실제 시장에서는 덜 나온다. 이건 당연한 이야기지만, agent를 붙여놓고 strategy를 계속 최적화할수록 오히려 더 민감해진다. 예를 들어 거래 fee를 아주 조금만 올려도 strategy가 무너지는 경우가 있다. 시장은 생각보다 효율적이고, backtest에서 보이던 작은 edge는 현실의 friction 앞에서 쉽게 증발한다. 그래서 실제로는 entry보다 exit가 더 중요해지기도 하고, 수익률보다 execution quality가 더 중요해지기도 한다.

![과거 데이터 위의 backtest와 현실 시장 사이의 간극](/articles/meetup-2/jaehwan/03-backtest.png)

*backtest에서 보이던 작은 edge는 수수료, slippage, execution 같은 현실의 마찰 앞에서 쉽게 사라질 수 있다.*

이 지점에서 autoresearch의 장점이 있다. 단순히 PnL만 보게 두는 게 아니라, 내가 중요하다고 생각하는 현실적인 metric들을 계속 추가하게 만들 수 있다는 점이다. fee에 얼마나 민감한지, exit가 어떻게 무너지는지, strategy가 특정 구간에만 의존하는지 같은 걸 계속 보게 할 수 있다. 그러면 agent는 단순히 "돈 버는 strategy"가 아니라, 어느 정도 현실을 견딜 수 있는 strategy 쪽으로 조금씩 이동하게 된다.

물론 여기에도 한계는 있다. 결국 시장은 sim-to-real gap이 크다. backtest는 과거 시장을 보는 것이고, 실제 시장은 항상 더 지저분하다. 그래서 autoresearch가 직접 돈을 벌게 해준다기보다, 내가 strategy를 더 빠르게 탐색하고 더 빨리 버릴 수 있게 해준다고 보는 편이 맞다.

## 지금의 autoresearch는 'IQ 115짜리 동료'에 가깝다

내가 지금 이걸 가장 정확하게 표현하자면 이렇다.

autoresearch는 천재 researcher가 아니다. 그렇다고 멍청한 automation script도 아니다. 대충 IQ 115 정도의, 밤새 쉬지 않고 일하는 동료에 가깝다.

![밤새 남겨진 실험 결과를 아침에 다시 읽는 연구 workflow](/articles/meetup-2/jaehwan/05-night-shift.png)

*지금의 autoresearch는 연구자를 대체한다기보다, 지치지 않는 야간 실험 동료에 더 가깝다.*

얕고 넓은 탐색은 꽤 잘한다. metric을 정리하고, 실험을 반복하고, 비교 결과를 시각화하고, 사람이 귀찮아서 안 하게 되는 반복 작업을 끝없이 밀어붙인다. 반면 깊은 아이디어 점프, 정말 새로운 hypothesis의 발명, 기존 frame을 깨는 insight 같은 건 아직 사람이 더 낫다.

그래서 나는 이걸 "연구자를 대체하는 system"으로 보기보다, 연구자의 사고를 증폭시키는 assistant이자 executor로 보는 편이 더 정확하다고 생각한다.

낮에는 내가 방향을 정하고, 밤에는 agent가 그 방향으로 수십 개의 실험을 돌리고, 아침에 나는 그 결과를 보고 다시 판단한다.

이 workflow는 이미 충분히 유용하다. 그리고 아마 많은 지식노동이 앞으로 이런 형태로 바뀔 가능성이 크다.

## 중요한 건 AI 자체보다, AI에게 맡길 수 있는 일의 경계가 바뀌고 있다는 점이다

autoresearch를 써보면서 가장 크게 느낀 변화는, AI가 갑자기 인간보다 더 똑똑해졌다는 것이 아니다.

그보다 더 중요한 건, 이제는 사람이 직접 하지 않아도 되는 연구 노동의 범위가 꽤 넓어졌다는 사실이다.

예전에는 실험을 설계하는 사람과 실험을 실행하는 사람이 사실상 같은 사람이었다. 이제는 둘을 분리할 수 있다. 사람은 방향과 기준을 정하고, AI는 loop를 돌리고, log를 남기고, 결과를 정리하고, 다음 시도를 만든다. 그 구조가 가능해졌다는 것 자체가 꽤 큰 변화다.

그래서 내가 보기에 autoresearch의 의미는 "AI가 researcher가 된다"는 데 있지 않다. 오히려 research라는 작업이 점점 더 orchestration의 문제가 되고 있다는 데 있다. 좋은 researcher는 모든 실험을 직접 돌리는 사람이 아니라, 어떤 문제를 어떤 loop로 닫고, 무엇을 고정하고 무엇을 탐색하게 할지를 잘 설계하는 사람이 될 가능성이 크다.

아직은 사람의 개입이 필요하다. 아직은 생각의 깊이도 부족하다. 하지만 밤새 쓸 수 있는 executor, 반복을 지치지 않는 실험 동료, 그리고 결과를 정리해 다음 판단의 재료를 만들어주는 system으로서는 이미 충분히 쓸 만하다.

완전한 자동 연구자는 아직 멀었다. 하지만 부분 자동화된 research loop는 이미 시작됐다. 중요한 건 그 차이를 정확히 이해하고 쓰는 것이다.
