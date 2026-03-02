import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import '../globals.css'

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Elbaph',
  description: 'A Land of Giants — Standing on each other\'s shoulders to see a wider world',
}

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${syne.variable} ${dmSans.variable} font-[family-name:var(--font-dm-sans)] bg-[#0a0a0a] text-white antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Nav />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
