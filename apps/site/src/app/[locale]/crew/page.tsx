import { useTranslations, useLocale } from 'next-intl'
import { members } from '@/data/members'
import MemberCard from '@/components/MemberCard'

export default function CrewPage() {
  const t = useTranslations('Members')
  const locale = useLocale() as 'ko' | 'en'

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <span className="section-label">{t('label')}</span>
        <h1 className="text-4xl font-bold tracking-normal text-[#1a1a1a] md:text-5xl">
          {t('title')}
        </h1>
        <div className="mt-16 grid gap-px border border-[#e5e5e5] md:grid-cols-2">
          {members.map((m, i) => (
            <MemberCard
              key={m.id}
              member={m}
              locale={locale}
              dreamLabel={t('dream')}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
