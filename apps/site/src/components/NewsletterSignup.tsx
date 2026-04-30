import { useTranslations } from 'next-intl'

type Props = {
  publication: string
}

export default function NewsletterSignup({ publication }: Props) {
  const t = useTranslations('Newsletter')
  const substackUrl = `https://${publication}.substack.com`

  return (
    <section className="border border-[#e5e5e5] bg-white p-8 sm:p-10 md:p-12">
      <span className="section-label">{t('label')}</span>
      <h2 className="font-[family-name:var(--font-syne)] text-[1.75rem] font-bold leading-tight tracking-tight text-[#1a1a1a] sm:text-3xl md:text-[2.25rem]">
        {t('headline')}
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#737373] sm:text-base sm:leading-relaxed">
        {t('description')}
      </p>

      <iframe
        src={`${substackUrl}/embed`}
        title={t('label')}
        width="100%"
        height="320"
        loading="lazy"
        className="mt-6 w-full border border-[#e5e5e5] bg-white"
      />
      <p className="mt-3 text-sm text-[#737373]">
        <a
          href={substackUrl}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-[#1a1a1a] underline-offset-4 transition-colors hover:text-[#737373] hover:underline"
        >
          {t('fallback')}
        </a>
      </p>
    </section>
  )
}
