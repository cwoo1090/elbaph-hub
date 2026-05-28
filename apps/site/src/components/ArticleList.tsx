import ArticleCard from './ArticleCard'
import type { Article } from '@/data/articles'

type Props = {
  articles: Article[]
  locale: 'ko' | 'en'
  label: string
  title: string
  empty: string
  readMoreLabel: string
}

export default function ArticleList({ articles, locale, label, title, empty, readMoreLabel }: Props) {
  return (
    <>
      <span className="section-label">{label}</span>
      <h1 className="text-4xl font-bold tracking-normal text-[#1a1a1a] md:text-5xl">
        {title}
      </h1>

      {articles.length === 0 ? (
        <div className="mt-20">
          <p className="text-sm text-[#737373]">{empty}</p>
        </div>
      ) : (
        <div className="mt-10 space-y-px border border-[#e5e5e5] md:mt-14">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={locale}
              readMoreLabel={readMoreLabel}
            />
          ))}
        </div>
      )}
    </>
  )
}
