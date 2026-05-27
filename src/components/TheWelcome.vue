<template>
  <div class="rune-grid-wrap">

    <!-- Section label -->
    <div class="section-label">
      <span class="label-line" />
      <span class="label-icon">⊙</span>
      <span class="label-text">古代符文傳送門</span>
      <span class="label-icon">⊙</span>
      <span class="label-line right-line" />
    </div>

    <!-- Card grid -->
    <div class="rune-grid">

      <!-- ① Life Journal — Scroll/Quill rune -->
      <WelcomeItem>
        <template #icon>
          <svg class="rune-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7" y="4" width="18" height="24" rx="2" stroke="#4af9f9" stroke-width="1.5"/>
            <path d="M7 7 Q5 8 5 10 Q5 13 7 13" stroke="#4af9f9" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="11" y1="11" x2="21" y2="11" stroke="#4af9f9" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>
            <line x1="11" y1="14" x2="21" y2="14" stroke="#4af9f9" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
            <line x1="11" y1="17" x2="18" y2="17" stroke="#4af9f9" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
            <path d="M19 21 L23 17 L25 19 L21 23 Z" fill="#c9a227" opacity="0.9"/>
            <line x1="18.5" y1="21.5" x2="16" y2="24" stroke="#c9a227" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </template>
        <template #heading>Life Journal</template>
        <p>旅途的記憶，刻在羊皮卷上。</p>
      </WelcomeItem>

      <!-- ② Game Log — Sword & Shield rune -->
      <WelcomeItem>
        <template #icon>
          <svg class="rune-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 8 L6 19 Q6 25 11 27 Q11 25 11 19 L11 8 Z"
                  fill="rgba(74,249,249,0.08)" stroke="#4af9f9" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M8.5 11 L8.5 20" stroke="#4af9f9" stroke-width="0.8" opacity="0.5"/>
            <line x1="15" y1="4"  x2="28" y2="28" stroke="#4af9f9" stroke-width="2" stroke-linecap="round"/>
            <line x1="20" y1="9"  x2="22" y2="7"  stroke="#4af9f9" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="19" y1="13" x2="25" y2="7"  stroke="#4af9f9" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="23" y1="22" x2="17" y2="16" stroke="#c9a227" stroke-width="1" opacity="0.6"/>
          </svg>
        </template>
        <template #heading>Game Log</template>
        <p>冒險誌，記錄每一場戰役的榮耀。</p>
      </WelcomeItem>

      <!-- ③ Programming — Sheikah Terminal rune -->
      <WelcomeItem>
        <template #icon>
          <svg class="rune-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="5" width="26" height="22" rx="2" stroke="#4af9f9" stroke-width="1.5"/>
            <line x1="3" y1="10" x2="29" y2="10" stroke="#4af9f9" stroke-width="1" opacity="0.5"/>
            <circle cx="7"  cy="7.5" r="1"   fill="#4af9f9" opacity="0.7"/>
            <circle cx="11" cy="7.5" r="1"   fill="#4af9f9" opacity="0.45"/>
            <circle cx="15" cy="7.5" r="1"   fill="#4af9f9" opacity="0.3"/>
            <path d="M8 16 L12 13.5 L8 19" stroke="#4af9f9" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <line x1="14" y1="20" x2="21" y2="13.5" stroke="#c9a227" stroke-width="1.5"
                  stroke-linecap="round" opacity="0.8"/>
            <rect x="22" y="19" width="5" height="2" rx="0.5" fill="#4af9f9" opacity="0.7"/>
          </svg>
        </template>
        <template #heading>Programming</template>
        <p>以程式碼為魔法，構築數位世界。</p>
      </WelcomeItem>

      <!-- ④ Psychology Articles — Eye/Mind rune -->
      <WelcomeItem>
        <template #icon>
          <svg class="rune-svg" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="14" r="10" stroke="#4af9f9" stroke-width="1.2"
                    stroke-dasharray="4 2.5" opacity="0.6"/>
            <path d="M6 14 Q11 8 16 8 Q21 8 26 14 Q21 20 16 20 Q11 20 6 14 Z"
                  fill="rgba(74,249,249,0.08)" stroke="#4af9f9" stroke-width="1.4"/>
            <circle cx="16" cy="14" r="4"   fill="rgba(74,249,249,0.14)" stroke="#4af9f9" stroke-width="1.2"/>
            <circle cx="16" cy="14" r="2"   fill="#4af9f9"/>
            <circle cx="17.3" cy="12.8" r="0.7" fill="white" opacity="0.75"/>
            <path d="M16 20 Q15.2 24 16 27 Q16.8 24 16 20 Z" fill="#c9a227" opacity="0.85"/>
            <g stroke="#4af9f9" stroke-width="0.8" opacity="0.35" stroke-linecap="round">
              <line x1="16" y1="3"  x2="16" y2="5.5"/>
              <line x1="25" y1="6"  x2="23.2" y2="7.8"/>
              <line x1="7"  y1="6"  x2="8.8"  y2="7.8"/>
            </g>
          </svg>
        </template>
        <template #heading>Psychology Articles</template>
        <p>探索意識深處，智慧的秘境之光。</p>
      </WelcomeItem>

    </div>

    <!-- Bottom rune decoration -->
    <div class="bottom-rune">
      <svg viewBox="0 0 220 20" xmlns="http://www.w3.org/2000/svg">
        <line x1="0"   y1="10" x2="78"  y2="10" stroke="#1a7a7a" stroke-width="0.8"/>
        <polygon points="82,10 88,5 94,10 88,15"  fill="none" stroke="#1a7a7a" stroke-width="0.8"/>
        <circle  cx="110" cy="10" r="3.5" fill="none" stroke="#c9a227" stroke-width="0.8" opacity="0.7"/>
        <polygon points="126,10 132,5 138,10 132,15" fill="none" stroke="#1a7a7a" stroke-width="0.8"/>
        <line x1="142" y1="10" x2="220" y2="10" stroke="#1a7a7a" stroke-width="0.8"/>
      </svg>
    </div>

  </div>
</template>

<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
</script>

<style scoped>
.rune-grid-wrap {
  width: 100%;
  padding: 0.5rem 0 2rem;
}

/* ── Section Label ── */
.section-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
  justify-content: center;
}
.label-line {
  flex: 1;
  max-width: 70px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--botw-cyan-dim));
}
.label-line.right-line {
  background: linear-gradient(90deg, var(--botw-cyan-dim), transparent);
}
.label-icon {
  color: var(--botw-cyan-dim);
  font-size: 0.65rem;
  animation: sheikah-border-pulse 2.5s ease-in-out infinite;
}
.label-text {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--botw-parchment-dim);
  white-space: nowrap;
}

/* ── Grid ── */
.rune-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 600px) {
  .rune-grid {
    grid-template-columns: 1fr 1fr;
    gap: 1.1rem;
  }
}

/* Staggered animation delays */
.rune-grid > :nth-child(1) { animation-delay: 0.08s; }
.rune-grid > :nth-child(2) { animation-delay: 0.2s;  }
.rune-grid > :nth-child(3) { animation-delay: 0.32s; }
.rune-grid > :nth-child(4) { animation-delay: 0.44s; }

/* ── Icon Size ── */
.rune-svg {
  width: 26px;
  height: 26px;
  filter: drop-shadow(0 0 4px rgba(74, 249, 249, 0.4));
}

/* ── Bottom Decoration ── */
.bottom-rune {
  margin-top: 1.8rem;
  display: flex;
  justify-content: center;
  opacity: 0.55;
}
.bottom-rune svg {
  width: 220px;
  height: 20px;
}
</style>
