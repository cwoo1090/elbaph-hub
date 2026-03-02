import { useTranslations } from 'next-intl'

const values = [
  { key: 'curiosity' },
  { key: 'thinking' },
  { key: 'together' },
] as const

export default function WhatWeValue() {
  const t = useTranslations('WhatWeValue')

  return (
    <section className="px-6 py-32">
      <div className="section-divider mb-32" />
      <div className="mx-auto max-w-5xl">
        <span className="section-label">{t('label')}</span>
        <h2 className="text-3xl font-bold tracking-normal text-[#1a1a1a] md:text-4xl">
          {t('title')}
        </h2>
        <div className="mt-14 grid gap-px border border-[#e5e5e5] md:grid-cols-3">
          {values.map(({ key }) => (
            <div
              key={key}
              className="bg-white p-8"
            >
              <h3 className="text-base font-semibold text-[#1a1a1a]">
                {t(key)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#737373]">
                {t(`${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
