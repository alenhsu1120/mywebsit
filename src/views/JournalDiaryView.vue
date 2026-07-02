<template>
  <PortfolioPageShell>
    <PortfolioSubNav back-to="/journal" back-label="‹ Life Journal" />
    <div class="journal-wrap">

    <!-- 標題列 -->
    <div class="page-header">
      <div class="page-title">
        <h2>Life Journal</h2>
        <p>旅途的記憶，刻在羊皮卷上。</p>
      </div>

      <!-- 編輯模式按鈕 -->
      <button v-if="!isOwner" class="edit-btn" @click="showLock = true" title="進入編輯模式">
        🔒 編輯
      </button>
      <button v-else class="edit-btn is-owner" @click="lockOut" title="離開編輯模式">
        🔓 編輯中
      </button>
    </div>

    <!-- 密語 Modal -->
    <div v-if="showLock" class="modal-overlay" @click.self="showLock = false">
      <div class="modal-box">
        <div class="modal-title">輸入密語以編輯</div>
        <div class="phrase-row">
          <input
            v-model="inputPhrase"
            :type="showPhrase ? 'text' : 'password'"
            class="phrase-input"
            placeholder="輸入密語…"
            @keydown.enter="unlock"
            autocomplete="off"
            ref="phraseInputRef"
          />
          <button class="eye-btn" @click="showPhrase = !showPhrase" tabindex="-1">
            {{ showPhrase ? '🙈' : '👁' }}
          </button>
        </div>
        <p v-if="unlockError" class="phrase-error">{{ unlockError }}</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="showLock = false">取消</button>
          <button class="enter-btn" @click="unlock" :disabled="unlocking">
            {{ unlocking ? '驗證中…' : '進入 ›' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 新增按鈕（僅 owner） -->
    <button v-if="isOwner && !showForm" class="new-btn" @click="openForm">
      <span class="star">✦</span> 新增日記 <span class="star">✦</span>
    </button>

    <!-- 寫作表單 -->
    <div v-if="showForm" class="entry-form">
      <div class="form-header">— 寫下今日旅途 —</div>
      <div class="form-row">
        <label class="form-label">日期</label>
        <input v-model="draft.date" type="date" class="form-input date-input" />
      </div>
      <div class="form-row">
        <label class="form-label">標題</label>
        <input v-model="draft.title" type="text" class="form-input"
               placeholder="今天的故事叫做…" maxlength="60" />
      </div>
      <div class="form-row">
        <label class="form-label">內容</label>
        <textarea v-model="draft.content" class="form-textarea"
                  placeholder="今天發生了什麼事…" rows="7" />
      </div>
      <div class="form-actions">
        <button class="btn-cancel" @click="cancelForm">取消</button>
        <button class="btn-save" @click="saveEntry" :disabled="!canSave || saving">
          {{ saving ? '儲存中…' : '封存於卷軸 ›' }}
        </button>
      </div>
    </div>

    <!-- Firestore 錯誤提示 -->
    <div v-if="firestoreError" class="error-banner">{{ firestoreError }}</div>

    <!-- 載入中 -->
    <div v-if="loadingEntries" class="center-screen">
      <span class="spin-rune">✦</span>
      <p class="loading-text">翻閱卷軸中…</p>
    </div>

    <!-- 空白提示 -->
    <div v-else-if="entries.length === 0 && !showForm" class="empty-state">
      <div class="empty-icon">📜</div>
      <p>卷軸尚空，故事尚未開始。</p>
    </div>

    <!-- 日記列表 -->
    <div v-else class="entry-list">
      <div
        v-for="entry in entries"
        :key="entry.id"
        class="entry-card"
        :class="{ 'is-expanded': expandedId === entry.id }"
      >
        <div class="entry-header" @click="toggle(entry.id)">
          <div class="entry-meta">
            <span class="entry-date">{{ fmtDate(entry.date) }}</span>
            <span class="entry-dot">·</span>
            <span class="entry-title">{{ entry.title }}</span>
          </div>
          <span class="expand-arrow">{{ expandedId === entry.id ? '▾' : '▸' }}</span>
        </div>

        <div v-show="expandedId === entry.id" class="entry-body">
          <div class="entry-rule" />
          <pre class="entry-content">{{ entry.content }}</pre>
          <div class="entry-footer">
            <span class="entry-ts">記於 {{ fmtTs(entry.createdAt) }}</span>
            <button v-if="isOwner" class="btn-delete" @click.stop="deleteEntry(entry.id)">
              刪除此篇
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import PortfolioPageShell from '@/components/portfolio/PortfolioPageShell.vue'
import PortfolioSubNav from '@/components/portfolio/PortfolioSubNav.vue'
import {
  collection, addDoc, deleteDoc, doc,
  onSnapshot, query, orderBy,
} from 'firebase/firestore'
import { db } from '@/firebase'

// ── Types ──────────────────────────────────────────
interface JournalEntry {
  id:        string
  date:      string
  title:     string
  content:   string
  createdAt: number
}

const LS_KEY = 'cutehsu-journal-owner'
const COL    = 'journal'   // 公開 collection

// ── Owner 狀態 ─────────────────────────────────────
const isOwner     = ref(false)
const showLock    = ref(false)
const inputPhrase = ref('')
const showPhrase  = ref(false)
const unlockError = ref('')
const unlocking   = ref(false)
const phraseInputRef = ref<HTMLInputElement | null>(null)

// 頁面載入：如果 localStorage 已存密語 hash 就直接解鎖
onMounted(() => {
  if (localStorage.getItem(LS_KEY)) isOwner.value = true
})

// Modal 開啟後自動 focus 輸入框
const _watchLock = computed(() => showLock.value)
// use watch instead
import { watch } from 'vue'
watch(showLock, async (v) => {
  if (v) {
    inputPhrase.value = ''
    unlockError.value = ''
    await nextTick()
    phraseInputRef.value?.focus()
  }
})

async function hashPhrase(phrase: string): Promise<string> {
  const data = new TextEncoder().encode(phrase.trim())
  const buf  = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0')).join('')
}

async function unlock() {
  unlockError.value = ''
  if (inputPhrase.value.trim().length < 1) {
    unlockError.value = '請輸入密語'
    return
  }
  unlocking.value = true

  const hash = await hashPhrase(inputPhrase.value)

  // 第一次設定：直接儲存
  const saved = localStorage.getItem(LS_KEY)
  if (!saved) {
    localStorage.setItem(LS_KEY, hash)
    isOwner.value = true
    showLock.value = false
  } else if (hash === saved) {
    isOwner.value = true
    showLock.value = false
  } else {
    unlockError.value = '密語不正確'
  }
  unlocking.value = false
  inputPhrase.value = ''
}

function lockOut() {
  isOwner.value  = false
  showForm.value = false
}

// ── Firestore（公開讀寫） ───────────────────────────
const entries        = ref<JournalEntry[]>([])
const loadingEntries = ref(true)
const firestoreError = ref('')
let   unsub: (() => void) | null = null

onMounted(() => {
  if (!db) { loadingEntries.value = false; return }
  const q = query(collection(db, COL), orderBy('createdAt', 'desc'))
  unsub = onSnapshot(q, (snap) => {
    firestoreError.value = ''
    entries.value = snap.docs.map(d => ({
      id:        d.id,
      date:      d.data().date      as string,
      title:     d.data().title     as string,
      content:   d.data().content   as string,
      createdAt: d.data().createdAt as number,
    }))
    entries.value.sort((a, b) =>
      b.date !== a.date ? b.date.localeCompare(a.date) : b.createdAt - a.createdAt
    )
    loadingEntries.value = false
  }, (err) => {
    console.error('Firestore error:', err)
    firestoreError.value = err.code === 'permission-denied'
      ? '⚠️ Firestore 規則封鎖讀取，請到 Firebase Console 更新安全規則。'
      : `⚠️ 載入失敗：${err.message}`
    loadingEntries.value = false
  })
})
onUnmounted(() => { if (unsub) unsub() })

// ── 表單 ───────────────────────────────────────────
const showForm   = ref(false)
const saving     = ref(false)
const expandedId = ref<string | null>(null)
const draft      = ref({ date: today(), title: '', content: '' })
const canSave    = computed(() =>
  draft.value.title.trim() !== '' && draft.value.content.trim() !== ''
)

function today() { return new Date().toISOString().slice(0, 10) }
function openForm()   { draft.value = { date: today(), title: '', content: '' }; showForm.value = true }
function cancelForm() { showForm.value = false }

async function saveEntry() {
  if (!canSave.value || !db) return
  saving.value = true
  try {
    const docRef = await addDoc(collection(db, COL), {
      date:      draft.value.date,
      title:     draft.value.title.trim(),
      content:   draft.value.content.trim(),
      createdAt: Date.now(),
    })
    showForm.value   = false
    expandedId.value = docRef.id
  } catch (e) { console.error(e) }
  finally { saving.value = false }
}

async function deleteEntry(id: string) {
  if (!confirm('確定要刪除這篇日記嗎？') || !db) return
  await deleteDoc(doc(db, COL, id))
  if (expandedId.value === id) expandedId.value = null
}

function toggle(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}

function fmtDate(s: string) {
  const [y, m, d] = s.split('-')
  return `${y} 年 ${m} 月 ${d} 日`
}
function fmtTs(ts: number) {
  const d = new Date(ts)
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}/${p(d.getMonth()+1)}/${p(d.getDate())}  ${p(d.getHours())}:${p(d.getMinutes())}`
}
</script>

<style scoped>
.journal-wrap {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 2rem 3rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}

/* ── Header ── */
.page-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; gap: 1rem;
  margin-bottom: 1.8rem; flex-wrap: wrap;
}
.page-title h2 {
  font-family: var(--mg-font-heading);
  font-size: clamp(1.4rem, 4vw, 2rem); color: var(--mg-green-deep);
  text-shadow: 0 1px 0 rgba(255,255,255,.9), 0 2px 10px rgba(255,255,255,.5);
  margin-bottom: .3rem;
}
.page-title p {
  font-family: var(--mg-font-body);
  font-style: italic; font-size: .9rem; color: var(--mg-text-muted);
}
.edit-btn {
  padding: .4rem .9rem;
  background: linear-gradient(135deg, var(--mg-green-main), var(--mg-green-dark));
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  box-shadow: 0 2px 12px rgba(36,49,38,0.08), 0 1px 3px rgba(36,49,38,0.04);
  font-family: var(--mg-font-body); font-size: .7rem;
  letter-spacing: .08em; color: #ffffff;
  cursor: pointer; white-space: nowrap; flex-shrink: 0;
  transition: transform .2s, box-shadow .2s;
}
.edit-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(36,49,38,0.13), 0 2px 6px rgba(36,49,38,0.07); }
.edit-btn.is-owner {
  border-color: var(--mg-border-soft);
  background: linear-gradient(135deg, var(--mg-green-main), var(--mg-green-dark));
  color: #ffffff;
}

/* ── Modal ── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(36,49,38,.45);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
}
.modal-box {
  width: 100%; max-width: 360px;
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  box-shadow: 0 6px 24px rgba(36,49,38,0.13), 0 2px 6px rgba(36,49,38,0.07);
  padding: 1.8rem 1.6rem 1.4rem;
}
.modal-title {
  font-family: var(--mg-font-body); font-size: .85rem;
  letter-spacing: .12em; color: var(--mg-text-body);
  text-align: center; margin-bottom: 1.1rem;
}
.phrase-row { display: flex; gap: .4rem; margin-bottom: .5rem; }
.phrase-input {
  flex: 1;
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  padding: .55rem .75rem;
  font-family: var(--mg-font-body);
  font-size: 1rem; color: var(--mg-green-deep);
  outline: none; letter-spacing: .08em;
  transition: border-color .2s, box-shadow .2s;
}
.phrase-input::placeholder { color: var(--mg-text-label); opacity: .75; }
.phrase-input:focus { border-color: var(--mg-green-main); box-shadow: 0 0 0 2px rgba(95,127,100,.18); }
.eye-btn {
  padding: .5rem .65rem; background: transparent;
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  cursor: pointer; font-size: .9rem;
  transition: border-color .2s;
}
.eye-btn:hover { border-color: var(--mg-green-main); }
.phrase-error {
  font-family: var(--mg-font-body); font-size: .68rem;
  color: #a04040; margin-bottom: .5rem; letter-spacing: .06em;
}
.modal-actions { display: flex; gap: .6rem; justify-content: flex-end; margin-top: .8rem; }
.btn-cancel {
  padding: .45rem 1rem; background: transparent;
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  font-family: var(--mg-font-body); font-size: .72rem;
  letter-spacing: .08em; color: var(--mg-text-muted); cursor: pointer;
  transition: border-color .2s, color .2s;
}
.btn-cancel:hover { border-color: var(--mg-green-dark); color: var(--mg-green-deep); }
.enter-btn {
  padding: .45rem 1.2rem;
  background: linear-gradient(135deg, var(--mg-green-main), var(--mg-green-dark));
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  box-shadow: 0 2px 12px rgba(36,49,38,0.08), 0 1px 3px rgba(36,49,38,0.04);
  font-family: var(--mg-font-body); font-size: .72rem;
  letter-spacing: .1em; color: #ffffff; cursor: pointer;
  transition: transform .2s, box-shadow .2s;
}
.enter-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(36,49,38,0.13), 0 2px 6px rgba(36,49,38,0.07); }
.enter-btn:disabled { opacity: .5; cursor: default; box-shadow: none; }

/* ── Error banner ── */
.error-banner {
  background: rgba(180,60,60,.1);
  border: 1px solid #c07070;
  border-radius: 20px;
  padding: .8rem 1rem;
  font-family: var(--mg-font-body);
  font-size: .82rem;
  color: #7a2020;
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* ── Loading ── */
.center-screen {
  display: flex; flex-direction: column;
  align-items: center; gap: .8rem; padding: 3rem 1rem;
}
.spin-rune {
  display: inline-block; color: var(--mg-green-main); font-size: 1.5rem;
  animation: spin-rune 1.8s linear infinite;
}
@keyframes spin-rune { to { transform: rotate(360deg); } }
.loading-text {
  font-family: var(--mg-font-body);
  font-style: italic; font-size: .95rem; color: var(--mg-text-muted);
}

/* ── New btn ── */
.new-btn {
  display: flex; align-items: center; gap: .6rem;
  margin-bottom: 1.8rem; padding: .7rem 1.5rem;
  background: linear-gradient(135deg, var(--mg-green-main), var(--mg-green-dark));
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  box-shadow: 0 2px 12px rgba(36,49,38,0.08), 0 1px 3px rgba(36,49,38,0.04);
  font-family: var(--mg-font-body); font-size: .82rem;
  letter-spacing: .12em; color: #ffffff; cursor: pointer;
  transition: transform .2s, box-shadow .2s;
}
.new-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(36,49,38,0.13), 0 2px 6px rgba(36,49,38,0.07); }
.star { color: #ffffff; font-size: .65rem; }

/* ── Form ── */
.entry-form {
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  box-shadow: 0 2px 12px rgba(36,49,38,0.08), 0 1px 3px rgba(36,49,38,0.04);
  padding: 1.4rem 1.5rem 1.2rem; margin-bottom: 2rem;
  animation: card-rise .3s cubic-bezier(.16,1,.3,1) both;
}
.form-header {
  text-align: center; font-family: var(--mg-font-body);
  font-style: italic; font-size: .9rem; color: var(--mg-text-muted);
  letter-spacing: .1em; margin-bottom: 1.1rem;
}
.form-row { display: flex; flex-direction: column; gap: .3rem; margin-bottom: .9rem; }
.form-label { font-family: var(--mg-font-body); font-size: .68rem; letter-spacing: .15em; color: var(--mg-text-body); }
.form-input, .form-textarea {
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  padding: .5rem .7rem;
  font-family: var(--mg-font-body);
  font-size: 1rem; color: var(--mg-green-deep);
  outline: none; resize: none;
  transition: border-color .2s, box-shadow .2s;
}
.form-input::placeholder, .form-textarea::placeholder { color: var(--mg-text-label); opacity: .75; }
.form-input:focus, .form-textarea:focus { border-color: var(--mg-green-main); box-shadow: 0 0 0 2px rgba(95,127,100,.18); }
.date-input { max-width: 200px; }
.form-textarea { line-height: 1.75; }
.form-actions { display: flex; justify-content: flex-end; gap: .7rem; margin-top: .9rem; }
.btn-save {
  padding: .45rem 1.3rem;
  background: linear-gradient(135deg, var(--mg-green-main), var(--mg-green-dark));
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  box-shadow: 0 2px 12px rgba(36,49,38,0.08), 0 1px 3px rgba(36,49,38,0.04);
  font-family: var(--mg-font-body); font-size: .72rem;
  letter-spacing: .08em; color: #ffffff; cursor: pointer;
  transition: transform .2s, box-shadow .2s;
}
.btn-save:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(36,49,38,0.13), 0 2px 6px rgba(36,49,38,0.07); }
.btn-save:disabled { opacity: .45; cursor: default; box-shadow: none; }

/* ── Empty ── */
.empty-state { text-align: center; padding: 3rem 1rem; opacity: .6; }
.empty-icon { font-size: 2.5rem; margin-bottom: .7rem; }
.empty-state p { font-family: var(--mg-font-body); font-style: italic; color: var(--mg-text-muted); }

/* ── Entries ── */
.entry-list { display: flex; flex-direction: column; gap: .8rem; }
.entry-card {
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft); border-radius: 20px;
  box-shadow: 0 2px 12px rgba(36,49,38,0.08), 0 1px 3px rgba(36,49,38,0.04);
  overflow: hidden; transition: border-color .2s;
}
.entry-card.is-expanded { border-color: var(--mg-green-main); }
.entry-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: .9rem 1.2rem; cursor: pointer;
  user-select: none; transition: background .15s;
}
.entry-header:hover { background: rgba(95,127,100,.06); }
.entry-meta { display: flex; align-items: center; gap: .5rem; flex-wrap: wrap; min-width: 0; }
.entry-date { font-family: var(--mg-font-body); font-size: .7rem; letter-spacing: .08em; color: var(--mg-green-dark); white-space: nowrap; }
.entry-dot { color: var(--mg-border-soft); }
.entry-title { font-family: var(--mg-font-heading); font-size: 1.05rem; font-weight: 500; color: var(--mg-green-deep); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.expand-arrow { font-size: .72rem; color: var(--mg-green-main); flex-shrink: 0; }
.entry-body { padding: 0 1.2rem 1.1rem; }
.entry-rule { height: 1px; background: linear-gradient(90deg, transparent, var(--mg-border-soft), transparent); margin-bottom: 1rem; }
.entry-content { font-family: var(--mg-font-body); font-size: 1rem; line-height: 1.85; color: var(--mg-text-body); white-space: pre-wrap; word-break: break-word; margin: 0 0 1rem; }
.entry-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: .4rem; }
.entry-ts { font-family: var(--mg-font-body); font-size: .62rem; letter-spacing: .08em; color: var(--mg-text-muted); opacity: .75; }
.btn-delete {
  padding: .25rem .8rem; background: transparent;
  border: 1px solid #c8a8a8; border-radius: 20px;
  font-family: var(--mg-font-body); font-size: .62rem;
  letter-spacing: .06em; color: #8a4848; cursor: pointer;
  transition: background .2s, color .2s, border-color .2s;
}
.btn-delete:hover { background: rgba(180,80,80,.08); border-color: #a05050; color: #6a2828; }

@media (max-width: 480px) {
  .journal-wrap { padding: 3rem 1rem 3rem; }
  .page-header { flex-direction: column; gap: .8rem; }
}
</style>
