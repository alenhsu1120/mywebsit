<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

// Minimal floating seeds — sparse, subtle
const seeds = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x:       8 + Math.random() * 80,
  y:      20 + Math.random() * 50,
  size:   1.5 + Math.random() * 2,
  driftX: `${50 + Math.random() * 80}px`,
  driftY: `${-50 - Math.random() * 70}px`,
  duration:`${14 + Math.random() * 18}s`,
  delay:  `${Math.random() * 22}s`,
  opacity: 0.4 + Math.random() * 0.35,
}))
</script>

<template>
  <div class="world">

    <!-- ══ Background layers ══ -->
    <div class="bg-sky" />
    <div class="bg-sun-haze" />
    <div class="bg-ocean" />
    <div class="bg-hill-far" />
    <div class="bg-hill-near" />
    <div class="bg-ground" />

    <!-- ══ Sparse wind seeds ══ -->
    <div
      v-for="s in seeds" :key="s.id"
      class="seed"
      :style="{
        left: s.x + '%',
        top:  s.y + '%',
        width:  s.size + 'px',
        height: s.size + 'px',
        '--dx': s.driftX,
        '--dy': s.driftY,
        '--op': s.opacity,
        animationDuration: s.duration,
        animationDelay:    s.delay,
      }"
    />

    <!-- ══ Content ══ -->
    <div class="content">
      <header class="site-header">
        <svg class="triforce" viewBox="0 0 60 52" xmlns="http://www.w3.org/2000/svg">
          <polygon points="30,2 46,30 14,30"  fill="#c9a227"/>
          <polygon points="2,50  18,22 34,50" fill="#c9a227"/>
          <polygon points="26,50 42,22 58,50" fill="#c9a227"/>
        </svg>
        <HelloWorld msg="cuteHsu" />
        <p class="site-sub">— 自由冒險者的據點 —</p>
      </header>

      <main class="site-main">
        <TheWelcome />
      </main>
    </div>

  </div>
</template>

<style scoped>
/* ── World container ── */
.world {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* ── Sky ── */
.bg-sky {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    180deg,
    #a8cce2  0%,
    #c8e4f2 22%,
    #dff0f8 42%,
    #eef6f0 58%,
    #f8f4e4 72%,
    #fdf8e2 82%,
    #eef6e8 92%,
    #d4eccc 100%
  );
  z-index: 0;
}

/* ── Sun haze (subtle warm glow near horizon) ── */
.bg-sun-haze {
  position: fixed;
  bottom: 38%;
  left: 50%;
  transform: translateX(-40%);
  width: 60vw;
  height: 28vh;
  background: radial-gradient(ellipse at 60% 80%,
    rgba(255, 244, 170, 0.55) 0%,
    rgba(255, 238, 140, 0.25) 35%,
    transparent 70%);
  z-index: 1;
  pointer-events: none;
  animation: haze-breathe 10s ease-in-out infinite;
}

/* ── Ocean ── */
.bg-ocean {
  position: fixed;
  left: 0; right: 0;
  bottom: 28%;
  height: 18%;
  background: linear-gradient(
    180deg,
    #b8deda 0%,
    #96c8c4 40%,
    #7ab4b0 100%
  );
  z-index: 2;
  pointer-events: none;
}
/* Soft top edge of ocean */
.bg-ocean::before {
  content: '';
  position: absolute;
  top: -6px; left: 0; right: 0;
  height: 14px;
  background: linear-gradient(180deg, transparent, #b8deda);
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
}
/* Sun shimmer on water */
.bg-ocean::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 80% at 62% 20%,
    rgba(255, 250, 200, 0.35) 0%,
    transparent 70%);
}

/* ── Far hill ── */
.bg-hill-far {
  position: fixed;
  left: 0; right: 0;
  bottom: 22%;
  height: 14%;
  background: #5ab820;
  clip-path: ellipse(58% 70% at 50% 100%);
  opacity: 0.55;
  z-index: 3;
  pointer-events: none;
}

/* ── Near hill ── */
.bg-hill-near {
  position: fixed;
  left: 0; right: 0;
  bottom: 6%;
  height: 24%;
  background: linear-gradient(180deg, #48a818 0%, #3a9010 100%);
  clip-path: ellipse(65% 55% at 50% 100%);
  z-index: 4;
  pointer-events: none;
}

/* ── Ground strip ── */
.bg-ground {
  position: fixed;
  left: 0; right: 0;
  bottom: 0;
  height: 7%;
  background: #2e7008;
  z-index: 5;
  pointer-events: none;
}

/* ── Wind seeds ── */
.seed {
  position: fixed;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 0 4px rgba(255,255,255,0.7);
  animation: seed-float ease-in-out infinite;
  z-index: 6;
  pointer-events: none;
}

/* ── Content ── */
.content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 120px;
}

/* ── Header ── */
.site-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 3rem 2rem 1.5rem;
}

.triforce {
  width: 38px;
  height: 33px;
  filter: drop-shadow(0 2px 8px rgba(180,140,30,0.4));
  animation: triforce-shimmer 6s ease-in-out infinite;
}

.site-sub {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: #6a5030;
  opacity: 0.75;
  text-shadow: 0 1px 3px rgba(255,255,255,0.7);
}

/* ── Main ── */
.site-main {
  width: 100%;
  max-width: 860px;
  padding: 0 2rem 2rem;
}

/* ── Animations ── */
@keyframes seed-float {
  0%   { transform: translate(0,0); opacity: 0; }
  8%   { opacity: var(--op, 0.6); }
  85%  { opacity: var(--op, 0.6); }
  100% { transform: translate(var(--dx,60px), var(--dy,-80px)); opacity: 0; }
}
@keyframes haze-breathe {
  0%, 100% { opacity: 0.8; }
  50%       { opacity: 1; }
}
@keyframes triforce-shimmer {
  0%, 100% { filter: drop-shadow(0 2px 6px rgba(180,140,30,0.35)); }
  50%       { filter: drop-shadow(0 2px 18px rgba(201,162,39,0.6)); }
}
@keyframes title-reveal {
  from { opacity: 0; transform: translateY(10px); filter: blur(3px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
@keyframes card-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes rustle {
  0%, 100% { transform: rotate(-1deg); }
  50%       { transform: rotate(1.5deg); }
}

@media (max-width: 600px) {
  .site-header { padding: 2rem 1rem 1rem; }
  .site-sub { display: none; }
}
</style>
