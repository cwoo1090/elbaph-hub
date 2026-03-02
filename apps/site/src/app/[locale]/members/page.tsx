import { useTranslations, useLocale } from 'next-intl'
import { members } from '@/data/members'
import MemberCard from '@/components/MemberCard'

export default function MembersPage() {
  const t = useTranslations('Members')
  const locale = useLocale() as 'ko' | 'en'

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <span className="section-label">{t('label')}</span>
        <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t('title')}
        </h1>
        <div className="mt-14 grid gap-px border border-[#e5e5e5] md:grid-cols-2">
          {members.map((m) => (
            <MemberCard
              key={m.id}
              member={m}
              locale={locale}
              dreamLabel={t('dream')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
