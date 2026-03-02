import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <section className="flex flex-col items-center justify-center px-6 py-40 text-center md:py-56">
      <div className="mx-auto max-w-4xl">
        <p className="section-label mb-8">A Land of Giants</p>

        <h1 className="font-[family-name:var(--font-syne)] text-5xl font-bold leading-[1.05] tracking-tight text-[#1a1a1a] md:text-7xl lg:text-8xl">
          {t('headline')}
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg leading-relaxed text-[#737373]">
          {t('subtext')}
        </p>

        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/members"
            className="inline-block border border-[#1a1a1a] bg-[#1a1a1a] px-7 py-3 text-sm font-medium text-[#faf9f6] hover:bg-[#333] transition-colors duration-150"
          >
            {t('cta')}
          </Link>
          <Link
            href="/meetups"
            className="inline-block border border-[#e5e5e5] px-7 py-3 text-sm font-medium text-[#737373] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors duration-150"
          >
            Meetups &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
