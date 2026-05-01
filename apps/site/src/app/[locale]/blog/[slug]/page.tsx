import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { members } from '@/data/members'
import { routing } from '@/i18n/routing'
import BlogPostBody from '@/components/BlogPostBody'
import NewsletterModal from '@/components/NewsletterModal'
import NewsletterSignup from '@/components/NewsletterSignup'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPosts().map((post) => ({ locale, slug: post.slug })),
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  const post = getPostBySlug(slug)
  if (!post) notFound()

  const member = members.find((m) => m.id === post.memberId)
  const authorName = member ? member.name.en : post.memberId
  const publication = process.env.SUBSTACK_PUBLICATION?.trim().toLowerCase()

  return (
    <article className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <BlogPostBody
          date={post.date}
          authorName={authorName}
          hasTranslation={post.hasTranslation}
          ko={{ title: post.title.ko, subtitle: post.subtitle.ko, body: post.body.ko }}
          en={{ title: post.title.en, subtitle: post.subtitle.en, body: post.body.en }}
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
