<template>
  <PortfolioPageShell>
    <PortfolioSubNav back-to="/journal" back-label="‹ Life Journal" />

    <div class="rj">
      <!-- ───────── Hero ───────── -->
      <header class="rj-hero">
        <div class="rj-hero-text">
          <p class="rj-kicker"><span aria-hidden="true" />OUR LITTLE STORY</p>
          <h1 class="rj-title">關係成長日記</h1>
          <p class="rj-sub">把一起走過的日子、說過的話，還有慢慢學會的事情，好好收藏起來。</p>
          <p class="rj-intro">有些衝突不是為了分出對錯，而是讓我們重新理解彼此，也更了解自己。</p>
          <button type="button" class="rj-cta" @click="toCollection">
            翻開收藏冊
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" /></svg>
          </button>
        </div>

        <div class="rj-collage">
          <figure class="rj-polaroid">
            <span class="rj-tape rj-tape--a" aria-hidden="true" />
            <span class="rj-tape rj-tape--b" aria-hidden="true" />
            <img
              :src="heroSrc"
              width="520"
              height="420"
              alt="手繪插畫：兩隻小狗狗並肩坐在草地上，上方有一顆愛心"
            />
            <figcaption>許寶 &amp; 仔仔</figcaption>
          </figure>

          <p class="rj-sticky" aria-hidden="true">一頁一頁，<br />慢慢收藏 ♡</p>

          <span v-if="startStamp" class="rj-stamp" aria-hidden="true">
            <small>SINCE</small>
            <b>{{ startStamp }}</b>
          </span>

          <svg class="rj-doodle rj-doodle--heart" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
          </svg>
          <svg class="rj-doodle rj-doodle--star" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.5l2.4 7.1 7.1 2.4-7.1 2.4L12 21.5l-2.4-7.1L2.5 12l7.1-2.4Z" />
          </svg>
        </div>
      </header>

      <!-- ───────── Overview ───────── -->
      <dl class="rj-overview">
        <div class="rj-ov">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>
          <dt>我們的名字</dt>
          <dd>許寶 &amp; 仔仔</dd>
        </div>
        <div class="rj-ov">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h10l4 4v12H5Z M15 4v4h4 M8 12h8 M8 16h6" /></svg>
          <dt>收藏主題</dt>
          <dd>{{ themes }}</dd>
        </div>
        <div class="rj-ov">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h7a2 2 0 0 1 2 2v11a2 2 0 0 0-2-2H4Z M20 6h-7 M20 6v11h-7" /></svg>
          <dt>回憶數量</dt>
          <dd>{{ entries.length }} 篇</dd>
        </div>
        <div class="rj-ov">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v13H4Z M4 11h16 M8 4v5 M16 4v5" /></svg>
          <dt>開始收藏</dt>
          <dd>{{ startDate }}</dd>
        </div>
      </dl>

      <!-- ───────── Categories ───────── -->
      <nav class="rj-cats" aria-label="故事分類">
        <button
          v-for="c in filters"
          :key="c.id"
          type="button"
          class="rj-cat"
          :aria-pressed="filter === c.id"
          @click="filter = c.id"
        >
          <span class="rj-cat-en">{{ c.en }}</span>
          <span class="rj-cat-zh">{{ c.zh }}</span>
          <span class="rj-cat-n">{{ c.count }}</span>
        </button>
      </nav>

      <Transition name="rj-fade" mode="out-in">
        <div :key="filter" class="rj-stage">
          <!-- ───────── Featured ───────── -->
          <section v-if="showFeatured && featuredEntry" class="rj-featured" aria-labelledby="rj-featured-title">
            <RouterLink :to="`/journal/quarrel/${featuredEntry.slug}`" class="rj-feature">
              <div class="rj-feature-media">
                <span class="rj-tape rj-tape--c" aria-hidden="true" />
                <img :src="coverSrc(featuredEntry)" :alt="featuredEntry.cover.alt" width="400" height="300" />
              </div>
              <div class="rj-feature-body">
                <p class="rj-label">FEATURED STORY</p>
                <h2 id="rj-featured-title" class="rj-feature-title">{{ featuredEntry.title }}</h2>
                <p class="rj-feature-sub">{{ featuredEntry.subtitle }}</p>
                <p class="rj-feature-sum">{{ featuredEntry.summary }}</p>
                <p class="rj-meta">
                  <time :datetime="featuredEntry.date">{{ formatDate(featuredEntry.date) }}</time>
                  <span aria-hidden="true">·</span>
                  <span>{{ collectionOf(featuredEntry).en }}</span>
                  <span aria-hidden="true">·</span>
                  <span>{{ readingMinutes(featuredEntry) }} MIN READ</span>
                </p>
                <span class="rj-more">閱讀更多 <span aria-hidden="true">→</span></span>
              </div>
            </RouterLink>
          </section>

          <!-- ───────── Collection ───────── -->
          <section
            v-if="listed.length || !showFeatured"
            id="rj-collection"
            class="rj-collection"
            aria-labelledby="rj-collection-title"
            tabindex="-1"
          >
            <header class="rj-head">
              <p class="rj-label">LITTLE MOMENTS</p>
              <h2 id="rj-collection-title">日記收藏</h2>
            </header>

            <ul v-if="listed.length" class="rj-grid">
              <li v-for="(e, i) in listed" :key="e.slug">
                <RouterLink
                  :to="`/journal/quarrel/${e.slug}`"
                  class="rj-card"
                  :class="[{ 'is-pinned': e.pinned }, `deco-${i % 3}`]"
                >
                  <div class="rj-card-media">
                    <img :src="coverSrc(e)" :alt="e.cover.alt" width="400" height="300" loading="lazy" />
                    <span v-if="e.pinned" class="rj-pin">置頂</span>
                    <span class="rj-postmark" aria-hidden="true">{{ postmark(e.date) }}</span>
                  </div>
                  <span v-if="i % 3 === 0" class="rj-tape rj-tape--card" aria-hidden="true" />
                  <svg v-if="i % 3 === 1" class="rj-sticker" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
                  </svg>
                  <div class="rj-card-body">
                    <p class="rj-card-cat">{{ collectionOf(e).en }} · {{ collectionOf(e).zh }}</p>
                    <h3 class="rj-card-title">{{ e.title }}</h3>
                    <p class="rj-card-sum">{{ e.summary }}</p>
                    <p class="rj-meta">
                      <time :datetime="e.date">{{ formatDate(e.date) }}</time>
                      <span aria-hidden="true">·</span>
                      <span>閱讀約 {{ readingMinutes(e) }} 分鐘</span>
                    </p>
                  </div>
                </RouterLink>
              </li>
            </ul>

            <div v-else class="rj-empty">
              <img :src="emptySrc" alt="" width="400" height="300" loading="lazy" />
              <p>這個分類還沒有收藏，之後再一起寫下來吧。</p>
            </div>
          </section>
        </div>
      </Transition>
    </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import PortfolioPageShell from '@/components/portfolio/PortfolioPageShell.vue'
