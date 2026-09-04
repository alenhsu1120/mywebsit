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
        <button type="button" class="chip chip-reset" @click="resetOverrides">全部重設</button>
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
      <details class="origin">
        <summary>原始棒次表圖檔</summary>
        <figure class="photo-card">
          <img :src="runnerUrl" alt="2026 CRUFU RUN 7th 西臺灣棒次表" loading="lazy" />
          <figcaption>
            <a :href="runnerUrl" download="runner.JPG" class="dl-btn">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M10 3.5 V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6.2 8.6 L10 12.4 L13.8 8.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.5 15.2 H15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span>下載原始圖檔</span>
            </a>
          </figcaption>
        </figure>
      </details>
    </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
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
  overrides.value = {
    ...overrides.value,
    [formLeg.value]: resolveDay(formTime.value, current.end),
  }
  formTime.value = ''
  if (formLeg.value < legs.length) formLeg.value += 1
}

function removeOverride(leg: number) {
  const next = { ...overrides.value }
  delete next[leg]
  overrides.value = next
}

function resetOverrides() {
  overrides.value = {}
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
  justify-content: flex-end;
  padding: .9rem .3rem .2rem;
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
}
</style>
