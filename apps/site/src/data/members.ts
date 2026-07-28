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
    id: 'younghun',
    name: { ko: '노영훈', en: 'Younghun Roh' },
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
    fields: ['Performance Engineering', 'AI Agents', 'Building'],
    photo: '/members/younghun.jpg',
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
  {
    id: 'terry',
    name: { ko: '김태욱', en: 'Terry Kim' },
    oneLiner: {
      ko: '새로운 도전과 선한 영향력을 만드는 일을 좋아합니다.',
      en: 'I like taking on new challenges and creating positive impact.',
    },
    bio: [
      {
        ko: 'MIT에서 컴퓨터공학 학부를 졸업했고, 현재 MIT Perceptual Engineering Lab에서 석사 과정을 하고 있습니다.',
        en: "Graduated from MIT with a bachelor's degree in Computer Science and is now pursuing a master's at the MIT Perceptual Engineering Lab.",
      },
      {
        ko: '휴학 후 커피숍에서 일하며 커피에 빠져, 현재는 flavor perception 연구를 하고 있습니다.',
        en: 'Fell into coffee while working at a cafe during a leave of absence, and now researches flavor perception.',
      },
      {
        ko: '2028 보스턴 마라톤을 목표로 훈련 중입니다.',
        en: 'Training toward the 2028 Boston Marathon.',
      },
    ],
    dream: { ko: '하고 싶은거 하면서 살기', en: 'To live while doing what I want to do' },
    fields: ['Computer Science', 'Perception', 'Flavor'],
    photo: '/members/terry.png',
    linkedin: 'https://linkedin.com/in/terrytwk',
    website2: { url: 'https://github.com/terrytwk', label: 'GitHub' },
  },
  {
    id: 'seungbin',
    name: { ko: '오승빈', en: 'Seungbin Oh' },
    oneLiner: {
      ko: '로봇이 좋아서 시작했고, 하다 보니 적성에도 잘 맞는 것 같아서 계속 좋아하면서 할 것 같습니다.',
      en: 'I started because I liked robots, and it seems to fit me well, so I think I will keep liking and doing it.',
    },
    bio: [
      {
        ko: '초등학교 3학년 때부터 로봇을 하며 사는 것이 꿈이었고, 어느새 그 꿈은 이룬 것 같아 요즘은 더 큰 꿈을 생각해보고 있습니다.',
        en: 'Since third grade, my dream was to live with robotics; now that I seem to have reached it, I am thinking about a bigger dream.',
      },
      {
        ko: 'KAIST DRCD Lab에서 Robotics 석사과정으로 제어 연구를 하고 있고, 아마 같은 연구실에서 박사도 할 것 같습니다.',
        en: 'Researching control as a robotics master\'s student at KAIST DRCD Lab, and will likely continue there for a PhD.',
      },
      {
        ko: '조금 이상하게 들릴 수 있지만, 연구실에서 늦게 퇴근하는 거 좋아합니다.',
        en: 'It may sound a little strange, but I like leaving the lab late.',
      },
    ],
    dream: { ko: '지구최강 제어기 만들기', en: "To build Earth's strongest controller" },
    fields: ['Robotics', 'Control', 'KAIST'],
    photo: '/members/seungbin.png',
  },
  {
    id: 'ryan',
    name: { ko: '김래원', en: 'Ryan Kim' },
    oneLiner: {
      ko: '근본적으로 다양한 주제에 대해 호기심이 많고, 이전까지는 bfs(Breadth-First Search)로 살았으나 복학하고 앞으로 dfs(Depth-First Search)로 살 예정. Technology and Humanities의 교점에서 의미있는 일을 하고 싶음.',
      en: 'Deeply curious across many subjects; I used to live breadth-first, but after returning to school I plan to live depth-first. I want to do meaningful work at the intersection of technology and humanities.',
    },
    bio: [
      {
        ko: '보스턴에서 태어나서 한국에서 9년 동안 영국 학교를 다녔고 미국에서 보딩스쿨 졸업 후 예일대학교 재학 중입니다.',
        en: 'Born in Boston, attended a British school in Korea for nine years, graduated from boarding school in the U.S., and is now studying at Yale.',
      },
      {
        ko: '공동저자로 네이처 논문 있음.',
        en: 'Co-authored a Nature paper.',
      },
      {
        ko: 'YC AI Startup School 2026에서 올린 트윗(감탄사) 하나가 12시간도 안 되어 약 12만 조회를 기록했고, Alexandr Wang의 답글과 YC, Garry Tan, Clem Delangue의 리포스트를 받았습니다.',
        en: 'One of my tweets (exclamations) from YC AI Startup School 2026 received ~120K views in under 12 hours with a response from Alexandr Wang and reposts by YC, Garry Tan, and Clem Delangue.',
      },
    ],
    dream: {
      ko: '"We\'re here to put a dent in the universe. Otherwise, why else even be here?" 이문과 백그라운드를 섞어서 AI 기술을 접목시킨 인간 사회의 진보에 기여하며 universe에 dent를 남기고 싶음.',
      en: '"We\'re here to put a dent in the universe. Otherwise, why else even be here?" I want to combine my science and humanities background with AI technology to contribute to human progress and leave a dent in the universe.',
    },
    fields: ['AI', 'Technology', 'Humanities'],
    photo: '/members/ryan.png',
    linkedin: 'https://www.linkedin.com/in/ryanhwangkim/',
    website: 'https://ryanhwangkim.com',
  },
]
