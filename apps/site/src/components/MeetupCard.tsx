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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/[0.08]">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold">{meetup.title[locale]}</h2>
        <span className="text-sm text-neutral-500">{meetup.date}</span>
      </div>

      {meetup.speakers.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-neutral-400">{speakersLabel}</h3>
          <ul className="mt-2 space-y-1">
            {meetup.speakers.map((s, i) => {
              const member = members.find((m) => m.id === s.memberId)
              return (
                <li key={i} className="text-sm text-neutral-300">
                  {member?.name[locale] ?? s.memberId} &mdash; {s.topic[locale]}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {meetup.takeaways.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-neutral-400">{takeawaysLabel}</h3>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            {meetup.takeaways.map((tw, i) => (
              <li key={i} className="text-sm text-neutral-300">
                {tw[locale]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
