<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

// ── Starfield ─────────────────────────────────────────
const stars = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 70,
  size: Math.random() > 0.88 ? 2.5 : Math.random() > 0.7 ? 1.5 : 1,
  opacity: 0.25 + Math.random() * 0.75,
  twinkleDuration: 2 + Math.random() * 5,
  twinkleDelay: Math.random() * 6,
}))

// ── Floating Wisps (fireflies / korok seeds) ───────────
const wisps = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: 5 + Math.random() * 90,
  y: 10 + Math.random() * 80,
  size: 2 + Math.random() * 5,
  driftX: `${(Math.random() - 0.5) * 120}px`,
  driftY: `${-30 - Math.random() * 90}px`,
  duration: `${12 + Math.random() * 10}s`,
  delay: `${Math.random() * 14}s`,
  hue: Math.random() > 0.3 ? 'var(--botw-cyan)' : 'var(--botw-gold)',
  blur: 3 + Math.random() * 6,
}))
</script>

<template>
  <div class="hyrule-world">

    <!-- ══ Sky Layers ══ -->
    <div class="sky-base" />
    <div class="sky-nebula" />

    <!-- ══ Stars ══ -->
    <div
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="{
        left: star.x + '%',
        top: star.y + '%',
        width: star.size + 'px',
        height: star.size + 'px',
        opacity: star.opacity,
        animationDuration: star.twinkleDuration + 's',
        animationDelay: star.twinkleDelay + 's',
      }"
    />

    <!-- ══ Mountains Silhouette ══ -->
    <div class="mountains">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Far mountains (lighter) -->
        <path d="M0,200 L0,140 L60,100 L120,130 L200,70 L280,110 L360,60 L440,95 L520,50 L600,85 L680,40 L760,80 L840,45 L920,75 L1000,35 L1080,70 L1160,50 L1240,85 L1320,55 L1380,90 L1440,70 L1440,200 Z"
              fill="rgba(26,58,34,0.6)" />
        <!-- Near mountains (darker) -->
        <path d="M0,200 L0,170 L80,130 L160,155 L260,110 L340,140 L440,100 L540,130 L640,95 L720,125 L820,105 L900,135 L980,115 L1060,145 L1140,120 L1220,150 L1320,125 L1380,155 L1440,135 L1440,200 Z"
              fill="rgba(14,32,24,0.85)" />
        <!-- Ground -->
        <rect x="0" y="180" width="1440" height="20" fill="rgba(10,24,18,0.95)" />
      </svg>
    </div>

    <!-- ══ Horizon Glow ══ -->
    <div class="horizon-glow" />

    <!-- ══ Floating Wisps ══ -->
    <div
      v-for="wisp in wisps"
      :key="wisp.id"
      class="wisp"
      :style="{
        left: wisp.x + '%',
        top: wisp.y + '%',
        width: wisp.size + 'px',
        height: wisp.size + 'px',
        '--drift-x': wisp.driftX,
        '--drift-y': wisp.driftY,
        '--wisp-color': wisp.hue,
        '--wisp-blur': wisp.blur + 'px',
        animationDuration: wisp.duration,
        animationDelay: wisp.delay,
      }"
    />

    <!-- ══ Main Content ══ -->
    <div class="content-wrap">

      <!-- ── Header ── -->
      <header class="sheikah-header">

        <!-- Sheikah Eye -->
        <div class="eye-wrap">
          <div class="eye-ring-outer" />
          <svg class="sheikah-eye-svg" viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
            <!-- Outer dashed ring (rotates) -->
            <circle class="ring-spin" cx="100" cy="100" r="86"
                    fill="none" stroke="#4af9f9" stroke-width="1.5"
                    stroke-dasharray="10 5" opacity="0.5"/>
            <!-- Mid ring -->
            <circle cx="100" cy="100" r="70"
                    fill="none" stroke="#4af9f9" stroke-width="1"
                    stroke-dasharray="3 8" opacity="0.35"/>
            <!-- Tick marks (N S E W + diagonals) -->
            <g stroke="#4af9f9" stroke-width="2.5" stroke-linecap="round" opacity="0.8">
              <line x1="100" y1="6"   x2="100" y2="22" />
              <line x1="100" y1="178" x2="100" y2="194"/>
              <line x1="6"   y1="100" x2="22"  y2="100"/>
              <line x1="178" y1="100" x2="194" y2="100"/>
            </g>
            <g stroke="#4af9f9" stroke-width="1.5" stroke-linecap="round" opacity="0.5">
              <line x1="26"  y1="26"  x2="36"  y2="36" />
              <line x1="164" y1="26"  x2="154" y2="36" />
              <line x1="26"  y1="174" x2="36"  y2="164"/>
              <line x1="164" y1="174" x2="154" y2="164"/>
            </g>
            <!-- Eye almond shape -->
            <path d="M 22,100 C 35,58 65,40 100,40 C 135,40 165,58 178,100 C 165,142 135,160 100,160 C 65,160 35,142 22,100 Z"
                  fill="rgba(4,24,36,0.7)" stroke="#4af9f9" stroke-width="2.5"/>
            <!-- Iris -->
            <circle cx="100" cy="100" r="30"
                    fill="rgba(74,249,249,0.08)" stroke="#4af9f9" stroke-width="2"/>
            <!-- Pupil ring -->
            <circle cx="100" cy="100" r="16"
                    fill="rgba(74,249,249,0.18)" stroke="#4af9f9" stroke-width="1.5"/>
            <!-- Pupil core -->
            <circle cx="100" cy="100" r="7" fill="#4af9f9"/>
            <circle cx="100" cy="100" r="3" fill="#ffffff" opacity="0.9"/>
            <!-- Wing blades (left & right) -->
            <path d="M 22,100 L 4,90 L 2,100 L 4,110 Z" fill="#4af9f9" opacity="0.55"/>
            <path d="M 178,100 L 196,90 L 198,100 L 196,110 Z" fill="#4af9f9" opacity="0.55"/>
            <!-- Teardrop below the eye -->
            <path d="M 100,160 C 96,170 93,180 100,192 C 107,180 104,170 100,160 Z"
                  fill="#4af9f9" opacity="0.75"/>
            <!-- Diamond accent at bottom -->
            <path d="M 100,192 L 96,200 L 100,207 L 104,200 Z"
                  fill="#c9a227" opacity="0.9"/>
          </svg>
        </div>

        <!-- Triforce + Title -->
        <div class="header-title">
          <svg class="triforce-svg" viewBox="0 0 66 57" xmlns="http://www.w3.org/2000/svg">
            <polygon points="33,2 49,30 17,30"  fill="#c9a227"/>
            <polygon points="2,55 18,27 34,55"  fill="#c9a227"/>
            <polygon points="32,55 48,27 64,55" fill="#c9a227"/>
          </svg>
          <HelloWorld msg="cuteHsu" />
        </div>

        <!-- Decorative rune line -->
        <div class="header-rune-line">
          <span class="rune-segment" />
          <span class="rune-diamond">◆</span>
          <span class="rune-segment" />
          <span class="rune-text">— 海拉魯傳送門 —</span>
          <span class="rune-segment" />
          <span class="rune-diamond">◆</span>
          <span class="rune-segment" />
        </div>

      </header>

      <!-- ── Page Content ── -->
      <main class="sheikah-main">
        <TheWelcome />
      </main>

    </div>
  </div>
