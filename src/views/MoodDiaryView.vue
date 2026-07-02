<template>
  <div class="mood-wrap">

    <RouterLink to="/journal" class="back-link">‹ 返回</RouterLink>

    <div class="mood-header">
      <h2 class="mood-title">心情日記</h2>
      <p class="mood-sub">記錄每一天的心情色彩</p>
    </div>

    <!-- Firebase 連線狀態（常駐） -->
    <div class="db-status" :class="dbReady ? 'db-ok' : 'db-err'">
      {{ dbReady ? '🔥 Firebase 已連線' : '⚠️ Firebase 未連線' }}
      — db={{ dbDebug }}<span v-if="dbInitError">，錯誤：{{ dbInitError }}</span>
    </div>

    <!-- 同步狀態（儲存後顯示，不會自動消失） -->
    <div v-if="syncStatus" class="sync-banner" :class="syncStatus.type">
      {{ syncStatus.msg }}
      <button class="sync-close" @click="syncStatus = null">✕</button>
    </div>

    <!-- ══ 雙人心情板 ══ -->
    <div class="duo-grid">

      <!-- 許寶 -->
      <div class="duo-card xubao">
        <div class="duo-name">
          <span class="duo-avatar">🌸</span>
          <span class="duo-label">許寶</span>
        </div>
        <div class="sliders">
          <SliderRow label="生氣"    :icon="angerIcon(xubao.anger)" v-model="xubao.anger" :track-color="angerColor(xubao.anger)" />
          <SliderRow label="多愛阿仔" :icon="loveIcon(xubao.love)"  v-model="xubao.love"  track-color="#e07090" />
          <SliderRow label="整體心情" :icon="moodIcon(xubao.mood)"  v-model="xubao.mood"  :track-color="moodColor(xubao.mood)" />
        </div>
        <div class="duo-footer">
          <button class="duo-save-btn" @click="saveXubao">儲存 ✦</button>
          <span v-if="xubaoSaved" class="saved-time">最後儲存：{{ xubaoSaved }}</span>
        </div>
      </div>

      <!-- 阿仔 -->
      <div class="duo-card azai">
        <div class="duo-name">
          <span class="duo-avatar">🐾</span>
          <span class="duo-label">阿仔</span>
        </div>
        <div class="sliders">
          <SliderRow label="生氣"    :icon="angerIcon(azai.anger)" v-model="azai.anger" :track-color="angerColor(azai.anger)" />
          <SliderRow label="多愛許寶" :icon="loveIcon(azai.love)"  v-model="azai.love"  track-color="#e07090" />
          <SliderRow label="整體心情" :icon="moodIcon(azai.mood)"  v-model="azai.mood"  :track-color="moodColor(azai.mood)" />
        </div>
        <div class="duo-footer">
          <button class="duo-save-btn" @click="saveAzai">儲存 ✦</button>
          <span v-if="azaiSaved" class="saved-time">最後儲存：{{ azaiSaved }}</span>
        </div>
      </div>

    </div>

    <!-- ══ 分隔線 ══ -->
    <div class="section-divider">
      <span class="div-line" />
      <span class="div-icon">🌿</span>
      <span class="div-text">今日心情</span>
      <span class="div-icon">🌿</span>
      <span class="div-line" />
    </div>

    <!-- Mood selector -->
    <div class="mood-picker">
      <p class="picker-label">今天的心情是？</p>
      <div class="emoji-row">
        <button
          v-for="m in moods"
          :key="m.key"
          class="emoji-btn"
          :class="{ active: selected === m.key }"
          :style="selected === m.key ? { '--accent': m.color, borderColor: m.color } : {}"
          @click="selected = m.key"
          :title="m.label"
        >
          <span class="emoji">{{ m.emoji }}</span>
          <span class="emoji-label">{{ m.label }}</span>
        </button>
      </div>
    </div>

    <!-- Note input -->
    <div class="note-section">
      <textarea
        v-model="note"
        class="note-input"
        placeholder="寫點什麼吧…（可以不寫）"
        rows="3"
        maxlength="200"
      />
      <div class="note-footer">
        <span class="char-count">{{ note.length }} / 200</span>
        <button class="save-btn" :disabled="!selected || saving" @click="saveMood">
          {{ saving ? '儲存中…' : '記錄 ✦' }}
        </button>
      </div>
    </div>

    <!-- Saved entries -->
    <div v-if="entries.length" class="entries-section">
      <div class="section-divider">
        <span class="div-line" />
        <span class="div-icon">❧</span>
        <span class="div-text">過去的心情</span>
        <span class="div-icon">❧</span>
        <span class="div-line" />
      </div>

      <TransitionGroup name="entry" tag="div" class="entry-list">
        <div
          v-for="entry in entries"
          :key="entry.id"
          class="entry-card"
          :style="{ '--entry-color': getMood(entry.mood)?.color }"
        >
          <div class="entry-left">
            <span class="entry-emoji">{{ getMood(entry.mood)?.emoji }}</span>
          </div>
          <div class="entry-body">
            <div class="entry-meta">
              <span class="entry-mood-label">{{ getMood(entry.mood)?.label }}</span>
              <span class="entry-date">{{ formatDate(entry.ts) }}</span>
            </div>
            <p v-if="entry.note" class="entry-note">{{ entry.note }}</p>
          </div>
          <button class="entry-del" @click="deleteEntry(entry.id)" title="刪除">✕</button>
        </div>
      </TransitionGroup>
    </div>

    <div v-else-if="!loading" class="empty-state">
      <span class="empty-icon">🌿</span>
      <p>還沒有心情記錄，先記錄今天的心情吧！</p>
    </div>

    <div v-if="loading" class="empty-state">
      <span class="empty-icon">✨</span>
      <p>載入中…</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineComponent, h } from 'vue'
