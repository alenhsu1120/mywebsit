<template>
  <PortfolioPageShell>
    <div
      v-if="entry"
      class="j-progress"
      role="progressbar"
      aria-label="閱讀進度"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="Math.round(progress * 100)"
    >
      <span :style="{ transform: `scaleX(${progress})` }" />
    </div>

    <PortfolioSubNav back-to="/journal/quarrel" back-label="‹ 關係成長日記" />

    <div v-if="!entry" class="j-page j-missing">
      <p>找不到這篇日記。</p>
      <RouterLink to="/journal/quarrel" class="j-btn">返回日記列表</RouterLink>
    </div>

    <div v-else class="j-page">
      <!-- ───────── Hero ───────── -->
      <header class="j-hero">
        <svg class="j-hero-leaves" viewBox="0 0 320 320" aria-hidden="true">
          <g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round">
            <path d="M40 300 C90 230 150 170 290 40" />
            <path d="M120 215 C100 180 104 150 126 128 C144 152 142 186 120 215 Z" />
            <path d="M120 215 C122 186 124 158 126 128" opacity=".6" />
            <path d="M170 166 C190 136 220 124 252 128 C236 156 208 170 170 166 Z" />
            <path d="M170 166 C196 150 222 138 252 128" opacity=".6" />
            <path d="M212 120 C198 92 204 64 226 48 C240 74 234 102 212 120 Z" />
            <path d="M212 120 C216 96 220 72 226 48" opacity=".6" />
            <path d="M80 258 C96 236 122 226 150 230 C134 252 108 262 80 258 Z" />
            <path d="M80 258 C104 246 126 236 150 230" opacity=".6" />
          </g>
        </svg>

        <div class="j-hero-inner">
          <p class="j-eyebrow">{{ entry.eyebrow }}</p>
          <h1 class="j-title">
            <span class="j-title-main">{{ entry.title }}</span>
            <span class="j-title-sub">{{ entry.subtitle }}</span>
          </h1>
          <p class="j-lede">{{ entry.lede }}</p>

          <p class="j-meta">
            <time :datetime="entry.date">{{ formatDate(entry.date) }}</time>
            <span aria-hidden="true">·</span>
            <span>閱讀約 {{ minutes }} 分鐘</span>
          </p>
          <ul class="j-cats" aria-label="分類">
            <li v-for="c in entry.categories" :key="c">{{ c }}</li>
          </ul>

          <div class="j-actions">
            <RouterLink to="/journal/quarrel" class="j-btn">‹ 返回日記列表</RouterLink>
            <button type="button" class="j-btn" @click="copyLink">
              {{ copied ? '已複製連結' : '複製文章連結' }}
            </button>
            <button type="button" class="j-btn" @click="printPage">列印文章</button>
            <span class="j-sr" role="status">{{ copied ? '已複製文章連結' : '' }}</span>
          </div>
        </div>
      </header>

      <!-- ───────── Mobile TOC ───────── -->
      <details ref="mobileToc" class="j-toc-mobile">
        <summary>文章目錄</summary>
        <ol>
          <li v-for="(s, i) in entry.sections" :key="s.id">
            <button type="button" :class="{ 'is-active': active === s.id }" @click="goTo(s.id)">
              <span class="j-toc-no">{{ pad(i + 1) }}</span>{{ s.nav }}
            </button>
          </li>
        </ol>
      </details>

      <div class="j-layout">
        <!-- ───────── Article ───────── -->
        <article class="j-article">
          <section
            v-for="(s, i) in entry.sections"
            :id="`sec-${s.id}`"
            :key="s.id"
            class="j-sec"
            :class="`j-sec--${s.layout}`"
            :aria-labelledby="`h-${s.id}`"
          >
            <header class="j-sec-head">
              <span class="j-sec-no" aria-hidden="true">{{ pad(i + 1) }}</span>
              <h2 :id="`h-${s.id}`" tabindex="-1">{{ s.title }}</h2>
            </header>

            <div v-if="s.layout === 'letter'" class="j-letter">
              <h3 class="j-letter-title">{{ s.letterTitle }}</h3>
              <JournalBlocks v-if="s.intro" :blocks="s.intro" />
            </div>

            <template v-else>
              <div v-if="s.intro" class="j-intro"><JournalBlocks :blocks="s.intro" /></div>

              <div v-if="s.groups" class="j-groups" :class="`j-groups--${s.layout}`">
                <template v-for="(g, gi) in s.groups" :key="gi">
                  <h3 v-if="g.heading" class="j-group-heading">{{ g.heading }}</h3>
                  <div class="j-group" :class="g.tone ? `tone-${g.tone}` : ''">
                    <span v-if="hasMarker(s.layout)" class="j-marker" aria-hidden="true">
                      {{ s.layout === 'timeline' ? '' : pad(gi + 1) }}
                    </span>
                    <div class="j-group-body">
                      <span v-if="g.badge" class="j-badge">{{ g.badge }}</span>
                      <h3 v-if="g.title !== g.heading" class="j-group-title">
                        <span v-if="s.layout === 'timeline'" class="j-step">{{ i + 1 }}.{{ gi + 1 }}</span>
                        {{ g.title }}
                      </h3>
                      <JournalBlocks :blocks="g.blocks" />
                    </div>
                  </div>
                </template>
              </div>

              <div v-if="s.outro" class="j-outro"><JournalBlocks :blocks="s.outro" /></div>
            </template>
          </section>
        </article>

        <!-- ───────── Desktop TOC ───────── -->
        <aside class="j-toc" aria-label="章節導覽">
          <p class="j-toc-label">章節導覽</p>
          <ol>
            <li v-for="(s, i) in entry.sections" :key="s.id">
              <button
                type="button"
                :class="{ 'is-active': active === s.id }"
                :aria-current="active === s.id ? 'location' : undefined"
                @click="goTo(s.id)"
              >
                <span class="j-toc-no">{{ pad(i + 1) }}</span>{{ s.nav }}
              </button>
            </li>
          </ol>
        </aside>
      </div>

      <!-- ───────── Summary ───────── -->
      <section class="j-summary" aria-labelledby="h-summary">
        <p class="j-summary-label" id="h-summary">事件摘要</p>
        <p class="j-summary-text">{{ entry.summary }}</p>
        <p class="j-closing">{{ entry.closing }}</p>
      </section>

      <button
        type="button"
        class="j-top"
        :class="{ 'is-visible': showTop }"
        aria-label="回到頂部"
        :tabindex="showTop ? 0 : -1"
        @click="toTop"
      >
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 12 L10 7 L15 12" /></svg>
      </button>
    </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, reactive, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PortfolioPageShell from '@/components/portfolio/PortfolioPageShell.vue'