</template>

<style scoped>

/* ── World Container ── */
.hyrule-world {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* ── Sky Layers ── */
.sky-base {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 120% 80% at 50% -10%,
      #1a3a6a 0%, #0d2040 30%, #060f1c 65%, #030810 100%);
  z-index: 0;
}
.sky-nebula {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 40% at 20% 30%, rgba(74,249,249,0.04) 0%, transparent 70%),
    radial-gradient(ellipse 50% 35% at 80% 20%, rgba(74,120,249,0.05) 0%, transparent 70%),
    radial-gradient(ellipse 40% 30% at 60% 60%, rgba(201,162,39,0.03) 0%, transparent 70%);
  z-index: 1;
}

/* ── Stars ── */
.star {
  position: fixed;
  border-radius: 50%;
  background: #ffffff;
  animation: twinkle var(--duration, 3s) ease-in-out infinite;
  z-index: 2;
  pointer-events: none;
}

/* ── Mountains ── */
.mountains {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  z-index: 3;
  pointer-events: none;
}
.mountains svg {
  width: 100%;
  height: 100%;
}

/* ── Horizon Glow ── */
.horizon-glow {
  position: fixed;
  bottom: 160px;
  left: 0;
  right: 0;
  height: 80px;
  background: radial-gradient(ellipse 80% 100% at 50% 100%,
    rgba(74,249,249,0.08) 0%,
    rgba(58,96,64,0.12) 40%,
    transparent 100%);
  animation: horizon-glow 6s ease-in-out infinite;
  z-index: 4;
  pointer-events: none;
}

/* ── Wisps ── */
.wisp {
  position: fixed;
  border-radius: 50%;
  background: var(--wisp-color, var(--botw-cyan));
  box-shadow:
    0 0 var(--wisp-blur, 6px) var(--wisp-color, var(--botw-cyan)),
    0 0 calc(var(--wisp-blur, 6px) * 2) var(--wisp-color, var(--botw-cyan));
  animation: wisp-float var(--duration, 14s) ease-in-out infinite;
  z-index: 5;
  pointer-events: none;
}

/* ── Content Wrapper ── */
.content-wrap {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ── Sheikah Header ── */
.sheikah-header {
  width: 100%;
  max-width: 900px;
  padding: 3rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* ── Eye ── */
.eye-wrap {
  position: relative;
  width: 130px;
  height: 143px;
  animation: eye-glow 4s ease-in-out infinite;
  margin-bottom: 0.5rem;
}
.eye-ring-outer {
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px solid var(--botw-cyan-glow);
  animation: sheikah-pulse 4s ease-in-out infinite;
}
.sheikah-eye-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 8px var(--botw-cyan-glow));
}
.ring-spin {
  transform-origin: 100px 100px;
  animation: eye-rotate 20s linear infinite;
}

/* ── Triforce ── */
.header-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
.triforce-svg {
  width: 40px;
  height: 35px;
  animation: triforce-shimmer 5s ease-in-out infinite;
  filter: drop-shadow(0 0 6px var(--botw-gold-glow));
}

/* ── Rune Divider Line ── */
.header-rune-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--botw-cyan-dim);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  margin-top: 0.5rem;
}
.rune-segment {
  display: block;
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--botw-cyan-dim), transparent);
}
.rune-diamond {
  color: var(--botw-gold-dim);
  font-size: 0.55rem;
  animation: sheikah-border-pulse 3s ease-in-out infinite;
}
.rune-text {
  color: var(--botw-parchment-dim);
  font-family: 'Cinzel', serif;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  white-space: nowrap;
}

/* ── Main Content ── */
.sheikah-main {
  width: 100%;
  max-width: 900px;
  padding: 0 2rem 6rem;
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .sheikah-header { padding: 2rem 1rem 1rem; }
  .eye-wrap { width: 100px; height: 110px; }
  .rune-text { display: none; }
  .rune-segment { width: 20px; }
}
</style>
