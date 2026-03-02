export type Post = {
  slug: string
  title: { ko: string; en: string }
  summary: { ko: string; en: string }
  date: string
  author: string
  body: { ko: string; en: string }
}

export const posts: Post[] = []
