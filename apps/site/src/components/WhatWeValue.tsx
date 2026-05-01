import { useTranslations } from 'next-intl'

const values = [
  { key: 'curiosity' },
  { key: 'thinking' },
  { key: 'together' },
] as const

export default function WhatWeValue() {
  const t = useTranslations('WhatWeValue')

  return (
    <section className="px-4 py-20 sm:px-6 md:py-32">
      <div className="section-divider mb-16 md:mb-32" />
      <div className="mx-auto max-w-5xl">
        <span className="section-label">{t('label')}</span>
        <div className="reveal mt-8 divide-y divide-[#e5e5e5] md:mt-10">
          {values.map(({ key }, index) => (
            <div key={key} className="group flex gap-5 py-6 sm:gap-8 md:gap-20 md:py-10">
              <span className="w-8 shrink-0 pt-1 font-display text-sm font-medium tabular-nums text-[#d4d4d4] transition-colors duration-200 group-hover:text-[#1a1a1a]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-[1.4rem] font-bold tracking-tight text-[#1a1a1a] sm:text-2xl md:text-3xl">
                  {t(key)}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-[#737373] sm:mt-3 sm:text-base sm:leading-relaxed">
                  {t(`${key}Desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
