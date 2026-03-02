import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { members } from '@/data/members'

const avatarGradients = [
  'avatar-gradient-0',
  'avatar-gradient-1',
  'avatar-gradient-2',
  'avatar-gradient-3',
  'avatar-gradient-4',
]

export default function MembersPreview() {
  const t = useTranslations('Members')
  const locale = useLocale() as 'ko' | 'en'

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
            href="/members"
            className="mb-1 text-sm font-medium text-[#f59e0b] hover:text-[#fbbf24] transition-colors duration-200"
          >
            {t('seeAll')} &rarr;
          </Link>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {members.map((m, i) => (
            <div
              key={m.id}
              className={`card-glow rounded-2xl p-6 text-center animate-fade-up-delay-${Math.min(i + 1, 4)}`}
            >
              <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold text-white ${avatarGradients[i % avatarGradients.length]}`}
                style={{ fontFamily: 'var(--font-syne)', fontWeight: 700 }}
              >
                {m.name[locale].charAt(0)}
              </div>
              <h3
                className="mt-4 text-sm font-semibold font-[family-name:var(--font-syne)]"
                style={{ fontWeight: 600 }}
              >
                {m.name[locale]}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                {m.dream[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
