import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { members } from '@/data/members'
import { routing } from '@/i18n/routing'
import ArticleBody from '@/components/ArticleBody'
import NewsletterModal from '@/components/NewsletterModal'
import NewsletterSignup from '@/components/NewsletterSignup'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllArticles().map((article) => ({ locale, slug: article.slug })),
  )
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params
  const currentLocale = locale as 'ko' | 'en'

  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const member = members.find((m) => m.id === article.memberId)
  const authorName = member ? member.name[currentLocale] : article.memberId
  const publication = process.env.SUBSTACK_PUBLICATION?.trim().toLowerCase()

  return (
    <article className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <ArticleBody
          date={article.date}
          authorName={authorName}
          locale={currentLocale}
          ko={{ title: article.title.ko, subtitle: article.subtitle.ko, body: article.body.ko }}
          en={{ title: article.title.en, subtitle: article.subtitle.en, body: article.body.en }}
        />
        {publication && (
          <>
            <NewsletterModal publication={publication} />
            <div className="mt-20 md:mt-24">
              <NewsletterSignup publication={publication} />
            </div>
          </>
        )}
      </div>
    </article>
  )
}
