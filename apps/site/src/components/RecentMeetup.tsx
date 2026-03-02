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
    <section className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t('title')}
          </h2>
          <Link
            href="/meetups"
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            &rarr;
          </Link>
        </div>
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <h3 className="text-xl font-semibold">{latest.title[locale]}</h3>
            <span className="text-sm text-neutral-500">{latest.date}</span>
          </div>

          {latest.speakers.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-neutral-400">{t('speakers')}</h4>
              <ul className="mt-2 space-y-1">
                {latest.speakers.map((s, i) => {
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

          {latest.takeaways.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-neutral-400">{t('takeaways')}</h4>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                {latest.takeaways.map((tw, i) => (
                  <li key={i} className="text-sm text-neutral-300">
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
