import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Article } from '@/data/articles'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

function frontmatterDate(value: unknown) {
  return value instanceof Date ? value.toISOString().split('T')[0] : String(value)
}

function frontmatterDateTime(value: unknown) {
  if (value == null) return undefined
  return value instanceof Date ? value.toISOString() : String(value)
}

function articleSortTime(article: Article) {
  const value = article.publishedAt ?? article.date
  const timestamp = Date.parse(value)

  return Number.isNaN(timestamp) ? 0 : timestamp
}

export function getAllArticles(): Article[] {
  const meetupDirs = fs.readdirSync(ARTICLES_DIR)
  const articles: Article[] = []

  for (const meetupId of meetupDirs) {
    const meetupPath = path.join(ARTICLES_DIR, meetupId)
    if (!fs.statSync(meetupPath).isDirectory()) continue

    const files = fs.readdirSync(meetupPath).filter(
      (f) => f.endsWith('.md') && !f.endsWith('.en.md')
    )

    for (const file of files) {
      const memberId = file.replace('.md', '')
      const filePath = path.join(meetupPath, file)
      const { data, content: koBody } = matter(fs.readFileSync(filePath, 'utf-8'))

      const enFilePath = path.join(meetupPath, `${memberId}.en.md`)
      const hasEnFile = fs.existsSync(enFilePath)
      const enBody = hasEnFile ? fs.readFileSync(enFilePath, 'utf-8') : koBody

      const titleKo: string = data.title.ko
      const titleEnRaw = data.title.en
      const titleEn: string =
        typeof titleEnRaw === 'string' && titleEnRaw.trim().length > 0 ? titleEnRaw : titleKo

      const subtitleKo: string = data.subtitle?.ko ?? ''
      const subtitleEnRaw = data.subtitle?.en
      const subtitleEn: string =
        typeof subtitleEnRaw === 'string' && subtitleEnRaw.trim().length > 0
          ? subtitleEnRaw
          : subtitleKo

      const hasTranslation =
        hasEnFile &&
        typeof titleEnRaw === 'string' &&
        titleEnRaw.trim().length > 0 &&
        titleEnRaw !== titleKo

      articles.push({
        slug: data.slug,
        meetupId,
        memberId,
        date: frontmatterDate(data.date),
        publishedAt: frontmatterDateTime(data.publishedAt),
        title: { ko: titleKo, en: titleEn },
        subtitle: { ko: subtitleKo, en: subtitleEn },
        body: { ko: koBody, en: enBody },
        hasTranslation,
      })
    }
  }

  return articles.sort((a, b) => articleSortTime(b) - articleSortTime(a))
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug)
}

export function readingTime(text: string): number {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))
}
