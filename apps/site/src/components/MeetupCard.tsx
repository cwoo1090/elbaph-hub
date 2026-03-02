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
    <div className="card-glow rounded-2xl p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <h2
          className="text-xl font-semibold font-[family-name:var(--font-syne)]"
          style={{ fontWeight: 600 }}
        >
          {meetup.title[locale]}
        </h2>
        <span className="shrink-0 rounded-full border border-white/[0.08] px-3 py-1 text-xs text-neutral-500">
          {meetup.date}
        </span>
      </div>

      {meetup.speakers.length > 0 && (
        <div className="mt-7">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f59e0b]/70">
            {speakersLabel}
          </h3>
          <ul className="mt-3 space-y-2">
            {meetup.speakers.map((s, i) => {
              const member = members.find((m) => m.id === s.memberId)
              return (
                <li key={i} className="flex items-baseline gap-2 text-sm text-neutral-300">
                  <span className="font-medium text-white">{member?.name[locale] ?? s.memberId}</span>
                  <span className="text-neutral-600">&mdash;</span>
                  <span className="text-neutral-400">{s.topic[locale]}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {meetup.takeaways.length > 0 && (
        <div className="mt-7">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f59e0b]/70">
            {takeawaysLabel}
          </h3>
          <ul className="mt-3 space-y-2">
            {meetup.takeaways.map((tw, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#f59e0b]/50" />
                {tw[locale]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
