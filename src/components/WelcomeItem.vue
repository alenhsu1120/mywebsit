<script setup lang="ts">
defineProps<{ clickable?: boolean }>()
</script>

<template>
  <div class="field-card" :class="{ 'is-clickable': clickable }">
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

  background: #ffffff;
  border: 1.5px solid var(--border-base);
  border-radius: 14px;

  box-shadow: var(--shadow-card);

  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  animation: card-rise 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
  cursor: default;
}
.is-clickable {
  cursor: pointer;
}

.field-card:hover {
  transform: translateY(-3px);
  border-color: var(--green-sage);
  box-shadow: var(--shadow-hover);
}

/* ── Icon ── */
.card-icon-wrap {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
}
.card-icon-bg {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  border: 1.5px solid var(--border-base);
  background: linear-gradient(135deg, var(--green-frost) 0%, var(--green-pale) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(27,58,40,0.08);
  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
}
.field-card:hover .card-icon-bg {
  border-color: var(--green-sage);
  background: linear-gradient(135deg, var(--green-pale) 0%, var(--bg-tint) 100%);
  box-shadow: 0 2px 8px rgba(27,58,40,0.12);
}

/* ── Heading ── */
.card-body { flex: 1; min-width: 0; }

.card-heading {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-weight: 400;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  color: var(--green-deep);
  margin-bottom: 0.45rem;
  transition: color 0.25s;
}
.field-card:hover .card-heading { color: var(--green-forest); }

/* ── Content ── */
.card-content {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--text-soft);
}
.card-content :deep(a) {
  color: var(--green-forest);
  border-bottom: 1px solid var(--border-base);
  transition: color 0.25s, border-color 0.25s;
}
.card-content :deep(a:hover) {
  color: var(--green-mid);
  border-color: var(--green-sage);
}
</style>
