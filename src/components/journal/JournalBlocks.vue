<template>
  <template v-for="(b, i) in blocks" :key="i">
    <p v-if="b.t === 'p'" class="jb-p"><RichText :text="b.text" /></p>

    <blockquote v-else-if="b.t === 'quote'" class="jb-quote"><RichText :text="b.text" /></blockquote>

    <p v-else-if="b.t === 'say'" class="jb-say" :class="b.tone ? `jb-say--${b.tone}` : ''">
      <span v-if="b.tone" class="jb-say-tag">{{ b.tone === 'avoid' ? '不要說' : '可以這樣說' }}</span>
      <RichText :text="b.text" />
    </p>

    <ul v-else-if="b.t === 'ul'" class="jb-list">
      <li v-for="(it, j) in b.items" :key="j"><RichText :text="it" /></li>
    </ul>

    <ol v-else-if="b.t === 'ol'" class="jb-list jb-list--ol">
      <li v-for="(it, j) in b.items" :key="j"><RichText :text="it" /></li>
    </ol>

    <h4 v-else-if="b.t === 'h'" class="jb-h"><RichText :text="b.text" /></h4>

    <aside v-else-if="b.t === 'note'" class="jb-note" :class="b.tone === 'speculative' ? 'jb-note--spec' : ''">
      <span v-if="b.label" class="jb-note-label">{{ b.label }}</span>
      <RichText :text="b.text" />
    </aside>

    <p v-else-if="b.t === 'pull'" class="jb-pull"><RichText :text="b.text" /></p>

    <dl v-else-if="b.t === 'info'" class="jb-info">
      <div v-for="row in b.rows" :key="row.k" class="jb-info-row" :class="{ 'jb-info-row--wide': row.tags || row.v.length > 24 }">
        <dt>{{ row.k }}</dt>
        <dd>
          <template v-if="row.v">{{ row.v }}</template>
          <span v-if="row.tags" class="jb-tags">
            <span v-for="tag in row.tags" :key="tag" class="jb-tag">{{ tag }}</span>
          </span>
        </dd>
      </div>
    </dl>

    <ul v-else-if="b.t === 'tags'" class="jb-tags jb-tags--lg" aria-label="標籤">
      <li v-for="tag in b.items" :key="tag" class="jb-tag">{{ tag }}</li>
    </ul>

    <ul v-else-if="b.t === 'check'" class="jb-check">
      <li v-for="(it, j) in b.items" :key="j">
        <label class="jb-check-item" :class="{ 'is-done': state[`${b.id}-${j}`] }">
          <input v-model="state[`${b.id}-${j}`]" type="checkbox" class="jb-check-input" />
          <span class="jb-check-box" aria-hidden="true">
            <svg viewBox="0 0 16 16"><path d="M3.5 8.5 L6.5 11.5 L12.5 4.5" /></svg>
          </span>
          <span class="jb-check-text"><RichText :text="it" /></span>
        </label>
      </li>
    </ul>
  </template>
</template>

<script setup lang="ts">
import { inject, reactive } from 'vue'
import type { Block } from '@/data/relationship/types'
import RichText from './RichText.vue'
import { checklistKey, type ChecklistState } from './checklist'

defineProps<{ blocks: Block[] }>()

const state: ChecklistState = inject(checklistKey, () => reactive({}), true)
</script>

<style scoped>
.jb-p {
  margin: 0 0 1.05em;
}
.jb-p:last-child { margin-bottom: 0; }

.jb-quote {
  margin: 1.2em 0 1.4em;
  padding: .9em 1.2em;
  border-left: 2px solid var(--j-sage);
  background: var(--j-green-wash);
  border-radius: 0 12px 12px 0;
  font-family: var(--j-serif);
  font-size: 1.06em;
  color: var(--j-forest);
}

.jb-say {
  position: relative;
  margin: .7em 0 1em;
  padding: .85em 1.15em;
  border: 1px solid var(--j-line);
  border-radius: 14px;
  background: var(--j-card);
  font-family: var(--j-serif);
  color: var(--j-forest);
}
.jb-say--avoid { color: var(--j-muted); border-style: dashed; background: transparent; }
.jb-say--avoid :deep(*) { text-decoration: line-through; text-decoration-color: rgba(133,135,127,.5); }
.jb-say--try { border-color: rgba(102,123,97,.35); background: var(--j-green-wash); }
.jb-say-tag {
  display: block;
  margin-bottom: .3em;
  font-family: var(--j-sans);
  font-size: .72rem;
  letter-spacing: .12em;
  color: var(--j-olive);
  text-decoration: none;
}
.jb-say--avoid .jb-say-tag { color: var(--j-muted); }

