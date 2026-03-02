import { useTranslations } from 'next-intl'

const values = [
  { key: 'curiosity', icon: '🔭' },
  { key: 'thinking', icon: '💡' },
  { key: 'together', icon: '🤝' },
] as const

export default function WhatWeValue() {
  const t = useTranslations('WhatWeValue')

  return (
    <section className="px-6 py-32">
      <div className="section-divider mb-32" />
      <div className="mx-auto max-w-6xl">
        <span className="accent-line" />
        <h2
          className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-5xl"
          style={{ fontWeight: 700 }}
        >
          {t('title')}
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {values.map(({ key, icon }, i) => (
            <div
              key={key}
              className={`card-glow rounded-2xl p-8 animate-fade-up-delay-${i + 1}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f59e0b]/10 text-2xl">
                {icon}
              </div>
              <h3
                className="mt-5 text-lg font-semibold font-[family-name:var(--font-syne)]"
                style={{ fontWeight: 600 }}
              >
                {t(key)}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-neutral-400">
                {t(`${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