import PortfolioSubNav from '@/components/portfolio/PortfolioSubNav.vue'
import {
  collectionOf,
  collectionsInUse,
  coverSrc,
  entries,
  featuredEntry,
  formatDate,
  readingMinutes,
} from '@/data/relationship'
import type { Collection } from '@/data/relationship/types'

type Filter = 'all' | Collection

const base = import.meta.env.BASE_URL
const heroSrc = `${base}images/journal/puppies.svg`
const emptySrc = `${base}images/journal/puppy.svg`

const filter = ref<Filter>('all')

const filters = computed(() => [
  { id: 'all' as Filter, en: 'ALL', zh: '全部', count: entries.length },
  ...collectionsInUse.map(c => ({
    id: c.id as Filter,
    en: c.en,
    zh: c.zh,
    count: entries.filter(e => e.collection === c.id).length,
  })),
])

const showFeatured = computed(
  () => !!featuredEntry && (filter.value === 'all' || featuredEntry.collection === filter.value),
)

const listed = computed(() =>
  entries.filter(
    e =>
      (filter.value === 'all' || e.collection === filter.value) &&
      !(showFeatured.value && e.slug === featuredEntry?.slug),
  ),
)

const themes = computed(() => collectionsInUse.map(c => c.zh).join('、'))

const earliest = entries.map(e => e.date).sort()[0]
const startDate = earliest ? formatDate(earliest) : '—'
const startStamp = earliest ? earliest.slice(0, 7).replace('-', '.') : ''

