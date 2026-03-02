import { Link } from '@/i18n/navigation'
import type { Post } from '@/data/posts'

type Props = {
  post: Post
  locale: 'ko' | 'en'
  readMoreLabel: string
}

export default function BlogCard({ post, locale, readMoreLabel }: Props) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/[0.08]">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 className="text-xl font-semibold">{post.title[locale]}</h2>
        <span className="text-sm text-neutral-500">{post.date}</span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-neutral-400">
        {post.summary[locale]}
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-block text-sm font-medium text-neutral-400 hover:text-white transition-colors"
      >
        {readMoreLabel} &rarr;
      </Link>
    </article>
  )
}
