<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <div class="greeting">
    <h1 class="hero-name">{{ msg }}</h1>
    <p class="hero-sub">Enjoying life, one line of code at a time.</p>
  </div>
</template>

<style scoped>
.greeting {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.hero-name {
  font-family: 'Cinzel Decorative', 'Cinzel', serif;
  font-weight: 700;
  font-size: clamp(2rem, 6vw, 3.4rem);
  letter-spacing: 0.1em;
  color: #2a1e08;
  text-shadow:
    0 1px 0 rgba(255,255,255,0.9),
    0 2px 8px rgba(255,255,255,0.6),
    0 4px 20px rgba(201,162,39,0.2);
  animation: title-reveal 1s cubic-bezier(0.16, 1, 0.3, 1) both;
  text-align: center;
}

.hero-sub {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: clamp(0.85rem, 2vw, 1.05rem);
  color: #5a4020;
  letter-spacing: 0.1em;
  animation: title-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
  text-align: center;
  text-shadow: 0 1px 4px rgba(255,255,255,0.8);
}
</style>
