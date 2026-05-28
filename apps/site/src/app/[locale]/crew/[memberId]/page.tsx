import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import ArticleCard from '@/components/ArticleCard'
import { members } from '@/data/members'
import { getAllArticles } from '@/lib/articles'
import { routing } from '@/i18n/routing'

type Props = {
  params: Promise<{ locale: string; memberId: string }>
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    members.map((member) => ({ locale, memberId: member.id })),
  )
}

export default async function MemberArchivePage({ params }: Props) {
  const { locale, memberId } = await params
  const currentLocale = locale as 'ko' | 'en'
  const member = members.find((m) => m.id === memberId)

  if (!member) notFound()

  const t = await getTranslations('AuthorArchive')
  const blogT = await getTranslations('Blog')
  const articles = getAllArticles().filter((article) => article.memberId === member.id)

  return (
    <section className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/crew#${member.id}`}
          className="mb-8 inline-flex text-sm text-[#737373] transition-colors duration-150 hover:text-[#1a1a1a]"
        >
          {t('backToCrew')} &rarr;
        </Link>

        <div className="grid gap-6 border-y border-[#e5e5e5] bg-white p-6 md:grid-cols-[auto_1fr] md:gap-8 md:p-8">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name[currentLocale]}
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-full object-cover"
            />
          ) : (
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[#f0ede8] font-display text-xl font-semibold text-[#1a1a1a]">
              {member.name.en.charAt(0)}
            </div>
          )}
          <div>
            <span className="section-label">{t('label')}</span>
            <h1 className="font-display text-4xl font-bold tracking-tight text-[#1a1a1a] md:text-5xl">
              {t('title', { name: member.name[currentLocale] })}
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#737373] md:text-base md:leading-relaxed">
              {member.oneLiner[currentLocale]}
            </p>
            {member.fields && (
              <div className="mt-5 flex flex-wrap gap-1.5">
                {member.fields.map((field) => (
                  <span
                    key={field}
                    className="rounded-sm border border-[#e5e5e5] px-2 py-0.5 text-[11px] font-medium tracking-wide text-[#737373]"
                  >
                    {field}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {articles.length === 0 ? (
          <p className="mt-14 text-sm text-[#737373]">{t('empty')}</p>
        ) : (
          <div className="mt-10 space-y-px border border-[#e5e5e5] md:mt-14">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                locale={currentLocale}
                readMoreLabel={blogT('readMore')}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
