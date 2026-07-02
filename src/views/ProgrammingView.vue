<template>
  <PortfolioPageShell>
    <PortfolioSubNav back-to="/private" back-label="‹ Private" />

    <div class="page-wrap">
      <div class="page-title">
        <p class="label">Private</p>
        <h2>Programming</h2>
        <p class="sub">以程式碼為筆，構築數位世界。</p>
      </div>

      <nav class="menu-grid">

        <RouterLink to="/programming/research" class="menu-card">
          <div class="menu-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="20,8 36,16 20,24 4,16" fill="rgba(95,127,100,.25)" stroke="#5F7F64" stroke-width="1.4" stroke-linejoin="round"/>
              <path d="M36,16 L36,26" stroke="#5F7F64" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M10,19 L10,28 Q20,33 30,28 L30,19" fill="rgba(95,127,100,.2)" stroke="#5F7F64" stroke-width="1.4" stroke-linejoin="round"/>
              <circle cx="36" cy="27" r="2" fill="#5F7F64"/>
            </svg>
          </div>
          <div class="menu-text">
            <span class="menu-label">碩士研究</span>
            <span class="menu-desc">多智體路徑規劃 · MAPF Competition</span>
          </div>
          <span class="menu-arrow">›</span>
        </RouterLink>

        <div class="menu-card is-coming">
          <div class="menu-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="28" height="20" rx="3" stroke="#B08968" stroke-width="1.4"/>
              <line x1="6"  y1="16" x2="34" y2="16" stroke="#B08968" stroke-width="1" opacity=".5"/>
              <line x1="14" y1="22" x2="26" y2="22" stroke="#B08968" stroke-width="1.5" stroke-linecap="round" opacity=".4"/>
              <line x1="14" y1="26" x2="22" y2="26" stroke="#B08968" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
            </svg>
          </div>
          <div class="menu-text">
            <span class="menu-label">Side Projects</span>
            <span class="menu-desc">即將開放 · Coming Soon</span>
          </div>
        </div>

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
  cursor: pointer;
}
.menu-card:not(.is-coming):hover {
  transform: translateX(5px);
  border-color: var(--mg-border-hover);
  box-shadow: 0 14px 32px rgba(36,49,38,0.09);
}

.is-coming { opacity: .55; cursor: default; }

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
.menu-card:not(.is-coming):hover .menu-icon { border-color: var(--mg-border-hover); }

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
.menu-card:not(.is-coming):hover .menu-arrow { transform: translateX(4px); }
</style>
