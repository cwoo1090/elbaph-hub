---
slug: meetup-5-younghun
date: 2026-06-28
title:
  ko: 언어 모델은 오래된 문맥을 얼마나 자세히 봐야 할까
  en: How Closely Should Language Models Read Old Context?
subtitle:
  ko: diffusion language model에서 현재는 자세히 보고 과거는 요약하는 linear-hybrid attention
  en: Linear-hybrid attention that reads the present closely and compresses the past in diffusion language models
---

긴 context를 말할 때 자주 기억력을 떠올린다.

모델이 더 많은 토큰을 기억하면 더 긴 문서를 읽고, 더 복잡한 코드를 다룰 수 있을 것처럼 보인다. 하지만 계산의 관점에서는 문제가 조금 다르게 생겼다.

모델은 모든 과거를 같은 해상도로 봐야 하는가.

사람이 긴 글을 읽을 때도 모든 문장을 같은 밀도로 다시 읽지는 않는다. 방금 나온 문장은 자세히 보고, 한참 앞의 내용은 대강의 맥락으로 기억한다.

transformer의 기본 attention은 이 문제를 훨씬 정직하게 푼다. 토큰이 N개 있으면 관계를 거의 N 곱하기 N으로 계산한다. 강력하지만 비싸다.

그래서 긴 context의 핵심 질문은 단순히 더 많이 기억하는 것이 아니다.

무엇을 자세히 보고, 무엇을 흐릿하게 볼 것인가.

## 긴 문맥의 문제는 기억이 아니라 해상도다

attention을 아주 단순하게 말하면 토큰 사이의 관계를 점수로 만드는 일이다. 각 토큰에서 query와 key라는 벡터를 뽑고, 두 벡터를 비교해서 관련도를 계산한다. 이 숫자들이 모이면 attention matrix가 된다.

하지만 토큰이 늘어나면 관계의 개수는 훨씬 빠르게 늘어난다. 토큰이 두 배가 되면 봐야 할 관계는 대략 네 배가 된다.

언어 모델을 돌릴 때는 긴 prompt를 읽는 prefill과, 새 토큰을 하나씩 만드는 decode가 있다. causal language model은 다음 토큰을 만들 때 이전 토큰들을 본다. 문맥이 길어질수록 새 토큰이 봐야 하는 과거도 길어진다.

긴 글을 "기억"한다는 말은 결국 긴 글의 많은 부분을 필요할 때 참조할 수 있다는 뜻이다. 그런데 모든 토큰 쌍을 같은 방식으로 계산하면 비용이 너무 빨리 커진다.

여기서 중요한 것은 context length 자체가 아니다. 더 중요한 것은 해상도다.

모든 과거를 같은 선명도로 볼 것인가. 아니면 지금 중요한 부분만 선명하게 보고 나머지는 압축해서 볼 것인가.

## 압축은 꼼수가 아니라 필요한 선택이다

이 문제를 완화하려는 대표적인 방향이 sparse attention이다. 오래된 문맥을 매번 토큰 단위로 전부 보지 않는다. 이전 토큰들을 block으로 묶고, 오래된 block은 압축해서 본다. 중요한 block은 더 자세히 열어 보고, 최근 토큰은 여전히 촘촘하게 본다.

linear attention은 더 과감하다. 이전 context를 일정한 크기의 상태로 묶어버린다. 토큰 수가 늘어나도 attention 계산이 N의 제곱으로 커지지 않도록, 과거를 누적된 요약값으로 들고 간다.

당연히 공짜는 아니다. 모든 토큰 사이의 관계를 정확히 계산하는 대신, 일정한 차원의 압축된 표현으로 근사한다. 빨라지는 대신 정보가 사라질 수 있다. 그래서 linear attention의 핵심은 "얼마나 빨라지는가"가 아니라 "얼마나 덜 잃으면서 빨라지는가"다.

이 관점이 중요하다. attention 효율화는 단순한 engineering trick이 아니다. 모델이 과거를 어떤 형태로 들고 있을지 정하는 문제다.

## diffusion language model에서는 과거와 현재가 갈라진다

보통 우리가 쓰는 language model은 autoregressive하다. 앞에서부터 한 토큰씩 만든다. "Once"가 나오면 다음 토큰을 고르고, 그다음 토큰을 다시 고르며 문장을 이어간다.

