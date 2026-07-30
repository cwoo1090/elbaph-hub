---
slug: meetup-3-jaehwan
date: 2026-04-25
title:
  ko: 호르무즈 해협이 막히고 유가가 뛰자, Web3 오일 시장에서 생긴 일
  en: When Hormuz Closed and Oil Spiked, What Happened in Web3 Oil Markets
subtitle:
  ko: 미국-이란 충돌, oil futures, oracle rollover, funding fee가 만든 이상한 차익거래
  en: How U.S.-Iran conflict, oil futures, oracle rollovers, and funding fees created a strange arbitrage
---

![호르무즈 해협과 Web3 오일 시장이 같은 화면 위에서 연결되는 밝은 트레이딩 데스크](/articles/meetup-3/jaehwan/01-cover-hormuz-web3-oil.png)

*유가가 움직인 사건처럼 보였지만, 실제 기회는 전통 futures와 Web3 perpetual이 같은 원유를 서로 다른 시간 구조로 가격화한 틈에서 생겼다.*

전쟁이 나면 유가가 움직인다.

그 자체는 별로 새롭지 않다. 미국과 이란의 충돌처럼 중동의 지정학적 긴장이 커지고, 호르무즈 해협을 지나는 유조선의 risk가 커지면 oil price는 당연히 흔들린다. 실제 원유 공급이 줄어들 수도 있고, 줄어들지 않더라도 시장은 먼저 불확실성을 가격에 반영한다.

그런데 이번에 흥미로웠던 것은 oil price 자체가 아니었다.

진짜 이상한 일은 전통 금융시장과 Web3 시장이 같은 기초자산을 서로 다른 방식으로 가격화하면서 생겼다. 전통시장에는 만기가 있는 oil futures가 있고, crypto exchange에는 oil price를 따라가도록 설계된 perpetual market이 있다. 둘 다 원유 가격에 exposure를 주는 상품처럼 보이지만, 내부 구조는 다르다.

그리고 시장 구조가 다르면, 가격이 움직이는 방식도 달라진다.

이번 이야기는 단순히 "유가가 올랐다"는 이야기가 아니다. 호르무즈 해협, oil futures curve, oracle rollover, funding fee가 겹치면서 생긴 거의 무위험에 가까운 기회와, 그 기회가 operational detail 하나 때문에 어떻게 위험해질 수 있는지에 대한 이야기다.

## futures와 perpetual은 비슷해 보이지만 다르게 움직인다

먼저 futures부터 보자.

futures는 특정 만기일에 어떤 자산을 정해진 가격으로 사고파는 계약이다. 예를 들어 10월물 원유 futures를 산다는 것은, 단순화하면 10월의 원유 가격에 exposure를 갖는다는 뜻이다. 만기가 있기 때문에 이 상품은 자연스럽게 시간 구조를 가진다. 5월물, 6월물, 7월물, 12월물이 각각 따로 존재하고, 각 만기의 가격은 시장이 예상하는 미래 상황을 반영한다.

평상시에는 뒤쪽 만기의 가격이 더 높거나 낮아지는 이유를 storage cost, interest rate, supply-demand expectation 같은 요소로 설명할 수 있다. 하지만 전쟁이나 해상 봉쇄 risk처럼 단기 shock이 크면 curve가 훨씬 더 특이해진다. 지금은 가까운 만기에는 높은 risk premium이 붙고, 먼 만기에는 "그때쯤이면 상황이 정상화될 것"이라는 기대가 반영될 수 있다.

그래서 5월물과 6월물 사이에도 꽤 큰 가격 차이가 생길 수 있다.

perpetual은 다르다. perpetual은 말 그대로 만기가 없는 선물 비슷한 상품이다. crypto 시장에서는 Bitcoin이나 Ethereum exposure를 잡을 때 흔히 쓰인다. 만기가 없기 때문에 특정 날짜에 settlement되는 구조가 아니다. 대신 perpetual price가 reference price에서 멀어지면 long과 short 사이에 funding fee를 주고받게 해서 가격을 다시 reference price 근처로 끌어온다.

여기서 핵심은 reference price다.

perpetual market은 스스로 현실 가격을 알 수 없다. 그래서 어떤 oracle price를 참조한다. Bitcoin perpetual이면 spot price를 oracle로 쓰는 경우가 많다. 그런데 oil perpetual처럼 전통시장 상품을 Web3 위에 올릴 때는 문제가 더 복잡해진다. 실제 spot oil을 바로 쓰기보다, 전통시장에 상장된 oil futures price를 reference로 가져오는 식의 설계가 가능하기 때문이다.

그러면 만기가 없는 perpetual이, 만기가 있는 futures를 oracle로 삼게 된다.

이때부터 재미있는 일이 생긴다.

![원유 선물 만기별 가격 차이가 밝은 곡선과 계약 블록으로 표현된 장면](/articles/meetup-3/jaehwan/02-futures-curve.png)

