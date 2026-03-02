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
      // TODO: Fill in actual topics from elbaph_meetup_1.pptx
      { memberId: 'chulwoo', topic: { ko: 'TBD', en: 'TBD' } },
    ],
    takeaways: [
      // TODO: Fill in actual takeaways
      { ko: 'TBD', en: 'TBD' },
    ],
  },
]