diffusion language model은 다른 방식으로 텍스트를 만든다.

이미지 diffusion model이 noise에서 출발해 여러 단계의 denoising으로 이미지를 만들듯, 텍스트에서도 mask나 불확실한 token sequence를 여러 번 고쳐가며 완성한다. 문장을 한 글자씩 쓰는 것이 아니라, 비어 있는 block을 놓고 여러 번 refine하는 방식이다.

긴 sequence 전체를 한 번에 계획하고, 나중에 세부를 채우는 방식은 아직 어렵다. 실제로는 block by block에 가깝다. 한 block 안에서 토큰들을 어느 정도 확정하고, 그다음 block으로 넘어간다.

여기서 중요한 차이가 생긴다.

현재 block은 아직 변하고 있다. 어떤 위치가 어떤 토큰으로 확정될지 모른다. block 안의 토큰들은 서로 영향을 주며 refine된다. 이 안에서는 여전히 자세한 attention이 필요하다.

반대로 과거 block은 이미 lock-in 되어 있다. 내용이 확정되었고, 현재 block 입장에서는 바뀌는 대상이 아니라 참고해야 할 문맥이다.

그러면 두 문맥을 같은 방식으로 볼 이유가 약해진다.

현재 block은 살아 있는 문맥이다. 과거 block은 이미 굳어진 문맥이다. 하나는 자세히 봐야 하고, 다른 하나는 요약해도 될 가능성이 있다.

## hybrid attention은 해상도의 차이를 구조로 만든다

linear-hybrid attention의 기본 아이디어는 이 차이를 계산 구조로 옮기는 것이다. 현재 block에는 기존 softmax attention을 쓴다. 아직 토큰들이 확정되지 않았고 서로 영향을 주며 바뀌는 영역이기 때문이다. 반대로 오래된 과거 block에는 linear attention을 쓴다.

hybrid라는 말은 여기서 나온다. 하나의 attention만 쓰는 것이 아니라, 현재와 과거에 서로 다른 attention을 쓴다. 현재는 선명하게 보고, 과거는 압축해서 본다.

학습은 teacher를 따라가는 방식으로 볼 수 있다. 이미 학습된 diffusion model의 attention 결과를 관찰한 뒤, linear attention 쪽 module이 그 출력을 최대한 비슷하게 만들도록 학습시킨다.

실험적으로는 benchmark가 대체로 비슷하게 유지되고, 속도는 대략 1.5배에서 2배 정도 빨라지는 방향의 결과를 기대할 수 있다. 하지만 이 숫자를 너무 큰 결론처럼 읽으면 안 된다. post-training 데이터, benchmark 편향, teacher model 편향이 모두 영향을 준다.

그래도 방향은 분명하다. diffusion language model에서 오래된 block을 가볍게 보는 것은 단순한 shortcut이 아니다. 문맥의 상태 차이를 이용하는 방법이다.

## 빠른 모델은 무엇을 흐릿하게 볼지 정한다

attention을 줄이는 연구는 결국 무엇을 덜 볼지 정하는 연구다.

모든 정보를 정확히 다 보면 좋다. 하지만 비용이 너무 크다. 반대로 너무 많이 압축하면 빠르지만 멍청해진다. 중요한 것은 어디에서 정확해야 하고 어디에서 흐릿해도 되는지를 정하는 일이다.

sparse attention은 중요한 block을 고른다. linear attention은 과거 전체를 일정한 크기의 상태로 압축한다. diffusion language model은 생성 과정을 한 토큰씩 쓰는 방식에서 block을 refine하는 방식으로 바꾼다. linear-hybrid attention은 이 셋의 문제의식을 한 지점에서 만난다.

현재 block은 자세히 본다. 과거 block은 가볍게 본다.

이 문장은 단순하지만 긴 context inference에서는 꽤 중요한 관점이다. 언어 모델이 모든 과거를 같은 해상도로 볼 필요는 없다. 좋은 모델은 지금 집중해야 할 부분과 배경으로만 들고 있어도 되는 부분을 구분해야 한다.

그 길은 아마 모든 것을 정확히 기억하는 모델보다, 무엇을 자세히 보고 무엇을 요약할지 잘 정하는 모델에 더 가까울 것이다.