/** 2026-11-04 → 11.04 */
const postmark = (iso: string) => iso.slice(5).replace('-', '.')

function toCollection() {
  const el = document.getElementById('rj-collection') ?? document.querySelector<HTMLElement>('.rj-featured')
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  el.focus({ preventScroll: true })
}
</script>

<style scoped>
.rj {
  /* 沿用網站既有色票（PortfolioPageShell 的 --mg-* 與日記內頁的綠色系） */
  --rj-forest: #344B3F;
  --rj-olive:  #667B61;
  --rj-sage:   #899A88;
  --rj-wash:   #E9EEE7;
  --rj-line:   #E5E4DC;
  --rj-ink:    #303630;
  --rj-muted:  #85877F;
  --rj-paper:  var(--mg-bg-card);
  --rj-beige:  var(--mg-bg-beige-soft);
  --rj-sand:   var(--mg-sand);
  --rj-clay:   var(--mg-clay);
  --rj-serif:  'Noto Serif TC', 'Cormorant Garamond', serif;
  --rj-deco:   'Cormorant Garamond', 'Noto Serif TC', serif;
  --rj-sans:   var(--mg-font-body);
  --rj-ease:   cubic-bezier(.16, 1, .3, 1);

  max-width: 1180px;
  margin: 0 auto;
  padding: 0 2.5rem 6rem;
  overflow-x: clip;
  font-family: var(--rj-sans);
  color: var(--rj-ink);
}

button { font: inherit; }
.rj :focus-visible { outline: 2px solid var(--rj-forest); outline-offset: 3px; }

/* ── shared ── */
.rj-label {
  margin: 0 0 .7rem;
  font-family: var(--rj-sans);
  font-size: .72rem;
  font-weight: 600;
  letter-spacing: .26em;
  color: var(--mg-green-main);
}
.rj-meta {
  display: flex;
  flex-wrap: wrap;
  gap: .45rem;
  margin: 0;
  font-size: .78rem;
  letter-spacing: .06em;
  color: var(--rj-muted);
}
.rj-tape {
  position: absolute;
  z-index: 2;
  width: 92px;
  height: 24px;
  background:
    repeating-linear-gradient(90deg, rgba(255,255,255,.25) 0 6px, transparent 6px 12px),
    rgba(216, 200, 178, .62);
  box-shadow: 0 1px 2px rgba(48,54,48,.06);
  pointer-events: none;
}

/* ───────── Hero ───────── */
.rj-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
  align-items: center;
  gap: 3rem;
  padding: 4.5rem 0 3.5rem;
}
.rj-kicker {
  display: flex;
  align-items: center;
  gap: .8rem;
  margin: 0 0 1.4rem;
  font-family: var(--rj-deco);
  font-style: italic;
  font-size: 1.1rem;
  letter-spacing: .2em;
  color: var(--rj-olive);
}
.rj-kicker span { width: 2.4rem; height: 1px; background: var(--rj-sage); }
.rj-title {
  margin: 0 0 1.2rem;
  font-family: var(--rj-serif);
  font-weight: 500;
  font-size: clamp(2.3rem, 5.4vw, 3.6rem);
  line-height: 1.2;
  letter-spacing: .06em;
  color: var(--rj-forest);
}
.rj-sub {
  max-width: 30em;
  text-wrap: pretty;
  margin: 0 0 1rem;
  font-family: var(--rj-serif);
  font-size: clamp(1.02rem, 1.8vw, 1.18rem);
  line-height: 1.85;
  color: var(--rj-olive);
}
.rj-intro {
  max-width: 32em;
  text-wrap: pretty;
  margin: 0 0 2rem;
  font-size: .92rem;
  line-height: 1.9;
  color: var(--mg-text-muted);
}
.rj-cta {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  min-height: 44px;
  padding: 0 1.4rem;
  border: 1px solid var(--rj-forest);
  border-radius: 999px;
  background: var(--rj-forest);
  color: #fff;
  font-size: .86rem;
  letter-spacing: .08em;
  cursor: pointer;
  transition: background .2s, color .2s;
}
.rj-cta svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.rj-cta:hover { background: transparent; color: var(--rj-forest); }

