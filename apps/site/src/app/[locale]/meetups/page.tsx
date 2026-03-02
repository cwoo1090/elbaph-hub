import { useTranslations, useLocale } from 'next-intl'
import { meetups } from '@/data/meetups'
import MeetupCard from '@/components/MeetupCard'

export default function MeetupsPage() {
  const t = useTranslations('Meetups')
  const locale = useLocale() as 'ko' | 'en'

  const sorted = [...meetups].reverse()

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <span className="accent-line" />
        <h1
          className="font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight md:text-6xl"
          style={{ fontWeight: 800 }}
        >
          {t('title')}
        </h1>
        <div className="mt-14 space-y-6">
          {sorted.map((m) => (
            <MeetupCard
              key={m.id}
              meetup={m}
              locale={locale}
              speakersLabel={t('speakers')}
              takeawaysLabel={t('takeaways')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
