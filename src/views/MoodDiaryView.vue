<template>
  <PortfolioPageShell>
    <PortfolioSubNav back-to="/journal" back-label="‹ Life Journal" />
    <div class="mood-page">
      <div class="mood-wrap">

        <!-- Hero -->
        <section class="hero">
          <h2 class="hero-title">心情日記</h2>
          <p class="hero-sub">記錄每一天的心情色彩</p>
          <div class="hero-thumbs">
            <img
              class="thumb"
              src="https://images.unsplash.com/photo-1612232134966-a9b076b9fbe7?q=80&w=200&auto=format&fit=crop"
              alt="畫上不同表情的蛋，象徵各種心情"
              loading="lazy"
            />
            <img
              class="thumb"
              src="https://images.unsplash.com/photo-1551323879-b2f626997e22?q=80&w=200&auto=format&fit=crop"
              alt="溫暖的木質桌面，安靜書寫的角落"
              loading="lazy"
            />
            <img
              class="thumb"
              src="https://images.unsplash.com/photo-1559190394-df5a28aab5c5?q=80&w=200&auto=format&fit=crop"
              alt="一隻黃金獵犬坐在車裡"
              loading="lazy"
            />
          </div>
        </section>

        <!-- 連線狀態 -->
        <div class="status-row">
          <span class="status-pill" :class="dbReady ? 'ok' : 'err'">
            {{ dbReady ? '● Firebase 已連線' : '● Firebase 未連線' }}
          </span>
          <span v-if="dbInitError" class="status-note">{{ dbInitError }}</span>
        </div>
        <div v-if="syncStatus" class="sync-banner" :class="syncStatus.type">
          {{ syncStatus.msg }}
          <button class="sync-close" @click="syncStatus = null">✕</button>
        </div>

        <!-- Mood Input -->
        <section class="section">
          <p class="section-label">今日心情</p>
          <div class="duo-grid">

            <!-- 許寶 -->
            <div class="mood-card">
              <div class="mood-card-head">
                <span class="mood-avatar">🌸</span>
                <span class="mood-name">許寶</span>
              </div>
              <div class="sliders">
                <SliderRow label="生氣"    :icon="angerIcon(xubao.anger)" v-model="xubao.anger" track-color="#4F7A52" />
                <SliderRow label="多愛阿仔" :icon="loveIcon(xubao.love)"  v-model="xubao.love"  track-color="#4F7A52" />
                <SliderRow label="整體心情" :icon="moodIcon(xubao.mood)"  v-model="xubao.mood"  track-color="#4F7A52" />
              </div>
              <div class="mood-card-foot">
                <button class="btn-primary" @click="saveXubao">儲存</button>
                <span v-if="xubaoSaved" class="saved-note">最後儲存：{{ xubaoSaved }}</span>
              </div>
            </div>

            <!-- 阿仔 -->
            <div class="mood-card">
              <div class="mood-card-head">
                <span class="mood-avatar">🐾</span>
                <span class="mood-name">阿仔</span>
              </div>
              <div class="sliders">
                <SliderRow label="生氣"    :icon="angerIcon(azai.anger)" v-model="azai.anger" track-color="#4F7A52" />
                <SliderRow label="多愛許寶" :icon="loveIcon(azai.love)"  v-model="azai.love"  track-color="#4F7A52" />
                <SliderRow label="整體心情" :icon="moodIcon(azai.mood)"  v-model="azai.mood"  track-color="#4F7A52" />
              </div>
              <div class="mood-card-foot">
                <button class="btn-primary" @click="saveAzai">儲存</button>
                <span v-if="azaiSaved" class="saved-note">最後儲存：{{ azaiSaved }}</span>
              </div>
            </div>

          </div>
        </section>

        <!-- Journal entry -->
        <section class="section">
          <p class="section-label">寫下今天</p>
          <div class="journal-card">
            <div class="emoji-row">
              <button
                v-for="m in moods"
                :key="m.key"
                class="emoji-btn"
                :class="{ active: selected === m.key }"
                @click="selected = m.key"
                :title="m.label"
              >
                <span class="emoji">{{ m.emoji }}</span>
                <span class="emoji-label">{{ m.label }}</span>
              </button>
            </div>
            <textarea
              v-model="note"
              class="note-input"
              placeholder="寫點什麼吧…（可以不寫）"
              rows="3"
              maxlength="200"
            />
            <div class="journal-foot">
              <span class="char-count">{{ note.length }} / 200</span>
              <button class="btn-primary" :disabled="!selected || saving" @click="saveMood">
                {{ saving ? '儲存中…' : '記錄' }}
              </button>
            </div>
          </div>
        </section>

        <!-- Mood trend（次要） -->
        <section class="section section-secondary">
          <p class="section-label">心情趨勢</p>
          <div class="trend-grid">
            <div class="trend-card">
              <p class="trend-name">許寶 · 生氣</p>
              <MoodLineChart :points="xubaoAngerPoints" color="#4F7A52" />
            </div>
            <div class="trend-card">
              <p class="trend-name">阿仔 · 生氣</p>
              <MoodLineChart :points="azaiAngerPoints" color="#4F7A52" />
            </div>
          </div>
        </section>

        <!-- History -->
        <section v-if="entries.length" class="section">
          <p class="section-label">過去的心情</p>
          <div class="history-card">
            <TransitionGroup name="row" tag="div">
              <div
                v-for="entry in visibleEntries"
                :key="entry.id"
                class="history-row"
                :title="formatDate(entry.ts)"
              >
                <span class="h-emoji">{{ getMood(entry.mood)?.emoji }}</span>
                <span class="h-date">{{ formatDateShort(entry.ts) }}</span>
                <span class="h-note">{{ entry.note || getMood(entry.mood)?.label }}</span>
                <button class="h-del" @click="deleteEntry(entry.id)" title="刪除">✕</button>
              </div>
            </TransitionGroup>
          </div>
          <button v-if="entries.length > visibleEntries.length" class="btn-text" @click="showAllEntries = true">
            顯示更多（還有 {{ entries.length - visibleEntries.length }} 筆）
          </button>
          <button v-else-if="showAllEntries && entries.length > HISTORY_PAGE" class="btn-text" @click="showAllEntries = false">
            收合
          </button>
        </section>

        <div v-else-if="!loading" class="empty-state">
          <p>還沒有心情記錄，先記錄今天的心情吧！</p>
        </div>
        <div v-if="loading" class="empty-state">
          <p>載入中…</p>
        </div>

      </div>
    </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineComponent, h } from 'vue'
