'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from '@/i18n/navigation'

const STORAGE_KEY = 'elbaph:blog-lang'

type LanguageContent = {
  title: string
  subtitle: string
  body: string
}

type Props = {
  date: string
  authorName: string
  hasTranslation: boolean
  ko: LanguageContent
  en: LanguageContent
}

export default function BlogPostBody({ date, authorName, hasTranslation, ko, en }: Props) {
  const [language, setLanguage] = useState<'ko' | 'en'>('en')

  useEffect(() => {
    if (!hasTranslation) return
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ko' || saved === 'en') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe localStorage read; see https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state
      setLanguage(saved)
    }
  }, [hasTranslation])

  const showKorean = hasTranslation && language === 'ko'
  const current = showKorean ? ko : en

  function handleToggle() {
    const next = language === 'en' ? 'ko' : 'en'
    setLanguage(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <>
      <header>
        <h1 className="text-3xl font-bold tracking-normal text-[#1a1a1a] sm:text-4xl md:text-5xl">
          {current.title}
        </h1>
        {current.subtitle && (
          <p className="mt-3 text-lg leading-8 text-[#737373] sm:text-xl">
            {current.subtitle}
          </p>
        )}
        <div className="mt-4 flex flex-col items-start gap-1 text-sm text-[#737373] sm:flex-row sm:items-center sm:gap-4">
          <span>{date}</span>
          <Link href="/crew" className="hover:text-[#1a1a1a] transition-colors duration-150">
            {authorName}
          </Link>
          {hasTranslation && (
            <button
              type="button"
              onClick={handleToggle}
              className="text-left hover:text-[#1a1a1a] transition-colors duration-150"
            >
              {language === 'en' ? '한국어' : 'English'}
            </button>
          )}
        </div>
      </header>
      <div className="mt-8 text-[15px] leading-7 text-[#1a1a1a] [&_h2]:mt-8 [&_h2]:text-[1.6rem] [&_h2]:font-bold [&_h2]:text-[#1a1a1a] [&_p]:mt-4 [&_p]:first:mt-0 sm:mt-12 sm:text-base sm:leading-relaxed sm:[&_h2]:mt-10 sm:[&_h2]:text-2xl">
        <ReactMarkdown>{current.body}</ReactMarkdown>
      </div>
    </>
  )
}
