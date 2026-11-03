/**
 * 關係成長日記的資料模型。
 * 文字中可使用 **粗體** 標記，由 RichText 元件渲染。
 */

export type Block =
  | { t: 'p'; text: string }
  /** 內心獨白、原話引用 */
  | { t: 'quote'; text: string }
  /** 建議的說法；tone 用來區分「不要說」與「可以改成」 */
  | { t: 'say'; text: string; tone?: 'avoid' | 'try' }
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  /** 小標題（章節內的第三層） */
  | { t: 'h'; text: string }
  /** 提醒、說明框；speculative 代表推測內容 */
  | { t: 'note'; text: string; label?: string; tone?: 'info' | 'speculative' }
  /** 獨立呈現的重要句子 */
  | { t: 'pull'; text: string }
  /** 私人檔案式的資訊欄位 */
  | { t: 'info'; rows: { k: string; v: string; tags?: string[] }[] }
  | { t: 'tags'; items: string[] }
  /** 可勾選清單，id 需在整篇文章中唯一 */
  | { t: 'check'; id: string; items: string[] }

export type GroupTone =
  | 'speculative'
  | 'warm'
  | 'unknown'
  | 'yellow'
  | 'orange'
  | 'sage'
  | 'forest'

export interface Group {
  title: string
  /** 小型標籤，例如「AI 推測，尚待仔仔本人確認」或「第一階段」 */
  badge?: string
  tone?: GroupTone
  /** 出現在此區塊之前的分組標題，例如「許寶的危機處理 SOP」 */
  heading?: string
  blocks: Block[]
}

export type SectionLayout =
  | 'prose'
  | 'timeline'
  | 'panels'
  | 'soft'
  | 'cards'
  | 'warm'
  | 'actions'
  | 'sop'
  | 'letter'
  | 'tags'

export interface Section {
  id: string
  /** 章節完整標題 */
  title: string
  /** 目錄中的短標題 */
  nav: string
  layout: SectionLayout
  intro?: Block[]
  groups?: Group[]
  outro?: Block[]
  /** letter 版型使用的信件標題 */
  letterTitle?: string
}

export interface RelationshipEntry {
  slug: string
  eyebrow: string
  title: string
  subtitle: string
  lede: string
  /** ISO 日期 YYYY-MM-DD */
  date: string
  categories: string[]
  summary: string
  closing: string
  sections: Section[]
}
