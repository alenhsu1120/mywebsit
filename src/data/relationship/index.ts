import type { Block, Collection, RelationshipEntry } from './types'
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

/** 故事類型的顯示名稱，順序即分類列的順序 */
export const collections: { id: Collection; en: string; zh: string }[] = [
  { id: 'sweet', en: 'SWEET MOMENTS', zh: '甜蜜日常' },
  { id: 'cute', en: 'CUTE MOMENTS', zh: '可愛瞬間' },
  { id: 'travel', en: 'TRAVEL', zh: '旅行回憶' },
  { id: 'communication', en: 'COMMUNICATION', zh: '溝通與成長' },
  { id: 'milestone', en: 'MILESTONES', zh: '重要紀念日' },
]

/** 只回傳日記中實際用到的故事類型 */
export const collectionsInUse = collections.filter(c => entries.some(e => e.collection === c.id))

export function collectionOf(entry: RelationshipEntry) {
  return collections.find(c => c.id === entry.collection)!
}

/** 精選故事：第一篇 featured，沒有的話就不顯示精選區 */
export const featuredEntry: RelationshipEntry | undefined = entries.find(e => e.featured)

/** 封面圖片網址（真實照片優先，其次為原創插畫） */
export function coverSrc(entry: RelationshipEntry): string {
  const base = import.meta.env.BASE_URL
  if (entry.cover.image) return base + entry.cover.image
  return `${base}images/journal/${entry.cover.art ?? 'puppies'}.svg`
}

/** 同類型的其他日記 */
export function relatedEntries(entry: RelationshipEntry, limit = 2): RelationshipEntry[] {
  return entries.filter(e => e.slug !== entry.slug && e.collection === entry.collection).slice(0, limit)
}

/** 依列表順序的上一篇／下一篇 */
export function adjacentEntries(entry: RelationshipEntry) {
  const i = entries.findIndex(e => e.slug === entry.slug)
  return { prev: i > 0 ? entries[i - 1] : undefined, next: i >= 0 ? entries[i + 1] : undefined }
}

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