import PortfolioSubNav from '@/components/portfolio/PortfolioSubNav.vue'
import JournalBlocks from '@/components/journal/JournalBlocks.vue'
import { checklistKey, type ChecklistState } from '@/components/journal/checklist'
import { findEntry, formatDate, readingMinutes } from '@/data/relationship'
import type { SectionLayout } from '@/data/relationship/types'

const route = useRoute()
const entry = computed(() => findEntry(String(route.params.slug)))
const minutes = computed(() => (entry.value ? readingMinutes(entry.value) : 0))

const checklist = reactive<ChecklistState>({})
provide(checklistKey, checklist)

const pad = (n: number) => String(n).padStart(2, '0')
const hasMarker = (layout: SectionLayout) => ['timeline', 'cards', 'actions'].includes(layout)

watch(
  entry,
  e => {
    document.title = e ? `${e.title}｜關係成長日記` : '關係成長日記'
  },
  { immediate: true },
)

// ── 捲動：進度條、目前章節、回到頂部 ──
const progress = ref(0)
const active = ref('')
const showTop = ref(false)
let ticking = false

function update() {
  ticking = false
  const doc = document.documentElement
  const max = doc.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  showTop.value = window.scrollY > 600

  const sections = entry.value?.sections ?? []
  let current = sections[0]?.id ?? ''
  for (const s of sections) {
    const el = document.getElementById(`sec-${s.id}`)
    if (el && el.getBoundingClientRect().top <= 140) current = s.id
  }
  active.value = current
}
function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  update()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const mobileToc = ref<HTMLDetailsElement | null>(null)

function goTo(id: string) {
  const el = document.getElementById(`sec-${id}`)
  if (!el) return
  if (mobileToc.value) mobileToc.value.open = false
  el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
  document.getElementById(`h-${id}`)?.focus({ preventScroll: true })
}

function toTop() {
  window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' })
}

// ── 文章操作 ──
const copied = ref(false)
let copiedTimer: number | undefined

