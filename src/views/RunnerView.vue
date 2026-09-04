<template>
  <PortfolioPageShell>
    <PortfolioSubNav back-to="/journal" back-label="‹ Life Journal" />

    <div class="runner-wrap">
      <div class="page-title">
        <p class="label">Life Journal</p>
        <h2>Runner</h2>
        <p class="sub">2026 CRUFU RUN 7th · 西臺灣棒次表</p>
      </div>

      <p class="meta-line">
        起跑日期：2026/09/19（五）04:20
        <span class="gate">第 21 棒需在 01:10 才能出發（強制等待）</span>
      </p>

      <!-- ── 實際完成時間輸入 ── -->
      <form class="input-bar" @submit.prevent="applyOverride">
        <label class="field">
          <span class="field-label">棒次</span>
          <select v-model.number="formLeg" class="field-input">
            <option v-for="l in legs" :key="l.leg" :value="l.leg">
              第 {{ l.leg }} 棒 · {{ l.runner }}
            </option>
          </select>
        </label>

        <label class="field">
          <span class="field-label">完成時間</span>
          <input v-model="formTime" type="time" class="field-input" required />
        </label>

        <button type="submit" class="apply-btn">更新</button>

        <div class="act-row">
          <button type="button" class="act-btn" :disabled="!hasOverrides" @click="resetOverrides">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10a6 6 0 1 0 1.9-4.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
              <path d="M3.6 4.2 V7.4 H6.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            恢復原始狀態
          </button>

          <button type="button" class="act-btn" :disabled="!canUndo" @click="undo">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.6 4.4 L3.6 8.4 L7.6 12.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3.6 8.4 H11.4 a4.6 4.6 0 0 1 0 9.2 H8.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
            </svg>
            回復上一步
          </button>

          <button type="button" class="act-btn act-primary" :disabled="generating" @click="generateImage">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="2.6" y="4.2" width="14.8" height="11.6" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="7.2" cy="8.4" r="1.5" stroke="currentColor" stroke-width="1.4"/>
              <path d="M3.4 14.2 L8 10.2 L11.4 13 L14 10.8 L16.8 13.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ generating ? '產生中…' : '產生圖檔' }}
          </button>
        </div>
      </form>

      <div v-if="overrideList.length" class="chips">
        <span class="chips-label">已套用實際時間</span>
        <button
          v-for="o in overrideList"
          :key="o.leg"
          type="button"
          class="chip"
          :title="`點擊移除第 ${o.leg} 棒的實際時間`"
          @click="removeOverride(o.leg)"
        >
          第 {{ o.leg }} 棒 → {{ fmtClock(o.sec) }}<span class="chip-x">×</span>
        </button>
      </div>

      <!-- ── 棒次表 ── -->
      <div class="table-card">
        <div class="table-scroll">
          <table class="baton-table">
            <thead>
              <tr>
                <th>棒次</th>
                <th>跑者</th>
                <th>距離 (km)</th>
                <th>配速 (/km)</th>
                <th>難易度</th>
                <th>單棒時間</th>
                <th>預計起跑</th>
                <th>預計完成</th>
                <th>日期</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in rows"
                :key="row.key"
                :class="{
                  'row-wait': row.kind === 'wait',
                  'row-actual': row.kind === 'leg' && row.overridden,
                  'row-shifted': row.kind === 'leg' && !row.overridden && row.shift !== 0,
                }"
              >
                <template v-if="row.kind === 'leg'">
                  <td class="c-leg">{{ row.leg }}</td>
                  <td class="c-runner">{{ row.runner }}</td>
                  <td>{{ row.km.toFixed(1) }}</td>
                  <td>{{ row.paceLabel }}</td>
                  <td :class="'lv lv-' + levelClass(row.level)">{{ row.level }}</td>
                  <td>{{ row.note ?? fmtDur(row.dur) }}</td>
                  <td class="c-time">{{ fmtClock(row.start) }}</td>
                  <td class="c-time c-finish">
                    {{ fmtClock(row.end) }}
                    <span v-if="row.overridden" class="tag-actual">實際</span>
                    <span v-else-if="row.shift !== 0" class="shift" :class="row.shift < 0 ? 'up' : 'down'">
                      {{ fmtShift(row.shift) }}
                    </span>
                  </td>
                  <td class="c-date">{{ fmtDate(row.end) }}</td>
                </template>

                <template v-else>
                  <td class="c-leg">—</td>
                  <td colspan="4" class="wait-text">強制等待（第 21 棒需在 01:10 才能出發）</td>
                  <td>{{ row.dur > 0 ? '約 ' + fmtDur(row.dur) : '無等待' }}</td>
                  <td class="c-time">{{ fmtClock(row.start) }}</td>
                  <td class="c-time c-gate">{{ fmtClock(row.end) }}</td>
                  <td class="c-date">{{ fmtDate(row.end) }}</td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="summary">
          <div class="sum-item">
            <span class="sum-label">總距離</span>
            <strong class="sum-value">{{ totalKm.toFixed(1) }} km</strong>
          </div>
          <div class="sum-item">
            <span class="sum-label">總跑步時間（不含等待）</span>
            <strong class="sum-value">約 {{ fmtDur(totalRunSec) }}</strong>
          </div>
          <div class="sum-item">
            <span class="sum-label">預估完賽時間（含等待）</span>
            <strong class="sum-value sum-final">
              2026/{{ fmtDate(finishSec) }}（{{ weekday(finishSec) }}）{{ fmtClock(finishSec) }}
            </strong>
            <span v-if="finishShift !== 0" class="shift" :class="finishShift < 0 ? 'up' : 'down'">
              比原表{{ finishShift < 0 ? '快' : '慢' }} {{ fmtDur(Math.abs(finishShift)) }}
            </span>
          </div>
        </div>
      </div>

      <p class="footnote">
        * 第 26 棒穎萱配速為 6:30–8:00/km，表中時間以中間值 7:15/km 估算。
      </p>

      <!-- ── 原始圖檔 ── -->
      <details
        class="origin"
        :open="originOpen"
        @toggle="originOpen = ($event.target as HTMLDetailsElement).open"
      >
        <summary>
          {{ generatedUrl ? '棒次表圖檔（已重新產生）' : '原始棒次表圖檔' }}
        </summary>
        <figure class="photo-card">
          <img :src="displayUrl" alt="2026 CRUFU RUN 7th 西臺灣棒次表" loading="lazy" />
          <figcaption>
            <p v-if="generatedUrl" class="gen-note">
              已依目前時間產生新圖檔，覆蓋了這裡顯示的原圖。<br />
              瀏覽器無法寫回伺服器，這次替換只在本次瀏覽有效 —
              下載後把 <code>public/runner.JPG</code> 換掉並重新部署才會永久生效。
            </p>
            <div class="cap-actions">
              <button v-if="generatedUrl" type="button" class="dl-btn dl-ghost" @click="revertImage">
                還原原圖
              </button>
              <a :href="displayUrl" download="runner.JPG" class="dl-btn">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M10 3.5 V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <path d="M6.2 8.6 L10 12.4 L13.8 8.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.5 15.2 H15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span>{{ generatedUrl ? '下載新圖檔' : '下載原始圖檔' }}</span>
              </a>
            </div>
          </figcaption>
        </figure>
      </details>
    </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import PortfolioPageShell from '@/components/portfolio/PortfolioPageShell.vue'
