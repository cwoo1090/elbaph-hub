import { useTranslations } from 'next-intl'

const cards = [
  { key: 'meetups', icon: '📅' },
  { key: 'diversity', icon: '🔬' },
  { key: 'network', icon: '🤝' },
] as const

export default function WhatWeDo() {
  const t = useTranslations('WhatWeDo')

  return (
    <section className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t('title')}
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {cards.map(({ key, icon }) => (
            <div
              key={key}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/[0.08]"
            >
              <div className="text-3xl">{icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{t(key)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {t(`${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
