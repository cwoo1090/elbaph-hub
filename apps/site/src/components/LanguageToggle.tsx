'use client'

import { useRouter, usePathname } from '@/i18n/navigation'
import { useLocale } from 'next-intl'

export default function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function toggle() {
    const next = locale === 'ko' ? 'en' : 'ko'
    router.replace(pathname, { locale: next })
  }

  return (
    <button onClick={toggle} className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
      {locale === 'ko' ? 'EN' : 'KO'}
    </button>
  )
}
