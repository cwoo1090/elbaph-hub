import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from '@/data/posts'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): Post[] {
  const meetupDirs = fs.readdirSync(POSTS_DIR)
  const posts: Post[] = []

  for (const meetupId of meetupDirs) {
    const meetupPath = path.join(POSTS_DIR, meetupId)
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

      posts.push({
        slug: data.slug,
        meetupId,
        memberId,
        date:
          data.date instanceof Date
            ? data.date.toISOString().split('T')[0]
            : String(data.date),
        title: { ko: titleKo, en: titleEn },
        subtitle: { ko: subtitleKo, en: subtitleEn },
        body: { ko: koBody, en: enBody },
        hasTranslation,
      })
    }
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

export function readingTime(text: string): number {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200))
}
