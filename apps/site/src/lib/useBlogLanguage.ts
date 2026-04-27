'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'elbaph:blog-lang'
const CHANGE_EVENT = 'elbaph:blog-lang-change'

export type BlogLanguage = 'ko' | 'en'

export function useBlogLanguage(): [BlogLanguage, (lang: BlogLanguage) => void] {
  const [language, setLanguageState] = useState<BlogLanguage>('en')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ko' || saved === 'en') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe localStorage read
      setLanguageState(saved)
    }

    function handleChange(event: Event) {
      const detail = (event as CustomEvent<BlogLanguage>).detail
      if (detail === 'ko' || detail === 'en') {
        setLanguageState(detail)
      }
    }

    window.addEventListener(CHANGE_EVENT, handleChange)
    return () => window.removeEventListener(CHANGE_EVENT, handleChange)
  }, [])

  function setLanguage(lang: BlogLanguage) {
    setLanguageState(lang)
    localStorage.setItem(STORAGE_KEY, lang)
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: lang }))
  }

  return [language, setLanguage]
}
