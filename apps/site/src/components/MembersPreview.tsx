import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { members } from '@/data/members'

export default function MembersPreview() {
  const t = useTranslations('Members')
  const locale = useLocale() as 'ko' | 'en'

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
            href="/members"
            className="text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors duration-150"
          >
            {t('seeAll')} &rarr;
          </Link>
        </div>
        <div className="grid gap-px border border-[#e5e5e5] md:grid-cols-3 lg:grid-cols-5">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-white p-6 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f0ede8] text-base font-semibold text-[#1a1a1a] font-[family-name:var(--font-syne)]">
                {m.name[locale].charAt(0)}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-[#1a1a1a] font-[family-name:var(--font-syne)]">
                {m.name[locale]}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#737373]">
                {m.dream[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
