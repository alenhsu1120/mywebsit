<template>
  <div class="field-wrap">

    <!-- About Me — full width banner (moved to top) -->
    <RouterLink to="/about" class="card-link about-link">
      <div class="about-banner">
        <div class="about-icon">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="card-icon-svg">
            <circle cx="16" cy="11" r="6" fill="rgba(180,130,50,.2)" stroke="#8b6914" stroke-width="1.4"/>
            <path d="M5 28 Q5 20 16 20 Q27 20 27 28" fill="rgba(180,130,50,.15)" stroke="#8b6914" stroke-width="1.4" stroke-linecap="round"/>
            <polygon points="16,21 17.5,24 14.5,24" fill="#c9a227" opacity=".8"/>
          </svg>
        </div>
        <div class="about-text">
          <span class="about-label">About Me <span class="arrow">›</span></span>
          <span class="about-desc">自我介紹 · 技術技能 · 學歷 · 興趣嗜好</span>
        </div>
      </div>
    </RouterLink>

    <div class="section-head">
      <span class="sh-line" />
      <span class="sh-icon">🌿</span>
      <span class="sh-title">冒險紀錄</span>
      <span class="sh-icon">🌿</span>
      <span class="sh-line right" />
    </div>

    <div class="field-grid">

      <!-- ① Life Journal -->
      <RouterLink to="/journal" class="card-link">
        <WelcomeItem :clickable="true">
          <template #icon>
            <svg class="card-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="4" width="16" height="22" rx="2"
                    fill="rgba(180,130,50,.2)" stroke="#8b6914" stroke-width="1.5"/>
              <line x1="10" y1="4" x2="10" y2="26" stroke="#8b6914" stroke-width="1" opacity=".5"/>
              <line x1="13" y1="9"  x2="20" y2="9"  stroke="#8b6914" stroke-width="1" stroke-linecap="round" opacity=".7"/>
              <line x1="13" y1="12" x2="20" y2="12" stroke="#8b6914" stroke-width="1" stroke-linecap="round" opacity=".6"/>
              <line x1="13" y1="15" x2="18" y2="15" stroke="#8b6914" stroke-width="1" stroke-linecap="round" opacity=".5"/>
              <path d="M22 6 Q27 8 27 13 Q24 12 22 15 Z" fill="#5da038" opacity=".85"/>
              <line x1="22" y1="6" x2="22" y2="15" stroke="#3d6e2a" stroke-width=".8"/>
            </svg>
          </template>
          <template #heading>
            Life Journal
            <span class="arrow">›</span>
          </template>
          <p>旅途的記憶，刻在羊皮卷上。</p>
        </WelcomeItem>
      </RouterLink>

      <!-- ① Travel Guide -->
      <RouterLink to="/travel" class="card-link">
        <WelcomeItem :clickable="true">
          <template #icon>
            <svg class="card-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4 C10 4 6 9 6 14 C6 21 16 28 16 28 C16 28 26 21 26 14 C26 9 22 4 16 4 Z"
                    fill="rgba(192,57,43,.2)" stroke="#c0392b" stroke-width="1.4"/>
              <circle cx="16" cy="14" r="3.5" fill="rgba(192,57,43,.35)" stroke="#c0392b" stroke-width="1.2"/>
              <path d="M10 6 Q16 3 22 6" stroke="#e74c3c" stroke-width="1" fill="none" opacity=".6" stroke-linecap="round"/>
              <line x1="22" y1="5" x2="25" y2="3" stroke="#f39c12" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>
              <circle cx="25.5" cy="2.5" r="1.5" fill="#f39c12" opacity=".85"/>
            </svg>
          </template>
          <template #heading>
            Travel Guide
            <span class="arrow">›</span>
          </template>
          <p>日本旅遊手冊 · 2026 夏の旅。</p>
        </WelcomeItem>
      </RouterLink>

      <!-- ② Game Log -->
      <WelcomeItem>
        <template #icon>
          <svg class="card-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4 L19 16 L16 20 L13 16 Z"
                  fill="rgba(180,200,220,.4)" stroke="#6a8aaa" stroke-width="1.2"/>
            <rect x="10" y="16" width="12" height="3" rx="1"
                  fill="#8b6914" stroke="#6a5010" stroke-width=".8"/>
            <rect x="14" y="19" width="4" height="8" rx="1"
                  fill="#8b6914" stroke="#6a5010" stroke-width=".8"/>
            <circle cx="16" cy="28" r="2" fill="#c9a227" stroke="#9a7a1e" stroke-width=".8"/>
            <path d="M22 6 L23 8 L25 7 L23 9 L24 11 L22 9 L20 11 L21 9 L19 7 L21 8 Z"
                  fill="#c9a227" opacity=".8"/>
          </svg>
        </template>
        <template #heading>Game Log</template>
        <p>冒險誌，記錄每一場戰役的榮耀。</p>
      </WelcomeItem>

      <!-- ③ Programming — RouterLink card -->
      <RouterLink to="/programming" class="card-link">
        <WelcomeItem :clickable="true">
          <template #icon>
            <svg class="card-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="6" width="24" height="20" rx="2"
                    fill="rgba(200,170,100,.25)" stroke="#8b6914" stroke-width="1.4"/>
              <line x1="4" y1="11" x2="28" y2="11" stroke="#8b6914" stroke-width="1" opacity=".5"/>
              <circle cx="7.5"  cy="8.5" r="1" fill="#8b6914" opacity=".7"/>
              <circle cx="11"   cy="8.5" r="1" fill="#8b6914" opacity=".45"/>
              <circle cx="14.5" cy="8.5" r="1" fill="#8b6914" opacity=".3"/>
              <path d="M8 19 L12 16.5 L8 22" stroke="#8b6914" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" fill="none"/>
              <line x1="14" y1="22" x2="21" y2="15.5" stroke="#c9a227" stroke-width="1.5"
                    stroke-linecap="round" opacity=".85"/>
              <rect x="22" y="21" width="4" height="2" rx=".5" fill="#8b6914" opacity=".65"/>
            </svg>
          </template>
          <template #heading>
            Programming
            <span class="arrow">›</span>
          </template>
          <p>以程式碼為魔法，構築數位世界。</p>
        </WelcomeItem>
      </RouterLink>

      <!-- ④ Mood -->
      <RouterLink to="/mood" class="card-link">
        <WelcomeItem :clickable="true">
          <template #icon>
            <svg class="card-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="11" fill="rgba(245,200,66,.18)" stroke="#c9a227" stroke-width="1.4"/>
              <circle cx="12" cy="14" r="1.5" fill="#8b6914"/>
              <circle cx="20" cy="14" r="1.5" fill="#8b6914"/>
              <path d="M11 19 Q16 24 21 19" stroke="#8b6914" stroke-width="1.4" stroke-linecap="round" fill="none"/>
              <path d="M22 5 Q27 3 26 9" stroke="#c9a227" stroke-width="1" fill="none" opacity=".6" stroke-linecap="round"/>
              <circle cx="26.5" cy="4" r="1.2" fill="#c9a227" opacity=".8"/>
            </svg>
          </template>
          <template #heading>
            Mood Diary
            <span class="arrow">›</span>
          </template>
          <p>心情紀錄，留下每天的色彩印記。</p>
        </WelcomeItem>
      </RouterLink>

      <!-- ⑤ Psychology Articles -->
      <WelcomeItem>
        <template #icon>
          <svg class="card-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="16" cy="16" rx="3" ry="5.5" fill="rgba(220,160,180,.6)" stroke="#c07090" stroke-width="1" transform="rotate(0 16 16)"/>
            <ellipse cx="16" cy="16" rx="3" ry="5.5" fill="rgba(220,160,180,.55)" stroke="#c07090" stroke-width="1" transform="rotate(60 16 16)"/>
            <ellipse cx="16" cy="16" rx="3" ry="5.5" fill="rgba(220,160,180,.5)" stroke="#c07090" stroke-width="1" transform="rotate(120 16 16)"/>
            <ellipse cx="16" cy="16" rx="3" ry="5.5" fill="rgba(220,160,180,.6)" stroke="#c07090" stroke-width="1" transform="rotate(180 16 16)"/>
            <ellipse cx="16" cy="16" rx="3" ry="5.5" fill="rgba(220,160,180,.55)" stroke="#c07090" stroke-width="1" transform="rotate(240 16 16)"/>
            <ellipse cx="16" cy="16" rx="3" ry="5.5" fill="rgba(220,160,180,.5)" stroke="#c07090" stroke-width="1" transform="rotate(300 16 16)"/>
            <circle cx="16" cy="16" r="4.5" fill="#f0d060" stroke="#c9a227" stroke-width="1.2"/>
            <circle cx="16" cy="16" r="2" fill="#c9a227"/>
            <line x1="16" y1="21" x2="16" y2="29" stroke="#5da038" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M16 25 Q20 23 21 27 Q18 27 16 25 Z" fill="#5da038" opacity=".8"/>
          </svg>
        </template>
        <template #heading>Psychology Articles</template>
        <p>探索意識深處，智慧的秘境之光。</p>
      </WelcomeItem>

    </div>

    <div class="bottom-deco">
      <span class="deco-line" />
      <span class="deco-flower">✿</span>
      <span class="deco-leaf">❧</span>
      <span class="deco-flower">✿</span>
      <span class="deco-line" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import WelcomeItem from './WelcomeItem.vue'
