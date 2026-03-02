import { useTranslations } from 'next-intl'

export default function WhoWeAre() {
  const t = useTranslations('WhoWeAre')

  return (
    <section className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-neutral-300 whitespace-pre-line">
          {t('description')}
        </p>
      </div>
    </section>
  )
}
