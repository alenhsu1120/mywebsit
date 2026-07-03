<template>
  <div class="chart-wrap">
    <svg v-if="coords.length >= 1" viewBox="0 0 220 64" class="chart-svg" preserveAspectRatio="none">
      <line x1="0" y1="60" x2="220" y2="60" class="baseline" />
      <polyline v-if="coords.length >= 2" :points="linePoints" fill="none" :stroke="color" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <circle
        v-for="(p, i) in coords"
        :key="i"
        :cx="p.x" :cy="p.y" r="2.2"
        :fill="i === coords.length - 1 ? color : '#fbfaf7'"
        :stroke="color" stroke-width="1.2"
      />
    </svg>
    <p v-else class="chart-empty">還沒有紀錄，存一次心情就會開始畫趨勢線</p>
    <p v-if="coords.length === 1" class="chart-hint">再存一次就會看到變化線</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  points: { ts: number; value: number }[]
  color?: string
  min?: number
  max?: number
}>(), {
  color: '#5F7F64',
  min: 0,
  max: 10,
})

const coords = computed(() => {
  const n = props.points.length
  const range = props.max - props.min
  const toY = (v: number) => 60 - ((v - props.min) / range) * 52 - 4
  const first = props.points[0]
  if (n === 0 || !first) return []
  if (n === 1) return [{ x: 110, y: toY(first.value) }]
  const stepX = 220 / (n - 1)
  return props.points.map((p, i) => ({ x: i * stepX, y: toY(p.value) }))
})

const linePoints = computed(() => coords.value.map(c => `${c.x},${c.y}`).join(' '))
</script>

<style scoped>
.chart-wrap { width: 100%; }
.chart-svg { width: 100%; height: 56px; display: block; }
.baseline { stroke: rgba(95,127,100,.18); stroke-width: 1; }
.chart-empty {
  font-family: var(--mg-font-body);
  font-size: .68rem;
  color: var(--mg-text-muted);
  text-align: center;
  padding: .6rem 0;
  opacity: .8;
}
.chart-hint {
  font-family: var(--mg-font-body);
  font-size: .64rem;
  color: var(--mg-text-muted);
  text-align: center;
  margin: .2rem 0 0;
  opacity: .7;
}
</style>
