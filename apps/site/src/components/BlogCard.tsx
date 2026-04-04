import { Link } from '@/i18n/navigation'
import type { Post } from '@/data/posts'
import { members } from '@/data/members'

type Props = {
  post: Post
  locale: 'ko' | 'en'
  readMoreLabel: string
}

export default function BlogCard({ post, locale, readMoreLabel }: Props) {
  const member = members.find((m) => m.id === post.memberId)
  const authorName = member ? member.name[locale] : post.memberId

  return (
    <article className="bg-white p-8 transition-colors duration-150 hover:bg-[#faf9f6]">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold text-[#1a1a1a] font-[family-name:var(--font-syne)]">
          {post.title[locale]}
        </h2>
        <div className="flex shrink-0 items-center gap-3 text-xs text-[#737373]">
          <span>{authorName}</span>
          <span>{post.date}</span>
        </div>
      </div>
      {post.subtitle[locale] && (
        <p className="mt-4 text-sm leading-relaxed text-[#737373]">
          {post.subtitle[locale]}
        </p>
      )}
      <Link
        href={`/blog/${post.slug}`}
        className="mt-5 inline-block text-sm font-medium text-[#1a1a1a] hover:text-[#737373] transition-colors duration-150"
      >
        {readMoreLabel} &rarr;
      </Link>
    </article>
  )
}
