<script setup lang="ts">
defineProps<{ clickable?: boolean }>()
</script>

<template>
  <div class="field-card" :class="{ 'is-clickable': clickable }">
    <!-- Corner leaf decorations -->
    <span class="corner c-tl">✦</span>
    <span class="corner c-tr">✦</span>
    <span class="corner c-bl">✦</span>
    <span class="corner c-br">✦</span>

    <!-- Icon area -->
    <div class="card-icon-wrap">
      <div class="card-icon-bg">
        <slot name="icon" />
      </div>
    </div>

    <!-- Text -->
    <div class="card-body">
      <h3 class="card-heading">
        <slot name="heading" />
      </h3>
      <div class="card-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Card Shell ── */
.field-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 1.1rem;
  padding: 1.4rem 1.5rem 1.3rem;

  background: #f8f2e0;
  border: 2px solid #b89830;
  border-radius: 2px;              /* pixel-style: near-square corners */

  box-shadow:
    3px 3px 0 #8a6e10,             /* hard pixel offset shadow */
    inset 0 1px 0 rgba(255,255,255,0.85);

  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  animation: card-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
  overflow: hidden;
  cursor: default;
}
.is-clickable {
  cursor: pointer;
}

/* Parchment texture overlay */
.field-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 28px,
      rgba(180, 140, 60, 0.04) 28px,
      rgba(180, 140, 60, 0.04) 29px
    );
  pointer-events: none;
  border-radius: 6px;
}

.field-card:hover {
  transform: translate(-2px, -2px);
  border-color: #c9a227;
  box-shadow:
    5px 5px 0 #8a6e10,
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

/* ── Corner Stars ── */
.corner {
  position: absolute;
  color: var(--gold-dim);
  font-size: 0.5rem;
  transition: color 0.3s, transform 0.3s;
  line-height: 1;
}
.field-card:hover .corner { color: var(--gold); }

.c-tl { top: 5px;    left: 6px;  }
.c-tr { top: 5px;    right: 6px; }
.c-bl { bottom: 5px; left: 6px;  }
.c-br { bottom: 5px; right: 6px; }

/* ── Icon ── */
.card-icon-wrap {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
}
.card-icon-bg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1.5px solid var(--parchment-shadow);
  background: radial-gradient(circle at 38% 32%,
    rgba(255, 240, 180, 0.6) 0%,
    rgba(230, 210, 150, 0.4) 60%,
    rgba(200, 175, 110, 0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(120, 80, 20, 0.15), inset 0 1px 2px rgba(255,255,255,0.6);
  transition: border-color 0.3s, box-shadow 0.3s;
}
.field-card:hover .card-icon-bg {
  border-color: var(--gold-dim);
  box-shadow: 0 2px 12px rgba(180, 140, 40, 0.3), inset 0 1px 2px rgba(255,255,255,0.7);
}

/* ── Heading ── */
.card-body { flex: 1; min-width: 0; }

.card-heading {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-weight: 400;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  color: var(--ink-dark);
  margin-bottom: 0.45rem;
  transition: color 0.3s;
}
.field-card:hover .card-heading { color: var(--gold-dim); }

/* ── Content ── */
.card-content {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--ink-mid);
}
.card-content :deep(a) {
  color: var(--gold-dim);
  border-bottom: 1px solid var(--parchment-shadow);
  transition: color 0.3s, border-color 0.3s;
}
.card-content :deep(a:hover) {
  color: var(--gold);
  border-color: var(--gold);
}
</style>
