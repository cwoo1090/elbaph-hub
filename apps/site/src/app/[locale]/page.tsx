import { useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('Hero')
  return (
    <main>
      <h1>{t('headline')}</h1>
      <p>{t('subtext')}</p>
    </main>
  )
}
