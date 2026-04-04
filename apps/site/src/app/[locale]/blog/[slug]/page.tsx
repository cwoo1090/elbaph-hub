import { notFound } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import ReactMarkdown from 'react-markdown'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const locale = (await getLocale()) as 'ko' | 'en'

  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <header>
          <h1 className="text-4xl font-bold tracking-normal text-[#1a1a1a] md:text-5xl">
            {post.title[locale]}
          </h1>
          {post.subtitle[locale] && (
            <p className="mt-3 text-xl text-[#737373]">{post.subtitle[locale]}</p>
          )}
          <div className="mt-4 flex items-center gap-4 text-sm text-[#737373]">
            <span>{post.date}</span>
            <span>{post.memberId}</span>
          </div>
        </header>
        <div className="mt-12 text-base leading-relaxed text-[#1a1a1a] [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1a1a1a] [&_p]:mt-4 [&_p]:first:mt-0">
          <ReactMarkdown>{post.body[locale]}</ReactMarkdown>
        </div>
      </div>
    </article>
  )
}
