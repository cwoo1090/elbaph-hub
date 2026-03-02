import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="mt-8">
      <div className="section-divider" />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span
            className="text-sm font-bold tracking-[0.2em] text-neutral-600 font-[family-name:var(--font-syne)]"
            style={{ fontWeight: 700 }}
          >
            ELBAPH
          </span>
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} Elbaph. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
