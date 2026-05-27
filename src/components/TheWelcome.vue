<template>
  <div class="field-wrap">

    <div class="section-head">
      <span class="sh-line" />
      <span class="sh-icon">🌿</span>
      <span class="sh-title">冒險紀錄</span>
      <span class="sh-icon">🌿</span>
      <span class="sh-line right" />
    </div>

    <div class="field-grid">

      <!-- ① Life Journal -->
      <WelcomeItem>
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
        <template #heading>Life Journal</template>
        <p>旅途的記憶，刻在羊皮卷上。</p>
      </WelcomeItem>

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

      <!-- ④ Psychology Articles -->
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
  font-family:'Cinzel',serif; font-size:.65rem;
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
