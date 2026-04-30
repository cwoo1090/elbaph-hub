'use client'

import { useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterSignup() {
  const t = useTranslations('Newsletter')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (status === 'loading' || status === 'success') return
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('subscribe_failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="border border-[#e5e5e5] bg-white p-8 sm:p-10 md:p-12">
      <span className="section-label">{t('label')}</span>
      <h2 className="font-[family-name:var(--font-syne)] text-[1.75rem] font-bold leading-tight tracking-tight text-[#1a1a1a] sm:text-3xl md:text-[2.25rem]">
        {t('headline')}
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-7 text-[#737373] sm:text-base sm:leading-relaxed">
        {t('description')}
      </p>

      {status === 'success' ? (
        <p className="mt-6 text-sm font-medium text-[#1a1a1a]">{t('success')}</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => {
              if (status === 'error') setStatus('idle')
            }}
            placeholder={t('placeholder')}
            disabled={status === 'loading'}
            aria-label={t('placeholder')}
            className="flex-1 border border-[#e5e5e5] bg-white px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#a3a3a3] focus:border-[#1a1a1a] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="border border-[#1a1a1a] bg-[#1a1a1a] px-7 py-3 text-sm font-medium text-[#faf9f6] transition-all duration-150 hover:scale-[1.02] hover:bg-[#333] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
          >
            {status === 'loading' ? t('loading') : t('cta')}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-3 text-sm text-[#b91c1c]">{t('error')}</p>
      )}
    </section>
  )
}
