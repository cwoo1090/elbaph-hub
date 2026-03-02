import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { meetups } from '@/data/meetups'
import { members } from '@/data/members'

export default function RecentMeetup() {
  const t = useTranslations('Meetups')
  const locale = useLocale() as 'ko' | 'en'

  const latest = meetups[meetups.length - 1]
  if (!latest) return null

  return (
    <section className="px-6 py-32">
      <div className="section-divider mb-32" />
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="section-label">{t('label')}</span>
            <h2 className="text-3xl font-bold tracking-normal text-[#1a1a1a] md:text-4xl">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/meetups"
            className="text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors duration-150"
          >
            All meetups &rarr;
          </Link>
        </div>

        <div className="border border-[#e5e5e5] bg-white p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <h3 className="text-base font-semibold text-[#1a1a1a] font-[family-name:var(--font-syne)]">
              {latest.title[locale]}
            </h3>
            <span className="shrink-0 text-xs text-[#737373]">
              {latest.date}
            </span>
          </div>

          {latest.speakers.length > 0 && (
            <div className="mt-7">
              <span className="section-label">{t('speakers')}</span>
              <ul className="space-y-2">
                {latest.speakers.map((s, i) => {
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

          {latest.takeaways.length > 0 && (
            <div className="mt-7">
              <span className="section-label">{t('takeaways')}</span>
              <ul className="space-y-2">
                {latest.takeaways.map((tw, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#737373]">
                    <span className="mt-2 h-px w-3 shrink-0 bg-[#d4d4d4]" />
                    {tw[locale]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