*단기 지정학 risk가 커지면 가까운 만기의 가격과 다음 만기의 가격 차이가 커질 수 있고, 이 차이가 Web3 perpetual의 reference price 문제로 이어진다.*

## oracle은 언젠가 다음 만기로 넘어가야 한다

5월물 futures를 oracle로 쓰는 oil perpetual이 있다고 하자.

처음에는 문제가 없다. perpetual price는 5월물 가격을 따라가면 된다. 그런데 시간이 지나 5월물이 만기에 가까워지고, 결국 그 contract가 사라지면 어떻게 해야 할까. 계속 5월물을 oracle로 쓸 수는 없다. 시장이 없어지기 때문이다.

그래서 oracle은 어느 시점에 6월물로 넘어가야 한다.

평상시에는 이 전환이 큰 문제가 아닐 수 있다. 5월물과 6월물 가격 차이가 작으면, oracle을 천천히 rollover하더라도 perpetual price에 큰 충격이 없다. 선형적으로 섞거나, 일정 기간에 걸쳐 reference를 바꾸면 된다.

하지만 전쟁 risk가 들어오면 이야기가 달라진다.

가까운 만기의 oil futures가 훨씬 비싸고, 다음 만기의 futures가 의미 있게 싸다면 oracle rollover 자체가 큰 price movement를 예고하는 사건이 된다. 예를 들어 단순화해서 5월물이 90달러이고 6월물이 80달러라고 해보자. oracle이 5월물에서 6월물로 넘어가면 reference price가 내려간다. perpetual price도 결국 그 reference를 따라 내려가야 한다.

이 사실을 시장 참여자들이 모른다면, 아주 단순한 trade가 가능하다.

oracle이 내려가기 전에 perpetual을 short한다. oracle이 rollover되며 reference price가 내려가면 perpetual price도 내려가고, short position은 돈을 번다. 구조만 보면 너무 쉬워 보인다.

실제로 첫 번째 기회는 여기에 가까웠다. 시장이 oil perpetual의 oracle 구조를 충분히 이해하지 못했고, funding fee도 거의 그 기회를 반영하지 못했다. 말하자면 정보가 가격에 덜 반영된 상태였다.

하지만 시장은 한 번 당하면 배운다.

![두 개의 원유 선물 계약 큐브 사이에서 oracle 데이터 흐름이 다음 만기로 넘어가는 장면](/articles/meetup-3/jaehwan/03-oracle-rollover.png)

*만기 없는 perpetual이 만기 있는 futures를 reference로 삼는 순간, oracle rollover는 단순한 운영 이벤트가 아니라 가격 이벤트가 된다.*

## 모두가 short을 치면, 이제 long이 정답이 될 수도 있다

두 번째 기회는 더 흥미롭다.

이제 사람들은 oracle rollover를 안다. 5월물에서 6월물로 넘어갈 때 reference price가 내려갈 수 있다는 것도 안다. 그러면 모두가 같은 생각을 한다. "perpetual을 short하면 되겠네."

그런데 perpetual에는 funding fee가 있다.

perpetual price가 oracle보다 낮아지면, short이 long에게 funding fee를 내는 구조가 된다. 모두가 미리 short을 치면 perpetual price는 oracle보다 크게 낮아진다. 그러면 short position은 oracle이 내려가는 방향에서는 이익을 볼 수 있지만, rollover 전까지 계속 funding fee를 낼 수 있다.

즉 trade의 정답은 단순히 "oracle이 내려가니까 short"이 아니다.

중요한 것은 fair price다. oracle이 언제, 얼마나, 어떤 속도로 내려가는지. funding fee는 몇 시간마다 정산되는지. 지금 perpetual price는 oracle 대비 얼마나 낮은지. rollover까지 남은 시간 동안 short이 내야 하는 funding fee가 얼마인지. 이걸 모두 합쳐야 지금 가격이 싼지 비싼지 판단할 수 있다.

아주 단순한 예시로 생각해보자.

oracle이 지금 100달러이고, 특정 시점 이후 90달러로 내려간다고 하자. rollover 직후의 fair price는 당연히 90달러다. 그런데 rollover 직전의 fair price가 100달러일까. 그렇지 않다. 100달러에 short을 잡으면 funding fee를 거의 내지 않고 이후 price drop을 먹을 수 있기 때문에 너무 유리하다. 반대로 90달러까지 미리 내려와 있다면 short은 funding fee를 계속 내야 한다.

그래서 fair price는 중간 어딘가에 형성된다. funding fee 정산이 여러 번 남아 있다면 이 fair price는 시간에 따라 점점 변한다. 이 구조를 계산해보면, 사람들이 너무 많이 short을 친 순간에는 오히려 perpetual long이 더 좋은 trade가 될 수 있다.

첫 번째 이벤트에서는 short이 정답에 가까웠고, 두 번째 이벤트에서는 long이 정답에 가까워질 수 있었던 이유가 여기에 있다.

같은 oracle rollover라도, 시장이 무엇을 알고 있는지에 따라 trade는 반대로 바뀐다.