import { initializeApp, getApps, getApp } from 'firebase/app'
import PortfolioPageShell from '@/components/portfolio/PortfolioPageShell.vue'
import PortfolioSubNav from '@/components/portfolio/PortfolioSubNav.vue'
import MoodLineChart from '@/components/MoodLineChart.vue'
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
    trackColor: { type: String,  default: '#4F7A52' },
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
interface MoodDef    { key: string; emoji: string; label: string; color: string }
interface Entry      { id: string; mood: string; note: string; ts: number }
interface DuoState   { anger: number; love: number; mood: number }
interface DuoDoc     { anger: number; love: number; mood: number; ts: number }
interface AngerPoint { id: string; who: 'xubao' | 'azai'; anger: number; ts: number }

/* ── Icon helpers ── */
function angerIcon(v: number) {
  if (v <= 2) return '😇'; if (v <= 4) return '😐'; if (v <= 6) return '😠'; if (v <= 8) return '😤'; return '🤬'
}
function loveIcon(v: number) {
  if (v <= 2) return '🤍'; if (v <= 4) return '💛'; if (v <= 6) return '🧡'; if (v <= 8) return '❤️'; return '💖'
}
function moodIcon(v: number) {
  if (v <= 2) return '😢'; if (v <= 4) return '😔'; if (v <= 6) return '😐'; if (v <= 8) return '😊'; return '🥰'
}

/* ── State ── */
const xubao      = ref<DuoState>({ anger: 0, love: 10, mood: 8 })
const azai       = ref<DuoState>({ anger: 0, love: 10, mood: 8 })
const xubaoSaved = ref('')
const azaiSaved  = ref('')
const xubaoHistory = ref<AngerPoint[]>([])
const azaiHistory  = ref<AngerPoint[]>([])
const xubaoAngerPoints = computed(() => xubaoHistory.value.map(p => ({ ts: p.ts, value: p.anger })))
const azaiAngerPoints  = computed(() => azaiHistory.value.map(p => ({ ts: p.ts, value: p.anger })))
const syncStatus  = ref<{ type: 'ok' | 'err'; msg: string } | null>(null)
const dbReady     = ref(!!db)
const dbInitError = initError

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

const HISTORY_PAGE = 6
const showAllEntries = ref(false)
const visibleEntries = computed(() => showAllEntries.value ? entries.value : entries.value.slice(0, HISTORY_PAGE))

