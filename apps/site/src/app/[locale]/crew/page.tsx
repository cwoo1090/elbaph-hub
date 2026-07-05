import { useTranslations, useLocale } from 'next-intl'
import { members } from '@/data/members'
import MemberCard from '@/components/MemberCard'

export default function CrewPage() {
  const t = useTranslations('Members')
  const locale = useLocale() as 'ko' | 'en'

  return (
    <section className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <span className="section-label">{t('label')}</span>
        <h1 className="font-display text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t('title')}
        </h1>
        <div className="mt-10 grid gap-px border border-[#e5e5e5] md:mt-16 md:grid-cols-2">
          {members.map((m) => (
            <MemberCard
              key={m.id}
              member={m}
              locale={locale}
              archiveHref={`/crew/${m.id}`}
              dreamLabel={t('dream')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
