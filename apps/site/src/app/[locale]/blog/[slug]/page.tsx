import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Link } from '@/i18n/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { members } from '@/data/members'
import { routing } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPosts().map((post) => ({ locale, slug: post.slug }))
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params
  const pageLocale = locale as 'ko' | 'en'

  const post = getPostBySlug(slug)
  if (!post) notFound()

  const member = members.find((m) => m.id === post.memberId)
  const authorName = member ? member.name[pageLocale] : post.memberId

  return (
    <article className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <header>
          <h1 className="text-3xl font-bold tracking-normal text-[#1a1a1a] sm:text-4xl md:text-5xl">
            {post.title[pageLocale]}
          </h1>
          {post.subtitle[pageLocale] && (
            <p className="mt-3 text-lg leading-8 text-[#737373] sm:text-xl">{post.subtitle[pageLocale]}</p>
          )}
          <div className="mt-4 flex flex-col items-start gap-1 text-sm text-[#737373] sm:flex-row sm:items-center sm:gap-4">
            <span>{post.date}</span>
            <Link href="/crew" className="hover:text-[#1a1a1a] transition-colors duration-150">
              {authorName}
            </Link>
          </div>
        </header>
        <div className="mt-8 text-[15px] leading-7 text-[#1a1a1a] [&_h2]:mt-8 [&_h2]:text-[1.6rem] [&_h2]:font-bold [&_h2]:text-[#1a1a1a] [&_p]:mt-4 [&_p]:first:mt-0 sm:mt-12 sm:text-base sm:leading-relaxed sm:[&_h2]:mt-10 sm:[&_h2]:text-2xl">
          <ReactMarkdown>{post.body[pageLocale]}</ReactMarkdown>
        </div>
      </div>
    </article>
  )
}
