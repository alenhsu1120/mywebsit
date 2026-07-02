<template>
  <PortfolioPageShell>
    <PortfolioSubNav back-to="/journal" back-label="‹ Life Journal" />

    <div class="eyes-wrap">
      <div class="page-title">
        <p class="label">Life Journal</p>
        <h2>Eyes</h2>
        <p class="sub">即將開放 · Coming Soon</p>
      </div>

      <div class="empty-state">
        <span class="empty-icon">🌿</span>
        <p>這裡還是一片空白，敬請期待。</p>
      </div>
    </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import PortfolioPageShell from '@/components/portfolio/PortfolioPageShell.vue'
import PortfolioSubNav from '@/components/portfolio/PortfolioSubNav.vue'
</script>

<style scoped>
.eyes-wrap {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 4.5rem 2rem 5rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}
@keyframes card-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-title { margin-bottom: 1.8rem; }
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

.empty-state { text-align: center; padding: 3rem 1rem; opacity: .7; }
.empty-icon { font-size: 2.5rem; margin-bottom: .7rem; display: block; }
.empty-state p { font-family: var(--mg-font-body); font-style: italic; color: var(--mg-text-muted); }
</style>
