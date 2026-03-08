export type Meetup = {
  id: string
  date: string
  title: { ko: string; en: string }
  speakers: {
    memberId: string
    topic: { ko: string; en: string }
  }[]
  takeaways: { ko: string; en: string }[]
  photo?: string
}

export const meetups: Meetup[] = [
  {
    id: 'meetup-1',
    date: '2026-02-28',
    title: { ko: '1st 밋업', en: '1st Meetup' },
    speakers: [
      {
        memberId: 'chulwoo',
        topic: {
          ko: 'Claude Code & Codex 탐방기 및 사이드 프로젝트 현황',
          en: 'Claude Code & Codex deep-dive + side project updates',
        },
      },
      {
        memberId: 'jaehwan',
        topic: {
          ko: 'Binance Alpha Strategy',
          en: 'Binance Alpha Strategy',
        },
      },
      {
        memberId: 'younghoon',
        topic: {
          ko: '스타트업 빌딩과 엑싯 게임플랜 — Acquihire, Open Source, Hiring 동향',
          en: 'Startup building & exit gameplan — Acquihire, Open Source, Hiring trends',
        },
      },
      {
        memberId: 'yechan',
        topic: {
          ko: '수술로봇 인공지능 연구 현황',
          en: 'AI in surgical robotics — current research landscape',
        },
      },
      {
        memberId: 'taekyu',
        topic: {
          ko: '로봇 손 업계 동향 및 내가 만드는 손 현황',
          en: 'Robot hand industry trends & building my own',
        },
      },
    ],
    takeaways: [],
  },
]
