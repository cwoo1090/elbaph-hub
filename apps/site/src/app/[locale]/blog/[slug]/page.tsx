import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { members } from '@/data/members'
import { routing } from '@/i18n/routing'
import BlogPostBody from '@/components/BlogPostBody'

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
      </div>
    </article>
  )
}
