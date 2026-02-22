export function markdownToSlack(text: string): string {
  return text
    // Headers: ### Title → *Title*
    .replace(/^#{1,6}\s+(.+)$/gm, "*$1*")
    // Bold: **text** → *text*
    .replace(/\*\*(.+?)\*\*/g, "*$1*")
    // Inline code: `code` → `code` (already works in Slack)
    // Links: [text](url) → <url|text>
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "<$2|$1>")
    // Bullet lists: - item or * item → • item
    .replace(/^[\s]*[-*]\s+/gm, "• ");
}
