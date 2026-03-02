import { useTranslations, useLocale } from 'next-intl'
import { posts } from '@/data/posts'
import BlogCard from '@/components/BlogCard'

export default function BlogPage() {
  const t = useTranslations('Blog')
  const locale = useLocale() as 'ko' | 'en'

  const sorted = [...posts].reverse()

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          {t('title')}
        </h1>

        {sorted.length === 0 ? (
          <p className="mt-12 text-neutral-500">{t('empty')}</p>
        ) : (
          <div className="mt-12 space-y-8">
            {sorted.map((p) => (
              <BlogCard
                key={p.slug}
                post={p}
                locale={locale}
                readMoreLabel={t('readMore')}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
