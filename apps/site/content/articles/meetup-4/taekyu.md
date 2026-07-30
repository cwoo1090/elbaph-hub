---
slug: meetup-4-taekyu
date: 2026-05-31
publishedAt: '2026-07-05T19:05:00+09:00'
title:
  ko: 로봇은 왜 시뮬레이션 밖에서 말을 안 듣는가
  en: Why Robots Stop Listening Outside Simulation
subtitle:
  ko: sim2real gap은 더 큰 모델보다 정직한 모델링의 문제에 가깝다
  en: The sim2real gap is less about bigger models than honest modeling
---

![시뮬레이션 화면과 실제 테스트 플로어 사이에 선 사족보행 로봇](/articles/meetup-4/taekyu/01-cover-sim2real-lab.png)

*시뮬레이션과 현실 사이의 작은 차이는 policy가 실제 몸 위에 올라가는 순간 큰 실패로 드러난다.*

시뮬레이션에서는 잘 걷던 로봇이 현실에 나오면 갑자기 떨고 넘어진다.

컴퓨터 안에서는 계단도 오르고, 빠르게 뛰고, 균형도 잘 잡던 policy가 실제 로봇 위에 올라가는 순간 말을 듣지 않기 시작한다. 여기서 policy는 로봇의 상태를 입력받아 다음 행동을 결정하는 일종의 함수라고 보면 된다.

이런 문제를 보면 사람들은 보통 더 좋은 learning algorithm을 먼저 떠올린다. 더 robust한 policy, 더 큰 neural network, 더 많은 domain randomization, 더 정교한 simulator 같은 것들이다. 물론 모두 중요하다. 하지만 내가 보기에는 많은 sim2real failure가 그보다 훨씬 더 기본적인 곳에서 시작된다.

시뮬레이션이 현실의 로봇을 정확하게 기술하고 있지 않기 때문이다.

로봇은 현실 세계의 물리법칙에 강한 제약을 받는다. Actuator는 낼 수 있는 torque와 speed에 한계가 있고, sensor 데이터가 전달되는 데는 latency가 존재하고, reducer에는 backlash가 있다. 이런 차이는 사소해 보이지만, policy가 dynamic한 동작을 학습할수록 큰 문제가 된다.

sim2real gap은 거창한 연구 구호처럼 보이지만, 실제로는 모델링 오차들의 합에 가깝다.

강화학습으로 제어기를 학습하는 과정에서 실제 로봇을 수천 번 넘어뜨리고 부숴가며 데이터를 모을 수는 없으니, 우리는 로봇을 simulation 안에 최대한 현실과 비슷하게 모델링하고 그 안에서 학습한 policy를 현실로 옮긴다.

문제는 “현실과 비슷한 모델링”이 생각보다 어렵다는 것이다.

사람들은 sim2real을 이야기할 때 friction, deformable object 같은 모델링 자체가 근본적으로 어려운 것들을 원인으로 고르곤 한다. 물론 그것들도 어렵다. 하지만 그 전에 훨씬 기본적인 것들이 빠지는 경우가 많다. 실제 actuator의 작동 한계 영역, 잘못 작성된 URDF, sensor latency, reducer의 backlash 같은 것들이다.

이것들은 거창한 미지의 물리학이 아니다. 측정하고, 모델에 넣고, 맞는지 확인하면 되는 것들이다. 그런데 이상하게도 자주 빠진다. 나는 “learning이 알아서 극복하겠지”라는 말을 별로 믿지 않는다. learning framework는 주어진 세계 안에서 최적화할 뿐이다. 그 세계가 거짓말을 하고 있으면, policy는 그 거짓말까지 열심히 exploit한다.

## 모터의 한계는 사각형이 아니다

![액추에이터 테스트 벤치 위에 비직사각형 motor operating region이 시각화된 장면](/articles/meetup-4/taekyu/02-motor-operating-region.png)

*모터 한계는 최대 torque와 최대 speed로 만든 사각형보다 훨씬 복잡한 operating region으로 나타난다.*

첫 번째로 자주 놓치는 것은 MOR, 즉 motor operating region이다. 쉽게 말하면 모터가 어떤 회전 속도에서 어느 정도 torque를 낼 수 있는지를 나타내는 영역이다.

