import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <section className="hero-section px-4 py-20 sm:px-6 sm:py-24 md:py-40">
      <div className="mx-auto max-w-5xl">
        <h1
          className="hero-headline animate-fade-in-up whitespace-pre-line font-display text-[2.75rem] font-bold leading-[0.98] tracking-normal text-[#1a1a1a] sm:text-5xl md:text-7xl lg:text-8xl"
          style={{ animationDelay: '0s' }}
        >
          {t('headline')}
        </h1>

        <p
          className="animate-fade-in-up mt-6 max-w-md whitespace-pre-line text-[15px] italic leading-7 text-[#737373] sm:mt-8 sm:max-w-lg sm:text-base sm:leading-relaxed"
          style={{ animationDelay: '0.2s' }}
        >
          {t('subtext')}
        </p>

        <div
          className="animate-fade-in-up mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
          style={{ animationDelay: '0.3s' }}
        >
          <Link
            href="/crew"
            className="inline-block w-full border border-[#1a1a1a] bg-[#1a1a1a] px-7 py-3 text-center text-sm font-medium text-[#faf9f6] transition-all duration-150 hover:scale-[1.02] hover:bg-[#333] active:scale-[0.98] sm:w-auto"
          >
            {t('cta')}
          </Link>
          <Link
            href="/blog"
            className="inline-block w-full border border-[#e5e5e5] px-7 py-3 text-center text-sm font-medium text-[#737373] transition-colors duration-150 hover:border-[#1a1a1a] hover:text-[#1a1a1a] sm:w-auto"
          >
            Blog &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
