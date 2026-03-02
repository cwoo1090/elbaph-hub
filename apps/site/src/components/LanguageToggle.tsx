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
    <button
      onClick={toggle}
      className="text-xs font-medium tracking-[0.1em] text-[#737373] hover:text-[#1a1a1a] transition-colors duration-150 uppercase"
    >
      {locale === 'ko' ? 'EN' : 'KO'}
    </button>
  )
}
