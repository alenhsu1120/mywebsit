<template>
  <div class="private-page">
    <div class="grain" aria-hidden="true" />

    <header class="bar">
      <div class="bar-inner">
        <RouterLink to="/" class="mark">
          <svg viewBox="0 0 32 32" class="mark-leaf" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4 C9 4 5 11 6 18 C7 25 16 28 16 28 C16 28 25 25 26 18 C27 11 23 4 16 4 Z"
                  fill="none" stroke="#5F7F64" stroke-width="1.3"/>
            <path d="M16 6 C16 6 20 13 18 21 C17 25 16 28 16 28" stroke="#5F7F64" stroke-width="1" fill="none" stroke-linecap="round" opacity=".8"/>
          </svg>
          <span class="mark-text">P. Hsu</span>
        </RouterLink>
        <RouterLink to="/" class="back">‹ Back to Portfolio</RouterLink>
      </div>
    </header>

    <main class="content">
      <p class="label">Private</p>
      <h1 class="heading">Beyond the Portfolio</h1>
      <p class="intro">
        The quieter, personal corners of this site — a life journal, a travel guide,
        and a few side projects. Kept separate from the work above, but still here
        for anyone curious enough to look.
      </p>

      <nav class="menu">
        <RouterLink to="/journal" class="menu-card">
          <div class="menu-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="20" height="24" rx="2" stroke="#5F7F64" stroke-width="1.4"/>
              <line x1="10" y1="4" x2="10" y2="28" stroke="#5F7F64" stroke-width="1" opacity=".5"/>
              <line x1="14" y1="10" x2="22" y2="10" stroke="#5F7F64" stroke-width="1" stroke-linecap="round" opacity=".7"/>
              <line x1="14" y1="14" x2="22" y2="14" stroke="#5F7F64" stroke-width="1" stroke-linecap="round" opacity=".6"/>
              <line x1="14" y1="18" x2="19" y2="18" stroke="#5F7F64" stroke-width="1" stroke-linecap="round" opacity=".5"/>
            </svg>
          </div>
          <div class="menu-text">
            <span class="menu-label">Life Journal</span>
            <span class="menu-desc">Mood diary and personal entries</span>
          </div>
          <span class="menu-arrow">›</span>
        </RouterLink>

        <RouterLink to="/travel" class="menu-card">
          <div class="menu-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4 C10 4 6 9 6 14 C6 21 16 28 16 28 C16 28 26 21 26 14 C26 9 22 4 16 4 Z"
                    fill="none" stroke="#5F7F64" stroke-width="1.4"/>
              <circle cx="16" cy="14" r="3.5" stroke="#5F7F64" stroke-width="1.2"/>
            </svg>
          </div>
          <div class="menu-text">
            <span class="menu-label">Travel Guide</span>
            <span class="menu-desc">Japan 2026 itinerary notes</span>
          </div>
          <span class="menu-arrow">›</span>
        </RouterLink>

        <RouterLink to="/programming" class="menu-card">
          <div class="menu-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="24" height="20" rx="3" stroke="#5F7F64" stroke-width="1.4"/>
              <path d="M8 19 L12 16.5 L8 22" stroke="#5F7F64" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <line x1="14" y1="22" x2="21" y2="15.5" stroke="#5F7F64" stroke-width="1.5" stroke-linecap="round" opacity=".85"/>
            </svg>
          </div>
          <div class="menu-text">
            <span class="menu-label">Programming</span>
            <span class="menu-desc">Research and side projects</span>
          </div>
          <span class="menu-arrow">›</span>
        </RouterLink>
      </nav>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.private-page {
  --mg-bg-page:       #F7F6F1;
  --mg-bg-section:    #F1EEE6;
  --mg-bg-card:       #FBFAF7;
  --mg-green-deep:    #243126;
  --mg-green-dark:    #2F4F3A;
  --mg-green-main:    #5F7F64;
  --mg-text-body:     #4A5A4C;
  --mg-text-muted:    #7A8577;
  --mg-border-soft:   #D7DDD2;
  --mg-border-hover:  #B8C6B4;
  --mg-divider:       #DADFD5;
  --mg-font-heading:  'Cormorant Garamond', 'Noto Serif TC', serif;
  --mg-font-body:     'Inter', 'Noto Sans TC', sans-serif;

  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--mg-bg-page);
  color: var(--mg-green-deep);
}

.grain {
  position: fixed;
  inset: 0;
  z-index: 150;
  pointer-events: none;
  opacity: .035;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.bar {
  position: sticky;
  top: 0;
  z-index: 200;
  background: rgba(247,246,241,0.92);
  border-bottom: 1px solid var(--mg-divider);
  backdrop-filter: blur(14px);
}
.bar-inner {
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

.content {
  position: relative;
  max-width: 860px;
  margin: 0 auto;
  padding: 6rem 2.5rem 8rem;
}

.label {
  font-family: var(--mg-font-body);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .22em;
  color: var(--mg-green-main);
  margin-bottom: .8rem;
}
.heading {
  font-family: var(--mg-font-heading);
  font-weight: 500;
  font-size: clamp(2.4rem, 4.4vw, 3.4rem);
  color: var(--mg-green-deep);
  margin-bottom: 1.2rem;
}
.intro {
  font-family: var(--mg-font-body);
  font-size: 1rem;
  line-height: 1.85;
  color: var(--mg-text-body);
  max-width: 560px;
  margin-bottom: 3.4rem;
}

.menu {
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
}
.menu-icon svg { width: 22px; height: 22px; }
.menu-text { flex: 1; display: flex; flex-direction: column; gap: .2rem; }
.menu-label {
  font-family: var(--mg-font-heading);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--mg-green-deep);
}
.menu-desc {
  font-family: var(--mg-font-body);
  font-size: .84rem;
  color: var(--mg-text-muted);
}
.menu-arrow { font-size: 1.3rem; color: var(--mg-green-main); transition: transform .3s; }
.menu-card:hover .menu-arrow { transform: translateX(4px); }

@media (max-width: 600px) {
  .bar-inner { padding: 0 1.4rem; height: 68px; }
  .content { padding: 4rem 1.4rem 6rem; }
}
</style>
