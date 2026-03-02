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
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t('title')}
        </h1>
        <div className="mt-12 space-y-8">
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
