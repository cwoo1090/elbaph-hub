import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <section className="flex flex-col items-center justify-center px-6 py-32 text-center md:py-44">
      <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
        {t('headline')}
      </h1>
      <p className="mt-6 max-w-lg text-lg text-neutral-400 md:text-xl">
        {t('subtext')}
      </p>
      <Link
        href="/members"
        className="mt-10 inline-block rounded-full border border-white/20 bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-neutral-200"
      >
        {t('cta')}
      </Link>
    </section>
  )
}
