import { useTranslations } from 'next-intl'

export default function WhoWeAre() {
  const t = useTranslations('WhoWeAre')

  return (
    <section className="px-4 py-20 sm:px-6 md:py-32">
      <div className="section-divider mb-16 md:mb-32" />
      <div className="mx-auto max-w-5xl">
        <span className="section-label">{t('label')}</span>
        <blockquote className="story-headline reveal mt-2 whitespace-normal [text-wrap:balance] font-display text-[1.9rem] font-bold leading-[1.15] tracking-normal text-[#1a1a1a] sm:text-3xl sm:leading-[1.2] md:whitespace-pre-line md:text-4xl lg:text-5xl">
          {t('description')}
        </blockquote>
        <p className="story-body mt-6 whitespace-normal [text-wrap:pretty] text-base leading-8 text-[#525252] sm:mt-8 sm:text-lg sm:leading-[1.85] md:whitespace-pre-line">
          {t('body')}
        </p>
      </div>
    </section>
  )
}
