import type { Block, RelationshipEntry } from './types'
import boundary from './entries/2026-11-04-boundary'
import emotionSop from './entries/emotion-first-aid-sop'
import together from './entries/2026-11-04-together'
import travelCare from './entries/2026-11-04-travel-care'
import tokyoTime from './entries/2026-11-04-tokyo-time'
import cuteGuide from './entries/zaizai-cute-guide'

/**
 * 新日記：在 entries/ 新增檔案後加到這裡（新的放前面）。
 * 設定 pinned: true 的日記會永遠排在最前面（置頂日記之間依此陣列順序）。
 */
const all: RelationshipEntry[] = [cuteGuide, emotionSop, boundary, travelCare, tokyoTime, together]

export const entries: RelationshipEntry[] = [
  ...all.filter(e => e.pinned),
  ...all.filter(e => !e.pinned),
]

export function findEntry(slug: string): RelationshipEntry | undefined {
  return entries.find(e => e.slug === slug)
}

function blockText(b: Block): string {
  switch (b.t) {
    case 'ul':
    case 'ol':
    case 'check':
    case 'tags':
      return b.items.join('')
    case 'info':
      return b.rows.map(r => r.k + r.v + (r.tags ?? []).join('')).join('')
    default:
      return b.text
  }
}

/** 以每分鐘約 400 個中文字估算閱讀時間。 */
export function readingMinutes(entry: RelationshipEntry): number {
  let chars = entry.title.length + entry.subtitle.length + entry.summary.length
  for (const s of entry.sections) {
    const blocks = [...(s.intro ?? []), ...(s.groups ?? []).flatMap(g => g.blocks), ...(s.outro ?? [])]
    chars += s.title.length + (s.groups ?? []).reduce((n, g) => n + g.title.length, 0)
    chars += blocks.reduce((n, b) => n + blockText(b).length, 0)
  }
  return Math.max(1, Math.round(chars / 400))
}

/** 2026-11-03 → 2026.11.03 */
export function formatDate(iso: string): string {
  return iso.replace(/-/g, '.')
}
