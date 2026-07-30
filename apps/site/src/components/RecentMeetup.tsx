import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { meetups } from '@/data/meetups'
import { getAllArticles } from '@/lib/articles'
import { getSpeakerMeta } from '@/lib/speakers'

function formatDate(dateStr: string, locale: string) {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString(locale === 'ko' ? 'ko-KR' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function RecentMeetup() {
  const t = useTranslations('Meetups')
  const locale = useLocale() as 'ko' | 'en'

  const latest = meetups[meetups.length - 1]
  const meetupNumber = meetups.length
  if (!latest) return null

  const articles = getAllArticles().filter((article) => article.meetupId === latest.id)

  return (
    <section className="px-4 py-20 sm:px-6 md:py-32">
      <div className="section-divider mb-16 md:mb-32" />
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-label">{t('label')}</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#1a1a1a] md:text-4xl">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/meetups"
            className="text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors duration-150"
          >
            {t('allMeetups')} &rarr;
          </Link>
        </div>

        <div className="reveal grid gap-6 border-t border-[#e5e5e5] pt-6 md:grid-cols-[120px_1fr] md:gap-x-16 md:pt-8">
          {/* Left: number + date */}
          <div className="flex items-end justify-between gap-4 pt-0.5 md:block">
            <p className="font-display text-4xl font-black leading-none text-[#1a1a1a] sm:text-5xl md:text-7xl">
              #{String(meetupNumber).padStart(2, '0')}
            </p>
            <p className="text-xs text-[#737373] md:mt-3">
              {formatDate(latest.date, locale)}
            </p>
          </div>

          {/* Right: speaker rows */}
          <div className="border-t border-[#e5e5e5]">
            {latest.speakers.map((s, i) => {
              const article = articles.find((item) => item.memberId === s.memberId)
              const speaker = getSpeakerMeta(latest.id, s.memberId, locale)
              return (
                <div
                  key={i}
                  className="grid gap-1.5 border-b border-[#e5e5e5] py-4 md:grid-cols-[140px_1fr_auto] md:gap-4 md:py-3.5"
                >
                  <span className="text-sm font-semibold text-[#1a1a1a] font-display">
                    {speaker.name}
                  </span>
                  <span className="text-[15px] leading-7 text-[#737373] md:text-sm md:leading-relaxed">
                    {article?.title[locale] ?? s.topic[locale]}
                  </span>
                  {speaker.role && (
                    <span className="shrink-0 whitespace-nowrap rounded-full border border-[#d4d4d4] px-2 py-0.5 text-xs font-medium text-[#525252]">
                      {speaker.role}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
