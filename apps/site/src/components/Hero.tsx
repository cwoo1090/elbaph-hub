import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-40 text-center md:py-56">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(245,158,11,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 animate-fade-up">
        {/* Eyebrow */}
        <p className="mb-6 text-xs font-semibold tracking-[0.3em] text-[#f59e0b] uppercase">
          A Land of Giants
        </p>

        {/* Main headline */}
        <h1
          className="font-[family-name:var(--font-syne)] text-6xl font-extrabold leading-[1.0] tracking-tight md:text-8xl lg:text-9xl"
          style={{ fontWeight: 800 }}
        >
          <span className="text-gradient">{t('headline')}</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-300 md:text-xl">
          {t('subtext')}
        </p>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/members"
            className="inline-block rounded-full bg-[#f59e0b] px-8 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-[#fbbf24] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
          >
            {t('cta')}
          </Link>
          <Link
            href="/meetups"
            className="inline-block rounded-full border border-white/[0.12] px-8 py-3.5 text-sm font-medium text-neutral-300 transition-all duration-200 hover:border-white/30 hover:text-white"
          >
            Meetups &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