/* collage */
.rj-collage {
  position: relative;
  justify-self: center;
  width: min(100%, 440px);
  padding: 1.5rem 1.5rem 2.5rem;
}
.rj-polaroid {
  position: relative;
  margin: 0;
  padding: 14px 14px 0;
  background: #fff;
  border: 1px solid var(--rj-line);
  box-shadow: 0 18px 40px rgba(48,54,48,.09), 0 2px 4px rgba(48,54,48,.04);
  transform: rotate(-2.5deg);
}
.rj-polaroid img { display: block; width: 100%; height: auto; }
.rj-polaroid figcaption {
  padding: .9rem 0 1.1rem;
  text-align: center;
  font-family: var(--rj-deco);
  font-style: italic;
  font-size: 1.2rem;
  letter-spacing: .08em;
  color: var(--rj-olive);
}
.rj-tape--a { top: -10px; left: 22px; transform: rotate(-8deg); }
.rj-tape--b { top: -8px; right: 18px; width: 70px; transform: rotate(10deg); }
.rj-sticky {
  position: absolute;
  left: -.5rem;
  bottom: .4rem;
  z-index: 3;
  margin: 0;
  padding: .8rem 1rem;
  background: var(--rj-beige);
  border: 1px solid var(--rj-sand);
  box-shadow: 0 6px 14px rgba(48,54,48,.07);
  font-family: var(--rj-serif);
  font-size: .82rem;
  line-height: 1.6;
  color: var(--mg-brown);
  transform: rotate(4deg);
}
.rj-stamp {
  position: absolute;
  top: .2rem;
  right: -.4rem;
  z-index: 3;
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  border: 1.5px dashed var(--rj-sage);
  border-radius: 50%;
  background: rgba(251,250,247,.9);
  color: var(--rj-olive);
  transform: rotate(12deg);
  text-align: center;
  line-height: 1.1;
}
.rj-stamp small { display: block; font-size: .6rem; letter-spacing: .3em; }
.rj-stamp b { font-family: var(--rj-deco); font-size: 1.15rem; font-weight: 600; }
.rj-doodle { position: absolute; z-index: 3; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.rj-doodle--heart { left: .2rem; top: 1.4rem; width: 30px; stroke: var(--rj-clay); stroke-width: 1.6; transform: rotate(-14deg); }
.rj-doodle--star { right: 1.2rem; bottom: 1.2rem; width: 26px; stroke: var(--mg-brown); stroke-width: 1.4; }

/* ───────── Overview ───────── */
.rj-overview {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .9rem;
  margin: 0 0 3rem;
}
.rj-ov {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: .8rem;
  align-items: center;
  padding: 1rem 1.15rem;
  border: 1px solid var(--rj-line);
  border-radius: 14px;
  background: var(--rj-paper);
}
.rj-ov svg {
  grid-row: 1 / 3;
  width: 34px;
  height: 34px;
  padding: 7px;
  border-radius: 50%;
  background: var(--rj-wash);
  fill: none;
  stroke: var(--rj-olive);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.rj-ov dt { font-size: .72rem; letter-spacing: .12em; color: var(--rj-muted); }
.rj-ov dd { margin: .15rem 0 0; font-family: var(--rj-serif); font-size: .98rem; color: var(--rj-forest); }

/* ───────── Categories ───────── */
.rj-cats {
  display: flex;
  gap: .6rem;
  margin: 0 0 2.4rem;
  padding: .2rem .1rem .4rem;
  overflow-x: auto;
  scrollbar-width: none;
}
.rj-cats::-webkit-scrollbar { display: none; }
.rj-cat {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  min-height: 44px;
  padding: 0 1.1rem;
  border: 1px solid var(--mg-border-soft);
  border-radius: 999px;
  background: transparent;
  color: var(--mg-text-body);
  cursor: pointer;
  transition: background .2s, border-color .2s, color .2s;
}
.rj-cat:hover { border-color: var(--mg-border-hover); background: var(--rj-paper); }
.rj-cat[aria-pressed='true'] { border-color: var(--rj-forest); background: var(--rj-forest); color: #fff; }
.rj-cat-en { font-size: .7rem; font-weight: 600; letter-spacing: .16em; }
.rj-cat-zh { font-size: .84rem; }
.rj-cat-n {
  min-width: 1.4rem;
  padding: 0 .35rem;
  border-radius: 999px;
  background: var(--rj-wash);
  font-size: .7rem;
  line-height: 1.4rem;
  color: var(--rj-olive);
}
.rj-cat[aria-pressed='true'] .rj-cat-n { background: rgba(255,255,255,.18); color: #fff; }

.rj-fade-enter-active, .rj-fade-leave-active { transition: opacity .2s ease, transform .2s ease; }
.rj-fade-enter-from { opacity: 0; transform: translateY(6px); }
.rj-fade-leave-to { opacity: 0; }

/* ───────── Featured ───────── */
.rj-featured { margin: 0 0 4rem; }
.rj-feature {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  align-items: center;
  gap: 3rem;
  text-decoration: none;
  color: inherit;
}
.rj-feature-media {
  position: relative;
  padding: 12px;
  background: #fff;
  border: 1px solid var(--rj-line);
  border-radius: 6px;
  box-shadow: 0 16px 36px rgba(48,54,48,.08);
  transform: rotate(-1.2deg);
  transition: transform .25s var(--rj-ease), box-shadow .25s;
}
.rj-feature-media img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 3px;
  transition: transform .25s var(--rj-ease);
}
.rj-feature-media { overflow: visible; }
.rj-tape--c { top: -12px; left: 50%; margin-left: -46px; transform: rotate(-3deg); }
.rj-feature:hover .rj-feature-media { transform: rotate(0deg) translateY(-4px); box-shadow: 0 22px 44px rgba(48,54,48,.11); }
.rj-feature-title {
  margin: 0 0 .5rem;
  font-family: var(--rj-serif);
  font-weight: 500;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  line-height: 1.35;
  color: var(--rj-forest);
}
.rj-feature-sub { margin: 0 0 1rem; font-family: var(--rj-serif); font-size: 1.02rem; color: var(--rj-olive); }
.rj-feature-sum { margin: 0 0 1.2rem; font-size: .92rem; line-height: 1.9; color: var(--mg-text-body); }
.rj-more {
  display: inline-flex;
  gap: .4rem;
  margin-top: 1.3rem;
  padding-bottom: .2rem;
  border-bottom: 1px solid var(--rj-forest);
  font-size: .86rem;
  letter-spacing: .08em;
  color: var(--rj-forest);
}
.rj-more span { transition: transform .2s; }
.rj-feature:hover .rj-more span { transform: translateX(4px); }

/* ───────── Collection ───────── */
.rj-collection:focus { outline: none; }
.rj-head { margin: 0 0 1.8rem; }
.rj-head h2 {
  margin: 0;
  font-family: var(--rj-serif);
  font-weight: 500;
  font-size: clamp(1.5rem, 2.6vw, 1.9rem);
  color: var(--rj-forest);
}
.rj-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2.2rem 1.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
.rj-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--rj-line);
  border-radius: 16px;
  background: #fff;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 2px rgba(48,54,48,.03);
  transition: transform .22s var(--rj-ease), box-shadow .22s, border-color .22s;
}
.rj-card:hover { transform: translateY(-4px); border-color: var(--mg-border-hover); box-shadow: 0 14px 30px rgba(48,54,48,.08); }
.rj-card.is-pinned { background: #F6F8F4; border-color: #C9D2C6; }
.rj-card-media {
  position: relative;
  aspect-ratio: 4 / 3;
  margin: 10px 10px 0;
  overflow: hidden;
  border-radius: 10px;
  background: var(--rj-wash);
}
.deco-1 .rj-card-media { border-radius: 10px 10px 36px 10px; }
.rj-card-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .22s var(--rj-ease);
}
.rj-card:hover .rj-card-media img { transform: scale(1.04); }
.rj-pin {
  position: absolute;
  top: .7rem;
  left: .7rem;
  padding: .1rem .65rem;
  border-radius: 999px;
  background: var(--rj-forest);
  font-size: .7rem;
  font-weight: 600;
  letter-spacing: .14em;
  color: #fff;
}
.rj-postmark {
  position: absolute;
  right: .7rem;
  bottom: .7rem;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border: 1.5px solid rgba(102,123,97,.55);
  border-radius: 50%;
  outline: 1px dashed rgba(102,123,97,.35);
  outline-offset: 3px;
  background: rgba(251,250,247,.82);
  font-family: var(--rj-deco);
  font-size: .95rem;
  font-weight: 600;
  color: var(--rj-olive);
  transform: rotate(-10deg);
}
.rj-tape--card { top: -11px; left: 50%; width: 76px; margin-left: -38px; transform: rotate(-4deg); }
.rj-sticker {
  position: absolute;
  top: -12px;
  right: 14px;
  z-index: 2;
  width: 34px;
  height: 34px;
  fill: var(--rj-paper);
  stroke: var(--rj-clay);
  stroke-width: 1.6;
  stroke-linejoin: round;
  filter: drop-shadow(0 2px 3px rgba(48,54,48,.12));
  transform: rotate(12deg);
  transition: transform .22s var(--rj-ease);
}
.rj-card:hover .rj-sticker { transform: rotate(-6deg) scale(1.06); }
.rj-card-body { display: flex; flex-direction: column; gap: .45rem; flex: 1; padding: 1.1rem 1.3rem 1.3rem; }
.rj-card-cat { margin: 0; font-size: .68rem; font-weight: 600; letter-spacing: .16em; color: var(--mg-green-main); }
.rj-card-title {
  margin: 0;
  font-family: var(--rj-serif);
  font-weight: 500;
  font-size: 1.16rem;
  line-height: 1.5;
  color: var(--rj-forest);
}
.rj-card-sum {
  display: -webkit-box;
  margin: 0 0 .4rem;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  font-size: .86rem;
  line-height: 1.8;
  color: #5d625b;
}
.rj-card .rj-meta { margin-top: auto; }

.rj-empty { display: grid; justify-items: center; gap: 1rem; padding: 2rem 0; color: var(--rj-muted); }
.rj-empty img { width: min(260px, 70%); height: auto; border-radius: 16px; }

/* ───────── Responsive ───────── */
@media (max-width: 1023px) {
  .rj-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .rj-overview { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .rj-hero { gap: 2rem; }
  .rj-feature { gap: 2rem; }
}

@media (max-width: 767px) {
  .rj { padding: 0 1.25rem 4rem; }
  .rj-hero { grid-template-columns: minmax(0, 1fr); padding: 2.8rem 0 2rem; }
  .rj-collage { width: min(100%, 340px); padding: 1rem 1rem 2rem; }
  .rj-doodle, .rj-tape--b { display: none; }
  .rj-stamp { width: 70px; height: 70px; right: -.2rem; }
  .rj-stamp b { font-size: 1rem; }
  .rj-sticky { left: 0; font-size: .76rem; }
  .rj-overview { gap: .6rem; margin-bottom: 2.2rem; }
  .rj-ov { padding: .85rem .9rem; column-gap: .6rem; }
  .rj-ov svg { width: 30px; height: 30px; padding: 6px; }
  .rj-cats { margin: 0 -1.25rem 2rem; padding: .2rem 1.25rem .4rem; }
  .rj-feature { grid-template-columns: minmax(0, 1fr); gap: 1.6rem; }
  .rj-featured { margin-bottom: 3rem; }
  .rj-grid { grid-template-columns: minmax(0, 1fr); gap: 1.8rem; }
}

@media (max-width: 380px) {
  .rj-overview { grid-template-columns: minmax(0, 1fr); }
}

@media (prefers-reduced-motion: reduce) {
  .rj *, .rj *::before, .rj *::after { transition: none !important; animation: none !important; }
  .rj-card:hover, .rj-feature:hover .rj-feature-media { transform: none; }
  .rj-card:hover .rj-card-media img { transform: none; }
}
</style>