import PortfolioSubNav from '@/components/portfolio/PortfolioSubNav.vue'

const runnerUrl = import.meta.env.BASE_URL + 'runner.JPG'

/* ── 賽事常數（秒，以 2026/09/19 00:00 為原點） ── */
const RACE_START = 4 * 3600 + 20 * 60          // 9/19 04:20 第 1 棒起跑
const GATE_21    = 86400 + 1 * 3600 + 10 * 60  // 9/20 01:10 第 21 棒最早出發時間

type Level = '極難' | '難' | '適中' | '易' | '極易'
interface Leg {
  leg: number
  runner: string
  km: number
  paceSec: number      // 配速（秒 / km），用於推算單棒時間
  paceLabel: string
  level: Level
  note?: string        // 單棒時間另有註記時顯示此字串
}

const legs: Leg[] = [
  { leg:  1, runner: '冠琳', km: 8.0, paceSec: 390, paceLabel: '6:30', level: '難'   },
  { leg:  2, runner: '柏諭', km: 7.9, paceSec: 360, paceLabel: '6:00', level: '極難' },
  { leg:  3, runner: '沛羽', km: 7.8, paceSec: 390, paceLabel: '6:30', level: '易'   },
  { leg:  4, runner: '穎萱', km: 8.4, paceSec: 420, paceLabel: '7:00', level: '適中' },
  { leg:  5, runner: '柏諭', km: 5.2, paceSec: 360, paceLabel: '6:00', level: '極易' },
  { leg:  6, runner: '波波', km: 7.7, paceSec: 360, paceLabel: '6:00', level: '適中' },
  { leg:  7, runner: '雨蕶', km: 9.1, paceSec: 360, paceLabel: '6:00', level: '適中' },
  { leg:  8, runner: '信緯', km: 6.8, paceSec: 390, paceLabel: '6:30', level: '易'   },
  { leg:  9, runner: '荷雅', km: 7.7, paceSec: 420, paceLabel: '7:00', level: '易'   },
  { leg: 10, runner: '季謙', km: 7.6, paceSec: 450, paceLabel: '7:30', level: '難'   },
  { leg: 11, runner: '珮瑜', km: 8.8, paceSec: 390, paceLabel: '6:30', level: '難'   },
  { leg: 12, runner: '信緯', km: 6.0, paceSec: 360, paceLabel: '6:00', level: '適中' },
  { leg: 13, runner: '荷雅', km: 6.7, paceSec: 420, paceLabel: '7:00', level: '易'   },
  { leg: 14, runner: '季謙', km: 8.6, paceSec: 450, paceLabel: '7:30', level: '易'   },
  { leg: 15, runner: '珮瑜', km: 7.7, paceSec: 390, paceLabel: '6:30', level: '易'   },
  { leg: 16, runner: '波波', km: 7.6, paceSec: 360, paceLabel: '6:00', level: '易'   },
  { leg: 17, runner: '珮瑜', km: 7.8, paceSec: 390, paceLabel: '6:30', level: '易'   },
  { leg: 18, runner: '信緯', km: 8.3, paceSec: 300, paceLabel: '5:00', level: '易'   },
  { leg: 19, runner: '季謙', km: 8.4, paceSec: 450, paceLabel: '7:30', level: '易'   },
  { leg: 20, runner: '荷雅', km: 8.7, paceSec: 390, paceLabel: '6:30', level: '易'   },
  { leg: 21, runner: '冠琳', km: 8.3, paceSec: 360, paceLabel: '6:00', level: '易'   },
  { leg: 22, runner: '雨蕶', km: 8.0, paceSec: 360, paceLabel: '6:00', level: '易'   },
  { leg: 23, runner: '穎萱', km: 8.0, paceSec: 405, paceLabel: '6:45', level: '易'   },
  { leg: 24, runner: '波波', km: 9.2, paceSec: 405, paceLabel: '6:45', level: '易'   },
  { leg: 25, runner: '沛羽', km: 8.3, paceSec: 420, paceLabel: '7:00', level: '易'   },
  { leg: 26, runner: '穎萱', km: 7.4, paceSec: 435, paceLabel: '6:30–8:00', level: '易', note: '約 53:39*' },
  { leg: 27, runner: '雨蕶', km: 7.6, paceSec: 390, paceLabel: '6:30', level: '易'   },
  { leg: 28, runner: '柏諭', km: 10.6, paceSec: 360, paceLabel: '6:00', level: '難'  },
  { leg: 29, runner: '沛羽', km: 7.7, paceSec: 450, paceLabel: '7:30', level: '易'   },
  { leg: 30, runner: '冠琳', km: 4.1, paceSec: 420, paceLabel: '7:00', level: '易'   },
]

