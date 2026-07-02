<template>
  <header class="sub-bar">
    <div class="sub-bar-inner">
      <RouterLink to="/" class="mark">
        <svg viewBox="0 0 32 32" class="mark-leaf" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4 C9 4 5 11 6 18 C7 25 16 28 16 28 C16 28 25 25 26 18 C27 11 23 4 16 4 Z"
                fill="none" stroke="#5F7F64" stroke-width="1.3"/>
          <path d="M16 6 C16 6 20 13 18 21 C17 25 16 28 16 28" stroke="#5F7F64" stroke-width="1" fill="none" stroke-linecap="round" opacity=".8"/>
        </svg>
        <span class="mark-text">P. Hsu</span>
      </RouterLink>
      <RouterLink :to="backTo" class="back">{{ backLabel }}</RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(defineProps<{ backTo: string; backLabel?: string }>(), {
  backLabel: '‹ Back',
})
</script>

<style scoped>
.sub-bar {
  position: sticky;
  top: 0;
  z-index: 200;
  background: rgba(247,246,241,0.92);
  border-bottom: 1px solid var(--mg-divider);
  backdrop-filter: blur(14px);
}
.sub-bar-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 2.5rem;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mark { display: flex; align-items: center; gap: .55rem; text-decoration: none; }
.mark-leaf { width: 22px; height: 22px; }
.mark-text {
  font-family: var(--mg-font-heading);
  font-style: italic;
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--mg-green-deep);
}
.back {
  font-family: var(--mg-font-body);
  font-size: .8rem;
  letter-spacing: .04em;
  color: var(--mg-text-body);
  text-decoration: none;
  transition: color .25s;
}
.back:hover { color: var(--mg-green-dark); }

@media (max-width: 600px) {
  .sub-bar-inner { padding: 0 1.4rem; height: 68px; }
}
</style>