.jb-list {
  margin: .4em 0 1.2em;
  padding-left: 0;
  list-style: none;
}
.jb-list li {
  position: relative;
  padding-left: 1.4em;
  margin-bottom: .45em;
}
.jb-list li::before {
  content: '';
  position: absolute;
  left: .25em;
  top: .85em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid var(--j-olive);
}
.jb-list--ol { counter-reset: jb; }
.jb-list--ol li { counter-increment: jb; padding-left: 2.1em; }
.jb-list--ol li::before {
  content: counter(jb, decimal-leading-zero);
  top: .12em;
  left: 0;
  width: auto;
  height: auto;
  border: 0;
  font-family: var(--j-sans);
  font-size: .78em;
  font-weight: 600;
  letter-spacing: .04em;
  color: var(--j-olive);
}

.jb-h {
  margin: 1.5em 0 .5em;
  font-family: var(--j-serif);
  font-size: 1.08rem;
  font-weight: 600;
  color: var(--j-forest);
}
.jb-h:first-child { margin-top: 0; }

.jb-note {
  margin: 1.3em 0;
  padding: .95em 1.15em;
  border-radius: 14px;
  background: var(--j-green-wash);
  font-size: .94em;
  color: var(--j-ink);
}
.jb-note-label {
  display: block;
  margin-bottom: .3em;
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .14em;
  color: var(--j-olive);
}
.jb-note--spec {
  background: transparent;
  border: 1px dashed rgba(137,154,136,.7);
  color: var(--j-muted);
  font-style: italic;
}

.jb-pull {
  margin: 1.5em 0;
  padding: .2em 0 .2em 1.1em;
  border-left: 3px solid var(--j-forest);
  font-family: var(--j-serif);
  font-size: 1.16em;
  font-weight: 500;
  line-height: 1.8;
  color: var(--j-forest);
}

.jb-info {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1px;
  margin: 0 0 1.4em;
  border: 1px solid var(--j-line);
  border-radius: 16px;
  overflow: hidden;
  background: var(--j-line);
}
.jb-info-row {
  padding: 1em 1.2em;
  background: var(--j-card);
}
.jb-info-row--wide { grid-column: 1 / -1; }
.jb-info dt {
  margin-bottom: .3em;
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .16em;
  color: var(--j-sage);
}
.jb-info dd { margin: 0; font-size: .95em; }

.jb-tags {
  display: flex;
  flex-wrap: wrap;
  gap: .45em;
  margin: .1em 0 0;
  padding: 0;
  list-style: none;
}
.jb-tag {
  display: inline-block;
  padding: .22em .8em;
  border: 1px solid var(--j-line);
  border-radius: 999px;
  background: var(--j-green-wash);
  font-size: .82rem;
  line-height: 1.6;
  color: var(--j-olive);
}
.jb-tags--lg { gap: .6em; }
.jb-tags--lg .jb-tag { padding: .35em 1em; font-size: .88rem; background: var(--j-card); }

.jb-check { margin: 0; padding: 0; list-style: none; }
.jb-check li + li { margin-top: .2em; }
.jb-check-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: .75em;
  padding: .5em .6em;
  margin: 0 -.6em;
  border-radius: 10px;
  cursor: pointer;
  transition: background .2s;
}
.jb-check-item:hover { background: rgba(255,255,255,.6); }
.jb-check-input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
.jb-check-box {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  margin-top: .3em;
  border: 1.5px solid var(--j-sage);
  border-radius: 6px;
  background: var(--j-card);
  transition: background .25s, border-color .25s;
}
.jb-check-box svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16;
  stroke-dashoffset: 16;
  transition: stroke-dashoffset .3s ease .05s;
}
.jb-check-input:focus-visible + .jb-check-box { outline: 2px solid var(--j-forest); outline-offset: 2px; }
.is-done .jb-check-box { background: var(--j-forest); border-color: var(--j-forest); }
.is-done .jb-check-box svg { stroke-dashoffset: 0; }
.jb-check-text { transition: color .25s; }
.is-done .jb-check-text { color: var(--j-muted); }

@media (prefers-reduced-motion: reduce) {
  .jb-check-box, .jb-check-box svg, .jb-check-text { transition: none; }
}
</style>
