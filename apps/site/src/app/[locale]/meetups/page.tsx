import { useTranslations, useLocale } from 'next-intl'
import { meetups } from '@/data/meetups'
import { getAllPosts } from '@/lib/posts'
import MeetupCard from '@/components/MeetupCard'

export default function MeetupsPage() {
  const t = useTranslations('Meetups')
  const locale = useLocale() as 'ko' | 'en'

  const posts = getAllPosts()
  const sorted = [...meetups].reverse()

  return (
    <section className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <span className="section-label">{t('label')}</span>
        <h1 className="font-display text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t('title')}
        </h1>
        <div className="mt-10 border-t border-[#e5e5e5] md:mt-14">
          {sorted.map((m, i) => (
            <MeetupCard
              key={m.id}
              meetup={m}
              meetupNumber={meetups.length - i}
              locale={locale}
              posts={posts.filter((p) => p.meetupId === m.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
