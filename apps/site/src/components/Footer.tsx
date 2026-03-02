import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="mt-8">
      <div className="section-divider" />
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-xs font-bold tracking-[0.18em] uppercase text-[#1a1a1a] font-[family-name:var(--font-syne)]">
            Elbaph
          </span>
          <p className="text-xs text-[#737373]">
            &copy; {new Date().getFullYear()} Elbaph. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