import { RouterLink } from 'vue-router'
import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getFirestore, doc, setDoc, getDoc,
  collection, addDoc, getDocs, deleteDoc,
  query, orderBy, type Firestore,
} from 'firebase/firestore'

/* 直接在此初始化 Firebase，完全繞過 firebase.ts */
const FB_CONFIG = {
  apiKey:            'AIzaSyAANtAQvggzSNPgwby2Jb3C1oXecc4zoNk',
  authDomain:        'hsuwebsite-635ac.firebaseapp.com',
  projectId:         'hsuwebsite-635ac',
  storageBucket:     'hsuwebsite-635ac.firebasestorage.app',
  messagingSenderId: '1027611122875',
  appId:             '1:1027611122875:web:a34ae692170c4c78061d9e',
}

let db: Firestore | null = null
let initError = ''
try {
  const app = getApps().length === 0 ? initializeApp(FB_CONFIG) : getApp()
  db = getFirestore(app)
} catch (e: any) {
  initError = e?.message ?? String(e)
  console.error('[MoodView] Firebase init error:', e)
}

/* ── SliderRow inline component ── */
const SliderRow = defineComponent({
  props: {
    label:      { type: String,  required: true },
    icon:       { type: String,  required: true },
    modelValue: { type: Number,  required: true },
    trackColor: { type: String,  default: '#4a8a58' },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => {
      const pct = (props.modelValue / 10) * 100
      return h('div', { class: 'slider-row' }, [
        h('div', { class: 'slider-top' }, [
          h('span', { class: 'slider-label' }, props.label),
          h('span', { class: 'slider-icon'  }, props.icon),
          h('span', { class: 'slider-val'   }, String(props.modelValue)),
        ]),
        h('div', { class: 'slider-track-wrap' }, [
          h('input', {
            type: 'range', min: 0, max: 10, step: 1,
            value: props.modelValue,
            style: { '--pct': pct + '%', '--col': props.trackColor },
            class: 'slider-input',
            onInput: (e: Event) => emit('update:modelValue', Number((e.target as HTMLInputElement).value)),
          }),
          h('div', { class: 'slider-dots' },
            Array.from({ length: 11 }, (_, i) =>
              h('span', {
                class: ['dot', i < props.modelValue ? 'dot-on' : ''],
                style: i < props.modelValue ? { background: props.trackColor } : {},
              })
            )
          ),
        ]),
      ])
    }
  },
})

