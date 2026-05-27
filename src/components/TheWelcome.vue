<template>
  <div class="field-wrap">

    <!-- Section title -->
    <div class="section-head">
      <span class="sh-line" />
      <span class="sh-icon">🌿</span>
      <span class="sh-title">冒險紀錄</span>
      <span class="sh-icon">🌿</span>
      <span class="sh-line right" />
    </div>

    <!-- Cards -->
    <div class="field-grid">

      <!-- ① Life Journal -->
      <WelcomeItem>
        <template #icon>
          <svg class="card-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Book -->
            <rect x="6" y="4" width="16" height="22" rx="2"
                  fill="rgba(180,130,50,0.2)" stroke="#8b6914" stroke-width="1.5"/>
            <!-- Spine -->
            <line x1="10" y1="4" x2="10" y2="26" stroke="#8b6914" stroke-width="1" opacity="0.5"/>
            <!-- Lines -->
            <line x1="13" y1="9"  x2="20" y2="9"  stroke="#8b6914" stroke-width="1" stroke-linecap="round" opacity="0.7"/>
            <line x1="13" y1="12" x2="20" y2="12" stroke="#8b6914" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
            <line x1="13" y1="15" x2="18" y2="15" stroke="#8b6914" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
            <!-- Leaf bookmark -->
            <path d="M22 6 Q27 8 27 13 Q24 12 22 15 Z" fill="#5da038" opacity="0.85"/>
            <line x1="22" y1="6" x2="22" y2="15" stroke="#3d6e2a" stroke-width="0.8"/>
          </svg>
        </template>
        <template #heading>Life Journal</template>
        <p>旅途的記憶，刻在羊皮卷上。</p>
      </WelcomeItem>

      <!-- ② Game Log -->
      <WelcomeItem>
        <template #icon>
          <svg class="card-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Sword blade -->
            <path d="M16 4 L19 16 L16 20 L13 16 Z" fill="rgba(180,200,220,0.4)" stroke="#6a8aaa" stroke-width="1.2"/>
            <!-- Crossguard -->
            <rect x="10" y="16" width="12" height="3" rx="1" fill="#8b6914" stroke="#6a5010" stroke-width="0.8"/>
            <!-- Handle -->
            <rect x="14" y="19" width="4"  height="8" rx="1" fill="#8b6914" stroke="#6a5010" stroke-width="0.8"/>
            <!-- Pommel -->
            <circle cx="16" cy="28" r="2" fill="#c9a227" stroke="#9a7a1e" stroke-width="0.8"/>
            <!-- Sparkle -->
            <path d="M22 6 L23 8 L25 7 L23 9 L24 11 L22 9 L20 11 L21 9 L19 7 L21 8 Z"
                  fill="#c9a227" opacity="0.8"/>
          </svg>
        </template>
        <template #heading>Game Log</template>
        <p>冒險誌，記錄每一場戰役的榮耀。</p>
      </WelcomeItem>

      <!-- ③ Programming -->
      <WelcomeItem>
        <template #icon>
          <svg class="card-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Map scroll -->
            <rect x="4" y="6" width="24" height="20" rx="2"
                  fill="rgba(200,170,100,0.25)" stroke="#8b6914" stroke-width="1.4"/>
            <!-- Map lines (paths) -->
            <path d="M8 12 Q12 10 14 14 Q16 18 20 16 Q22 15 24 17"
                  stroke="#5da038" stroke-width="1.2" stroke-linecap="round" fill="none"/>
            <!-- Location dot -->
            <circle cx="20" cy="16" r="2" fill="#c9a227" stroke="#9a7a1e" stroke-width="0.8"/>
            <!-- Contour lines -->
            <path d="M8 18 Q11 17 13 19 Q15 21 18 20" stroke="#8b6914" stroke-width="0.8"
                  stroke-linecap="round" fill="none" opacity="0.5"/>
            <!-- Compass rose -->
            <g transform="translate(22.5, 22)" fill="#8b6914" opacity="0.7">
              <polygon points="0,-4 1,-1 0,0 -1,-1" />
              <polygon points="0,4  1,1  0,0  -1,1" opacity="0.4"/>
              <polygon points="-4,0 -1,1  0,0  -1,-1" opacity="0.4"/>
              <polygon points="4,0  1,-1 0,0  1,1" opacity="0.4"/>
            </g>
          </svg>
        </template>
        <template #heading>Programming</template>
        <p>以程式碼為魔法，構築數位世界。</p>
      </WelcomeItem>

      <!-- ④ Psychology Articles -->
      <WelcomeItem>
        <template #icon>
          <svg class="card-icon-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Blooming flower -->
            <!-- Petals -->
            <ellipse cx="16" cy="10" rx="3"   ry="5.5" fill="rgba(220,160,180,0.6)" stroke="#c07090" stroke-width="1" transform="rotate(0 16 16)"/>
            <ellipse cx="16" cy="10" rx="3"   ry="5.5" fill="rgba(220,160,180,0.55)" stroke="#c07090" stroke-width="1" transform="rotate(60 16 16)"/>
            <ellipse cx="16" cy="10" rx="3"   ry="5.5" fill="rgba(220,160,180,0.5)" stroke="#c07090" stroke-width="1" transform="rotate(120 16 16)"/>
            <ellipse cx="16" cy="10" rx="3"   ry="5.5" fill="rgba(220,160,180,0.6)" stroke="#c07090" stroke-width="1" transform="rotate(180 16 16)"/>
            <ellipse cx="16" cy="10" rx="3"   ry="5.5" fill="rgba(220,160,180,0.55)" stroke="#c07090" stroke-width="1" transform="rotate(240 16 16)"/>
            <ellipse cx="16" cy="10" rx="3"   ry="5.5" fill="rgba(220,160,180,0.5)" stroke="#c07090" stroke-width="1" transform="rotate(300 16 16)"/>
            <!-- Center -->
            <circle cx="16" cy="16" r="4.5" fill="#f0d060" stroke="#c9a227" stroke-width="1.2"/>
            <circle cx="16" cy="16" r="2"   fill="#c9a227"/>
            <!-- Stem -->
            <line x1="16" y1="21" x2="16" y2="29" stroke="#5da038" stroke-width="1.5" stroke-linecap="round"/>
            <!-- Leaf -->
            <path d="M16 25 Q20 23 21 27 Q18 27 16 25 Z" fill="#5da038" opacity="0.8"/>
          </svg>
        </template>
        <template #heading>Psychology Articles</template>
        <p>探索意識深處，智慧的秘境之光。</p>
      </WelcomeItem>

    </div>

    <!-- Bottom grass decoration -->
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
import WelcomeItem from './WelcomeItem.vue'
</script>

