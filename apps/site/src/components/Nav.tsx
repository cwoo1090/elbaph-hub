'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import LanguageToggle from './LanguageToggle'

const navLinks = [
  { href: '/crew', key: 'members' },
  { href: '/meetups', key: 'meetups' },
  { href: '/blog', key: 'blog' },
] as const

export default function Nav() {
  const t = useTranslations('Nav')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-[#e5e5e5] bg-[#faf9f6] transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 md:h-16">
        <Link
          href="/"
          className="group flex items-center gap-0 md:-ml-8"
        >
          <Image
            src="/logo.png"
            alt="Elbaph"
            width={60}
            height={60}
            className="h-11 w-11 object-contain mix-blend-multiply md:h-[60px] md:w-[60px]"
          />
          <span className="font-display -ml-1 text-base font-bold tracking-tight text-[#1a1a1a] transition-opacity duration-150 group-hover:opacity-80 md:-ml-2 md:text-lg">
            Elbaph
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
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
        <button
          onClick={() => setOpen(!open)}
          className="mr-[-0.25rem] flex flex-col justify-center gap-[5px] p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className={`block h-px w-5 bg-[#1a1a1a] transition-all duration-200 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-px w-5 bg-[#1a1a1a] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 bg-[#1a1a1a] transition-all duration-200 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="border-t border-[#e5e5e5] bg-[#faf9f6] shadow-[0_10px_30px_rgba(0,0,0,0.03)] md:hidden">
          <div className="flex flex-col gap-5 px-4 py-5 sm:px-6">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="text-sm text-[#737373] transition-colors duration-150 hover:text-[#1a1a1a]"
              >
                {t(key)}
              </Link>
            ))}
            <div className="border-t border-[#e5e5e5] pt-5">
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