async function copyLink() {
  const url = window.location.href
  try {
    await navigator.clipboard.writeText(url)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = url
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  copied.value = true
  window.clearTimeout(copiedTimer)
  copiedTimer = window.setTimeout(() => (copied.value = false), 2000)
}

function printPage() {
  window.print()
}
</script>

<style scoped>
.j-page {
  --j-cream:      #F6F5EF;
  --j-card:       #FFFFFF;
  --j-forest:     #344B3F;
  --j-sage:       #899A88;
  --j-green-wash: #E9EEE7;
  --j-ink:        #303630;
  --j-muted:      #85877F;
  --j-line:       #E5E4DC;
  --j-olive:      #667B61;
  --j-serif: 'Noto Serif TC', 'Cormorant Garamond', serif;
  --j-sans:  'Inter', 'Noto Sans TC', sans-serif;

  position: relative;
  background: var(--j-cream);
  color: var(--j-ink);
  font-family: var(--j-sans);
  font-size: 16.5px;
  line-height: 1.95;
  overflow-wrap: anywhere;
  animation: j-fade .6s ease both;
}
@keyframes j-fade {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: none; }
}

.j-sr {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

button { font: inherit; }
:where(.j-page) :focus-visible {
  outline: 2px solid var(--j-forest);
  outline-offset: 3px;
  border-radius: 6px;
}

/* ── Progress bar ── */
.j-progress {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 3px;
  z-index: 260;
  pointer-events: none;
}
.j-progress span {
  display: block;
  height: 100%;
  background: #344B3F;
  transform-origin: left center;
  transition: transform .12s linear;
}

/* ── Hero ── */
.j-hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--j-line);
  background:
    radial-gradient(ellipse 60% 70% at 85% 20%, rgba(137,154,136,.16), transparent 70%),
    radial-gradient(ellipse 50% 60% at 10% 100%, rgba(233,238,231,.9), transparent 70%);
}
.j-hero-leaves {
  position: absolute;
  right: max(2rem, calc(50% - 600px));
  top: 50%;
  width: min(320px, 38vw);
  transform: translateY(-50%);
  color: var(--j-sage);
  opacity: .45;
}
.j-hero-inner {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 5.5rem 2.5rem 4rem;
}
.j-eyebrow {
  margin: 0 0 1.4rem;
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .3em;
  color: var(--j-olive);
}
.j-title {
  position: relative;
  max-width: 760px;
  margin: 0 0 1.4rem;
  padding-left: 1.4rem;
  border-left: 2px solid var(--j-forest);
  font-family: var(--j-serif);
  font-weight: 500;
  line-height: 1.35;
  color: var(--j-forest);
}
.j-title-main {
  display: block;
  font-size: clamp(2rem, 4.6vw, 3.1rem);
  letter-spacing: .04em;
}
.j-title-sub {
  display: block;
  margin-top: .5rem;
  font-size: clamp(1.15rem, 2.4vw, 1.55rem);
  color: var(--j-olive);
}
.j-lede {
  max-width: 620px;
  margin: 0 0 1.8rem;
  font-family: var(--j-serif);
  font-size: 1.04rem;
  color: var(--j-muted);
}
.j-meta {
  display: flex;
  flex-wrap: wrap;
  gap: .6rem;
  margin: 0 0 .9rem;
  font-size: .85rem;
  letter-spacing: .06em;
  color: var(--j-muted);
}
.j-cats {
  display: flex;
  flex-wrap: wrap;
  gap: .5rem;
  margin: 0 0 2rem;
  padding: 0;
  list-style: none;
}
.j-cats li {
  padding: .2rem .9rem;
  border: 1px solid rgba(137,154,136,.45);
  border-radius: 999px;
  background: rgba(255,255,255,.6);
  font-size: .82rem;
  color: var(--j-olive);
}
.j-actions {
  display: flex;
  flex-wrap: wrap;
  gap: .6rem;
}
.j-btn {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 1.1rem;
  border: 1px solid var(--j-line);
  border-radius: 999px;
  background: var(--j-card);
  font-size: .85rem;
  line-height: 1;
  color: var(--j-forest);
  text-decoration: none;
  cursor: pointer;
  transition: border-color .25s, transform .25s;
}
.j-btn:hover { border-color: var(--j-sage); transform: translateY(-1px); }

/* ── Layout ── */
.j-layout {
  display: grid;
  grid-template-columns: minmax(0, 760px) 232px;
  justify-content: center;
  gap: 64px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2.5rem 2rem;
}
.j-article { min-width: 0; }