로봇을 시뮬레이션에 넣을 때는 보통 URDF 같은 포맷을 쓴다. 여기에는 link length, joint, mass, inertia, joint limit 같은 물리 파라미터가 들어간다. 하지만 많은 경우 actuator는 지나치게 단순하게 모델링된다.

URDF에는 최대 토크와 최대 각속도를 입력하는 칸이 있다. 이 때문에 이 직사각형 영역 내부에서의 임의의 명령이 가능하다고 생각하기 쉽다. 하지만 현실의 actuator의 한계는 그렇게 단순하게 생기지 않았다.

특히 동적으로 움직이는 로봇에서는 actuator가 큰 출력을 내기 위해 MOR의 boundary 근처를 자주 사용한다. 이때 motor limit을 단순한 torque-speed 직사각형으로 넣으면, policy는 현실에 없는 힘을 쓸 수 있다고 믿고 학습한다.

시뮬레이션에서 “이 속도에서도 큰 torque를 낼 수 있다”고 되어 있으면 policy는 그걸 쓴다. 그런데 실제 motor가 그 속도에서 torque를 거의 못 내면, 현실 로봇에서는 예상한 state transition이 나오지 않는다. 그 순간 자세가 틀어지고, 다음 observation도 틀어지며, 결국 전체 motion이 무너진다.

그래서 직사각형이 아닌, 제대로 된 형태의 MOR을 simulation에 넣어야 한다.

이걸 넣지 않으면 policy는 처음부터 현실에 없는 모터를 상대로 학습하는 셈이다.

## 현실 로봇은 ground truth를 보지 못한다

![모션캡처 공간에서 실제 자세와 지연된 estimator output이 어긋나 보이는 장면](/articles/meetup-4/taekyu/03-sensor-estimator-delay.png)

*시뮬레이터의 ground truth와 현실 sensor/estimator output 사이에는 noise와 delay가 끼어든다.*

두 번째 문제는 observation이다.

시뮬레이션 안에서는 모든 값을 정확히 알 수 있다. 몸통이 얼마나 기울어졌는지, 발이 땅에 닿았는지, 관절 각도와 속도가 무엇인지 simulator는 ground truth를 가지고 있다. 그래서 actor에게 그 값을 그대로 넣기 쉽다. 여기서 actor는 observation을 받아 action을 내는 policy의 실행부라고 보면 된다.

하지만 현실 로봇은 ground truth를 보지 못한다.

관절 각도처럼 쉽게 직접 읽을 수 있는 값도 있지만, 몸통 orientation이나 foot contact 같은 값은 추정해야 한다. orientation은 IMU와 filter를 통해 추정하고, contact도 별도의 force sensor나 kinematics-torque 기반 estimator를 통해 판단하는 경우가 많다.

문제는 이 값들이 깨끗하지 않다는 것이다. 현실의 sensor는 늦게 들어오고, 튀고, 충격이나 진동에 오염된다. sensor range를 넘으면 값이 잘릴 수도 있다. filter는 과거의 정보를 이용해 현재 상태를 추정하기 때문에 구조적으로 delay를 가진다.

시뮬레이션에서는 깨끗한 참값으로 학습했는데, 현실에서는 delay와 noise가 섞인 estimator output이 observation으로 들어간다. 그러면 policy 입장에서는 자신이 배운 것과 다른 세계를 보는 셈이다.

observation이 오염되면 action도 오염된다. action이 이상해지면 로봇의 상태가 더 나빠지고, 그 나쁜 상태가 다시 이상한 observation을 만든다. 작은 오차가 positive feedback loop를 타고 motion failure로 이어진다.

따라서 sensor noise를 감으로 적당히 simulation에 넣는 것만으로는 부족하다. 실제 로봇에서 어떤 값이 어떤 delay를 가지고 들어오는지, estimator output이 ground truth와 얼마나 다른지, 충격이나 진동 상황에서 어떤 오차가 생기는지를 확인해야 한다. 가능하다면 외부 camera나 marker를 이용해 참값에 가까운 값을 측정하고, 로봇 내부 estimator가 뱉는 값과 비교해야 한다.

귀찮지만 이 과정을 건너뛰면 현실 로봇은 계속 엉뚱한 몸 상태를 믿고 움직이게 된다.

## URDF가 틀리면 다른 몸으로 학습하는 것이다

![실제 로봇 다리와 어긋난 CAD skeleton, inertia ellipsoid가 함께 보이는 엔지니어링 벤치](/articles/meetup-4/taekyu/04-urdf-inertia-mismatch.png)

