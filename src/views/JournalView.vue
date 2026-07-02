<template>
  <PortfolioPageShell>
    <PortfolioSubNav back-to="/private" back-label="‹ Private" />

    <div class="page-wrap">
      <div class="page-title">
        <p class="label">Private</p>
        <h2>Life Journal</h2>
        <p class="sub">旅途的記憶，刻在羊皮卷上。</p>
      </div>

      <nav class="menu-grid">

        <RouterLink to="/journal/entries" class="menu-card">
          <div class="menu-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="5" width="20" height="28" rx="2.5" fill="rgba(95,127,100,.15)" stroke="#5F7F64" stroke-width="1.4"/>
              <line x1="12" y1="5" x2="12" y2="33" stroke="#5F7F64" stroke-width="1" opacity=".5"/>
              <line x1="16" y1="12" x2="24" y2="12" stroke="#5F7F64" stroke-width="1" stroke-linecap="round" opacity=".7"/>
              <line x1="16" y1="16" x2="24" y2="16" stroke="#5F7F64" stroke-width="1" stroke-linecap="round" opacity=".6"/>
              <line x1="16" y1="20" x2="21" y2="20" stroke="#5F7F64" stroke-width="1" stroke-linecap="round" opacity=".5"/>
            </svg>
          </div>
          <div class="menu-text">
            <span class="menu-label">Life Journal</span>
            <span class="menu-desc">旅途的日記 · 一筆一劃的紀錄</span>
          </div>
          <span class="menu-arrow">›</span>
        </RouterLink>

        <RouterLink to="/journal/mood" class="menu-card">
          <div class="menu-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="14" fill="rgba(95,127,100,.15)" stroke="#5F7F64" stroke-width="1.4"/>
              <circle cx="15" cy="17" r="1.8" fill="#2F4F3A"/>
              <circle cx="25" cy="17" r="1.8" fill="#2F4F3A"/>
              <path d="M14 24 Q20 30 26 24" stroke="#2F4F3A" stroke-width="1.4" stroke-linecap="round" fill="none"/>
            </svg>
          </div>
          <div class="menu-text">
            <span class="menu-label">Mood Diary</span>
            <span class="menu-desc">心情紀錄 · 留下每天的色彩印記</span>
          </div>
          <span class="menu-arrow">›</span>
        </RouterLink>

        <RouterLink to="/journal/eyes" class="menu-card">
          <div class="menu-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 20 Q20 8 34 20 Q20 32 6 20 Z" fill="rgba(95,127,100,.15)" stroke="#5F7F64" stroke-width="1.4" stroke-linejoin="round"/>
              <circle cx="20" cy="20" r="5" fill="rgba(95,127,100,.3)" stroke="#5F7F64" stroke-width="1.2"/>
              <circle cx="20" cy="20" r="2" fill="#2F4F3A"/>
            </svg>
          </div>
          <div class="menu-text">
            <span class="menu-label">Eyes</span>
            <span class="menu-desc">即將開放 · Coming Soon</span>
          </div>
          <span class="menu-arrow">›</span>
        </RouterLink>

      </nav>
    </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PortfolioPageShell from '@/components/portfolio/PortfolioPageShell.vue'
import PortfolioSubNav from '@/components/portfolio/PortfolioSubNav.vue'
</script>

<style scoped>
.page-wrap {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 4.5rem 2rem 5rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}
@keyframes card-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-title { margin-bottom: 2.4rem; }
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
  margin-bottom: .4rem;
}
.page-title .sub {
  font-family: var(--mg-font-body);
  font-style: italic;
  font-size: .95rem;
  color: var(--mg-text-muted);
}

/* Menu grid */
.menu-grid {
  display: flex;
  flex-direction: column;
  gap: .85rem;
}

.menu-card {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  padding: 1.2rem 1.5rem;
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft);
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 8px 26px rgba(36,49,38,0.05);
  transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
}
.menu-card:hover {
  transform: translateX(5px);
  border-color: var(--mg-border-hover);
  box-shadow: 0 14px 32px rgba(36,49,38,0.09);
}

.menu-icon {
  flex-shrink: 0;
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 1px solid var(--mg-border-soft);
  background: radial-gradient(circle at 38% 32%, rgba(95,127,100,.14) 0%, rgba(95,127,100,.06) 100%);
  display: flex; align-items: center; justify-content: center;
  transition: border-color .3s;
}
.menu-icon svg { width: 24px; height: 24px; }
.menu-card:hover .menu-icon { border-color: var(--mg-border-hover); }

.menu-text {
  flex: 1;
  display: flex; flex-direction: column; gap: .2rem;
}
.menu-label {
  font-family: var(--mg-font-heading);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--mg-green-deep);
  transition: color .25s;
}
.menu-desc {
  font-family: var(--mg-font-body);
  font-size: .84rem;
  color: var(--mg-text-muted);
}

.menu-arrow {
  font-size: 1.3rem;
  color: var(--mg-green-main);
  transition: transform .3s;
  line-height: 1;
}
.menu-card:hover .menu-arrow { transform: translateX(4px); }
</style>
