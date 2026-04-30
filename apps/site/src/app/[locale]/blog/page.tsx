import { getTranslations } from 'next-intl/server'
import { getAllPosts } from '@/lib/posts'
import BlogList from '@/components/BlogList'
import NewsletterSignup from '@/components/NewsletterSignup'

export default async function BlogPage() {
  const t = await getTranslations('Blog')
  const posts = getAllPosts()
  const publication = process.env.SUBSTACK_PUBLICATION?.trim().toLowerCase()

  return (
    <section className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <BlogList
          posts={posts}
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