*URDF와 실제 하드웨어의 질량, 관성, 조립 차이가 어긋나면 policy는 다른 몸으로 학습한 셈이 된다.*

세 번째 문제는 URDF다.

URDF는 로봇의 설계도 같은 파일이다. link length, joint axis, mass, inertia 같은 정보가 들어간다. control을 하는 사람은 이 파일을 믿고 simulation을 만든다.

문제는 이 파일이 틀릴 수 있다는 것이다.

길이나 joint 위치가 틀리면 비교적 눈에 잘 보인다. mass도 저울을 통해 어느 정도 확인할 수 있다. 하지만 inertia matrix는 다르다. link 하나가 3차원 공간에서 어떤 inertia matrix를 갖는지 측정하기 위해서는 저울과 자 이상의 복잡한 장비가 필요하다.

보통은 CAD 모델을 실제 부품과 최대한 똑같이 만들고, 그 안에서 inertia property를 뽑는다. 그러려면 치수, 재질, 질량, 내부 구조가 실제와 맞아야 한다. 하지만 제조 과정에서 설계와 다른 부품이 들어가거나, 배선과 체결 부품이 빠지거나, 다른 연구실/기업에서 받은 URDF가 실제 하드웨어와 맞지 않는 경우가 생긴다.

그러면 policy는 잘못된 몸을 상대로 학습한다. 현실 로봇의 inertia가 다르면 같은 torque를 줘도 가속도가 다르고, 같은 동작을 해도 반응이 다르다. 특히 dynamic한 동작에서는 이 차이가 바로 sim2real gap이 된다.

더 나쁜 점은 디버깅이 어렵다는 것이다. 로봇이 이상하게 움직일 때 “이 link의 inertia matrix가 틀렸다”고 바로 말하기는 어렵다. 결국 분해해서 질량을 재고, CAD와 비교하고, simulation 값과 현실 값을 하나씩 맞춰가야 한다.

이 문제는 기술적인 문제이기도 하지만, hardware와 software 사이의 trust 문제이기도 하다. hardware model이 부정확한 상태로 넘어가면, software는 잘못된 세계에서 열심히 최적화하게 된다.

## latency와 backlash는 작은 떨림을 키운다

![기어박스 cutaway와 feedback loop 안에서 진동이 커지는 액추에이터 장면](/articles/meetup-4/taekyu/05-latency-backlash.png)

*backlash와 latency는 작은 오차를 feedback loop 안에서 진동으로 키울 수 있다.*

마지막은 latency와 backlash다.

현실의 sensor와 actuator는 모두 즉각적으로 반응하지 않는다. encoder, IMU, camera는 각각 읽는 주기가 다르고 latency도 다르다. motor command도 계산되는 순간 바로 torque가 되는 것이 아니라, current loop와 driver를 거쳐 실제 힘으로 나타난다.

simulation에서는 모든 값이 즉시 들어오고, 명령도 즉시 반영되는 것처럼 다루기 쉽다. 하지만 현실에서는 어떤 값은 늦게 들어오고, 어떤 명령은 늦게 반영된다.

actuator 쪽에는 backlash도 있다. backlash는 gear 사이의 작은 유격이다. 이 유격 안에서는 motor rotor는 움직이지만, 외부 link는 아직 따라오지 않을 수 있다. 그러면 motor는 전체 link inertia가 아니라 훨씬 작은 rotor inertia만 보는 것처럼 움직일 수 있다.

이때 motor는 예상보다 빠르게 가속한다. controller는 이를 보고 반대로 torque를 주지만, 그 반응 역시 latency를 거쳐 늦게 들어온다. 이 과정이 반복되면 작은 유격과 작은 지연이 양의 feedback처럼 작동해 진동이 커질 수 있다.

로봇을 켜자마자 부르르 떨거나, 특정 동작에서 갑자기 불안정해지는 현상은 이런 작은 delay와 compliance, backlash가 함께 작용하면서 생기는 경우가 많다.

backlash를 완전히 없애기는 어렵다. 그렇다면 최소한 simulation에 latency를 넣고, actuator dynamics를 반영하며, policy가 이런 noise에 둔감하게 학습되도록 만들어야 한다.

sim2real gap은 이렇게 매우 물리적인 얼굴을 하고 있다.

## 당연한 일을 왜 잘 안 할까

