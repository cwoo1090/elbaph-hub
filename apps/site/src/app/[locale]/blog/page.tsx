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
        <span className="accent-line" />
        <h1
          className="font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight md:text-6xl"
          style={{ fontWeight: 800 }}
        >
          {t('title')}
        </h1>

        {sorted.length === 0 ? (
          <div className="mt-20 flex flex-col items-start">
            <p className="text-sm text-neutral-600">{t('empty')}</p>
          </div>
        ) : (
          <div className="mt-14 space-y-6">
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
