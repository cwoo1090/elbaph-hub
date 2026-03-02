import { useTranslations } from 'next-intl'

export default function WhoWeAre() {
  const t = useTranslations('WhoWeAre')

  return (
    <section className="px-6 py-32">
      <div className="section-divider mb-32" />
      <div className="mx-auto max-w-4xl">
        <span className="section-label">{t('label')}</span>
        <h2 className="text-3xl font-bold tracking-normal text-[#1a1a1a] md:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-8 text-lg leading-[1.85] text-[#737373] whitespace-pre-line">
          {t('description')}
        </p>
      </div>
    </section>
  )
}
