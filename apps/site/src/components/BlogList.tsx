'use client'

import BlogCard from './BlogCard'
import LanguageToggle from './LanguageToggle'
import { useBlogLanguage } from '@/lib/useBlogLanguage'
import type { Post } from '@/data/posts'

type Props = {
  posts: Post[]
  label: string
  title: string
  empty: string
  readMoreLabel: string
}

export default function BlogList({ posts, label, title, empty, readMoreLabel }: Props) {
  const [language, setLanguage] = useBlogLanguage()

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <span className="section-label">{label}</span>
        <LanguageToggle language={language} onChange={setLanguage} />
      </div>
      <h1 className="text-4xl font-bold tracking-normal text-[#1a1a1a] md:text-5xl">
        {title}
      </h1>

      {posts.length === 0 ? (
        <div className="mt-20">
          <p className="text-sm text-[#737373]">{empty}</p>
        </div>
      ) : (
        <div className="mt-10 space-y-px border border-[#e5e5e5] md:mt-14">
          {posts.map((p) => (
            <BlogCard
              key={p.slug}
              post={p}
              locale={language}
              readMoreLabel={readMoreLabel}
            />
          ))}
        </div>
      )}
    </>
  )
}
