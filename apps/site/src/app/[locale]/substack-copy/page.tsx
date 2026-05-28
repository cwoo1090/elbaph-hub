import { notFound } from 'next/navigation'
import { getArticleBySlug } from '@/lib/articles'
import {
  getSiteUrl,
  getSubstackArticleContent,
  isSubstackLocale,
  type SubstackLocale,
} from '@/lib/substack'
import SubstackCopyClient from './SubstackCopyClient'

const DEFAULT_COPY_SLUG = 'meetup-2-taekyu'

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ slug?: string; locale?: string }>
}

export default async function SubstackCopyPage({ params, searchParams }: Props) {
  const [{ locale: routeLocale }, search] = await Promise.all([params, searchParams])
  const slug = search.slug ?? DEFAULT_COPY_SLUG
  const locale: SubstackLocale = isSubstackLocale(search.locale)
    ? search.locale
    : isSubstackLocale(routeLocale)
      ? routeLocale
      : 'ko'

  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const content = getSubstackArticleContent(article, locale, getSiteUrl())

  return <SubstackCopyClient {...content} />
}
