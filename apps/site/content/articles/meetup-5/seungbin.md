---
slug: meetup-5-seungbin
date: 2026-06-28
publishedAt: '2026-07-30T12:54:11+09:00'
title:
  ko: 로봇은 언제 접촉해야 하는지 스스로 찾을 수 있을까
  en: Can Robots Find When to Make Contact on Their Own?
subtitle:
  ko: contact-rich control에서 contact-implicit trajectory optimization이 풀려는 문제와 아직 남은 한계
  en: What contact-implicit trajectory optimization tries to solve in contact-rich control, and where it still falls short
---

![접촉 지점을 찾으며 구를 회전시키는 다지 로봇 손](/articles/meetup-5/seungbin/01-cover-contact.png)

*contact-rich control에서는 힘의 크기보다 먼저 언제 어디에 닿을지를 찾아야 한다.*

로봇 제어를 생각하면 보통 먼저 떠오르는 것은 모터, 센서, 알고리즘이다.

어떤 torque를 줄 것인가. 어떤 observation을 볼 것인가. 어떤 policy나 controller를 쓸 것인가. 모두 중요한 질문이다. 그런데 로봇이 실제 세계에서 일을 하기 시작하면, 더 근본적인 질문이 앞에 놓인다.

로봇은 언제 세상에 닿아야 하는가.

걷는 로봇은 발로 바닥을 딛어야 한다. 손가락으로 공을 굴리는 로봇은 어느 순간 물체를 눌러야 한다. 박스를 돌리거나 의자를 미는 로봇도 결국 접촉을 통해 힘을 전달한다. 로봇이 물리 세계에서 무언가를 한다는 것은 대부분 어떤 방식으로든 세상과 닿는다는 뜻이다.

문제는 접촉이 단순한 이벤트가 아니라는 데 있다.

닿는 순간 dynamics가 바뀐다. 떨어져 있을 때는 물체에 힘을 줄 수 없고, 닿아 있을 때는 로봇과 물체가 서로 영향을 준다. 그래서 "어떻게 힘을 줄 것인가" 이전에 "언제 어디에 닿을 것인가"가 제어 문제의 핵심이 된다.

나는 지금 contact-implicit trajectory optimization을 연구하고 있다. contact을 미리 정하지 않고, 최적화 문제 안에서 contact sequence와 timing을 같이 찾게 하려는 접근이다.

핵심 질문은 단순하다.

사람이 "여기서 닿고, 여기서 떨어지고, 여기서 다시 밀어라"를 모두 설계하지 않아도 optimizer가 스스로 접촉을 찾게 할 수 있을까.

## 접촉이 생기면 다른 문제가 된다

로봇이 물체와 떨어져 있을 때 로봇과 물체는 거의 독립적으로 움직인다. 반대로 로봇이 물체와 닿는 순간에는 contact force가 생기고, 서로의 dynamics에 영향을 준다.

no-contact state와 contact state는 같은 연속 위에 매끄럽게 놓인 두 상태가 아니라, 서로 다른 dynamics mode이다. 이런 시스템을 보통 hybrid dynamics라고 부른다.

문제는 optimization이 이런 switching을 별로 좋아하지 않는다는 데 있다.

trajectory optimization은 보통 gradient 정보를 이용한다. 그런데 접촉은 이 구조를 깨뜨린다. 떨어져 있는 상태에서는 "조금 더 가면 물체를 밀 수 있다"는 정보가 잘 드러나지 않고, 닿는 순간에는 제약이 바뀌면서 함수가 매끄럽지 않게 된다.

실제로는 조금만 더 가면 좋은 contact이 있는데, local하게 보면 아무 변화가 없으니 optimizer는 그 자리에 멈출 수 있다.

![접촉 전후 서로 다른 dynamics mode를 보여주는 로봇 gripper와 물체](/articles/meetup-5/seungbin/02-hybrid-dynamics.png)

*닿기 전과 닿은 뒤에는 서로 다른 dynamics mode가 작동한다.*

## 걷는 로봇에서는 사람이 순서를 정할 수 있었다

기존 model-based locomotion controller에서는 이 문제를 어느 정도 우회할 수 있었다. 네 발 로봇이 걷는 상황에서는 walk, trot, bounding gait처럼 발이 닿고 떨어지는 pattern을 사람이 비교적 직관적으로 정할 수 있다. 그러면 controller는 이미 정해진 contact sequence 위에서 trajectory를 찾으면 된다.

하지만 dexterous manipulation으로 가면 이야기가 달라진다.

손가락 여러 개로 물체를 돌릴 때는 다르다. 어떤 finger가 어디를 누르고, 언제 push하고, 언제 detach하고, 언제 다시 contact해야 하는지 사람이 미리 설계하기 어렵다. 물체 모양, 손의 morphology, 마찰, 목표 orientation에 따라 가능한 접촉 전략이 계속 달라진다.

그래서 자연스럽게 이런 바람이 생긴다. contact sequence를 optimization이 찾으면 안 될까.

## 어려운 결정을 optimizer에게 넘긴다

Contact-implicit trajectory optimization은 바로 그 방향의 시도다.

기존 방식이 “이 시점에는 이 contact이 있다”고 미리 정한 뒤 문제를 푼다면, contact-implicit 방식은 contact mode를 미리 고정하지 않는다. 대신 contact force와 contact constraint를 trajectory optimization 안에 함께 넣는다. 그 결과 optimizer가 trajectory뿐 아니라 언제 contact을 만들고 끊을지도 같이 찾게 된다.

이 아이디어는 매력적이다. 사람이 미리 contact mode를 설계하지 않아도 된다. 잘 되면 로봇은 물체에 힘을 전달해야 하는 순간을 스스로 찾아낸다.