여기까지 보면 이상한 생각이 든다.

그럼 그냥 하면 되는 것 아닌가. MOR을 잘 그리기 위해 motor의 resistance, inductance, torque constant 등을 측정하고, estimator를 검증하고, URDF를 제대로 만들고, latency와 backlash를 계측하면 되는 것 아닌가.

맞다. 그런데 잘 안 한다.

이유는 현실적이다. 많은 연구자의 진짜 주제는 sim2real 자체가 아니다. 새로운 learning algorithm, simulator, policy architecture가 논문의 핵심인 경우가 많다. 이 경우 로봇 실험은 제안하는 방법론이 실제 로봇에 적용 가능함을 보이기 위한 증거물로서의 위상을 갖는다.

그러니 저자는 sim2real을 잡는 데 몇 달을 쓰고 싶지 않다. simulation에서 100% 성능이 나오고, 현실에서 30%만 보여줘도 논문 작성이 끝난다면, 시간 대비 논문 가성비가 훨씬 높지 않은가?

하지만 현실은 자주 반대로 간다. 기본 모델링을 건너뛰고 바로 실제 로봇에 올리면 빨리 끝날 수도 있을 것 같지만, 그런 행운은 드물고 실험은 절대 한 번에 성공하지 못하기 때문에 오히려 시간을 더 쓴다.

반대로 처음부터 하나씩 계측하고 맞추면 확실히 느리지만, 한 번 맞춰진 모델은 훨씬 높은 성능으로 현실에 옮겨간다.

![실제 로봇 계측 데이터가 보정된 digital twin으로 이어지는 calibration workflow](/articles/meetup-4/taekyu/06-robot-calibration-loop.png)

*calibration은 실제 계측과 simulation model을 다시 맞추는 반복 작업이다.*

이 지점에서 robot calibration이라는 일도 중요해진다. 실제 로봇을 계측해서 actuator model을 만들고, URDF와 inertia를 검증하고, sensor와 estimator의 delay를 확인한 뒤, 바로 학습에 쓸 수 있는 simulation model을 만들어주는 일이다.

특히 custom hardware를 만드는 팀에게는 이런 과정이 큰 병목이 된다. 직접 만든 로봇은 기존에 검증된 모델이 없고, hardware와 software 사이의 약속도 계속 바뀐다. 이때 계측과 model fitting을 체계적으로 해주면 시행착오를 크게 줄일 수 있다.

물론 이 일이 하나의 유의미한 크기의 시장이 될지는 로봇 산업의 방향에 달려 있다. 몇 개의 general robot platform으로 수렴하면 제한적일 수 있고, task-specific robot과 custom hardware가 계속 늘어난다면 꽤 중요한 병목이 될 수도 있다.

## 현실을 정직하게 쓰는 일이 다음 병목이다

sim2real은 “더 좋은 neural network가 나오면 해결된다”로 끝나는 문제가 아니다.

로봇은 물리 세계에 있다. motor는 voltage와 heat의 제한을 받고, sensor는 늦게 오며, gear는 유격을 갖고, link inertia는 CAD와 다를 수 있다. policy가 아무리 좋아도, 학습한 세계와 실제 몸이 다르면 현실에서는 틀어진다.

그래서 좋은 sim2real은 생각보다 겸손한 작업이다. 로봇이 무엇을 낼 수 있는지 재고, 무엇을 느끼는지 확인하고, 어떤 값이 늦게 들어오는지 보고, 어떤 parameter가 틀렸는지 찾는다. 그리고 그 차이를 simulation에 넣거나 policy가 견딜 수 있게 만든다.

이 일은 데모 영상처럼 화려하지 않다. 하지만 실제 로봇이 걷고, 뛰고, 계단을 오르고, 넘어지지 않게 만들려면 결국 여기로 돌아오게 된다.

sim2real gap은 abstract한 연구 구호가 아니라, hardware와 software가 얼마나 정확한 약속을 주고받는가의 문제다.

로봇이 현실에서 말을 안 듣는 이유는 대개 거창하지 않다. 박스로 그린 motor limit, 검증하지 않은 estimator, 틀린 inertia, 무시한 latency와 backlash. 이런 것들이 쌓여 policy가 배운 세계와 실제 세계를 갈라놓는다.

그 간극을 줄이는 가장 확실한 방법은 아직까지는 단순하다.

현실을 더 정직하게 모델링하는 것이다.
