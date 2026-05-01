'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

type Props = {
  className?: string
}

type SiteLocale = 'ko' | 'en'

export default function LanguageToggle({ className = '' }: Props) {
  const locale = useLocale() as SiteLocale
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const nextLocale: SiteLocale = locale === 'en' ? 'ko' : 'en'

  function handleToggle() {
    startTransition(() => {
      const search = window.location.search
      const hash = window.location.hash
      router.replace(`${pathname}${search}${hash}`, { locale: nextLocale, scroll: false })
    })
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={locale === 'ko'}
      aria-label={locale === 'en' ? 'Switch to Korean' : 'Switch to English'}
      onClick={handleToggle}
      disabled={isPending}
      className={`group inline-flex items-center gap-3 focus-visible:outline-none ${className}`}
    >
      <span
        className={`text-xs font-medium uppercase tracking-wide transition-colors duration-150 ${
          locale === 'en' ? 'text-[#1a1a1a]' : 'text-[#a3a3a3]'
        }`}
      >
        EN
      </span>
      <span
        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 group-focus-visible:ring-2 group-focus-visible:ring-[#1a1a1a] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#faf9f6] ${
          locale === 'ko' ? 'bg-[#1a1a1a]' : 'bg-[#d4d4d4]'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
            locale === 'ko' ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </span>
      <span
        className={`text-xs font-medium tracking-wide transition-colors duration-150 ${
          locale === 'ko' ? 'text-[#1a1a1a]' : 'text-[#a3a3a3]'
        }`}
      >
        한국어
      </span>
    </button>
  )
}
