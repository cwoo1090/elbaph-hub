import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="mt-8">
      <div className="section-divider" />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm font-bold text-[#1a1a1a]">
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
