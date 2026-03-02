import { useTranslations } from 'next-intl'

export default function WhoWeAre() {
  const t = useTranslations('WhoWeAre')

  return (
    <section className="px-6 py-32">
      <div className="section-divider mb-32" />
      <div className="mx-auto max-w-4xl">
        <span className="accent-line" />
        <h2
          className="font-[family-name:var(--font-syne)] text-3xl font-bold tracking-tight md:text-5xl animate-fade-up"
          style={{ fontWeight: 700 }}
        >
          {t('title')}
        </h2>
        <p className="mt-8 text-lg leading-[1.85] text-neutral-300 whitespace-pre-line animate-fade-up-delay-1">
          {t('description')}
        </p>
      </div>
    </section>
  )
}
