import type { Meetup } from '@/data/meetups'
import type { Post } from '@/data/posts'
import { members } from '@/data/members'
import { Link } from '@/i18n/navigation'

type Props = {
  meetup: Meetup
  meetupNumber: number
  locale: 'ko' | 'en'
  posts: Post[]
}

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function MeetupCard({ meetup, meetupNumber, locale, posts }: Props) {
  return (
    <div className="grid gap-6 border-b border-[#e5e5e5] py-6 md:grid-cols-[120px_1fr] md:gap-x-16 md:py-8">
      {/* Left: number + date */}
      <div className="flex items-end justify-between gap-4 pt-0.5 md:block">
        <p className="font-[family-name:var(--font-syne)] text-4xl font-black leading-none text-[#1a1a1a] md:text-5xl">
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
          const post = posts.find((p) => p.memberId === s.memberId)
          return (
            <div
              key={i}
              className="grid gap-2 border-b border-[#e5e5e5] py-4 md:grid-cols-[140px_1fr_auto] md:gap-4 md:py-3"
            >
              <span className="text-sm font-semibold text-[#1a1a1a] font-[family-name:var(--font-syne)]">
                {member?.name[locale] ?? s.memberId}
              </span>
              <span className="text-[15px] leading-7 text-[#737373] md:text-sm md:leading-relaxed">{s.topic[locale]}</span>
              {post && (
                <Link
                  href={`/blog/${post.slug}`}
                  className="shrink-0 text-sm text-[#737373] transition-colors duration-150 hover:text-[#1a1a1a] md:text-xs"
                >
                  {locale === 'ko' ? '글 읽기 →' : 'Read →'}
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
