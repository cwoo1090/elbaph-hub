import { getLocale, getTranslations } from 'next-intl/server'
import { getAllArticles } from '@/lib/articles'
import ArticleList from '@/components/ArticleList'
import NewsletterSignup from '@/components/NewsletterSignup'

export default async function BlogPage() {
  const t = await getTranslations('Blog')
  const locale = (await getLocale()) as 'ko' | 'en'
  const articles = getAllArticles()
  const publication = process.env.SUBSTACK_PUBLICATION?.trim().toLowerCase()

  return (
    <section className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <ArticleList
          articles={articles}
          locale={locale}
          label={t('label')}
          title={t('title')}
          empty={t('empty')}
          readMoreLabel={t('readMore')}
        />
        {publication && (
          <div className="mt-20 md:mt-24">
            <NewsletterSignup publication={publication} />
          </div>
        )}
      </div>
    </section>
  )
}