/* 單棒時間 = 距離 × 配速（Math.round 避免浮點誤差） */
const legDur = (l: Leg) => Math.round(l.km * l.paceSec)

interface LegRow extends Leg {
  kind: 'leg'
  key: string
  dur: number
  start: number
  end: number
  overridden: boolean
  shift: number        // 與原表相差幾秒（負數 = 提前）
}
interface WaitRow {
  kind: 'wait'
  key: string
  dur: number
  start: number
  end: number
}
type Row = LegRow | WaitRow

/* ── 排程推算：依序累加，遇到強制等待就卡在 01:10 ── */
function schedule(overrides: Record<number, number>): Row[] {
  const out: Row[] = []
  let t = RACE_START

  for (const l of legs) {
    if (l.leg === 21) {
      const waitStart = t
      const waitEnd = Math.max(t, GATE_21)
      out.push({ kind: 'wait', key: 'wait', dur: waitEnd - waitStart, start: waitStart, end: waitEnd })
      t = waitEnd
    }

    const dur = legDur(l)
    const actual = overrides[l.leg]
    const start = t
    const end = actual ?? start + dur
    out.push({
      ...l,
      kind: 'leg',
      key: 'leg-' + l.leg,
      dur,
      start,
      end,
      overridden: actual !== undefined,
      shift: 0,
    })
    t = end
  }
  return out
}

const baseRows = schedule({})
const baseEnd = new Map(
  baseRows.filter((r): r is LegRow => r.kind === 'leg').map((r) => [r.leg, r.end]),
)

const overrides = ref<Record<number, number>>({})

/* 每次變更前把舊狀態壓進 history，供「回復上一步」使用 */
const history = ref<Record<number, number>[]>([])
const canUndo = computed(() => history.value.length > 0)
const hasOverrides = computed(() => Object.keys(overrides.value).length > 0)

function commit(next: Record<number, number>) {
  history.value = [...history.value, overrides.value]
  overrides.value = next
}

function undo() {
  const prev = history.value[history.value.length - 1]
  if (!prev) return
  history.value = history.value.slice(0, -1)
  overrides.value = prev
}

const rows = computed<Row[]>(() =>
  schedule(overrides.value).map((r) =>
    r.kind === 'leg' ? { ...r, shift: r.end - (baseEnd.get(r.leg) ?? r.end) } : r,
  ),
)

const overrideList = computed(() =>
  Object.entries(overrides.value)
    .map(([leg, sec]) => ({ leg: Number(leg), sec }))
    .sort((a, b) => a.leg - b.leg),
)

const totalKm      = legs.reduce((s, l) => s + l.km, 0)
const totalRunSec  = legs.reduce((s, l) => s + legDur(l), 0)
const finishSec    = computed(() => rows.value[rows.value.length - 1]?.end ?? RACE_START)
const finishShift  = computed(() => finishSec.value - (baseEnd.get(30) ?? 0))

/* ── 表單 ── */
const formLeg = ref(1)
const formTime = ref('')