/* ── Types ── */
interface MoodDef  { key: string; emoji: string; label: string; color: string }
interface Entry    { id: string; mood: string; note: string; ts: number }
interface DuoState { anger: number; love: number; mood: number }
interface DuoDoc   { anger: number; love: number; mood: number; ts: number }

/* ── Icon / color helpers ── */
function angerIcon(v: number) {
  if (v <= 2) return '😇'; if (v <= 4) return '😐'; if (v <= 6) return '😠'; if (v <= 8) return '😤'; return '🤬'
}
function angerColor(v: number) {
  if (v <= 3) return '#5da038'; if (v <= 6) return '#e07b20'; return '#c0392b'
}
function loveIcon(v: number) {
  if (v <= 2) return '🤍'; if (v <= 4) return '💛'; if (v <= 6) return '🧡'; if (v <= 8) return '❤️'; return '💖'
}
function moodIcon(v: number) {
  if (v <= 2) return '😢'; if (v <= 4) return '😔'; if (v <= 6) return '😐'; if (v <= 8) return '😊'; return '🥰'
}
function moodColor(v: number) {
  if (v <= 3) return '#4a8ab0'; if (v <= 6) return '#8b7ab0'; return '#5da038'
}

/* ── State ── */
const xubao      = ref<DuoState>({ anger: 0, love: 10, mood: 8 })
const azai       = ref<DuoState>({ anger: 0, love: 10, mood: 8 })
const xubaoSaved = ref('')
const azaiSaved  = ref('')
const syncStatus  = ref<{ type: 'ok' | 'err'; msg: string } | null>(null)
const dbReady     = ref(!!db)
const dbInitError = initError
const dbDebug     = db === null ? 'null' : db === undefined ? 'undefined' : typeof db

function showSync(type: 'ok' | 'err', msg: string) {
  syncStatus.value = { type, msg }
}

const moods: MoodDef[] = [
  { key: 'happy',   emoji: '😊', label: '開心', color: '#f5c842' },
  { key: 'calm',    emoji: '😌', label: '平靜', color: '#5da038' },
  { key: 'excited', emoji: '✨', label: '興奮', color: '#e07b20' },
  { key: 'tired',   emoji: '😴', label: '疲憊', color: '#8b7ab0' },
  { key: 'sad',     emoji: '😔', label: '難過', color: '#4a8ab0' },
  { key: 'upset',   emoji: '😤', label: '煩躁', color: '#c0392b' },
]
const selected = ref('')
const note     = ref('')
const entries  = ref<Entry[]>([])
const loading  = ref(true)
const saving   = ref(false)

/* ── Helpers ── */
function formatDate(ts: number): string {
  const d = new Date(ts)
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}
function getMood(key: string): MoodDef | undefined { return moods.find(m => m.key === key) }

/* ── Firestore paths ── */
const duoCol      = () => db ? doc(db, 'mood', 'duo')        : null
const entriesCol  = () => db ? collection(db, 'moodEntries') : null

