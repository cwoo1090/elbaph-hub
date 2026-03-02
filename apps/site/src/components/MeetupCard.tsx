import type { Meetup } from '@/data/meetups'
import { members } from '@/data/members'

type Props = {
  meetup: Meetup
  locale: 'ko' | 'en'
  speakersLabel: string
  takeawaysLabel: string
}

export default function MeetupCard({ meetup, locale, speakersLabel, takeawaysLabel }: Props) {
  return (
    <div className="border border-[#e5e5e5] bg-white p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <h2 className="text-base font-semibold text-[#1a1a1a] font-[family-name:var(--font-syne)]">
          {meetup.title[locale]}
        </h2>
        <span className="shrink-0 text-xs text-[#737373]">
          {meetup.date}
        </span>
      </div>

      {meetup.speakers.length > 0 && (
        <div className="mt-7">
          <span className="section-label">{speakersLabel}</span>
          <ul className="space-y-2">
            {meetup.speakers.map((s, i) => {
              const member = members.find((m) => m.id === s.memberId)
              return (
                <li key={i} className="flex items-baseline gap-2 text-sm">
                  <span className="font-medium text-[#1a1a1a]">{member?.name[locale] ?? s.memberId}</span>
                  <span className="text-[#d4d4d4]">&mdash;</span>
                  <span className="text-[#737373]">{s.topic[locale]}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {meetup.takeaways.length > 0 && (
        <div className="mt-7">
          <span className="section-label">{takeawaysLabel}</span>
          <ul className="space-y-2">
            {meetup.takeaways.map((tw, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-[#737373]">
                <span className="mt-2 h-px w-3 shrink-0 bg-[#d4d4d4]" />
                {tw[locale]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
