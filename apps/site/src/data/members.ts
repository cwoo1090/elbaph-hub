export type Member = {
  id: string
  name: { ko: string; en: string }
  oneLiner: { ko: string; en: string }
  bio: { ko: string; en: string }[]
  dream: { ko: string; en: string }
  photo: string
  linkedin?: string
  website?: string
}

export const members: Member[] = [
  {
    id: 'chulwoo',
    name: { ko: '안철우', en: 'Chulwoo Ahn' },
    oneLiner: {
      ko: '인류 전체가 — 현재와 미래 모두 — 내가 있어서 세상이 더 나아졌다고 말할 수 있는 삶을 살고 싶다.',
      en: 'I want to live a life where all of humanity can say the world was better with me in it.',
    },
    bio: [
      {
        ko: '로맨스와 성장을 사랑합니다. 원피스, 이태원 클라쓰, 나루토.',
        en: 'I love romance and growth. One Piece, Itaewon Class, Naruto.',
      },
      {
        ko: '서울과학고 졸업, 연세대학교 의과대학 휴학 중 (공군 운전병 복무 중)',
        en: 'Graduated from Seoul Science High School, on leave from Yonsei University College of Medicine (Air Force).',
      },
      {
        ko: '아이슬란드와 몽골 고비사막을 다녀왔습니다. 다음은 남미.',
        en: "Been to Iceland and Mongolia's Gobi Desert. South America is next.",
      },
    ],
    dream: { ko: '세계 정복', en: 'World domination' },
    photo: '/members/chulwoo.jpg',
    linkedin: 'https://www.linkedin.com/in/chulwoo-ahn-3016a8236',
  },
  {
    id: 'taekyu',
    name: { ko: '송태규', en: 'Taekyu Song' },
    oneLiner: {
      ko: '로봇 하드웨어라는 한 우물을 20년째 파고 있는 사람',
      en: "Someone who's been digging one well — robot hardware — for 20 years straight.",
    },
    bio: [
      {
        ko: 'LLM과 Physical AI 시대, 기본기의 중요성을 그 어느 때보다 믿습니다.',
        en: 'In the era of LLMs and Physical AI, I believe in the importance of fundamentals more than ever.',
      },
      {
        ko: '인간을 대체하는 로봇 하드웨어 설계에 있어서 한국 탑 10. (아직 하는 사람이 많지 않아서..)',
        en: "When it comes to designing robot hardware to replace humans, I'd say I'm in the top 10 in Korea.",
      },
      {
        ko: '로보틱스는 CS, EE, ME가 깊이 얽힌 분야 — 조직 내 협업이 곧 조직의 역량입니다.',
        en: 'Robotics is where CS, EE, and ME are deeply intertwined — cross-discipline collaboration IS the capability.',
      },
    ],
    dream: {
      ko: '로보틱스 전 분야의 깊은 전문성과 조율 능력으로 조직 효율을 극대화하는 리더',
      en: 'A leader who maximizes organizational efficiency through deep expertise across all areas of robotics.',
    },
    photo: '/members/taekyu.jpg',
  },
  {
    id: 'yechan',
    name: { ko: '서예찬', en: 'Yechan Seo' },
    oneLiner: {
      ko: '인튜이티브 서지컬을 넘는 회사를 한국에서 만들겠습니다!',
      en: "I'm going to build a company in Korea that surpasses Intuitive Surgical!",
    },
    bio: [
      {
        ko: '경기과학고 졸업. 2026년 기준 서울대학교 의과대학 3학년.',
        en: 'Graduated from Gyeonggi Science High School. 3rd year at Seoul National University College of Medicine.',
      },
      {
        ko: 'rosota (로보틱스 크루) 리더, 외과의로서 직접 쓸 수술 로봇을 만들고 있습니다.',
        en: 'Leader of rosota (robotics crew), building surgical robots to use as a surgeon.',
      },
      {
        ko: '최근 몇 년간 로보틱스와 BCI (뇌-컴퓨터 인터페이스)에 깊이 빠져 있습니다.',
        en: 'Been deep into Robotics and BCI (Brain-Computer Interface) for the past few years.',
      },
    ],
    dream: {
      ko: '한국 최고의 메드텍 기업을 만드는 것',
      en: "To build Korea's leading medtech conglomerate.",
    },
    photo: '/members/yechan.jpg',
    website: 'https://yechxn.github.io',
  },
  {
    id: 'younghoon',
    name: { ko: '노영훈', en: 'Younghoon Noh' },
    oneLiner: {
      ko: '만들고, 개선하고, 문제 해결하는 걸 좋아합니다 — 창업을 향해 가는 중, 탐색 모드.',
      en: 'I like building things, improving things, and solving problems — headed toward entrepreneurship.',
    },
    bio: [
      {
        ko: '서울과학고 28기. MIT CS 5월 졸업 예정.',
        en: 'Seoul Science High School class 28. Graduating from MIT CS in May.',
      },
      {
        ko: '7월부터 Frontier Lab 엔지니어로 합류.',
        en: 'Joining Frontier Lab as an engineer from July.',
      },
      {
        ko: '여름까지 자유 — 다양한 것들을 시도하는 중.',
        en: 'Free until summer, trying various things in the meantime.',
      },
    ],
    dream: { ko: '스타트업', en: 'Startup' },
    photo: '/members/younghoon.jpg',
  },
  {
    id: 'jaehwan',
    name: { ko: '김재환', en: 'Jaehwan Kim' },
    oneLiner: {
      ko: '수학과 물리학을 사랑했지만, 현재 자아탐색 중. 일단 돈부터.',
      en: 'Loved math and physics, but currently soul-searching. Trying to make money first.',
    },
    bio: [
      {
        ko: '서울과학고 졸업. 서울대 수학/물리 복수전공 후 컬럼비아대 수학 박사 과정 — 현재 휴학 중.',
        en: "Graduated from Seoul Science High School. Double-majored in Math and Physics at SNU, then entered Columbia's Math PhD — on leave.",
      },
      {
        ko: '로보틱스를 좋아합니다. 결국 그쪽으로 갈 것 같습니다.',
        en: 'Love robotics. Will probably end up there eventually.',
      },
    ],
    dream: { ko: '재미있는 인생을 사는 것', en: 'Live an interesting life' },
    photo: '/members/jaehwan.jpg',
  },
]