/* 只輸入 HH:MM 無法判斷日期：取離該棒原定完成時間最近的那一天 */
function resolveDay(hhmm: string, refSec: number): number {
  const parts = hhmm.split(':').map(Number)
  const h = parts[0] ?? 0
  const m = parts[1] ?? 0
  const refDay = Math.floor(refSec / 86400)
  let best = refDay * 86400 + h * 3600 + m * 60
  let bestDiff = Infinity
  for (const d of [refDay - 1, refDay, refDay + 1]) {
    if (d < 0) continue
    const cand = d * 86400 + h * 3600 + m * 60
    const diff = Math.abs(cand - refSec)
    if (diff < bestDiff) {
      bestDiff = diff
      best = cand
    }
  }
  return best
}

function applyOverride() {
  if (!formTime.value) return
  const current = rows.value.find(
    (r): r is LegRow => r.kind === 'leg' && r.leg === formLeg.value,
  )
  if (!current) return
  commit({
    ...overrides.value,
    [formLeg.value]: resolveDay(formTime.value, current.end),
  })
  formTime.value = ''
  if (formLeg.value < legs.length) formLeg.value += 1
}

function removeOverride(leg: number) {
  const next = { ...overrides.value }
  delete next[leg]
  commit(next)
}

function resetOverrides() {
  if (!hasOverrides.value) return
  commit({})
}

/* ── 格式化 ── */
const pad = (n: number) => String(n).padStart(2, '0')

