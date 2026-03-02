import { useTranslations, useLocale } from 'next-intl'
import { members } from '@/data/members'
import MemberCard from '@/components/MemberCard'

export default function MembersPage() {
  const t = useTranslations('Members')
  const locale = useLocale() as 'ko' | 'en'

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
        <div className="mt-14 grid gap-6 md:grid-cols-2">
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