하지만 hard contact을 그대로 넣으면 optimization problem이 너무 다루기 어려워진다.

접촉은 complementarity condition으로 표현된다. 두 물체 사이의 gap이 양수이면 contact force는 0이어야 하고, 양의 normal contact force가 존재하려면 gap은 0이어야 한다.

물리적으로는 당연하지만 optimization 관점에서는 불편하다. 접촉이 생기는 순간 제약과 dynamics가 바뀌고, optimization landscape가 non-smooth해지며, gradient가 유용한 방향 정보를 주지 못할 수 있다.

그래서 contact-implicit optimization에서 중요한 질문은 contact을 어떻게 optimization-friendly하게 만들 것인가가 된다.

## Relaxation은 길을 열어 주지만 완전하지 않다

한 가지 접근은 relaxation이다.

Hard contact condition을 조금 느슨하게 만들어 optimizer가 서로 다른 contact mode 사이를 이동할 수 있게 한다. 원래는 끊겨 있던 경계를 완화해 더 유용한 gradient를 얻는 것이다.

직관적으로는 가파른 절벽을 완만한 경사로 바꾸는 것과 비슷하다. Optimizer는 어느 방향으로 움직여야 할지 더 쉽게 판단할 수 있다.

하지만 relaxation이 문제를 없애 주는 것은 아니다.

우선 optimization problem은 여전히 non-convex하다. 좋은 gradient를 얻더라도 optimizer가 원하는 contact sequence를 찾는다는 보장은 없다. Initial guess에 따라 다른 local solution에 머물 수도 있다.

Relaxation 자체도 trade-off를 만든다. Condition을 너무 느슨하게 두면 물체에 닿기 전에 contact force가 생기는 등 원래의 hard contact과 다른 solution이 나올 수 있다. 반대로 relaxation을 줄이면 물리적으로는 더 정확해지지만 optimization은 다시 어려워진다.

또 이를 controller로 사용하려면 optimization을 매 순간 빠르고 안정적으로 풀어야 한다. Contact candidate가 많아지고 horizon이 길어질수록 이 부담은 커진다.

즉, relaxation은 contact-implicit optimization을 풀 수 있는 길을 열어 준다. 하지만 항상 좋은 solution이나 강건한 control까지 자동으로 보장하지는 않는다.

![불연속적인 contact landscape를 부드러운 경로로 바꾸는 relaxation](/articles/meetup-5/seungbin/03-relaxation-landscape.png)

*relaxation은 끊어진 contact landscape를 부드럽게 해 gradient가 움직일 길을 만든다.*

## 내가 더 현실적으로 보는 활용처는 motion retargeting이다

motion retargeting은 한 몸에서 나온 motion을 다른 몸에 맞게 옮기는 일이다. 사람의 motion capture 데이터를 humanoid에 옮기거나, 어떤 robot hand의 조작 motion을 다른 hand나 gripper에 맞게 바꾸는 작업이 여기에 해당한다.

이 문제에서도 contact은 계속 발목을 잡는다. 몸의 morphology가 다르면 동작을 그대로 옮겼을 때 발이 바닥을 뚫을 수 있다. 손이 물체에 닿지 않은 채 허공에서 움직이거나, 원래 motion에 있던 object interaction이 사라질 수도 있다.

특히 object interaction dataset은 더 어렵다. 접촉 정보가 없거나, 다른 robot morphology로 옮길 때 기존 contact label을 그대로 쓸 수 없는 경우가 많다.

이때 contact-implicit optimization이 도움이 될 수 있다.

목표 motion이나 object orientation은 주되, contact label을 그대로 강제하지 않는다. 대신 optimizer가 새로운 morphology 안에서 물리적으로 가능한 contact을 다시 찾게 한다. Motion의 목표를 다른 로봇의 몸으로 다시 풀어내는 방식이다.

Retargeting에서는 이미 source motion이 있다는 점도 유리하다. 이를 target robot에 대략 맞춘 trajectory로 변환하면 optimization의 warm start로 사용할 수 있다. Optimizer가 motion 전체를 처음부터 찾는 대신, 기존 motion에서 깨진 contact과 trajectory를 중심으로 수정하게 하는 것이다.

Morphology 차이가 크면 source motion이 좋은 solution을 보장하지는 않는다. 그래도 아무 initial guess 없이 contact-rich motion을 찾는 것보다는 유리한 출발점이 된다.

![사람의 손 동작을 다른 형태의 로봇 손으로 옮기며 접촉을 다시 찾는 과정](/articles/meetup-5/seungbin/04-motion-retargeting.png)

*source motion을 warm start로 쓰더라도, 새로운 robot morphology에서 실제 contact은 다시 찾아야 한다.*

이 관점에서는 contact-implicit trajectory optimization이 범용 controller가 아니어도 충분히 의미가 있다. 데이터와 robot morphology 사이의 간극을 줄이는 planning 또는 retargeting 도구가 될 수 있다.

contact-implicit trajectory optimization은 아직 만능이 아니다. 그래도 접촉을 사전에 전부 설계하는 대신, optimization problem 안에서 발견하게 만드는 방향을 가리킨다.

로봇이 더 복잡한 몸을 갖고 더 복잡한 물체를 다루려면, 결국 “언제 어디에 닿을 것인가”를 사람이 하나씩 써주는 방식만으로는 부족하다.

Contact-rich motion은 힘을 잘 내는 것만으로 완성되지 않는다. 세상과 닿아야 할 순간도 찾아야 한다.

contact-rich control의 다음 어려움은 아마 거기에 있다. 로봇이 세상에 닿는 방법을, 로봇 스스로 찾게 만드는 것.
