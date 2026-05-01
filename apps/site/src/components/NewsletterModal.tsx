'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

type Props = {
  publication: string
}

const DISMISS_KEY = 'elbaph.newsletterModalDismissedAt'
const DISMISS_FOR_MS = 7 * 24 * 60 * 60 * 1000
const TRIGGER_PROGRESS = 0.5

function wasRecentlyDismissed() {
  try {
    const dismissedAt = Number(window.localStorage.getItem(DISMISS_KEY))
    return Boolean(dismissedAt && Date.now() - dismissedAt < DISMISS_FOR_MS)
  } catch {
    return false
  }
}

function markDismissed() {
  try {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()))
  } catch {
    // Ignore storage errors; the modal can still be dismissed for this session.
  }
}

export default function NewsletterModal({ publication }: Props) {
  const t = useTranslations('Newsletter')
  const [isOpen, setIsOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const substackUrl = `https://${publication}.substack.com`

  const close = useCallback(() => {
    markDismissed()
    setIsDismissed(true)
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (wasRecentlyDismissed()) {
      return
    }

    function maybeOpen() {
      if (isDismissed || isOpen) return

      const article = document.querySelector('article')
      if (!article) return

      const rect = article.getBoundingClientRect()
      const articleTop = window.scrollY + rect.top
      const readableHeight = article.scrollHeight - window.innerHeight

      if (readableHeight <= 0) return

      const progress = (window.scrollY - articleTop) / readableHeight
      if (progress >= TRIGGER_PROGRESS) {
        setIsOpen(true)
      }
    }

    maybeOpen()
    window.addEventListener('scroll', maybeOpen, { passive: true })
    window.addEventListener('resize', maybeOpen)

    return () => {
      window.removeEventListener('scroll', maybeOpen)
      window.removeEventListener('resize', maybeOpen)
    }
  }, [isDismissed, isOpen])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [close, isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/45 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-modal-title"
      onClick={close}
    >
      <div
        className="relative max-h-[88vh] w-full max-w-xl overflow-y-auto border border-[#e5e5e5] bg-white p-5 shadow-2xl sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label={t('close')}
          onClick={close}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-[#e5e5e5] text-xl leading-none text-[#737373] transition-colors hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
        >
          ×
        </button>
        <span className="section-label">{t('label')}</span>
        <h2
          id="newsletter-modal-title"
          className="pr-10 font-display text-2xl font-bold leading-tight tracking-tight text-[#1a1a1a] sm:text-3xl"
        >
          {t('headline')}
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-6 text-[#737373] sm:text-[15px]">
          {t('description')}
        </p>
        <iframe
          src={`${substackUrl}/embed`}
          title={t('label')}
          width="100%"
          height="320"
          loading="eager"
          className="mt-5 w-full border border-[#e5e5e5] bg-white"
        />
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <a
            href={substackUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center border border-[#1a1a1a] bg-[#1a1a1a] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#333] sm:w-auto"
          >
            {t('fallback')}
          </a>
          <button
            type="button"
            onClick={close}
            className="w-full border border-[#e5e5e5] px-5 py-3 text-sm font-medium text-[#1a1a1a] transition-colors hover:border-[#1a1a1a] sm:w-auto"
          >
            {t('continueReading')}
          </button>
        </div>
      </div>
    </div>
  )
}