/* ── TOC (desktop) ── */
.j-toc {
  position: sticky;
  top: 110px;
  align-self: start;
  max-height: calc(100vh - 140px);
  overflow-y: auto;
  padding-left: 1.2rem;
  border-left: 1px solid var(--j-line);
}
.j-toc-label {
  margin: 0 0 .8rem;
  font-size: .72rem;
  font-weight: 600;
  letter-spacing: .24em;
  color: var(--j-sage);
}
.j-toc ol, .j-toc-mobile ol { margin: 0; padding: 0; list-style: none; }
.j-toc button, .j-toc-mobile button {
  display: flex;
  align-items: baseline;
  gap: .7rem;
  width: 100%;
  padding: .32rem 0;
  border: 0;
  background: none;
  text-align: left;
  font-size: .86rem;
  line-height: 1.5;
  color: var(--j-muted);
  cursor: pointer;
  transition: color .25s;
}
.j-toc button { position: relative; }
.j-toc button::before {
  content: '';
  position: absolute;
  left: calc(-1.2rem - 1px);
  top: .35rem;
  bottom: .35rem;
  width: 2px;
  background: var(--j-forest);
  transform: scaleY(0);
  transition: transform .3s;
}
.j-toc button:hover, .j-toc-mobile button:hover { color: var(--j-forest); }
.j-toc button.is-active, .j-toc-mobile button.is-active { color: var(--j-forest); font-weight: 600; }
.j-toc button.is-active::before { transform: scaleY(1); }
.j-toc-no {
  flex-shrink: 0;
  font-size: .72rem;
  letter-spacing: .06em;
  color: var(--j-sage);
}

.j-toc-mobile { display: none; }

/* ── Sections ── */
.j-sec {
  scroll-margin-top: 100px;
  padding-bottom: 3.6rem;
  margin-bottom: 3.6rem;
  border-bottom: 1px solid var(--j-line);
}
.j-sec:last-child { border-bottom: 0; margin-bottom: 0; }
.j-sec-head {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.8rem;
}
.j-sec-no {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem;
  font-style: italic;
  color: var(--j-sage);
}
.j-sec-head h2 {
  margin: 0;
  font-family: var(--j-serif);
  font-size: clamp(1.4rem, 2.6vw, 1.75rem);
  font-weight: 500;
  line-height: 1.4;
  color: var(--j-forest);
}
.j-sec-head h2:focus { outline: none; }
.j-intro { margin-bottom: 2rem; }
.j-intro:last-child { margin-bottom: 0; }

.j-group-heading {
  margin: 2.6rem 0 1.2rem;
  font-family: var(--j-serif);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--j-forest);
}
.j-group-heading:first-child { margin-top: 0; }
.j-group-title {
  margin: 0 0 .9rem;
  font-family: var(--j-serif);
  font-size: 1.14rem;
  font-weight: 600;
  line-height: 1.6;
  color: var(--j-forest);
}
.j-step {
  margin-right: .4rem;
  font-family: var(--j-sans);
  font-size: .8rem;
  font-weight: 600;
  color: var(--j-sage);
}
.j-badge {
  display: inline-block;
  margin-bottom: .6rem;
  padding: .12rem .75rem;
  border-radius: 999px;
  background: var(--j-green-wash);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .08em;
  color: var(--j-olive);
}

/* card-like groups */
.j-groups--panels .j-group,
.j-groups--soft .j-group,
.j-groups--cards .j-group,
.j-groups--warm .j-group,
.j-groups--sop .j-group {
  padding: 1.6rem 1.8rem;
  border: 1px solid var(--j-line);
  border-radius: 18px;
  background: var(--j-card);
  box-shadow: 0 1px 2px rgba(48,54,48,.03);
  transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s;
}
.j-groups--panels, .j-groups--soft, .j-groups--cards, .j-groups--warm {
  display: grid;
  gap: 1.1rem;
}
.j-groups--cards .j-group:hover,
.j-groups--sop .j-group:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(48,54,48,.05);
}

