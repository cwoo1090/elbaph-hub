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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-widest hover:text-neutral-300 transition-colors">
          ELBAPH
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
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
            <span className={`block h-0.5 w-5 bg-white transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-white transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-white/10 bg-[#0a0a0a]/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
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
