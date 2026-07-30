import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { Article } from '@/data/articles'
import { meetups } from '@/data/meetups'
import { getSpeakerMeta } from '@/lib/speakers'

type Props = {
  article: Article
  locale: 'ko' | 'en'
  readMoreLabel: string
}

export default function ArticleCard({ article, locale, readMoreLabel }: Props) {
  const author = getSpeakerMeta(article.meetupId, article.memberId, locale)
  const meetup = meetups.find((m) => m.id === article.meetupId)
  const meetupLabel = meetup ? meetup.title[locale] : article.meetupId

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="block bg-white transition-colors duration-150 hover:bg-[#faf9f6]"
    >
      <article className="p-6 md:p-8">
        <span className="inline-block rounded-full bg-[#f0efec] px-2.5 py-0.5 text-xs text-[#737373]">
          {meetupLabel}
        </span>
        <h2 className="mt-3 font-display text-[1.9rem] font-semibold leading-tight text-[#1a1a1a] md:text-xl">
          {article.title[locale]}
        </h2>
        {article.subtitle[locale] && (
          <p className="mt-3 text-[15px] leading-7 text-[#737373] md:mt-2 md:text-sm md:leading-relaxed">
            {article.subtitle[locale]}
          </p>
        )}
        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            {author.photo ? (
              <Image
                src={author.photo}
                alt={author.name}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e5e5e5] text-[10px] text-[#737373]">
                {author.name.charAt(0)}
              </div>
            )}
            <span className="text-xs text-[#737373]">{author.name}</span>
            {author.role && (
              <>
                <span className="text-xs text-[#d4d4d4]">·</span>
                <span className="text-xs font-medium text-[#525252]">{author.role}</span>
              </>
            )}
            <span className="text-xs text-[#d4d4d4]">·</span>
            <span className="text-xs text-[#737373]">{article.date}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#1a1a1a] transition-colors duration-150">
            {readMoreLabel} &rarr;
          </span>
        </div>
      </article>
    </Link>
  )
}
