import type { InjectionKey } from 'vue'

/** 頁面內的 Checklist 狀態，只在當次瀏覽有效。 */
export type ChecklistState = Record<string, boolean>

export const checklistKey: InjectionKey<ChecklistState> = Symbol('journal-checklist')
