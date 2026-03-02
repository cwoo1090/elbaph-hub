import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} Elbaph. {t('rights')}
      </div>
    </footer>
  )
}
