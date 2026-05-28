import type { Meetup } from '@/data/meetups'
import type { Article } from '@/data/articles'
import { members } from '@/data/members'
import { Link } from '@/i18n/navigation'

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
          const member = members.find((m) => m.id === s.memberId)
          const article = articles.find((a) => a.memberId === s.memberId)
          const rowClassName =
            'grid gap-2 border-b border-[#e5e5e5] py-4 transition-colors duration-150 md:grid-cols-[140px_1fr_auto] md:gap-4 md:py-3'
          const rowContent = (
            <>
              <span className="text-sm font-semibold text-[#1a1a1a] font-display">
                {member?.name[locale] ?? s.memberId}
              </span>
              <span className="text-[15px] leading-7 text-[#737373] md:text-sm md:leading-relaxed">{s.topic[locale]}</span>
              {article && (
                <span className="shrink-0 text-sm text-[#737373] transition-colors duration-150 md:text-xs">
                  {locale === 'ko' ? '글 읽기 →' : 'Read →'}
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