/* ── Load ── */
onMounted(async () => {
  if (db) {
    try {
      // duo sliders
      const duoSnap = await getDoc(doc(db, 'mood', 'duo'))
      if (duoSnap.exists()) {
        const d = duoSnap.data() as { xubao?: DuoDoc; azai?: DuoDoc }
        if (d.xubao) { xubao.value = { anger: d.xubao.anger, love: d.xubao.love, mood: d.xubao.mood }; xubaoSaved.value = formatDate(d.xubao.ts) }
        if (d.azai)  { azai.value  = { anger: d.azai.anger,  love: d.azai.love,  mood: d.azai.mood  }; azaiSaved.value  = formatDate(d.azai.ts) }
      }
      // journal entries
      const q = query(collection(db, 'moodEntries'), orderBy('ts', 'desc'))
      const snap = await getDocs(q)
      entries.value = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Entry, 'id'>) }))
    } catch (e) {
      console.error('Firestore load error', e)
    }
  } else {
    // localStorage fallback
    try { entries.value = JSON.parse(localStorage.getItem('mood-entries') ?? '[]') } catch { /* empty */ }
    try {
      const xd: DuoDoc = JSON.parse(localStorage.getItem('duo-xubao') ?? 'null')
      if (xd) { xubao.value = { anger: xd.anger, love: xd.love, mood: xd.mood }; xubaoSaved.value = formatDate(xd.ts) }
      const ad: DuoDoc = JSON.parse(localStorage.getItem('duo-azai') ?? 'null')
      if (ad) { azai.value  = { anger: ad.anger,  love: ad.love,  mood: ad.mood  }; azaiSaved.value  = formatDate(ad.ts) }
    } catch { /* empty */ }
  }
  loading.value = false
})

/* ── Save duo ── */
async function saveDuoField(field: 'xubao' | 'azai', state: DuoState): Promise<number> {
  const ts = Date.now()
  if (db) {
    try {
      await setDoc(doc(db, 'mood', 'duo'), { [field]: { ...state, ts } }, { merge: true })
      showSync('ok', '✓ 已同步至雲端，所有裝置都能看到')
    } catch (e: any) {
      showSync('err', `⚠️ 雲端儲存失敗：${e?.code ?? e?.message ?? e}`)
      localStorage.setItem(`duo-${field}`, JSON.stringify({ ...state, ts }))
    }
  } else {
    localStorage.setItem(`duo-${field}`, JSON.stringify({ ...state, ts }))
    showSync('err', '⚠️ Firebase 未連線，僅儲存於本機')
  }
  return ts
}

async function saveXubao() {
  const ts = await saveDuoField('xubao', xubao.value)
  xubaoSaved.value = formatDate(ts)
}
async function saveAzai() {
  const ts = await saveDuoField('azai', azai.value)
  azaiSaved.value = formatDate(ts)
}

/* ── Save journal ── */
async function saveMood() {
  if (!selected.value || saving.value) return
  saving.value = true
  const payload = { mood: selected.value, note: note.value.trim(), ts: Date.now() }
  try {
    if (db) {
      const docRef = await addDoc(collection(db, 'moodEntries'), payload)
      entries.value.unshift({ id: docRef.id, ...payload })
      showSync('ok', '✓ 已同步至雲端，所有裝置都能看到')
    } else {
      const entry: Entry = { id: String(payload.ts), ...payload }
      entries.value.unshift(entry)
      localStorage.setItem('mood-entries', JSON.stringify(entries.value))
      showSync('err', '⚠️ Firebase 未連線，僅儲存於本機')
    }
    selected.value = ''
    note.value = ''
  } catch (e: any) {
    showSync('err', `⚠️ 雲端儲存失敗：${e?.code ?? e?.message ?? e}`)
    console.error('Save error', e)
  }
  saving.value = false
}

/* ── Delete journal ── */
async function deleteEntry(id: string) {
  entries.value = entries.value.filter(e => e.id !== id)
  if (db) {
    try { await deleteDoc(doc(db, 'moodEntries', id)) } catch (e) { console.error(e) }
  } else {
    localStorage.setItem('mood-entries', JSON.stringify(entries.value))
  }
}
</script>

