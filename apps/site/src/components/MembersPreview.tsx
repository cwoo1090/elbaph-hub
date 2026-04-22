import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { members } from '@/data/members'

export default function MembersPreview() {
  const t = useTranslations('Members')
  const locale = useLocale() as 'ko' | 'en'

  return (
    <section className="px-4 py-20 sm:px-6 md:py-32">
      <div className="section-divider mb-16 md:mb-32" />
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-label">{t('label')}</span>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight text-[#1a1a1a] md:text-4xl">
              {t('title')}
            </h2>
          </div>
          <Link
            href="/crew"
            className="text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors duration-150"
          >
            {t('seeAll')} &rarr;
          </Link>
        </div>

        <div className="reveal grid grid-cols-1 gap-px bg-[#e5e5e5] sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <div
              key={m.id}
              className="group bg-[#faf9f6] p-6 transition-colors duration-200 hover:bg-white md:p-8"
            >
              {/* Avatar */}
              <div className="mb-5">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={m.name[locale]}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e8e5df] text-lg font-semibold text-[#1a1a1a] font-[family-name:var(--font-syne)]">
                    {m.name.en.charAt(0)}
                  </div>
                )}
              </div>

              {/* Name */}
              <p className="font-[family-name:var(--font-syne)] text-lg font-bold text-[#1a1a1a] md:text-base">
                {m.name[locale]}
              </p>

              {/* One-liner */}
              <p className="mt-1.5 text-xs leading-relaxed text-[#737373] line-clamp-2">
                {m.oneLiner[locale]}
              </p>

              {/* Field tags */}
              {m.fields && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.fields.map((f) => (
                    <span
                      key={f}
                      className="rounded-sm border border-[#e5e5e5] px-2 py-0.5 text-[11px] font-medium tracking-wide text-[#737373] group-hover:border-[#d4d4d4]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