</script>

<style scoped>
.field-wrap { width:100%; padding:0.5rem 0 1rem; }

.section-head {
  display:flex; align-items:center; gap:.6rem;
  margin-bottom:1.5rem; justify-content:center;
}
.sh-line {
  flex:1; max-width:60px; height:1px;
  background:linear-gradient(90deg, transparent, #4a9818);
}
.sh-line.right { background:linear-gradient(90deg, #4a9818, transparent); }
.sh-icon { font-size:.85rem; }
.sh-title {
  font-family:'Poppins','Noto Sans TC',sans-serif; font-size:.65rem;
  letter-spacing:.3em; color:#7a5c30; white-space:nowrap;
}

.field-grid {
  display:grid; grid-template-columns:1fr; gap:1rem;
}
@media(min-width:580px) {
  .field-grid { grid-template-columns:1fr 1fr; gap:1.1rem; }
}
.field-grid > :nth-child(1) { animation-delay:.08s; }
.field-grid > :nth-child(2) { animation-delay:.18s; }
.field-grid > :nth-child(3) { animation-delay:.28s; }
.field-grid > :nth-child(4) { animation-delay:.38s; }
.field-grid > :nth-child(5) { animation-delay:.48s; }
.field-grid > :nth-child(6) { animation-delay:.58s; }

/* Router link wrapper — remove default link styling */
.card-link {
  display:block; text-decoration:none; color:inherit;
}

/* Arrow on heading */
.arrow {
  display:inline-block;
  margin-left:.4rem;
  font-size:1.1rem;
  color:#9a7a1e;
  transition:transform .25s;
  vertical-align:middle;
}
.card-link:hover .arrow { transform:translateX(4px); }

.card-icon-svg { width:24px; height:24px; }

/* ── About Me banner ── */
.about-link { display:block; text-decoration:none; color:inherit; margin-bottom:1.2rem; }
.about-banner {
  display:flex; align-items:center; gap:1.1rem;
  padding:1rem 1.5rem;
  background: linear-gradient(145deg, #fdf8ec 0%, #f0e8cc 100%);
  border: 1.5px solid #c9a227;
  border-radius: 2px;
  box-shadow: 3px 3px 0 #8a6e10, inset 0 1px 0 rgba(255,255,255,.8);
  transition: transform .25s, box-shadow .25s, border-color .25s;
}
.about-link:hover .about-banner {
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #8a6e10;
}
.about-icon {
  flex-shrink:0; width:44px; height:44px; border-radius:50%;
  border:1.5px solid #d4b870;
  background: radial-gradient(circle at 38% 32%,
    rgba(255,240,180,.55) 0%, rgba(230,210,150,.35) 60%, rgba(200,175,110,.15) 100%);
  display:flex; align-items:center; justify-content:center;
  box-shadow: 0 2px 6px rgba(120,80,20,.12), inset 0 1px 2px rgba(255,255,255,.6);
  transition: border-color .25s;
}
.about-link:hover .about-icon { border-color: #c9a227; }
.about-text { flex:1; display:flex; flex-direction:column; gap:.2rem; }
.about-label {
  font-family:'Poppins','Noto Sans TC',sans-serif; font-size:.95rem; font-weight:400;
  letter-spacing:.06em; color:#2c1e08;
  transition: color .25s;
}
.about-link:hover .about-label { color:#9a7a1e; }
.about-desc {
  font-family:'Poppins','Noto Sans TC',sans-serif; font-size:.88rem; color:#7a5c30;
}

.bottom-deco {
  display:flex; align-items:center; gap:.5rem;
  justify-content:center; margin-top:1.8rem; opacity:.55;
}
.deco-line {
  display:block; width:50px; height:1px;
  background:linear-gradient(90deg, transparent, #4a9818);
}
.deco-line:last-child { background:linear-gradient(90deg, #4a9818, transparent); }
.deco-flower { color:#9a7a1e; font-size:.75rem; }
.deco-leaf   { color:#4a9818; font-size:.8rem; }
</style>