![한쪽으로 crowded short position이 몰리고 funding fee 흐름이 반대편으로 이동하는 디지털 트레이딩 플로어](/articles/meetup-3/jaehwan/04-crowded-short-funding.png)

*모두가 같은 방향으로 먼저 움직이면 perpetual price와 funding fee가 바뀌고, 처음에는 좋아 보이던 short이 오히려 비싼 trade가 될 수 있다.*

## 거의 무위험이라는 말은 operational detail 앞에서 깨진다

이론적으로는 hedge도 가능하다.

perpetual에서 한쪽 position을 잡고, 전통 futures 쪽에서 반대 exposure를 섞으면 oil price 자체의 방향성 risk를 줄일 수 있다. 그러면 남는 것은 oracle rollover와 funding fee 구조에서 나오는 mispricing이다. 이론상으로는 꽤 깔끔한 차익거래처럼 보인다.

하지만 현실의 trading은 이론처럼 깨끗하지 않다.

가장 큰 문제는 시간이다. perpetual market은 24시간 돌아간다. 반면 전통 futures market은 쉬는 시간이 있다. 특히 주말이 끼면 hedge를 조정할 수 없는 시간이 생긴다. oracle rollover가 금요일 밤에 일어나는지, 월요일 아침에 일어나는지 같은 detail이 trade 전체의 손익을 바꿀 수 있다.

문서도 항상 충분히 명확하지 않다.

"maintenance window에 조정한다"는 문장이 있다고 해도, 그게 정확히 어느 시각을 뜻하는지, 어떤 시장 시간을 기준으로 하는지, 주말을 어떻게 처리하는지까지 자동으로 알 수 있는 것은 아니다. exchange에 물어보면 알 수 있었던 정보라도, 묻지 않으면 price에 반영하지 못할 수 있다.

이 지점에서 "거의 무위험"이라는 말은 조심스러워진다.

금융공학적으로 hedge된 trade도 operational risk를 갖는다. oracle schedule을 잘못 이해할 수 있고, hedge leg가 닫혀 있을 수 있고, liquidity가 부족할 수 있고, sudden price move로 liquidation risk가 생길 수 있다. 특히 leverage를 쓰면 작은 오차가 큰 손실로 이어질 수 있다.

차익거래는 risk가 없는 거래가 아니다. risk가 price direction이 아닌 다른 곳에 숨어 있는 거래다.

![24시간 돌아가는 crypto market과 쉬는 전통 futures market 사이에 달력과 시계가 놓인 운영 데스크](/articles/meetup-3/jaehwan/05-operational-risk.png)

*금융공학적으로 hedge된 trade도 시장 시간, maintenance window, 주말, liquidity 같은 운영 조건 앞에서는 다른 risk를 갖는다.*

## 돈은 가격 차이보다 구조 차이에서 생긴다

이번 사례가 재미있는 이유는 단순히 "전쟁 때문에 유가가 올랐다"가 아니기 때문이다.

전통시장과 Web3 시장은 같은 oil이라는 단어를 쓰고 있었지만, 실제로는 다른 시간 구조와 다른 settlement mechanism을 갖고 있었다. 하나는 만기가 있는 futures curve 위에 있고, 다른 하나는 만기 없는 perpetual과 funding fee 위에 있다. 그 둘을 연결하는 oracle이 rollover되는 순간, 구조의 차이가 가격의 차이로 드러났다.

시장은 대체로 효율적이다. 하지만 새로운 시장, 복잡한 상품, 충분히 설명되지 않은 oracle mechanism, 그리고 지정학적 shock이 겹치면 잠깐씩 비효율이 생긴다. 그 비효율은 오래 가지 않는다. 누군가 발견하고, 다른 사람들이 따라오고, funding fee가 바뀌고, fair price가 다시 맞춰진다.

그래서 이런 기회는 보통 한정 이벤트에 가깝다.

그리고 한정 이벤트일수록 핵심은 더 분명해진다. 가격만 보면 안 된다. 상품의 구조를 봐야 한다. oracle이 어디서 오고, 언제 바뀌고, funding fee가 어떻게 정산되고, hedge가 언제 가능한지까지 봐야 한다.

호르무즈 해협이 막히자 유가는 움직였다. 하지만 Web3 오일 시장에서 생긴 진짜 사건은 유가 상승 그 자체가 아니라, 서로 다른 시장 구조가 잠깐 어긋난 순간이었다.

그 틈에서 돈이 생겼고, 같은 틈에서 위험도 생겼다.

![전통 원유 futures 시장과 Web3 perpetual 시장 사이의 구조적 틈에서 가치와 위험 신호가 동시에 나타나는 장면](/articles/meetup-3/jaehwan/06-structure-gap.png)

*가격 차이는 표면에 보이는 결과일 뿐이다. 실제로 봐야 하는 것은 두 시장이 시간을 다르게 세고, 위험을 다르게 정산하는 구조다.*
