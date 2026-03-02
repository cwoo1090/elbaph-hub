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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#e5e5e5] bg-[#faf9f6]">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.18em] text-[#1a1a1a] uppercase"
        >
          Elbaph
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors duration-150"
            >
              {t(key)}
            </Link>
          ))}
          <LanguageToggle />
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-5 md:hidden">
          <LanguageToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col justify-center gap-[5px] p-1"
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-5 bg-[#1a1a1a] transition-all duration-200 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-px w-5 bg-[#1a1a1a] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-5 bg-[#1a1a1a] transition-all duration-200 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-[#e5e5e5] bg-[#faf9f6] md:hidden">
          <div className="flex flex-col px-6 py-6 gap-5">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors duration-150"
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
