export type Member = {
  id: string
  name: { ko: string; en: string }
  oneLiner: { ko: string; en: string }
  bio: { ko: string; en: string }[]
  dream: { ko: string; en: string }
  fields?: string[]
  photo: string
  linkedin?: string
  website?: string
  website2?: { url: string; label: string }
}

export const members: Member[] = [
  {
    id: 'chulwoo',
    name: { ko: '안철우', en: 'Chulwoo Ahn' },
    oneLiner: {
      ko: '지금 존재하는, 그리고 앞으로 존재할 인류가 안철우가 있는 삶이 안철우가 없는 삶보다 더 좋았다고 말할 수 있을 만한 삶을 살고 싶습니다. 수신제가치국평천하',
      en: 'I want to live so that humanity can say the world was better for me being in it.',
    },
    bio: [
      {
        ko: '낭만을 좋아합니다. 원피스, 이태원클라쓰, 나루토 좋아합니다. 낭만과 성장.',
        en: 'I love romance and growth. One Piece, Itaewon Class, Naruto.',
      },
      {
        ko: '서울과고를 졸업하고 연세대학교 의과대학을 재학하다 지금은 공군에서 운전병을 하고 있습니다.',
        en: 'Graduated from Seoul Science High School, on leave from Yonsei University College of Medicine (Air Force).',
      },
      {
        ko: '아이슬란드, 몽골 고비 사막 가봤습니다. 꼭 가보세요. 다음엔 남미 가려고 합니다.',
        en: "Been to Iceland and Mongolia's Gobi Desert. South America is next.",
      },
    ],
    dream: { ko: '세계정복', en: 'World domination' },
    fields: ['Medicine', 'Software', 'Building'],
    photo: '/members/chulwoo.png',
    linkedin: 'https://www.linkedin.com/in/chulwoo-ahn-3016a8236',
    website2: { url: 'https://amenable-yak-89c.notion.site/Library-24a6e2948d6080b1b773c9fe1881cc2a', label: 'Library' },
  },
  {
    id: 'jaehwan',
    name: { ko: '김재환', en: 'Jaehwan Kim' },
    oneLiner: {
      ko: '수학 물리 좋아했는데, 방황중입니다. 일단 돈을 벌어보려고 합니다.',
      en: 'Loved math and physics, but currently soul-searching. Trying to make money first.',
    },
    bio: [
      {
        ko: '서울과고를 졸업하고 서울대 수학과, 물리과 복전하고 콜롬비아 수학과 박사과정중에 휴학하려하고 있습니다.',
        en: "Graduated from Seoul Science High School. Double-majored in Math and Physics at SNU, then entered Columbia's Math PhD — on leave.",
      },
      {
        ko: '로봇 좋아합니다. 결국 여기로 갈거같습니다.',
        en: 'Love robotics. Will probably end up there eventually.',
      },
    ],
    dream: { ko: '인생 재밌게살기', en: 'Live an interesting life' },
    fields: ['Mathematics', 'Physics', 'Robotics'],
    photo: '/members/jaehwan.png',
    linkedin: 'https://www.linkedin.com/in/jaehwan-kim-96628b217',
  },
  {
    id: 'younghoon',
    name: { ko: '노영훈', en: 'Younghoon Noh' },
    oneLiner: {
      ko: '뭔가 만드는 것, 개선하는 것, 문제를 풀어주는 것이 좋아서 창업의 길을 가려 하는데, 당분간은 탐색/휴지기 일 것 같습니다.',
      en: 'I like building things, improving things, and solving problems — headed toward entrepreneurship.',
    },
    bio: [
      {
        ko: '서울과고 28기이고, MIT CS 학부 졸업을 5월에 앞두고 있습니다.',
        en: 'Seoul Science High School class 28. Graduating from MIT CS in May.',
      },
      {
        ko: '7월부터는 프런티어랩에서 엔지니어로 일하게 될 것 같습니다.',
        en: 'Joining Frontier Lab as an engineer from July.',
      },
      {
        ko: '지금부터 여름까지 시간이 비어서 이것저것 해볼 예정입니다.',
        en: 'Free until summer, trying various things in the meantime.',
      },
    ],
    dream: { ko: '스타트업', en: 'Startup' },
    fields: ['CS', 'Entrepreneurship'],
    photo: '',
    website: 'https://diuven.xyz',
    linkedin: 'https://www.linkedin.com/in/yhunroh/',
  },
  {
    id: 'yechan',
    name: { ko: '서예찬', en: 'Yechan Seo' },
    oneLiner: {
      ko: 'Intuitive Surgical을 뛰어 넘는 회사를 우리나라에서 세우려고 합니다!',
      en: "I'm going to build a company in Korea that surpasses Intuitive Surgical!",
    },
    bio: [
      {
        ko: '경기과고 졸업 후, 26년 기준 서울의대 본과 3학년입니다.',
        en: 'Graduated from Gyeonggi Science High School. 3rd year at Seoul National University College of Medicine.',
      },
      {
        ko: '로봇 크루인 rosota 리더이고, surgeon이 되어 직접 사용할 로봇들을 만들고 있습니다.',
        en: 'Leader of rosota (robotics crew), building surgical robots to use as a surgeon.',
      },
      {
        ko: '최근 몇년 간 Robotics, BCI 기술을 쭉 파고 있습니다.',
        en: 'Been deep into Robotics and BCI (Brain-Computer Interface) for the past few years.',
      },
    ],
    dream: {
      ko: '대한민국을 대표하는 의료기기 대기업을 세울 작정입니다.',
      en: "To build Korea's leading medtech conglomerate.",
    },
    fields: ['Medicine', 'Robotics', 'BCI'],
    photo: '/members/yechan.jpg',
    website: 'https://yechxn.github.io',
    website2: { url: 'https://www.rosota.run', label: 'rosota' },
  },
  {
    id: 'taekyu',
    name: { ko: '송태규', en: 'Taekyu Song' },
    oneLiner: {
      ko: '20년 전부터 지금까지 평생 오직 로봇 하드웨어 한 우물만 판 사람.',
      en: "Someone who's been digging one well — robot hardware — for 20 years straight.",
    },
    bio: [
      {
        ko: 'LLM과 Physical AI의 시대지만, 오히려 그렇기에 \'기본\'의 중요성을 믿습니다.',
        en: 'In the era of LLMs and Physical AI, I believe in the importance of fundamentals more than ever.',
      },
      {
        ko: '기계가 아니라 사람을 대체하기 위한 로봇 하드웨어 설계로 국한한다면, 우리나라에서 실력은 열 손가락 안에 든다고 자부합니다. (애초에 이걸 하는 사람이 우리나라엔 아직 얼마 없습니다..)',
        en: "When it comes to designing robot hardware to replace humans, I'd say I'm in the top 10 in Korea. (Not many people do this here yet..)",
      },
      {
        ko: '로봇은 전산/전자/기계가 더럽게 얽힌 분야라, 조직 내 분야 간 협업이 그 조직의 실력 그 자체라고 믿습니다.',
        en: 'Robotics is where CS, EE, and ME are deeply intertwined — cross-discipline collaboration IS the capability.',
      },
      {
        ko: '역사를 좋아합니다.',
        en: 'I love history.',
      },
    ],
    dream: {
      ko: '로봇공학의 전 분야에서 충분한 지식과 경험을 쌓은 뒤, 노련한 정치로 조직의 효율을 극한으로 끌어올릴 수 있는 리더가 되고 싶습니다.',
      en: 'A leader who maximizes organizational efficiency through deep expertise across all areas of robotics.',
    },
    fields: ['Robotics', 'Hardware', 'Mechanical Engineering'],
    photo: '/members/taekyu.jpg',
  },
]
