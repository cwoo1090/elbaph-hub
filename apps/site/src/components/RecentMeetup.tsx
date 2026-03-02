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
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <div>
            <span className="accent-line" />
            <h2
              className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-5xl"
              style={{ fontWeight: 700 }}
            >
              {t('title')}
            </h2>
          </div>
          <Link
            href="/meetups"
            className="mb-1 text-sm font-medium text-[#f59e0b] hover:text-[#fbbf24] transition-colors duration-200"
          >
            All meetups &rarr;
          </Link>
        </div>

        <div className="mt-14 card-glow rounded-2xl p-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <h3
              className="text-xl font-semibold font-[family-name:var(--font-syne)]"
              style={{ fontWeight: 600 }}
            >
              {latest.title[locale]}
            </h3>
            <span className="shrink-0 rounded-full border border-white/[0.08] px-3 py-1 text-xs text-neutral-500">
              {latest.date}
            </span>
          </div>

          {latest.speakers.length > 0 && (
            <div className="mt-7">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f59e0b]/70">
                {t('speakers')}
              </h4>
              <ul className="mt-3 space-y-2">
                {latest.speakers.map((s, i) => {
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

          {latest.takeaways.length > 0 && (
            <div className="mt-7">
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f59e0b]/70">
                {t('takeaways')}
              </h4>
              <ul className="mt-3 space-y-2">
                {latest.takeaways.map((tw, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#f59e0b]/50" />
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