/* 03 timeline */
.j-groups--timeline { position: relative; }
.j-groups--timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: .8rem;
  bottom: .8rem;
  width: 1px;
  background: var(--j-line);
}
.j-groups--timeline .j-group {
  position: relative;
  display: grid;
  grid-template-columns: 15px minmax(0, 1fr);
  gap: 1.6rem;
  padding-bottom: 2.4rem;
}
.j-groups--timeline .j-group:last-child { padding-bottom: 0; }
.j-groups--timeline .j-marker {
  position: relative;
  z-index: 1;
  width: 15px;
  height: 15px;
  margin-top: .5rem;
  border: 1.5px solid var(--j-forest);
  border-radius: 50%;
  background: var(--j-cream);
  box-shadow: 0 0 0 4px var(--j-cream);
}

/* 04 panels: speculative */
.tone-speculative {
  background: transparent !important;
  border-style: dashed !important;
  border-color: rgba(137,154,136,.7) !important;
}
.tone-speculative .j-badge {
  background: transparent;
  border: 1px dashed var(--j-sage);
  color: var(--j-muted);
}

/* 05 soft */
.j-sec--soft { position: relative; }
.j-groups--soft .j-group {
  background: var(--j-green-wash);
  border-color: transparent;
  box-shadow: none;
}
.j-groups--soft :deep(.jb-pull) {
  font-size: 1.3em;
  border-left-color: var(--j-olive);
}

/* 06 cards */
.j-groups--cards .j-group,
.j-groups--actions .j-group {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1.2rem;
}
.j-groups--cards .j-marker,
.j-groups--actions .j-marker {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  font-style: italic;
  line-height: 1.2;
  color: var(--j-sage);
}

