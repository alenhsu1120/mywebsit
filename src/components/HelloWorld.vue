<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="greeting-panel">
    <h1 class="hero-name">{{ msg }}</h1>
    <p class="hero-subtitle">Enjoying life, one line of code at a time.</p>
  </div>
</template>

<style scoped>
.greeting-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.hero-name {
  font-family: 'Cinzel Decorative', 'Cinzel', serif;
  font-weight: 700;
  font-size: clamp(1.6rem, 5vw, 3rem);
  letter-spacing: 0.12em;
  color: var(--botw-gold-bright);
  text-shadow:
    0 0 20px var(--botw-gold-glow),
    0 0 40px var(--botw-gold-ghost),
    0 2px 6px rgba(0, 0, 0, 0.9);
  animation: title-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
  text-align: center;
  position: relative;
}

.hero-subtitle {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: clamp(0.8rem, 2vw, 1rem);
  color: var(--botw-parchment-dim);
  letter-spacing: 0.12em;
  animation: title-reveal 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both;
  text-align: center;
}
</style>