<style scoped>
.field-wrap {
  width: 100%;
  padding: 0.5rem 0 1rem;
}

/* ── Section Head ── */
.section-head {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}
.sh-line {
  flex: 1;
  max-width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--grass-mid));
}
.sh-line.right {
  background: linear-gradient(90deg, var(--grass-mid), transparent);
}
.sh-icon { font-size: 0.85rem; }
.sh-title {
  font-family: 'Cinzel', serif;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--ink-soft);
  white-space: nowrap;
}

/* ── Grid ── */
.field-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 580px) {
  .field-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.1rem;
  }
}

/* Staggered entrance */
.field-grid > :nth-child(1) { animation-delay: 0.08s; }
.field-grid > :nth-child(2) { animation-delay: 0.18s; }
.field-grid > :nth-child(3) { animation-delay: 0.28s; }
.field-grid > :nth-child(4) { animation-delay: 0.38s; }

/* ── Icon size ── */
.card-icon-svg {
  width: 24px;
  height: 24px;
}

/* ── Bottom decoration ── */
.bottom-deco {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.8rem;
  opacity: 0.55;
}
.deco-line {
  display: block;
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--grass-mid));
}
.deco-line:last-child {
  background: linear-gradient(90deg, var(--grass-mid), transparent);
}
.deco-flower {
  color: var(--gold-dim);
  font-size: 0.75rem;
  animation: rustle 4s ease-in-out infinite;
}
.deco-leaf {
  color: var(--grass-mid);
  font-size: 0.8rem;
  animation: rustle 3.5s ease-in-out infinite 0.5s;
}
</style>
