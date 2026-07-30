import type { Meetup } from '@/data/meetups'
import type { Article } from '@/data/articles'
import { Link } from '@/i18n/navigation'
import { getSpeakerMeta } from '@/lib/speakers'

type Props = {
  meetup: Meetup
  meetupNumber: number
  locale: 'ko' | 'en'
  articles: Article[]
}

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function MeetupCard({ meetup, meetupNumber, locale, articles }: Props) {
  return (
    <div className="grid gap-6 border-b border-[#e5e5e5] py-6 md:grid-cols-[120px_1fr] md:gap-x-16 md:py-8">
      {/* Left: number + date */}
      <div className="flex items-end justify-between gap-4 pt-0.5 md:block">
        <p className="font-display text-4xl font-black leading-none text-[#1a1a1a] md:text-5xl">
          #{String(meetupNumber).padStart(2, '0')}
        </p>
        <p className="text-xs text-[#737373] md:mt-2">
          {formatDate(meetup.date, locale)}
        </p>
      </div>

      {/* Right: speaker rows */}
      <div className="border-t border-[#e5e5e5]">
        {meetup.speakers.map((s, i) => {
          const article = articles.find((a) => a.memberId === s.memberId)
          const speaker = getSpeakerMeta(meetup.id, s.memberId, locale)
          const rowClassName =
            'grid gap-2 border-b border-[#e5e5e5] py-4 transition-colors duration-150 md:grid-cols-[140px_1fr_auto] md:gap-4 md:py-3'
          const rowContent = (
            <>
              <span className="text-sm font-semibold text-[#1a1a1a] font-display">
                {speaker.name}
              </span>
              <span className="text-[15px] leading-7 text-[#737373] md:text-sm md:leading-relaxed">
                {article?.title[locale] ?? s.topic[locale]}
              </span>
              {(speaker.role || article) && (
                <span className="flex shrink-0 items-center gap-2 text-sm text-[#737373] transition-colors duration-150 md:text-xs">
                  {speaker.role && (
                    <span className="whitespace-nowrap rounded-full border border-[#d4d4d4] px-2 py-0.5 text-xs font-medium text-[#525252]">
                      {speaker.role}
                    </span>
                  )}
                  {speaker.role && article && <span className="text-[#d4d4d4]">·</span>}
                  {article && (
                    <span className="whitespace-nowrap">{locale === 'ko' ? '글 읽기 →' : 'Read →'}</span>
                  )}
                </span>
              )}
            </>
          )

          if (article) {
            return (
              <Link
                key={i}
                href={`/blog/${article.slug}`}
                className={`${rowClassName} hover:bg-[#faf9f6]`}
              >
                {rowContent}
              </Link>
            )
          }

          return (
            <div
              key={i}
              className={rowClassName}
            >
              {rowContent}
            </div>
          )
        })}
      </div>
    </div>
  )
}