<style scoped>
.mood-wrap {
  width: 100%;
  max-width: 680px;
  padding: 0 1rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

/* DB status */
.db-status {
  padding: .5rem 1rem;
  border-radius: 14px;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .75rem;
  text-align: center;
}
.db-ok  { background: rgba(60,160,60,.12); border: 1.5px solid #5da038; color: #2a5a10; }
.db-err { background: rgba(180,60,60,.10); border: 1.5px solid #c07070; color: #7a2020; }

/* Sync banner */
.sync-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .5rem;
  padding: .6rem 1rem;
  border-radius: 14px;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .78rem;
  line-height: 1.5;
  animation: fadeIn .3s ease;
}
.sync-banner.ok  { background: rgba(60,160,60,.12); border: 1.5px solid #5da038; color: #2a5a10; }
.sync-banner.err { background: rgba(180,60,60,.10); border: 1.5px solid #c07070; color: #7a2020; }
.sync-close { background: none; border: none; cursor: pointer; font-size: .75rem; opacity: .6; color: inherit; padding: 0 .2rem; }
.sync-close:hover { opacity: 1; }
@keyframes fadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:none; } }

/* Back link */
.back-link {
  display: inline-block;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .75rem;
  letter-spacing: .15em;
  color: #3d5440;
  text-decoration: none;
  padding: .3rem 0;
  margin-bottom: 1.4rem;
  opacity: .75;
  transition: opacity .2s, color .2s;
  text-shadow: 0 1px 3px rgba(255,255,255,.7);
}
.back-link:hover { opacity: 1; color: #1b3a28; }

/* Header */
.mood-header { text-align: center; }
.mood-title {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 1.5rem; font-weight: 400; color: #162a1e;
  letter-spacing: .08em; text-shadow: 0 1px 4px rgba(255,255,255,.8); margin: 0 0 .25rem;
}
.mood-sub {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .78rem; color: #6a8870; letter-spacing: .15em;
}

/* ── Duo grid ── */
.duo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
@media (max-width: 520px) { .duo-grid { grid-template-columns: 1fr; } }

.duo-card {
  background: linear-gradient(145deg, #ffffff 0%, #f6fbf6 100%);
  border: 1.5px solid #b8d8be; border-radius: 14px;
  padding: 1.1rem 1.2rem 1rem;
  box-shadow: 0 2px 12px rgba(27,58,40,0.08), 0 1px 3px rgba(27,58,40,0.04);
  display: flex; flex-direction: column; gap: 1rem;
}
.duo-card.xubao { border-color: #d4789a; box-shadow: 3px 3px 0 #a04060; }
.duo-card.azai  { border-color: #7ab0d4; box-shadow: 3px 3px 0 #3a6080; }

.duo-name { display: flex; align-items: center; gap: .5rem; }
.duo-avatar { font-size: 1.3rem; line-height: 1; }
.duo-label {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 1rem; font-weight: 500; color: #162a1e; letter-spacing: .05em;
}

/* ── Sliders ── */
.sliders { display: flex; flex-direction: column; gap: .85rem; }
.slider-row { display: flex; flex-direction: column; gap: .35rem; }
.slider-top { display: flex; align-items: center; gap: .4rem; }
.slider-label { font-family: 'Noto Sans TC', sans-serif; font-size: .78rem; color: #3d5440; flex: 1; }
.slider-icon { font-size: 1rem; line-height: 1; }
.slider-val { font-family: 'Poppins', sans-serif; font-size: .82rem; font-weight: 600; color: #162a1e; min-width: 1.1rem; text-align: right; }
.slider-track-wrap { display: flex; flex-direction: column; gap: .3rem; }

.slider-input {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 4px; border-radius: 14px;
  background: linear-gradient(to right, var(--col,#4a8a58) 0%, var(--col,#4a8a58) var(--pct,0%), rgba(74,138,88,.18) var(--pct,0%), rgba(74,138,88,.18) 100%);
  outline: none; cursor: pointer;
}
.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%;
  background: var(--col,#4a8a58); border: 2px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0,0,0,.25); cursor: pointer; transition: transform .15s;
}
.slider-input::-webkit-slider-thumb:hover { transform: scale(1.25); }
.slider-input::-moz-range-thumb {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--col,#4a8a58); border: 2px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0,0,0,.25); cursor: pointer;
}

.slider-dots { display: flex; gap: 3px; align-items: center; }
.dot { flex: 1; height: 5px; border-radius: 1px; background: rgba(74,138,88,.15); transition: background .2s; }
.dot-on { background: #4a8a58; }

.duo-footer { display: flex; flex-direction: column; gap: .4rem; align-items: flex-start; }
.duo-save-btn {
  align-self: stretch; padding: .4rem .8rem;
  background: linear-gradient(135deg, #4a8a58, #2d6040);
  border: none; border-radius: 14px; color: #ffffff;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: .78rem; letter-spacing: .06em;
  cursor: pointer; box-shadow: 0 2px 8px rgba(27,58,40,0.15); transition: transform .2s, box-shadow .2s;
}
.duo-card.xubao .duo-save-btn { background: linear-gradient(135deg, #d4789a, #a8446a); box-shadow: 2px 2px 0 #7a2040; }
.duo-card.azai  .duo-save-btn { background: linear-gradient(135deg, #5a9abf, #3a6e90); box-shadow: 2px 2px 0 #204a60; }
.duo-save-btn:hover { transform: translateY(-2px); }
.duo-card.xubao .duo-save-btn:hover { box-shadow: 3px 3px 0 #7a2040; }
.duo-card.azai  .duo-save-btn:hover { box-shadow: 3px 3px 0 #204a60; }
.saved-time { font-family: 'Poppins', sans-serif; font-size: .65rem; color: #6a8870; opacity: .85; }

/* ── Divider ── */
.section-divider { display: flex; align-items: center; gap: .5rem; justify-content: center; }
.div-line { flex: 1; max-width: 50px; height: 1px; background: linear-gradient(90deg, transparent, #b8d8be); }
.div-line:last-child { background: linear-gradient(90deg, #b8d8be, transparent); }
.div-icon { color: #4a8a58; font-size: .8rem; }
.div-text { font-family: 'Poppins','Noto Sans TC',sans-serif; font-size: .62rem; letter-spacing: .25em; color: #6a8870; white-space: nowrap; }

/* ── Picker ── */
.mood-picker {
  background: linear-gradient(145deg, #ffffff 0%, #f6fbf6 100%);
  border: 1.5px solid #b8d8be; border-radius: 14px;
  padding: 1.2rem 1.4rem; box-shadow: 0 2px 12px rgba(27,58,40,0.08), 0 1px 3px rgba(27,58,40,0.04);
}
.picker-label { font-family: 'Poppins','Noto Sans TC',sans-serif; font-size: .78rem; color: #6a8870; letter-spacing: .1em; margin: 0 0 .9rem; }
.emoji-row { display: flex; flex-wrap: wrap; gap: .6rem; }
.emoji-btn {
  display: flex; flex-direction: column; align-items: center; gap: .25rem;
  padding: .5rem .7rem; border: 1.5px solid rgba(74,138,88,.3); border-radius: 14px;
  background: rgba(255,255,255,.6); cursor: pointer;
  transition: transform .2s, border-color .2s, background .2s, box-shadow .2s;
}
.emoji-btn:hover { transform: translateY(-2px); border-color: #4a8a58; background: rgba(238,244,236,.9); }
.emoji-btn.active { background: rgba(216,237,220,.9); box-shadow: 0 0 0 2px var(--accent,#4a8a58); transform: translateY(-2px); }
.emoji { font-size: 1.6rem; line-height: 1; }
.emoji-label { font-family: 'Noto Sans TC', sans-serif; font-size: .65rem; color: #6a8870; }

/* ── Note ── */
.note-section {
  background: linear-gradient(145deg, #ffffff 0%, #f6fbf6 100%);
  border: 1.5px solid #b8d8be; border-radius: 14px;
  padding: 1rem 1.2rem; box-shadow: 0 2px 12px rgba(27,58,40,0.08), 0 1px 3px rgba(27,58,40,0.04);
  display: flex; flex-direction: column; gap: .7rem;
}
.note-input {
  width: 100%; resize: none; border: 1px solid rgba(74,138,88,.3); border-radius: 14px;
  padding: .65rem .8rem; font-family: 'Noto Sans TC',sans-serif; font-size: .88rem; color: #162a1e;
  background: rgba(255,255,255,.6); outline: none; transition: border-color .2s; box-sizing: border-box;
}
.note-input:focus { border-color: #4a8a58; background: rgba(255,255,255,.85); box-shadow: 0 0 0 3px rgba(74,138,88,.2); }
.note-input::placeholder { color: #8aaa8a; }
.note-footer { display: flex; justify-content: space-between; align-items: center; }
.char-count { font-size: .72rem; color: #8aaa8a; font-family: 'Poppins',sans-serif; }
.save-btn {
  padding: .45rem 1.2rem;
  background: linear-gradient(135deg, #4a8a58, #2d6040);
  border: none; border-radius: 14px; color: #ffffff;
  font-family: 'Poppins','Noto Sans TC',sans-serif; font-size: .8rem; letter-spacing: .08em;
  cursor: pointer; box-shadow: 0 2px 8px rgba(27,58,40,0.15); transition: transform .2s, box-shadow .2s, opacity .2s;
}
.save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(27,58,40,0.2); }
.save-btn:disabled { opacity: .45; cursor: not-allowed; }

/* ── Entries ── */
.entry-list { display: flex; flex-direction: column; gap: .75rem; }
.entry-card {
  display: flex; align-items: flex-start; gap: .9rem;
  padding: .85rem 1rem;
  background: linear-gradient(145deg, #ffffff 0%, #f6fbf6 100%);
  border: 1.5px solid rgba(74,138,88,.3); border-left: 3px solid var(--entry-color,#4a8a58);
  border-radius: 14px; box-shadow: 0 2px 12px rgba(27,58,40,0.08), 0 1px 3px rgba(27,58,40,0.04);
  transition: transform .2s, box-shadow .2s;
}
.entry-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(27,58,40,0.12), 0 2px 6px rgba(27,58,40,0.06); }
.entry-emoji { font-size: 1.5rem; line-height: 1; flex-shrink: 0; margin-top: .1rem; }
.entry-body { flex: 1; display: flex; flex-direction: column; gap: .3rem; }
.entry-meta { display: flex; align-items: center; gap: .7rem; flex-wrap: wrap; }
.entry-mood-label { font-family: 'Noto Sans TC',sans-serif; font-size: .82rem; font-weight: 500; color: #162a1e; }
.entry-date { font-family: 'Poppins',sans-serif; font-size: .7rem; color: #6a8870; }
.entry-note { font-family: 'Noto Sans TC',sans-serif; font-size: .84rem; color: #3d5440; line-height: 1.55; margin: 0; }
.entry-del {
  flex-shrink: 0; background: none; border: none; color: #8aaa8a; font-size: .7rem;
  cursor: pointer; padding: .2rem .3rem; border-radius: 14px; opacity: .5; transition: opacity .2s, color .2s;
}
.entry-del:hover { opacity: 1; color: #c0392b; }

/* ── Empty / Loading ── */
.empty-state { text-align: center; padding: 2rem 1rem; opacity: .65; }
.empty-icon { font-size: 2rem; display: block; margin-bottom: .6rem; }
.empty-state p { font-family: 'Noto Sans TC',sans-serif; font-size: .84rem; color: #6a8870; }

/* ── Transition ── */
.entry-enter-active { transition: all .3s ease; }
.entry-leave-active { transition: all .25s ease; }
.entry-enter-from { opacity: 0; transform: translateY(-8px); }
.entry-leave-to   { opacity: 0; transform: translateX(8px); }
</style>