/* ── Helpers ── */
function formatDate(ts: number): string {
  const d = new Date(ts)
  return `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}
function formatDateShort(ts: number): string {
  const d = new Date(ts)
  return `${d.getMonth()+1}/${d.getDate()}`
}
function getMood(key: string): MoodDef | undefined { return moods.find(m => m.key === key) }

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
      // anger history (for the trend charts)
      const histSnap = await getDocs(query(collection(db, 'angerHistory'), orderBy('ts')))
      const hist = histSnap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<AngerPoint, 'id'>) }))
      xubaoHistory.value = hist.filter(p => p.who === 'xubao')
      azaiHistory.value  = hist.filter(p => p.who === 'azai')
      // backfill: the only "previous" anger value we still have is whatever
      // was last saved to mood/duo, since older saves overwrote each other
      if (duoSnap.exists()) {
        const d = duoSnap.data() as { xubao?: DuoDoc; azai?: DuoDoc }
        if (xubaoHistory.value.length === 0 && d.xubao) await recordAngerPoint('xubao', d.xubao.anger, d.xubao.ts)
        if (azaiHistory.value.length === 0 && d.azai)  await recordAngerPoint('azai',  d.azai.anger,  d.azai.ts)
      }
    } catch (e) {
      console.error('Firestore load error', e)
    }
  } else {
    // localStorage fallback
    try { entries.value = JSON.parse(localStorage.getItem('mood-entries') ?? '[]') } catch { /* empty */ }
    let xd: DuoDoc | null = null
    let ad: DuoDoc | null = null
    try {
      xd = JSON.parse(localStorage.getItem('duo-xubao') ?? 'null')
      if (xd) { xubao.value = { anger: xd.anger, love: xd.love, mood: xd.mood }; xubaoSaved.value = formatDate(xd.ts) }
      ad = JSON.parse(localStorage.getItem('duo-azai') ?? 'null')
      if (ad) { azai.value  = { anger: ad.anger,  love: ad.love,  mood: ad.mood  }; azaiSaved.value  = formatDate(ad.ts) }
    } catch { /* empty */ }
    try {
      const hist: AngerPoint[] = JSON.parse(localStorage.getItem('anger-history') ?? '[]')
      xubaoHistory.value = hist.filter(p => p.who === 'xubao')
      azaiHistory.value  = hist.filter(p => p.who === 'azai')
    } catch { /* empty */ }
    // backfill from the last locally-saved value, same reasoning as above
    if (xubaoHistory.value.length === 0 && xd) await recordAngerPoint('xubao', xd.anger, xd.ts)
    if (azaiHistory.value.length === 0 && ad)  await recordAngerPoint('azai',  ad.anger,  ad.ts)
  }
  loading.value = false
})

/* ── Anger history ── */
async function recordAngerPoint(who: 'xubao' | 'azai', anger: number, ts: number) {
  const target = who === 'xubao' ? xubaoHistory : azaiHistory
  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'angerHistory'), { who, anger, ts })
      target.value.push({ id: docRef.id, who, anger, ts })
    } catch (e) {
      console.error('anger history save error', e)
    }
  } else {
    target.value.push({ id: `${who}-${ts}`, who, anger, ts })
    localStorage.setItem('anger-history', JSON.stringify([...xubaoHistory.value, ...azaiHistory.value]))
  }
}

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
  await recordAngerPoint(field, state.anger, ts)
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
.mood-page {
  --j-bg:          #F5F8F4;
  --j-card:        #FFFFFF;
  --j-border:      #E6EAE4;
  --j-text:        #262B26;
  --j-text-muted:  #8B948A;
  --j-accent:      #4F7A52;
  --j-accent-dark: #436B46;
  --j-accent-soft: rgba(79,122,82,.10);
  --j-radius:      16px;
  --j-shadow:      0 1px 2px rgba(20,30,20,.04), 0 6px 16px rgba(20,30,20,.05);
  background: var(--j-bg);
  min-height: 60vh;
}

.mood-wrap {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 48px 24px 64px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ── Hero ── */
.hero { text-align: center; padding: 32px 0 8px; }
.hero-title {
  font-family: var(--mg-font-heading);
  font-size: 2rem; font-weight: 500; color: var(--j-text);
  letter-spacing: .02em; margin: 0 0 8px;
}
.hero-sub {
  font-family: var(--mg-font-body);
  font-size: .82rem; color: var(--j-text-muted); letter-spacing: .1em;
  margin: 0 0 24px;
}
.hero-thumbs { display: flex; justify-content: center; gap: 8px; }
.thumb {
  width: 48px; height: 48px; object-fit: cover;
  border-radius: 12px; border: 1px solid var(--j-border);
  opacity: .92;
  transition: transform .2s, opacity .2s;
}
.thumb:hover { transform: translateY(-2px); opacity: 1; }

/* ── Status ── */
.status-row { display: flex; justify-content: center; align-items: center; gap: 8px; flex-wrap: wrap; }
.status-pill {
  font-family: var(--mg-font-body); font-size: .7rem;
  padding: 4px 10px; border-radius: 999px;
}
.status-pill.ok  { color: #3d6b40; background: rgba(79,122,82,.10); }
.status-pill.err { color: #a23b3b; background: rgba(190,70,70,.08); }
.status-note { font-family: var(--mg-font-body); font-size: .68rem; color: var(--j-text-muted); }

.sync-banner {
  display: flex; justify-content: space-between; align-items: center; gap: 8px;
  padding: 8px 16px; border-radius: 12px;
  font-family: var(--mg-font-body); font-size: .78rem; line-height: 1.5;
  animation: fadeIn .3s ease;
}
.sync-banner.ok  { background: rgba(79,122,82,.10); color: #3d6b40; }
.sync-banner.err { background: rgba(190,70,70,.08); color: #a23b3b; }
.sync-close { background: none; border: none; cursor: pointer; font-size: .75rem; opacity: .6; color: inherit; padding: 0 .2rem; }
.sync-close:hover { opacity: 1; }
@keyframes fadeIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:none; } }

/* ── Section ── */
.section { display: flex; flex-direction: column; gap: 16px; }
.section-secondary { opacity: .96; }
.section-label {
  font-family: var(--mg-font-body); font-size: .7rem; font-weight: 600;
  letter-spacing: .18em; text-transform: uppercase; color: var(--j-text-muted);
  margin: 0;
}

/* ── Mood cards ── */
.duo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 640px) { .duo-grid { grid-template-columns: 1fr; } }

.mood-card {
  background: var(--j-card);
  border: 1px solid var(--j-border);
  border-radius: var(--j-radius);
  box-shadow: var(--j-shadow);
  padding: 24px;
  display: flex; flex-direction: column; gap: 16px;
  transition: transform .2s, box-shadow .2s;
}
.mood-card:hover { transform: translateY(-2px); box-shadow: 0 2px 4px rgba(20,30,20,.05), 0 10px 22px rgba(20,30,20,.07); }
.mood-card-head { display: flex; align-items: center; gap: 8px; }
.mood-avatar { font-size: 1.2rem; line-height: 1; }
.mood-name { font-family: var(--mg-font-heading); font-size: 1.05rem; font-weight: 600; color: var(--j-text); }

/* ── Sliders ── */
.sliders { display: flex; flex-direction: column; gap: 16px; }
.slider-row { display: flex; flex-direction: column; gap: 6px; }
.slider-top { display: flex; align-items: center; gap: 8px; }
.slider-label { font-family: var(--mg-font-body); font-size: .78rem; color: var(--j-text); flex: 1; }
.slider-icon { font-size: 1rem; line-height: 1; }
.slider-val { font-family: var(--mg-font-body); font-size: .82rem; font-weight: 600; color: var(--j-text); min-width: 1.1rem; text-align: right; }
.slider-track-wrap { display: flex; flex-direction: column; gap: 6px; }

.slider-input {
  -webkit-appearance: none; appearance: none;
  width: 100%; height: 4px; border-radius: 20px;
  background: linear-gradient(to right, var(--col, var(--j-accent)) 0%, var(--col, var(--j-accent)) var(--pct,0%), var(--j-border) var(--pct,0%), var(--j-border) 100%);
  outline: none; cursor: pointer;
}
.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%;
  background: var(--col, var(--j-accent)); border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.25); cursor: pointer; transition: transform .15s;
}
.slider-input::-webkit-slider-thumb:hover { transform: scale(1.25); }
.slider-input::-moz-range-thumb {
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--col, var(--j-accent)); border: 2px solid #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,.25); cursor: pointer;
}

.slider-dots { display: flex; gap: 3px; align-items: center; }
.dot { flex: 1; height: 4px; border-radius: 1px; background: var(--j-border); transition: background .2s; }
.dot-on { background: var(--j-accent); }

.mood-card-foot {
  display: flex; flex-direction: column; gap: 8px; align-items: flex-start;
  padding-top: 8px; border-top: 1px solid var(--j-border);
}
.saved-note { font-family: var(--mg-font-body); font-size: .68rem; color: var(--j-text-muted); }

.btn-primary {
  padding: 8px 20px;
  background: var(--j-accent);
  border: none; border-radius: 999px; color: #fff;
  font-family: var(--mg-font-body); font-size: .8rem; letter-spacing: .04em;
  cursor: pointer; transition: background .2s, transform .2s;
}
.btn-primary:hover:not(:disabled) { background: var(--j-accent-dark); transform: translateY(-1px); }
.btn-primary:disabled { opacity: .4; cursor: not-allowed; }

/* ── Journal card ── */
.journal-card {
  background: var(--j-card);
  border: 1px solid var(--j-border);
  border-radius: var(--j-radius);
  box-shadow: var(--j-shadow);
  padding: 24px;
  display: flex; flex-direction: column; gap: 16px;
}
.emoji-row { display: flex; flex-wrap: wrap; gap: 8px; }
.emoji-btn {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 8px 14px; border: 1px solid var(--j-border); border-radius: 12px;
  background: #fff; cursor: pointer;
  transition: border-color .2s, background .2s, transform .2s;
}
.emoji-btn:hover { transform: translateY(-1px); border-color: var(--j-accent); }
.emoji-btn.active { border-color: var(--j-accent); background: var(--j-accent-soft); }
.emoji { font-size: 1.4rem; line-height: 1; }
.emoji-label { font-family: var(--mg-font-body); font-size: .62rem; color: var(--j-text-muted); }

.note-input {
  width: 100%; resize: none; border: 1px solid var(--j-border); border-radius: 12px;
  padding: 12px 16px; font-family: var(--mg-font-body); font-size: .9rem; color: var(--j-text);
  background: #fff; outline: none; transition: border-color .2s, box-shadow .2s; box-sizing: border-box;
}
.note-input:focus { border-color: var(--j-accent); box-shadow: 0 0 0 3px var(--j-accent-soft); }
.note-input::placeholder { color: var(--j-text-muted); }
.journal-foot { display: flex; justify-content: space-between; align-items: center; }
.char-count { font-family: var(--mg-font-body); font-size: .7rem; color: var(--j-text-muted); }

/* ── Trend ── */
.trend-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 640px) { .trend-grid { grid-template-columns: 1fr; } }
.trend-card {
  background: var(--j-card); border: 1px solid var(--j-border); border-radius: var(--j-radius);
  box-shadow: var(--j-shadow); padding: 16px;
}
.trend-name { font-family: var(--mg-font-body); font-size: .7rem; letter-spacing: .06em; color: var(--j-text-muted); margin: 0 0 8px; }

/* ── History ── */
.history-card {
  background: var(--j-card); border: 1px solid var(--j-border); border-radius: var(--j-radius);
  box-shadow: var(--j-shadow); overflow: hidden;
}
.history-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--j-border);
}
.history-row:last-child { border-bottom: none; }
.h-emoji { font-size: 1.1rem; line-height: 1; flex-shrink: 0; }
.h-date { font-family: var(--mg-font-body); font-size: .72rem; color: var(--j-text-muted); flex-shrink: 0; width: 40px; }
.h-note {
  flex: 1; min-width: 0;
  font-family: var(--mg-font-body); font-size: .85rem; color: var(--j-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.h-del {
  flex-shrink: 0; background: none; border: none; color: var(--j-text-muted); font-size: .7rem;
  cursor: pointer; padding: 4px; border-radius: 8px; opacity: .5; transition: opacity .2s, color .2s;
}
.h-del:hover { opacity: 1; color: #a23b3b; }

.btn-text {
  align-self: flex-start;
  background: none; border: none; color: var(--j-accent);
  font-family: var(--mg-font-body); font-size: .78rem; letter-spacing: .03em;
  cursor: pointer; padding: 4px 0;
}
.btn-text:hover { text-decoration: underline; }

/* ── Empty / Loading ── */
.empty-state { text-align: center; padding: 32px 16px; }
.empty-state p { font-family: var(--mg-font-body); font-size: .85rem; color: var(--j-text-muted); }

/* ── Row transition ── */
.row-enter-active, .row-leave-active { transition: all .25s ease; }
.row-enter-from, .row-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
