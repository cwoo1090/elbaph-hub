import type { Article } from '@/data/articles'

const FALLBACK_SITE_URL = 'https://elbaph.vercel.app'

export const SUPPORTED_SUBSTACK_LOCALES = ['ko', 'en'] as const

export type SubstackLocale = (typeof SUPPORTED_SUBSTACK_LOCALES)[number]

const DEFAULT_SUBSTACK_TAGS = ['Elbaph Meetup']

const SUBSTACK_TAGS_BY_SLUG: Record<string, string[]> = {
  'meetup-2-chulwoo': ['Building', 'Product', 'Side Projects', 'AI', 'Elbaph Meetup'],
  'meetup-2-jaehwan': ['AI Agents', 'Research', 'Automation', 'Trading', 'Elbaph Meetup'],
  'meetup-2-taekyu': ['Robotics', 'Korea', 'Manufacturing', 'AI', 'Elbaph Meetup'],
  'meetup-3-yechan': [
    'Medical Robotics',
    'Surgical Data',
    'Startups',
    'Healthcare AI',
    'Elbaph Meetup',
  ],
  'meetup-3-taekyu': ['Robotics', 'Humanoids', 'Defense', 'Manufacturing', 'Elbaph Meetup'],
  'meetup-3-chulwoo': [
    'AI Learning',
    'Knowledge Management',
    'LLM Agents',
    'Technical Learning',
    'Elbaph Meetup',
  ],
  'meetup-2-younghun': [
    'AI Hardware',
    'Semiconductors',
    'Infrastructure',
    'Inference',
    'Elbaph Meetup',
  ],
}

export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL

  if (!raw) return FALLBACK_SITE_URL

  const normalized = raw.startsWith('http') ? raw : `https://${raw}`
  return normalized.replace(/\/$/, '')
}

export function isSubstackLocale(value: string | null | undefined): value is SubstackLocale {
  return SUPPORTED_SUBSTACK_LOCALES.includes(value as SubstackLocale)
}

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function absoluteUrl(pathOrUrl: string, baseUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl
  }

  if (pathOrUrl.startsWith('/')) {
    return `${baseUrl}${pathOrUrl}`
  }

  return `${baseUrl}/${pathOrUrl}`
}

function inlineMarkdownToHtml(value: string) {
  return escapeHtml(value)
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g,
      '<a href="$2">$1</a>',
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
}

function inlineMarkdownToText(value: string) {
  return value
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
}

function markdownBlocks(markdown: string) {
  return markdown
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
}

export function markdownToSubstackHtml(markdown: string, baseUrl: string) {
  const blocks = markdownBlocks(markdown)
  const html: string[] = []

  for (let i = 0; i < blocks.length; i += 1) {
    const text = blocks[i]
    const image = text.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)

    if (image) {
      const [, alt, src] = image
      const next = blocks[i + 1]
      const caption = next?.match(/^\*([\s\S]+)\*$/)?.[1] ?? ''

      if (caption) i += 1

      html.push(
        [
          '<figure>',
          `<img src="${escapeHtml(absoluteUrl(src, baseUrl))}" alt="${escapeHtml(alt)}" />`,
          caption ? `<figcaption>${inlineMarkdownToHtml(caption)}</figcaption>` : '',
          '</figure>',
        ].join(''),
      )
      continue
    }

    if (text.startsWith('## ')) {
      html.push(`<h2>${inlineMarkdownToHtml(text.slice(3))}</h2>`)
      continue
    }

    html.push(`<p>${inlineMarkdownToHtml(text).replace(/\n/g, '<br />')}</p>`)
  }

  return html.join('\n')
}

export function markdownToSubstackText(markdown: string) {
  const blocks = markdownBlocks(markdown)
  const text: string[] = []

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i]
    const image = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)

    if (image) {
      const next = blocks[i + 1]
      const caption = next?.match(/^\*([\s\S]+)\*$/)?.[1] ?? ''

      if (caption) {
        text.push(inlineMarkdownToText(caption))
        i += 1
      }

      continue
    }

    if (block.startsWith('## ')) {
      text.push(inlineMarkdownToText(block.slice(3)))
      continue
    }

    text.push(inlineMarkdownToText(block))
  }

  return text.join('\n\n')
}

export function getSubstackArticleContent(
  article: Article,
  locale: SubstackLocale,
  baseUrl = getSiteUrl(),
) {
  const body = article.body[locale]
  const tags = SUBSTACK_TAGS_BY_SLUG[article.slug] ?? DEFAULT_SUBSTACK_TAGS

  return {
    title: article.title[locale],
    subtitle: article.subtitle[locale],
    tags,
    tagsText: tags.join(', '),
    articleUrl: `${baseUrl}/blog/${article.slug}`,
    bodyHtml: markdownToSubstackHtml(body, baseUrl),
    bodyText: markdownToSubstackText(body),
  }
}
