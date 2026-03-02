import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { members } from '@/data/members'

export default function MembersPreview() {
  const t = useTranslations('Members')
  const locale = useLocale() as 'ko' | 'en'

  return (
    <section className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline justify-between">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {t('title')}
          </h2>
          <Link
            href="/members"
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            {t('seeAll')} &rarr;
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {members.map((m) => (
            <div
              key={m.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition-colors hover:bg-white/[0.08]"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-neutral-400">
                {m.name[locale].charAt(0)}
              </div>
              <h3 className="mt-4 text-base font-semibold">{m.name[locale]}</h3>
              <p className="mt-1 text-xs text-neutral-500">
                {t('dream')}: {m.dream[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
