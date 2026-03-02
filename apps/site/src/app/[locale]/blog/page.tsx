import { useTranslations, useLocale } from 'next-intl'
import { posts } from '@/data/posts'
import BlogCard from '@/components/BlogCard'

export default function BlogPage() {
  const t = useTranslations('Blog')
  const locale = useLocale() as 'ko' | 'en'

  const sorted = [...posts].reverse()

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <span className="section-label">{t('label')}</span>
        <h1 className="font-[family-name:var(--font-syne)] text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
          {t('title')}
        </h1>

        {sorted.length === 0 ? (
          <div className="mt-20">
            <p className="text-sm text-[#737373]">{t('empty')}</p>
          </div>
        ) : (
          <div className="mt-14 space-y-px border border-[#e5e5e5]">
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
