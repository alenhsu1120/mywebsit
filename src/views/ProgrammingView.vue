<template>
  <div class="prog-wrap">

    <!-- Back link -->
    <RouterLink to="/" class="back-link">‹ 返回</RouterLink>

    <!-- Page title -->
    <div class="page-title">
      <h2>Programming</h2>
      <p>以程式碼為魔法，構築數位世界。</p>
    </div>

    <!-- Menu cards -->
    <nav class="menu-grid">

      <RouterLink to="/programming/research" class="menu-card">
        <div class="menu-icon">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Graduation cap -->
            <polygon points="20,8 36,16 20,24 4,16" fill="rgba(74,138,88,.25)" stroke="#4a8a58" stroke-width="1.4" stroke-linejoin="round"/>
            <path d="M36,16 L36,26" stroke="#4a8a58" stroke-width="1.4" stroke-linecap="round"/>
            <path d="M10,19 L10,28 Q20,33 30,28 L30,19" fill="rgba(74,138,88,.2)" stroke="#4a8a58" stroke-width="1.4" stroke-linejoin="round"/>
            <circle cx="36" cy="27" r="2" fill="#4a8a58"/>
          </svg>
        </div>
        <div class="menu-text">
          <span class="menu-label">碩士研究</span>
          <span class="menu-desc">多智體路徑規劃 · MAPF Competition</span>
        </div>
        <span class="menu-arrow">›</span>
      </RouterLink>

      <!-- Placeholder for future items -->
      <div class="menu-card is-coming">
        <div class="menu-icon">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="10" width="28" height="20" rx="3" stroke="#c8b888" stroke-width="1.4"/>
            <line x1="6"  y1="16" x2="34" y2="16" stroke="#c8b888" stroke-width="1" opacity=".5"/>
            <line x1="14" y1="22" x2="26" y2="22" stroke="#c8b888" stroke-width="1.5" stroke-linecap="round" opacity=".4"/>
            <line x1="14" y1="26" x2="22" y2="26" stroke="#c8b888" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
          </svg>
        </div>
        <div class="menu-text">
          <span class="menu-label">Side Projects</span>
          <span class="menu-desc">即將開放 · Coming Soon</span>
        </div>
      </div>

    </nav>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.prog-wrap {
  width: 100%;
  max-width: 860px;
  padding: 0 2rem 2rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}

/* Back */
.back-link {
  display: inline-block;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .75rem;
  letter-spacing: .15em;
  color: #3d5440;
  text-decoration: none;
  padding: .3rem 0;
  margin-bottom: 1.4rem;
  opacity: .75;
  transition: opacity .2s, color .2s;
  text-shadow: 0 1px 3px rgba(255,255,255,.7);
}
.back-link:hover { opacity: 1; color: #1b3a28; }

/* Title */
.page-title {
  margin-bottom: 1.8rem;
}
.page-title h2 {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  color: #162a1e;
  text-shadow: 0 1px 0 rgba(255,255,255,.9), 0 2px 10px rgba(255,255,255,.5);
  margin-bottom: .35rem;
}
.page-title p {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-style: italic;
  font-size: .95rem;
  color: #6a8870;
  text-shadow: 0 1px 3px rgba(255,255,255,.7);
}

/* Menu grid */
.menu-grid {
  display: flex;
  flex-direction: column;
  gap: .85rem;
}

/* Menu card */
.menu-card {
  display: flex;
  align-items: center;
  gap: 1.1rem;
  padding: 1.2rem 1.5rem;
  background: linear-gradient(145deg, #ffffff 0%, #f6fbf6 100%);
  border: 1.5px solid #b8d8be;
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 2px 12px rgba(27,58,40,0.08), 0 1px 3px rgba(27,58,40,0.04);
  transition: transform .25s, box-shadow .25s, border-color .25s;
  cursor: pointer;
}
.menu-card:not(.is-coming):hover {
  transform: translateX(5px);
  border-color: #4a8a58;
  box-shadow: 0 6px 24px rgba(27,58,40,0.13), 0 2px 6px rgba(27,58,40,0.07);
}

.is-coming {
  opacity: .45;
  cursor: default;
}

/* Icon */
.menu-icon {
  flex-shrink: 0;
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 1.5px solid #b8d8be;
  background: radial-gradient(circle at 38% 32%,
    rgba(74,138,88,.18) 0%, rgba(74,138,88,.10) 60%, rgba(74,138,88,.05) 100%);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 6px rgba(27,58,40,.12), inset 0 1px 2px rgba(255,255,255,.6);
  transition: border-color .25s, box-shadow .25s;
}
.menu-icon svg { width: 24px; height: 24px; }
.menu-card:not(.is-coming):hover .menu-icon {
  border-color: #4a8a58;
  box-shadow: 0 2px 12px rgba(74,138,88,.3), inset 0 1px 2px rgba(255,255,255,.7);
}

/* Text */
.menu-text {
  flex: 1;
  display: flex; flex-direction: column; gap: .2rem;
}
.menu-label {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .95rem;
  font-weight: 400;
  letter-spacing: .06em;
  color: #162a1e;
  transition: color .25s;
}
.menu-card:not(.is-coming):hover .menu-label { color: #2d6040; }
.menu-desc {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .88rem;
  color: #6a8870;
}

/* Arrow */
.menu-arrow {
  font-size: 1.4rem;
  color: #4a8a58;
  transition: transform .25s;
  line-height: 1;
}
.menu-card:not(.is-coming):hover .menu-arrow { transform: translateX(4px); }
</style>
