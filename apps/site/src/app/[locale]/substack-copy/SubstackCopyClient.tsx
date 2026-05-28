'use client'

import { useState } from 'react'

type Props = {
  title: string
  subtitle: string
  tags: string[]
  tagsText: string
  bodyHtml: string
  bodyText: string
  articleUrl: string
}

async function copyPlainText(value: string) {
  await navigator.clipboard.writeText(value)
}

async function copyRichHtml(html: string, text: string) {
  if ('ClipboardItem' in window && navigator.clipboard.write) {
    const item = new ClipboardItem({
      'text/html': new Blob([html], { type: 'text/html' }),
      'text/plain': new Blob([text], { type: 'text/plain' }),
    })

    await navigator.clipboard.write([item])
    return
  }

  const container = document.createElement('div')
  container.innerHTML = html
  container.contentEditable = 'true'
  container.style.position = 'fixed'
  container.style.left = '-9999px'
  container.style.top = '0'
  document.body.appendChild(container)

  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(container)
  selection?.removeAllRanges()
  selection?.addRange(range)
  document.execCommand('copy')
  selection?.removeAllRanges()
  document.body.removeChild(container)
}

export default function SubstackCopyClient({
  title,
  subtitle,
  tags,
  tagsText,
  bodyHtml,
  bodyText,
  articleUrl,
}: Props) {
  const [status, setStatus] = useState<string>('')

  async function handleCopyBody() {
    try {
      await copyRichHtml(bodyHtml, bodyText)
      setStatus('Body copied as rich text.')
    } catch {
      setStatus('Copy failed. Select the preview body and copy it manually.')
    }
  }

  async function handleCopyText(label: string, value: string) {
    try {
      await copyPlainText(value)
      setStatus(`${label} copied.`)
    } catch {
      setStatus(`Could not copy ${label.toLowerCase()}.`)
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] px-4 py-8 text-[#1a1a1a] sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="sticky top-0 z-10 -mx-4 mb-8 border-b border-[#e5e5e5] bg-[#faf9f6]/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#737373]">
                Substack copy
              </p>
              {status && <p className="mt-1 text-sm text-[#737373]">{status}</p>}
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={articleUrl}
                className="border border-[#d4d4d4] bg-white px-3 py-2 text-sm font-medium text-[#1a1a1a] transition-colors hover:border-[#1a1a1a]"
                target="_blank"
                rel="noreferrer"
              >
                Open site article
              </a>
              <button
                type="button"
                onClick={handleCopyBody}
                className="bg-[#1a1a1a] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#404040]"
              >
                Copy body
              </button>
            </div>
          </div>
        </div>

        <section className="border border-[#e5e5e5] bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#737373]">
                Title
              </p>
              <h1 className="mt-2 text-2xl font-bold leading-tight">{title}</h1>
            </div>
            <button
              type="button"
              onClick={() => handleCopyText('Title', title)}
              className="shrink-0 border border-[#d4d4d4] px-3 py-2 text-sm font-medium transition-colors hover:border-[#1a1a1a]"
            >
              Copy
            </button>
          </div>
        </section>

        <section className="mt-4 border border-[#e5e5e5] bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#737373]">
                Subtitle
              </p>
              <p className="mt-2 text-lg leading-7 text-[#525252]">{subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => handleCopyText('Subtitle', subtitle)}
              className="shrink-0 border border-[#d4d4d4] px-3 py-2 text-sm font-medium transition-colors hover:border-[#1a1a1a]"
            >
              Copy
            </button>
          </div>
        </section>

        <section className="mt-4 border border-[#e5e5e5] bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#737373]">
                Tags
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#d4d4d4] bg-[#faf9f6] px-2.5 py-1 text-sm text-[#525252]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm text-[#737373]">{tagsText}</p>
            </div>
            <button
              type="button"
              onClick={() => handleCopyText('Tags', tagsText)}
              className="shrink-0 border border-[#d4d4d4] px-3 py-2 text-sm font-medium transition-colors hover:border-[#1a1a1a]"
            >
              Copy
            </button>
          </div>
        </section>

        <section className="mt-8 border border-[#e5e5e5] bg-white p-5 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#737373]">
              Body preview
            </p>
            <button
              type="button"
              onClick={handleCopyBody}
              className="bg-[#1a1a1a] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#404040]"
            >
              Copy body
            </button>
          </div>
          <div
            className="prose max-w-none text-[16px] leading-8 text-[#1a1a1a] [&_figcaption]:mt-3 [&_figcaption]:text-sm [&_figcaption]:italic [&_figcaption]:leading-6 [&_figcaption]:text-[#737373] [&_figure]:my-10 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_img]:w-full [&_p]:my-5"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        </section>
      </div>
    </div>
  )
}