function fmtClock(sec: number): string {
  const s = ((sec % 86400) + 86400) % 86400
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}`
}

function fmtDur(sec: number): string {
  const s = Math.max(0, Math.round(sec))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const ss = s % 60
  return h > 0 ? `${h}:${pad(m)}:${pad(ss)}` : `${pad(m)}:${pad(ss)}`
}

const DAYS = ['9/19', '9/20', '9/21', '9/22']
const WEEK = ['五', '六', '日', '一']
const fmtDate = (sec: number) => DAYS[Math.floor(sec / 86400)] ?? '—'
const weekday = (sec: number) => WEEK[Math.floor(sec / 86400)] ?? '—'

function fmtShift(sec: number): string {
  const sign = sec < 0 ? '−' : '+'
  const s = Math.abs(sec)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h > 0 ? `${sign}${h}:${pad(m)}` : `${sign}${m}分`
}

/* ═══════════════════════════════════════════════════════════════
   產生圖檔：把目前的棒次表畫到 canvas，輸出成 JPEG
   （瀏覽器無法寫回伺服器上的 public/runner.JPG，
     所以這裡是換掉頁面上顯示的圖 + 提供下載覆蓋原檔）
   ═══════════════════════════════════════════════════════════════ */
const generating   = ref(false)
const generatedUrl = ref('')
const originOpen   = ref(false)

const displayUrl   = computed(() => generatedUrl.value || runnerUrl)

const FF = '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", sans-serif'
const font = (size: number, weight: number | string = 400) => `${weight} ${size}px ${FF}`

const COL_W    = [74, 94, 112, 140, 108, 122, 124, 124, 86]
const COL_HEAD = ['棒次', '跑者', '距離 (km)', '配速 (/km)', '難易度', '單棒時間', '預計起跑', '預計完成', '日期']

const IMG = {
  ink:      '#1F3864',
  headBg:   '#1F4E79',
  headText: '#FFFFFF',
  bandA:    '#FFF8E1',
  bandB:    '#EAF2F9',
  grid:     '#B7C7DA',
  time:     '#1F4E79',
  finish:   '#2E75B6',
  wait:     '#FFF2CC',
  actual:   '#FBE2C4',
  alert:    '#C00000',
  sumBg:    '#EAF2F9',
  sumBd:    '#9DC3E6',
  muted:    '#5A6B84',
}
const LEVEL_INK: Record<Level, string> = {
  極難: '#C00000',
  難:   '#C00000',
  適中: '#D26A00',
  易:   '#3F8F2A',
  極易: '#2E7D5B',
}

function renderTable(): Promise<Blob> {
  const W = 1024
  const PAD = 20
  const HEAD_H = 34
  const ROW_H = 30
  const body = rows.value

  const notes: string[] = []
  if (overrideList.value.length) {
    notes.push(
      '已套用實際完成時間：' +
        overrideList.value.map((o) => `第 ${o.leg} 棒 ${fmtClock(o.sec)}`).join('、'),
    )
  }

  const tableTop = 100 + notes.length * 22
  const tableH   = HEAD_H + body.length * ROW_H
  const sumTop   = tableTop + tableH + 18
  const SUM_H    = 80
  const H        = sumTop + SUM_H + 48

  const dpr = 2
  const canvas = document.createElement('canvas')
  canvas.width = W * dpr
  canvas.height = H * dpr
  const ctx = canvas.getContext('2d')
  if (!ctx) return Promise.reject(new Error('canvas 2d context 取得失敗'))
  ctx.scale(dpr, dpr)
  ctx.textBaseline = 'middle'

  ctx.fillStyle = '#FFFFFF'
  ctx.fillRect(0, 0, W, H)

  /* ── 標題 ── */
  ctx.fillStyle = IMG.headBg
  ctx.font = font(25, 700)
  ctx.textAlign = 'center'
  ctx.fillText('2026 CRUFU RUN 7th – 西臺灣棒次表（含配速、難易度與時間預估）', W / 2, 40)

  ctx.font = font(14, 600)
  ctx.textAlign = 'left'
  ctx.fillStyle = IMG.ink
  ctx.fillText('起跑日期：2026/09/19（五）04:20', PAD, 70)
  ctx.textAlign = 'right'
  ctx.fillStyle = IMG.alert
  ctx.fillText('第 21 棒需在 01:10 才能出發（強制等待）', W - PAD, 70)

  ctx.textAlign = 'left'
  ctx.font = font(13, 600)
  ctx.fillStyle = '#8A5A00'
  notes.forEach((n, i) => ctx.fillText(n, PAD, 92 + i * 22))

  /* ── 欄位 x 座標 ── */
  const tableW = COL_W.reduce((a, b) => a + b, 0)
  const x0 = Math.round((W - tableW) / 2)
  const colX: number[] = []
  COL_W.reduce((acc, w, i) => {
    colX[i] = acc
    return acc + w
  }, x0)

  const cell = (text: string, i: number, cy: number, span = 1) => {
    let w = 0
    for (let k = i; k < i + span; k++) w += COL_W[k] ?? 0
    ctx.textAlign = 'center'
    ctx.fillText(text, (colX[i] ?? x0) + w / 2, cy)
  }

  /* ── 表頭 ── */
  ctx.fillStyle = IMG.headBg
  ctx.fillRect(x0, tableTop, tableW, HEAD_H)
  ctx.fillStyle = IMG.headText
  ctx.font = font(14, 700)
  COL_HEAD.forEach((h, i) => cell(h, i, tableTop + HEAD_H / 2))

  /* ── 資料列 ── */
  body.forEach((r, ri) => {
    const y = tableTop + HEAD_H + ri * ROW_H
    const cy = y + ROW_H / 2

    if (r.kind === 'wait') ctx.fillStyle = IMG.wait
    else if (r.overridden) ctx.fillStyle = IMG.actual
    else ctx.fillStyle = ri % 2 === 0 ? IMG.bandA : IMG.bandB
    ctx.fillRect(x0, y, tableW, ROW_H)

    if (r.kind === 'wait') {
      ctx.font = font(14, 700)
      ctx.fillStyle = IMG.ink
      cell('—', 0, cy)
      cell('強制等待（第 21 棒需在 01:10 才能出發）', 1, cy, 4)
      ctx.font = font(14, 400)
      cell(r.dur > 0 ? '約 ' + fmtDur(r.dur) : '無等待', 5, cy)
      ctx.fillStyle = IMG.time
      ctx.font = font(14, 600)
      cell(fmtClock(r.start), 6, cy)
      ctx.fillStyle = IMG.alert
      ctx.font = font(14, 700)
      cell(fmtClock(r.end), 7, cy)
      ctx.fillStyle = IMG.muted
      ctx.font = font(13, 400)
      cell(fmtDate(r.end), 8, cy)
      return
    }

    ctx.font = font(14, 700)
    ctx.fillStyle = IMG.ink
    cell(String(r.leg), 0, cy)
    ctx.font = font(14, 600)
    cell(r.runner, 1, cy)
    ctx.font = font(14, 400)
    ctx.fillStyle = '#33405C'
    cell(r.km.toFixed(1), 2, cy)
    cell(r.paceLabel, 3, cy)
    ctx.font = font(14, 700)
    ctx.fillStyle = LEVEL_INK[r.level]
    cell(r.level, 4, cy)
    ctx.font = font(14, 400)
    ctx.fillStyle = '#33405C'
    cell(r.note ?? fmtDur(r.dur), 5, cy)
    ctx.font = font(14, 600)
    ctx.fillStyle = IMG.time
    cell(fmtClock(r.start), 6, cy)

    /* 預計完成：實際時間標記，或與原表的差異 */
    const fx = (colX[7] ?? x0) + (COL_W[7] ?? 0) / 2
    if (r.overridden) {
      ctx.fillStyle = '#9C4B00'
      ctx.font = font(14, 700)
      ctx.textAlign = 'center'
      ctx.fillText(fmtClock(r.end) + ' ✽', fx, cy)
    } else if (r.shift !== 0) {
      ctx.fillStyle = '#9C4B00'
      ctx.font = font(14, 700)
      ctx.textAlign = 'center'
      ctx.fillText(fmtClock(r.end), fx, cy - 5)
      ctx.font = font(10, 600)
      ctx.fillStyle = r.shift < 0 ? '#2E7D5B' : IMG.alert
      ctx.fillText(fmtShift(r.shift), fx, cy + 8)
    } else {
      ctx.fillStyle = IMG.finish
      ctx.font = font(14, 600)
      cell(fmtClock(r.end), 7, cy)
    }

    ctx.fillStyle = IMG.muted
    ctx.font = font(13, 400)
    cell(fmtDate(r.end), 8, cy)
  })

  /* ── 格線 ── */
  ctx.strokeStyle = IMG.grid
  ctx.lineWidth = 1
  ctx.beginPath()
  for (let i = 0; i <= body.length + 1; i++) {
    const y = i === 0 ? tableTop : tableTop + HEAD_H + (i - 1) * ROW_H
    ctx.moveTo(x0, y + 0.5)
    ctx.lineTo(x0 + tableW, y + 0.5)
  }
  const waitIdx = body.findIndex((r) => r.kind === 'wait')
  for (let i = 0; i <= COL_W.length; i++) {
    const x = (colX[i] ?? x0 + tableW) + 0.5
    if (i > 1 && i < 5 && waitIdx >= 0) {
      /* 強制等待列的合併欄不畫豎線 */
      const wy = tableTop + HEAD_H + waitIdx * ROW_H
      ctx.moveTo(x, tableTop)
      ctx.lineTo(x, wy)
      ctx.moveTo(x, wy + ROW_H)
      ctx.lineTo(x, tableTop + tableH)
    } else {
      ctx.moveTo(x, tableTop)
      ctx.lineTo(x, tableTop + tableH)
    }
  }
  ctx.stroke()

  /* ── 總結 ── */
  ctx.fillStyle = IMG.sumBg
  ctx.fillRect(x0, sumTop, tableW, SUM_H)
  ctx.strokeStyle = IMG.sumBd
  ctx.strokeRect(x0 + 0.5, sumTop + 0.5, tableW - 1, SUM_H - 1)

  const third = tableW / 3
  const blocks: [string, string, string][] = [
    ['總距離', `${totalKm.toFixed(1)} km`, IMG.headBg],
    ['總跑步時間（不含等待）', `約 ${fmtDur(totalRunSec)}`, IMG.headBg],
    [
      '預估完賽時間（含等待）',
      `2026/${fmtDate(finishSec.value)}（${weekday(finishSec.value)}）${fmtClock(finishSec.value)}`,
      IMG.alert,
    ],
  ]
  ctx.textAlign = 'center'
  blocks.forEach(([label, value, ink], i) => {
    const cx = x0 + third * i + third / 2
    ctx.font = font(13, 600)
    ctx.fillStyle = IMG.muted
    ctx.fillText(label, cx, sumTop + 22)
    ctx.font = font(21, 700)
    ctx.fillStyle = ink
    ctx.fillText(value, cx, sumTop + 50)
    if (i > 0) {
      ctx.strokeStyle = IMG.sumBd
      ctx.beginPath()
      ctx.moveTo(x0 + third * i + 0.5, sumTop + 12)
      ctx.lineTo(x0 + third * i + 0.5, sumTop + SUM_H - 12)
      ctx.stroke()
    }
  })
  if (finishShift.value !== 0) {
    ctx.font = font(12, 600)
    ctx.fillStyle = finishShift.value < 0 ? '#2E7D5B' : IMG.alert
    ctx.fillText(
      `比原表${finishShift.value < 0 ? '快' : '慢'} ${fmtDur(Math.abs(finishShift.value))}`,
      x0 + third * 2 + third / 2,
      sumTop + 68,
    )
  }

  /* ── 註腳 ── */
  ctx.textAlign = 'left'
  ctx.font = font(12, 400)
  ctx.fillStyle = IMG.muted
  ctx.fillText(
    '* 第 26 棒穎萱配速為 6:30–8:00/km，表中時間以中間值 7:15/km 估算。' +
      (overrideList.value.length ? '　✽ 為實際完成時間，其後棒次已連鎖重算。' : ''),
    PAD,
    sumTop + SUM_H + 22,
  )
  ctx.fillText(`產生時間：${new Date().toLocaleString('zh-TW', { hour12: false })}`, PAD, sumTop + SUM_H + 40)

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('canvas.toBlob 回傳 null'))),
      'image/jpeg',
      0.95,
    )
  })
}

async function generateImage() {
  if (generating.value) return
  generating.value = true
  try {
    if (document.fonts?.ready) await document.fonts.ready
    const blob = await renderTable()
    if (generatedUrl.value) URL.revokeObjectURL(generatedUrl.value)
    generatedUrl.value = URL.createObjectURL(blob)
    originOpen.value = true
  } catch (e) {
    console.error('[Runner] 產生圖檔失敗:', e)
    window.alert('產生圖檔失敗，請改用其他瀏覽器再試一次。')
  } finally {
    generating.value = false
  }
}

function revertImage() {
  if (!generatedUrl.value) return
  URL.revokeObjectURL(generatedUrl.value)
  generatedUrl.value = ''
}

onBeforeUnmount(() => {
  if (generatedUrl.value) URL.revokeObjectURL(generatedUrl.value)
})

const LEVEL_CLASS: Record<Level, string> = {
  極難: 'hard2',
  難: 'hard',
  適中: 'mid',
  易: 'easy',
  極易: 'easy2',
}
const levelClass = (lv: Level) => LEVEL_CLASS[lv]
</script>

<style scoped>
.runner-wrap {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 4.5rem 2rem 5rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}
@keyframes card-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-title { margin-bottom: 1.1rem; }
.label {
  font-family: var(--mg-font-body);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .22em;
  color: var(--mg-green-main);
  margin-bottom: .8rem;
}
.page-title h2 {
  font-family: var(--mg-font-heading);
  font-weight: 500;
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: var(--mg-green-deep);
  margin-bottom: .35rem;
}
.page-title .sub {
  font-family: var(--mg-font-body);
  font-style: italic;
  font-size: .95rem;
  color: var(--mg-text-muted);
}

.meta-line {
  display: flex;
  flex-wrap: wrap;
  gap: .4rem 1.4rem;
  font-family: var(--mg-font-body);
  font-size: .85rem;
  color: var(--mg-text-body);
  margin-bottom: 1.6rem;
}
.meta-line .gate { color: var(--mg-clay); font-weight: 600; }

/* ── 輸入列 ── */
.input-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: .9rem;
  padding: 1.1rem 1.3rem;
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft);
  border-radius: 18px;
  box-shadow: 0 8px 26px rgba(36,49,38,0.05);
}
.field { display: flex; flex-direction: column; gap: .35rem; }
.field-label {
  font-family: var(--mg-font-body);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .12em;
  color: var(--mg-text-label);
}
.field-input {
  font-family: var(--mg-font-body);
  font-size: .92rem;
  color: var(--mg-green-deep);
  padding: .5rem .8rem;
  min-width: 10.5rem;
  background: var(--mg-bg-green-soft);
  border: 1px solid var(--mg-border-soft);
  border-radius: 11px;
  outline: none;
  transition: border-color .25s, box-shadow .25s;
}
.field-input:focus {
  border-color: var(--mg-green-mid);
  box-shadow: 0 0 0 3px rgba(95,127,100,.13);
}

.apply-btn {
  font-family: var(--mg-font-body);
  font-size: .9rem;
  font-weight: 600;
  letter-spacing: .06em;
  color: #FBFAF7;
  background: var(--mg-green-main);
  border: 1px solid var(--mg-green-main);
  border-radius: 999px;
  padding: .58rem 1.5rem;
  cursor: pointer;
  transition: transform .25s cubic-bezier(.16,1,.3,1), background .25s, box-shadow .25s;
}
.apply-btn:hover {
  background: var(--mg-green-dark);
  transform: translateY(-2px);
  box-shadow: 0 10px 22px rgba(36,49,38,0.14);
}

/* ── 三顆操作按鈕 ── */
.act-row {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin-left: auto;
}
.act-btn {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  font-family: var(--mg-font-body);
  font-size: .84rem;
  font-weight: 600;
  letter-spacing: .04em;
  color: var(--mg-green-dark);
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft);
  border-radius: 999px;
  padding: .5rem 1rem;
  cursor: pointer;
  transition: transform .25s cubic-bezier(.16,1,.3,1), border-color .25s, color .25s, box-shadow .25s;
}
.act-btn svg { width: 16px; height: 16px; color: var(--mg-green-main); }
.act-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: var(--mg-border-hover);
  box-shadow: 0 8px 18px rgba(36,49,38,0.08);
}
.act-btn:disabled {
  opacity: .42;
  cursor: not-allowed;
}
.act-primary {
  color: #FBFAF7;
  background: var(--mg-brown);
  border-color: var(--mg-brown);
}
.act-primary svg { color: #FBFAF7; }
.act-primary:hover:not(:disabled) { background: var(--mg-clay); border-color: var(--mg-clay); }

/* ── 已套用的調整 ── */
.chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: .5rem;
  margin-top: .9rem;
}
.chips-label {
  font-family: var(--mg-font-body);
  font-size: .76rem;
  letter-spacing: .1em;
  color: var(--mg-text-label);
  margin-right: .2rem;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  font-family: var(--mg-font-body);
  font-size: .8rem;
  font-weight: 600;
  color: var(--mg-green-dark);
  background: var(--mg-bg-green-soft);
  border: 1px solid var(--mg-border-soft);
  border-radius: 999px;
  padding: .3rem .8rem;
  cursor: pointer;
  transition: border-color .25s, color .25s;
}
.chip:hover { border-color: var(--mg-clay); color: var(--mg-clay); }
.chip-x { font-size: 1rem; line-height: 1; opacity: .55; }
.chip-reset { color: var(--mg-text-muted); background: transparent; font-weight: 400; }

/* ── 表格 ── */
.table-card {
  margin-top: 1.4rem;
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft);
  border-radius: 20px;
  box-shadow: 0 8px 26px rgba(36,49,38,0.05);
  overflow: hidden;
}
.table-scroll { overflow-x: auto; }

.baton-table {
  width: 100%;
  min-width: 780px;
  border-collapse: collapse;
  font-family: var(--mg-font-body);
  font-size: .84rem;
  font-variant-numeric: tabular-nums;
}
.baton-table th {
  font-weight: 600;
  font-size: .76rem;
  letter-spacing: .1em;
  color: #FBFAF7;
  background: var(--mg-green-dark);
  padding: .7rem .6rem;
  white-space: nowrap;
}
.baton-table td {
  padding: .55rem .6rem;
  text-align: center;
  color: var(--mg-text-body);
  border-top: 1px solid var(--mg-divider);
  white-space: nowrap;
}
.baton-table tbody tr:nth-child(even) { background: rgba(238,243,234,.5); }
.baton-table tbody tr:hover { background: var(--mg-bg-green-soft); }

.c-leg    { font-weight: 700; color: var(--mg-green-deep); }
.c-runner { font-weight: 600; color: var(--mg-green-deep); }
.c-time   { font-weight: 600; color: var(--mg-green-dark); }
.c-finish { color: var(--mg-green-main); }
.c-date   { color: var(--mg-text-muted); font-size: .8rem; }

.lv { font-weight: 600; }
.lv-hard2 { color: #B3402F; }
.lv-hard  { color: #C25A3F; }
.lv-mid   { color: #C08A3E; }
.lv-easy  { color: #5F8F58; }
.lv-easy2 { color: #4F8A6A; }

.row-wait { background: var(--mg-bg-beige-soft) !important; }
.row-wait .wait-text {
  font-weight: 600;
  color: var(--mg-green-dark);
  letter-spacing: .04em;
}
.row-wait .c-gate { color: var(--mg-clay); font-weight: 700; }

.row-actual { background: rgba(176,137,104,.13) !important; }
.row-shifted .c-finish { color: var(--mg-clay); }

.tag-actual {
  display: inline-block;
  margin-left: .35rem;
  font-size: .64rem;
  font-weight: 700;
  letter-spacing: .08em;
  color: #FBFAF7;
  background: var(--mg-brown);
  border-radius: 999px;
  padding: .08rem .42rem;
  vertical-align: 1px;
}
.shift {
  display: inline-block;
  margin-left: .35rem;
  font-size: .72rem;
  font-weight: 600;
}
.shift.up   { color: #4F8A6A; }
.shift.down { color: #B3402F; }

/* ── 總結 ── */
.summary {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2.4rem;
  padding: 1.2rem 1.4rem;
  background: var(--mg-bg-green-soft);
  border-top: 1px solid var(--mg-border-soft);
}
.sum-item { display: flex; flex-direction: column; gap: .2rem; }
.sum-label {
  font-family: var(--mg-font-body);
  font-size: .74rem;
  letter-spacing: .1em;
  color: var(--mg-text-label);
}
.sum-value {
  font-family: var(--mg-font-heading);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--mg-green-deep);
  font-variant-numeric: tabular-nums;
}
.sum-final { color: var(--mg-clay); }

.footnote {
  margin-top: .9rem;
  font-family: var(--mg-font-body);
  font-size: .76rem;
  color: var(--mg-text-muted);
  line-height: 1.6;
}

/* ── 原始圖檔 ── */
.origin { margin-top: 2.2rem; }
.origin > summary {
  cursor: pointer;
  font-family: var(--mg-font-body);
  font-size: .84rem;
  font-weight: 600;
  letter-spacing: .08em;
  color: var(--mg-green-main);
  padding: .5rem 0;
}
.origin > summary:hover { color: var(--mg-green-dark); }

.photo-card {
  margin: .8rem 0 0;
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft);
  border-radius: 20px;
  padding: .9rem;
  box-shadow: 0 8px 26px rgba(36,49,38,0.05);
}
.photo-card img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 14px;
}
.photo-card figcaption {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: .8rem;
  padding: .9rem .3rem .2rem;
}
.gen-note {
  flex: 1 1 20rem;
  font-family: var(--mg-font-body);
  font-size: .78rem;
  line-height: 1.65;
  color: var(--mg-text-muted);
}
.gen-note code {
  font-size: .95em;
  padding: .05rem .3rem;
  border-radius: 5px;
  background: var(--mg-bg-green-soft);
  color: var(--mg-green-dark);
}
.cap-actions {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin-left: auto;
}
.dl-ghost {
  background: transparent;
  cursor: pointer;
  color: var(--mg-text-muted);
  font-weight: 400;
}
.dl-btn {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  padding: .55rem 1.1rem;
  border-radius: 999px;
  border: 1px solid var(--mg-border-soft);
  background: radial-gradient(circle at 38% 32%, rgba(95,127,100,.14) 0%, rgba(95,127,100,.06) 100%);
  font-family: var(--mg-font-body);
  font-size: .86rem;
  font-weight: 600;
  letter-spacing: .04em;
  color: var(--mg-green-deep);
  text-decoration: none;
  transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
}
.dl-btn svg { width: 17px; height: 17px; color: var(--mg-green-main); }
.dl-btn:hover {
  transform: translateY(-2px);
  border-color: var(--mg-border-hover);
  box-shadow: 0 10px 22px rgba(36,49,38,0.09);
}

@media (max-width: 640px) {
  .runner-wrap { padding: 3.5rem 1.1rem 4rem; }
  .input-bar { flex-direction: column; align-items: stretch; }
  .field-input { min-width: 0; width: 100%; }
  .apply-btn { width: 100%; }
  .act-row { margin-left: 0; }
  .act-btn { flex: 1 1 8rem; justify-content: center; }
  .cap-actions { margin-left: 0; width: 100%; }
  .cap-actions .dl-btn { flex: 1; justify-content: center; }
}
</style>
