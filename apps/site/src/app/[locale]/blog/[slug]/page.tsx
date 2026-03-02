import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl'
import { posts } from '@/data/posts'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const locale = useLocale() as 'ko' | 'en'

  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <article className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <header>
          <h1 className="text-4xl font-bold tracking-normal md:text-5xl">
            {post.title[locale]}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
            <span>{post.date}</span>
            <span>{post.author}</span>
          </div>
        </header>
        <div className="mt-12 text-base leading-relaxed text-neutral-300 whitespace-pre-line">
          {post.body[locale]}
        </div>
      </div>
    </article>
  )
}
