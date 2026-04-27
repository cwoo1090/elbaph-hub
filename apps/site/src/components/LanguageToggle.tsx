'use client'

import type { BlogLanguage } from '@/lib/useBlogLanguage'

type Props = {
  language: BlogLanguage
  onChange: (lang: BlogLanguage) => void
  className?: string
}

export default function LanguageToggle({ language, onChange, className = '' }: Props) {
  function handleToggle() {
    onChange(language === 'en' ? 'ko' : 'en')
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={language === 'ko'}
      aria-label={language === 'en' ? 'Switch to Korean' : 'Switch to English'}
      onClick={handleToggle}
      className={`group inline-flex items-center gap-3 focus-visible:outline-none ${className}`}
    >
      <span
        className={`text-xs font-medium uppercase tracking-wide transition-colors duration-150 ${
          language === 'en' ? 'text-[#1a1a1a]' : 'text-[#a3a3a3]'
        }`}
      >
        EN
      </span>
      <span
        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-200 group-focus-visible:ring-2 group-focus-visible:ring-[#1a1a1a] group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#faf9f6] ${
          language === 'ko' ? 'bg-[#1a1a1a]' : 'bg-[#d4d4d4]'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
            language === 'ko' ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </span>
      <span
        className={`text-xs font-medium tracking-wide transition-colors duration-150 ${
          language === 'ko' ? 'text-[#1a1a1a]' : 'text-[#a3a3a3]'
        }`}
      >
        한국어
      </span>
    </button>
  )
}
