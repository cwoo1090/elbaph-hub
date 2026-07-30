import { meetups } from '@/data/meetups'
import { members } from '@/data/members'

type Locale = 'ko' | 'en'

export function getSpeakerMeta(meetupId: string, memberId: string, locale: Locale) {
  const member = members.find((m) => m.id === memberId)
  const meetup = meetups.find((m) => m.id === meetupId)
  const speaker = meetup?.speakers.find((s) => s.memberId === memberId)

  return {
    name: member?.name[locale] ?? speaker?.name?.[locale] ?? memberId,
    role: speaker?.role?.[locale],
    photo: member?.photo,
    isMember: Boolean(member),
  }
}
