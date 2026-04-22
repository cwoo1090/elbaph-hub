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
      const enBody = fs.existsSync(enFilePath)
        ? fs.readFileSync(enFilePath, 'utf-8')
        : koBody

      posts.push({
        slug: data.slug,
        meetupId,
        memberId,
        date: data.date instanceof Date ? data.date.toISOString().split('T')[0] : String(data.date),
        title: {
          ko: data.title.ko,
          en: data.title.en ?? data.title.ko,
        },
        subtitle: {
          ko: data.subtitle?.ko ?? '',
          en: data.subtitle?.en ?? data.subtitle?.ko ?? '',
        },
        body: {
          ko: koBody,
          en: enBody,
        },
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