/* 07 warm */
.tone-warm {
  background: #FBF8F1 !important;
  border-color: #EDE6D6 !important;
}
.tone-warm .j-badge { background: #F3EDE0; color: #7D6E52; }
.tone-unknown {
  background: transparent !important;
  border-style: dashed !important;
}
.tone-unknown .j-badge { background: transparent; border: 1px dashed var(--j-sage); color: var(--j-muted); }

/* 08 / 09 actions */
.j-groups--actions .j-group {
  padding: 1.5rem 0;
  border-top: 1px solid var(--j-line);
}
.j-groups--actions .j-group:first-child { border-top: 0; padding-top: 0; }
.j-groups--actions .j-marker {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--j-line);
  border-radius: 50%;
  background: var(--j-card);
  font-size: 1.15rem;
  color: var(--j-olive);
}
.j-groups--actions .j-badge { background: var(--j-forest); color: #fff; }
#sec-for-me .j-groups--actions .j-marker { background: var(--j-green-wash); border-color: transparent; }

/* 10 SOP */
.j-groups--sop {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.j-groups--sop .j-group-heading { grid-column: 1 / -1; margin: 1.6rem 0 0; }
.j-groups--sop .j-group-heading:first-child { margin-top: 0; }
.j-groups--sop .j-group:nth-last-child(-n+3) { grid-column: 1 / -1; }
.j-groups--sop .j-group { border-top-width: 3px; }
.tone-yellow { border-top-color: #DCCB8E !important; }
.tone-yellow .j-badge { background: #F5EFD8; color: #7A6A33; }
.tone-orange { border-top-color: #DDB08C !important; }
.tone-orange .j-badge { background: #F6E8DC; color: #8A5B3C; }
.tone-sage { border-top-color: var(--j-sage) !important; }
.tone-forest { border-top-color: var(--j-forest) !important; }
.tone-forest .j-badge { background: var(--j-forest); color: #fff; }

/* 11 growth */
.j-sec--prose :deep(.jb-pull) { font-size: 1.24em; }

/* 12 letter */
.j-letter {
  position: relative;
  padding: 3.2rem 3rem;
  border-radius: 20px;
  background: var(--j-forest);
  color: #F6F5EF;
  font-family: var(--j-serif);
  font-size: 1.04rem;
  line-height: 2.05;
}
.j-letter::after {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1px solid rgba(246,245,239,.14);
  border-radius: 14px;
  pointer-events: none;
}
.j-letter-title {
  margin: 0 0 1.8rem;
  font-family: var(--j-serif);
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: .1em;
  color: #F6F5EF;
}
.j-letter :deep(.jb-pull) {
  margin: 2rem 0;
  border-left-color: rgba(246,245,239,.6);
  color: #FFFFFF;
}

/* ── Summary ── */
.j-summary {
  max-width: 760px;
  margin: 2rem auto 0;
  padding: 4rem 2.5rem 6rem;
  text-align: center;
  border-top: 1px solid var(--j-line);
}
.j-summary-label {
  margin: 0 0 1rem;
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .3em;
  color: var(--j-olive);
}
.j-summary-text {
  margin: 0 auto 2.4rem;
  max-width: 600px;
  font-family: var(--j-serif);
  font-size: 1.04rem;
  color: var(--j-ink);
}
.j-closing {
  margin: 0;
  font-family: var(--j-serif);
  font-size: 1.3rem;
  letter-spacing: .2em;
  color: var(--j-forest);
}

/* ── Back to top ── */
.j-top {
  position: fixed;
  right: 1.4rem;
  bottom: 1.4rem;
  z-index: 180;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--j-line);
  border-radius: 50%;
  background: rgba(255,255,255,.92);
  color: var(--j-forest);
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(8px);
  transition: opacity .3s, transform .3s, visibility .3s;
}
.j-top.is-visible { opacity: 1; visibility: visible; transform: none; }
.j-top svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }

.j-missing { padding: 6rem 2rem; text-align: center; }

/* ── Responsive ── */
@media (max-width: 1080px) {
  .j-layout { grid-template-columns: minmax(0, 760px); gap: 0; padding-top: 2.5rem; }
  .j-toc { display: none; }
  .j-toc-mobile {
    display: block;
    max-width: 760px;
    margin: 2rem auto 0;
    border: 1px solid var(--j-line);
    border-radius: 16px;
    background: var(--j-card);
  }
  .j-toc-mobile summary {
    padding: .9rem 1.2rem;
    min-height: 44px;
    font-size: .9rem;
    font-weight: 600;
    letter-spacing: .1em;
    color: var(--j-forest);
    cursor: pointer;
  }
  .j-toc-mobile ol { padding: 0 1.2rem 1rem; }
  .j-toc-mobile button { padding: .5rem 0; min-height: 40px; }
  .j-hero-leaves { opacity: .25; }
}
@media (max-width: 1080px) and (min-width: 800px) {
  .j-toc-mobile { margin-left: auto; margin-right: auto; width: calc(100% - 5rem); }
}
@media (max-width: 799px) {
  .j-toc-mobile { margin: 1.6rem 1.25rem 0; }
}

@media (max-width: 640px) {
  .j-page { font-size: 16px; line-height: 1.9; }
  .j-hero-inner { padding: 3.5rem 1.25rem 2.8rem; }
  .j-hero-leaves { width: 200px; right: -40px; top: 30%; opacity: .18; }
  .j-title { padding-left: 1rem; }
  .j-layout { padding: 2.2rem 1.25rem 1rem; }
  .j-sec { padding-bottom: 2.6rem; margin-bottom: 2.6rem; }
  .j-groups--panels .j-group,
  .j-groups--soft .j-group,
  .j-groups--cards .j-group,
  .j-groups--warm .j-group,
  .j-groups--sop .j-group { padding: 1.25rem 1.15rem; border-radius: 16px; }
  .j-groups--sop { grid-template-columns: minmax(0, 1fr); }
  .j-groups--cards .j-group { grid-template-columns: minmax(0, 1fr); gap: .2rem; }
  .j-groups--timeline .j-group { gap: 1rem; }
  .j-groups--actions .j-group { gap: .9rem; }
  .j-groups--actions .j-marker { width: 2.2rem; height: 2.2rem; font-size: 1rem; }
  .j-letter { padding: 2.2rem 1.4rem; }
  .j-letter::after { inset: 8px; }
  .j-summary { padding: 3rem 1.25rem 5rem; }
  .j-top { right: 1rem; bottom: 1rem; }
  .j-page :deep(.jb-info) { grid-template-columns: minmax(0, 1fr); }
}

@media (prefers-reduced-motion: reduce) {
  .j-page, .j-btn, .j-group, .j-top, .j-progress span { animation: none !important; transition: none !important; }
}

/* ── Print ── */
@media print {
  :global(.sub-bar), .j-progress, .j-toc, .j-toc-mobile, .j-actions, .j-top, .j-hero-leaves { display: none !important; }
  .j-page { animation: none; background: #fff; }
  .j-layout { display: block; padding: 0 0 1rem; }
  .j-hero { background: none; }
  .j-hero-inner { padding: 1rem 0 2rem; }
  .j-sec { break-inside: auto; }
  .j-group { break-inside: avoid; box-shadow: none !important; }
  .j-letter { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
