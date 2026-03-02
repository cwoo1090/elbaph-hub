'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LanguageToggle from './LanguageToggle'

const navLinks = [
  { href: '/members', key: 'members' },
  { href: '/meetups', key: 'meetups' },
  { href: '/blog', key: 'blog' },
] as const

export default function Nav() {
  const t = useTranslations('Nav')
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-syne)] text-base font-800 tracking-[0.2em] text-white hover:text-[#f59e0b] transition-colors duration-200"
          style={{ fontWeight: 800 }}
        >
          ELBAPH
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="text-sm font-medium text-neutral-500 hover:text-white transition-colors duration-200"
            >
              {t(key)}
            </Link>
          ))}
          <LanguageToggle />
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col justify-center gap-1.5 p-1"
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-5 bg-white transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-px w-5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-5 bg-white transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-white/[0.06] bg-[#0a0a0a]/98 backdrop-blur-xl md:hidden">
          <div className="flex flex-col px-6 py-5 gap-5">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-200"
              >
                {t(key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
